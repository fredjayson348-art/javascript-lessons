const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const DB_FILE = './db.json';

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get('/students', (req, res) => {
  const db = readDB();
  res.json(db.students);
});

app.get('/students/:id', (req, res) => {
  const db = readDB();
  const student = db.students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

app.post('/students', (req, res) => {
  const { name, grade } = req.body;
  if (!name || grade === undefined) {
    return res.status(400).json({ error: 'Name and grade required' });
  }
  const db = readDB();
  const newStudent = { id: Date.now(), name, grade };
  db.students.push(newStudent);
  writeDB(db);
  res.json({ message: 'Student added!', student: newStudent });
});

app.put('/students/:id', (req, res) => {
  const { name, grade } = req.body;
  const db = readDB();
  const index = db.students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Student not found' });
  db.students[index] = { ...db.students[index], name, grade };
  writeDB(db);
  res.json({ message: 'Student updated!' });
});

app.delete('/students/:id', (req, res) => {
  const db = readDB();
  db.students = db.students.filter(s => s.id !== parseInt(req.params.id));
  writeDB(db);
  res.json({ message: 'Student deleted!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
