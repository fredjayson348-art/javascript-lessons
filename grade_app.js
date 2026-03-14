// JS Grade Manager - Mini App
// By Fred (fredjayson348-art)

const fs = require('fs')
const readline = require('readline')

const FILE = 'grades.json'

// Load grades from file
const loadGrades = () => {
    if (fs.existsSync(FILE)) {
        return JSON.parse(fs.readFileSync(FILE, 'utf8'))
    }
    return {}
}

// Save grades to file
const saveGrades = (grades) => {
    fs.writeFileSync(FILE, JSON.stringify(grades, null, 2))
}

// Get letter grade
const getLetter = (score) => {
    if (score >= 80) return 'A'
    else if (score >= 70) return 'B'
    else if (score >= 60) return 'C'
    else if (score >= 50) return 'D'
    else return 'F'
}

// Show all grades
const showGrades = (grades) => {
    const keys = Object.keys(grades)
    if (keys.length === 0) {
        console.log("No grades yet!\n")
        return
    }
    console.log("\n--- Your Grades ---")
    keys.forEach(subject => {
        const score = grades[subject]
        console.log(`${subject}: ${score} (${getLetter(score)})`)
    })
    console.log()
}

// Show report
const showReport = (grades) => {
    const scores = Object.values(grades)
    if (scores.length === 0) {
        console.log("No grades yet!\n")
        return
    }
    const average = scores.reduce((sum, s) => sum + s, 0) / scores.length
    console.log("\n====== REPORT ======")
    console.log(`Total Subjects: ${scores.length}`)
    console.log(`Average Score: ${average.toFixed(2)}`)
    console.log(`Overall Grade: ${getLetter(average)}`)
    console.log("====================\n")
}

// Menu
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const ask = (question) => new Promise(resolve => rl.question(question, resolve))

const menu = async () => {
    const grades = loadGrades()

    while (true) {
        console.log("=== JS Grade Manager ===")
        console.log("1. Add subject")
        console.log("2. View grades")
        console.log("3. Show report")
        console.log("4. Quit")

        const choice = await ask("Choose (1-4): ")

        if (choice === '1') {
            const subject = await ask("Subject name: ")
            const scoreStr = await ask(`Score for ${subject}: `)
            const score = parseFloat(scoreStr)
            if (isNaN(score) || score < 0 || score > 100) {
                console.log("❌ Invalid score!\n")
            } else {
                grades[subject] = score
                saveGrades(grades)
                console.log("✓ Added!\n")
            }
        } else if (choice === '2') {
            showGrades(grades)
        } else if (choice === '3') {
            showReport(grades)
        } else if (choice === '4') {
            console.log("Goodbye! 👋")
            rl.close()
            break
        } else {
            console.log("❌ Invalid option!\n")
        }
    }
}

menu()
