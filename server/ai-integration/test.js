const mic = require("mic");
const fs = require("fs");
const axios = require("axios");

// OpenAI Whisper API settings
const API_KEY = "your_openai_api_key";
const WHISPER_URL = process.env.LEMONFOX_KEY

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
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));
  formData.append("model", "whisper-1");

  try {
    const response = await axios.post(WHISPER_URL, formData, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        ...formData.getHeaders(),
      },
    });

    console.log("📝 Transcription:", response.data.text);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

// Start recording & process chunks
let fileCounter = 0;
micInstance.start();

micInputStream.on("data", async (data) => {
  const fileName = `audio_chunk_${fileCounter}.wav`;
  fs.writeFileSync(fileName, data);
  
  await transcribeAudio(fileName);

  fs.unlinkSync(fileName); // Delete the file after processing
  fileCounter++;
});

micInputStream.on("error", (err) => {
  console.error("Microphone Error:", err);
});

process.on("SIGINT", () => {
  console.log("\n🛑 Stopping...");
  micInstance.stop();
  process.exit();
});
