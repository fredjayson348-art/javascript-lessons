// Lesson 5: Express.js - Your First Web Server in JavaScript
// By Fred (fredjayson348-art)

const express = require('express')
const fs = require('fs')
const app = express()

// This lets Express read JSON from requests (like Flask's request.get_json())
app.use(express.json())

// ==============================
// 1. Basic Route - like @app.route('/') in Flask
// ==============================
app.get('/', (req, res) => {
    res.send('Hello from Express! 🚀')
})

// ==============================
// 2. Route that returns JSON - like jsonify() in Flask
// ==============================
app.get('/info', (req, res) => {
    res.json({
        name: 'Fred',
        school: 'Accra Technical University',
        language: 'JavaScript'
    })
})

// ==============================
// 3. Route with a parameter - like /grades/<subject> in Flask
// ==============================
app.get('/student/:name', (req, res) => {
    const name = req.params.name
    res.json({
        message: `Looking up student: ${name}`,
        found: true
    })
})

// ==============================
// 4. Load grades from JSON file and serve them
// ==============================
app.get('/grades', (req, res) => {
    const grades = JSON.parse(fs.readFileSync('grades.json', 'utf8'))
    res.json(grades)
})

// ==============================
// 5. POST route - receive data and send back a response
// ==============================
app.post('/add', (req, res) => {
    const { name, score } = req.body
    if (!name || score === undefined) {
        return res.status(400).json({ error: 'Name and score required' })
    }
    // Load existing grades
    const grades = JSON.parse(fs.readFileSync('grades.json', 'utf8'))
    // Add new student
    grades[name] = score
    // Save back to file
    fs.writeFileSync('grades.json', JSON.stringify(grades, null, 2))
    res.json({ message: `Added ${name} with score ${score}!`, grades })
})

// ==============================
// 6. Start the server - like app.run() in Flask
// ==============================
app.listen(3000, () => {
    console.log('✅ Express server running at http://localhost:3000')
    console.log('Try these routes:')
    console.log('  GET  http://localhost:3000/')
    console.log('  GET  http://localhost:3000/info')
    console.log('  GET  http://localhost:3000/grades')
    console.log('  GET  http://localhost:3000/student/Fred')
    console.log('  POST http://localhost:3000/add')
})
