const dotenv = require('dotenv')
dotenv.config({ path: "../.env" })
const OpenAI = require("openai");
const mic = require("mic");
const fs = require("fs");

const apikey = process.env.LEMONFOX_KEY;
if (!apikey) {
  console.error("API key not found! Please set LEMONFOX_KEY or OPENAI_KEY in your .env file.");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: apikey,
  baseURL: "https://api.lemonfox.ai/v1",
});

// Configure microphone settings
const micInstance = mic({
  rate: "16000",
  channels: "1",
  debug: false,
  fileType: "wav",
});

const micInputStream = micInstance.getAudioStream();

console.log("🎙️ Listening... Press Ctrl+C to stop.");

// Function to send audio chunks to Whisper API
async function transcribeAudio(filePath) {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });

    console.log("📝 Transcription:", transcription.text);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

// Start recording & process chunks
let fileCounter = 0;
micInstance.start();

micInputStream.on("data", async (data) => {
  const fileName = `audio_chunk_${fileCounter}.wav`;
  
  try {
    fs.writeFileSync(fileName, data);
    await transcribeAudio(fileName);
  } catch (err) {
    console.error("File Error:", err);
  } finally {
    fs.unlinkSync(fileName); // Delete file after processing
    fileCounter++;
  }
});

micInputStream.on("error", (err) => {
  console.error("Microphone Error:", err);
});

process.on("SIGINT", () => {
  console.log("\n🛑 Stopping...");
  micInstance.stop();
  process.exit();
});
