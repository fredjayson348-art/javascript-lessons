const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const app = express();
app.use(express.json());

const SECRET = 'fred_secret_key_2025';
const DB_FILE = './db.json';

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// MIDDLEWARE - protects routes
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// REGISTER
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  const db = readDB();
  const exists = db.users.find(u => u.username === username);
  if (exists) return res.status(400).json({ error: 'Username taken' });
  const hashed = await bcrypt.hash(password, 10);
  db.users.push({ id: Date.now(), username, password: hashed });
  writeDB(db);
  res.json({ message: 'Account created! Please login.' });
});

// LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful!', token });
});

// PUBLIC - anyone can view students
app.get('/students', (req, res) => {
  const db = readDB();
  res.json(db.students);
});

// PROTECTED - must be logged in to add
app.post('/students', authMiddleware, (req, res) => {
  const { name, grade } = req.body;
  if (!name || grade === undefined) {
    return res.status(400).json({ error: 'Name and grade required' });
  }
  const db = readDB();
  const newStudent = { id: Date.now(), name, grade, addedBy: req.user.username };
  db.students.push(newStudent);
  writeDB(db);
  res.json({ message: 'Student added!', student: newStudent });
});

// PROTECTED - must be logged in to delete
app.delete('/students/:id', authMiddleware, (req, res) => {
  const db = readDB();
  db.students = db.students.filter(s => s.id !== parseInt(req.params.id));
  writeDB(db);
  res.json({ message: 'Student deleted!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
