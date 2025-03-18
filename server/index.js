const path = require("path")
const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 3000

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

