// Lesson 4: File System + Mini Project
// By Fred (fredjayson348-art)

const fs = require('fs')

// 1. Write to a file
fs.writeFileSync('students.txt', 'Fred - 85\nKwame - 90\nAma - 78\n')
console.log("✓ File created!")

// 2. Read from a file
const content = fs.readFileSync('students.txt', 'utf8')
console.log("\n--- File Contents ---")
console.log(content)

// 3. Append to a file (add without deleting)
fs.appendFileSync('students.txt', 'Kofi - 95\n')
console.log("✓ New student added!")

// 4. Read again to confirm
const updated = fs.readFileSync('students.txt', 'utf8')
console.log("\n--- Updated File ---")
console.log(updated)

// 5. Work with JSON file (like your grade tracker!)
const grades = {
    Fred: 85,
    Kwame: 90,
    Ama: 78,
    Kofi: 95
}

// Save as JSON
fs.writeFileSync('grades.json', JSON.stringify(grades, null, 2))
console.log("✓ Grades saved as JSON!")

// Load JSON back
const loaded = JSON.parse(fs.readFileSync('grades.json', 'utf8'))
console.log("\n--- Loaded Grades ---")
for (let student in loaded) {
    console.log(`${student}: ${loaded[student]}`)
}

// 6. Calculate average from loaded data
const scores = Object.values(loaded)
const average = scores.reduce((sum, score) => sum + score, 0) / scores.length
console.log(`\nClass Average: ${average}`)
