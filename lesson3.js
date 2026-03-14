// Lesson 3: Functions + Arrow Functions + Strings
// By Fred (fredjayson348-art)

// 1. Regular function (like Python's def)
function addNumbers(a, b) {
    return a + b
}
console.log("Sum:", addNumbers(10, 20))

// 2. Arrow function (shorter way to write functions)
const multiply = (a, b) => a * b
console.log("Product:", multiply(5, 4))

// 3. Arrow function with multiple lines
const getGrade = (score) => {
    if (score >= 80) return "A"
    else if (score >= 70) return "B"
    else if (score >= 60) return "C"
    else if (score >= 50) return "D"
    else return "F"
}

console.log("Grade for 85:", getGrade(85))
console.log("Grade for 55:", getGrade(55))
console.log("Grade for 40:", getGrade(40))

// 4. String tricks
let name = "Fred Jayson"
console.log("\n--- String Tricks ---")
console.log("Uppercase:", name.toUpperCase())
console.log("Lowercase:", name.toLowerCase())
console.log("Length:", name.length)
console.log("Includes 'Fred':", name.includes("Fred"))

// 5. Template literals (cleaner way to join strings)
let school = "Accra Technical University"
let year = 1
console.log(`${name} is a year ${year} student at ${school}`)

// 6. Array methods (super powerful!)
let scores = [80, 45, 90, 60, 75]
console.log("\n--- Array Methods ---")
console.log("All scores:", scores)
console.log("Highest:", Math.max(...scores))
console.log("Lowest:", Math.min(...scores))

let passed = scores.filter(score => score >= 50)
console.log("Passed (50+):", passed)

let doubled = scores.map(score => score * 2)
console.log("Doubled scores:", doubled)
