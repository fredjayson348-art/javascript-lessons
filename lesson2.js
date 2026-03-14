// Lesson 2: Arrays, Loops and Objects
// By Fred (fredjayson348-art)

// 1. Arrays (like Python lists)
let subjects = ["Maths", "English", "Science", "Programming"]

console.log("All subjects:", subjects)
console.log("First subject:", subjects[0])
console.log("Total subjects:", subjects.length)

// 2. Loop through array
console.log("\n--- Subject List ---")
for (let i = 0; i < subjects.length; i++) {
    console.log(i + 1, "-", subjects[i])
}

// 3. Cleaner loop (like Python's for x in list)
console.log("\n--- Cleaner Loop ---")
for (let subject of subjects) {
    console.log("Subject:", subject)
}

// 4. Objects (like Python dictionaries)
let student = {
    name: "Fred",
    age: 18,
    school: "Accra Technical University",
    isStudent: true
}

console.log("\n--- Student Info ---")
console.log("Name:", student.name)
console.log("School:", student.school)

// 5. Array of objects (very powerful!)
let grades = [
    { subject: "Maths", score: 80 },
    { subject: "English", score: 90 },
    { subject: "Science", score: 75 }
]

console.log("\n--- Grades ---")
for (let grade of grades) {
    console.log(grade.subject, ":", grade.score)
}
