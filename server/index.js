const socketIO = require('socket.io');
const path = require("path")
const fs = require('fs');
const { OpenAI } = require('openai');
const multer = require('multer');
const cors = require("cors")


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Express App Configration
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Socket.io Configuration
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Socket.io Configuration
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const openai = new OpenAI({
    apiKey: "adXwoAZ5CoUEzJ9X5jDWBas50LywsaDm",
    baseURL: "https://api.lemonfox.ai/v1",
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GLOBAL CONSTANTS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const PORT = process.env.PORT || 3000
const LEMONFOX_KEY = process.env.LEMONFOX_KEY

if (!LEMONFOX_KEY) {
    console.error("API key not found! Please set LEMONFOX_KEY or OPENAI_KEY in your .env file.");
    process.exit(1);
  }


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// HTTP routers
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Leetcode problem retrieval
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// get all leetcode problems
app.get('/api/problems', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dataset', 'problems.json'));
  });
  
// get a specfic leetcode problem
app.get('/api/problem/:id', (req, res) => {

    const targetId = req.params.id;

    const allProblems = require(path.join(__dirname, '..', 'dataset', 'problems.json'));
    
    const problem = allProblems.find(item => item.id === targetId);

    if (!problem) {
        return res.status(404).json({ error: `Problem number ${targetId} not found` });
    } else {
        res.json(problem);
    }
  });

app.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html")) 
})


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Transcription Route
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.post('/transcribe', upload.single('audio'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }
  
    try {
      // Transcribe the audio using Whisper API
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(req.file.path),
            model: "whisper-1",
            language: "en",
            prompt: "ignore sounds that are quiet, you are transcribing someone who is a lecturer teaching an advanced computer science class" // you are transcribing someone who is an interviewee for a pair programming coding interview
        });
        // Broadcast the transcription to all connected clients
        if (transcription.text) {
            io.emit('transcription', {
            text: transcription.text,
            isFinal: true
            });
        }
  
        // Delete the uploaded file
        fs.unlinkSync(req.file.path);
  
         res.json({ success: true, text: transcription.text });
    } catch (error) {
       console.error('Transcription error:', error);
        res.status(500).json({ error: 'Transcription failed', details: error.message });
    }
});


// if none of the above, serve 404 page
app.all("*", (req, res) => {
    res.status(404)
    
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html")) 
    } else if (req.accepts("html")) {
        res.json({ error: "404 not found" })
    } else {
        res.type("txt").send("404 not found")
    }
})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

