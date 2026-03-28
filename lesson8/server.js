const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const DB_FILE = './db.json';

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/students', (req, res) => {
  const db = readDB();
  res.json(db.students);
});

app.post('/api/students', (req, res) => {
  const { name, grade } = req.body;
  if (!name || grade === undefined) {
    return res.status(400).json({ error: 'Name and grade required' });
  }
  const db = readDB();
  const student = { id: Date.now(), name, grade };
  db.students.push(student);
  writeDB(db);
  res.json({ message: 'Student added!', student });
});

app.delete('/api/students/:id', (req, res) => {
  const db = readDB();
  db.students = db.students.filter(s => s.id !== parseInt(req.params.id));
  writeDB(db);
  res.json({ message: 'Deleted!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
