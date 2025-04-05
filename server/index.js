const path = require("path")
const express = require("express")
const session = require('express-session')
const cors = require("cors")
const { getAIResponse } = require(path.join(__dirname, 'reviewCode.js'))
const { summarize } = require(path.join(__dirname, 'summarize'));
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 3000

app.use(session({
  secret: 'secret-key', // change to actual secret key in prod
  resave: false,
  saveUninitialized: true
}))

// leetcode proxy
app.use(cors());

app.get('/leetcode/problems', async (req, res) => {
  try {
    const response = await fetch('https://leetcode.com/api/problems/all/');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch LeetCode API' });
  }
});

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

  // ask AI to review the code
  app.post('/api/submit-code', async (req, res) => {
  
      // make the conversation history for a new session
      if (!req.session.conversationHistory) {
          req.session.conversationHistory = []
          req.session.summarizedHistory = ""
      }
  
      const title = req.body.title;
      const explanation = req.body.explanation;
      const examples = req.body.examples;
      const constraints = req.body.constraints;
      const code = req.body.code;
  
      // add user's input into the conversation history
      req.session.conversationHistory.push({
          "role": 'user',
          "content": 
          `Here is the question and solution:
          \nTitle: ${title}\nExplanation: ${explanation}\nExamples: ${examples}\nConstraints: ${constraints}\n 
          Solution:\n${code}`
        })
  
      try {
          const aiResponse = await getAIResponse(title, explanation, examples, constraints, code, req.session.summarizedHistory)
  
          // add the AI's output in the conversation history
          req.session.conversationHistory.push({
              "role": 'assistant',
              "content": `Here is the AI's response to the code the user sent to review:${aiResponse.content}`
            })
  
          req.session.summarizedHistory = await summarize(req.session.conversationHistory)
  
          res.json({ response: aiResponse })
  
        } catch (error) {
          res.status(500).json({ error: "bad AI submission" })
        }
  })

// answer a (interview) question that the AI asked
app.post('/api/answer-question', async (req, res) => {

  // make the conversation history for a new session
  if (!req.session.conversationHistory) {
    req.session.conversationHistory = [];
    req.session.summarizedHistory = "";
  }

  const answer = req.body.answer;
  const highlight = req.body.highlight

  // add the candidate's answer into the conversation history
  req.session.conversationHistory.push({
      role: 'user',
      content: `In response to your question, the candidate answered: ${answer}`
  });

  try {
      const aiResponse = await getAIResponse(answer, highlight, req.session.summarizedHistory);

      // add the AI's response to the conversation history
      req.session.conversationHistory.push({
          role: 'assistant',
          content: `Here is the AI's response to the candidate's answer: ${aiResponse.content}`
      });

      req.session.summarizedHistory = await summarize(req.session.conversationHistory);

      res.json({ response: aiResponse });
  } catch (error) {
      res.status(500).json({ error: "bad AI submission" });
  }
});



app.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html")) 
})

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

