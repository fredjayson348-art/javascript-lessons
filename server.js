// Lesson 6: Express.js Web Server
// By Fred (fredjayson348-art)

const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 3000
const FILE = 'grades.json'

// This lets Express read JSON from requests
app.use(express.json())

// Helper functions
const loadGrades = () => {
    if (fs.existsSync(FILE)) {
        return JSON.parse(fs.readFileSync(FILE, 'utf8'))
    }
    return {}
}

const saveGrades = (grades) => {
    fs.writeFileSync(FILE, JSON.stringify(grades, null, 2))
}

const getLetter = (score) => {
    if (score >= 80) return 'A'
    else if (score >= 70) return 'B'
    else if (score >= 60) return 'C'
    else if (score >= 50) return 'D'
    else return 'F'
}

// Route 1: Home
app.get('/', (req, res) => {
    res.send('<h1>JS Grade Tracker API</h1><p>Running on Express!</p>')
})

// Route 2: Get all grades
app.get('/grades', (req, res) => {
    const grades = loadGrades()
    const result = {}
    for (let subject in grades) {
        result[subject] = {
            score: grades[subject],
            letter: getLetter(grades[subject])
        }
    }
    res.json(result)
})

// Route 3: Add a grade
app.post('/grades', (req, res) => {
    const { subject, score } = req.body
    if (!subject || score === undefined) {
        return res.status(400).json({ error: 'Subject and score required' })
    }
    if (score < 0 || score > 100) {
        return res.status(400).json({ error: 'Score must be between 0 and 100' })
    }
    const grades = loadGrades()
    grades[subject] = score
    saveGrades(grades)
    res.json({ message: 'Added!', subject, score })
})

// Route 4: Delete a grade
app.delete('/grades/:subject', (req, res) => {
    const grades = loadGrades()
    const subject = req.params.subject
    if (!grades[subject]) {
        return res.status(404).json({ error: 'Subject not found' })
    }
    delete grades[subject]
    saveGrades(grades)
    res.json({ message: 'Deleted!', subject })
})

// Route 5: Report
app.get('/report', (req, res) => {
    const grades = loadGrades()
    const scores = Object.values(grades)
    if (scores.length === 0) {
        return res.json({ error: 'No grades yet' })
    }
    const average = scores.reduce((sum, s) => sum + s, 0) / scores.length
    res.json({
        total_subjects: scores.length,
        average: average.toFixed(2),
        overall_grade: getLetter(average)
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`)
})
