const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'college_management_secret_key_2024';

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(bodyParser.json());

// Data directory
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// Initialize JSON files
const initializeDataFiles = () => {
  const files = {
    'users.json': [
      { id: '1', email: 'admin@college.edu', password: bcrypt.hashSync('admin123', 10), role: 'admin', name: 'Admin User' },
      { id: '2', email: 'staff@college.edu', password: bcrypt.hashSync('staff123', 10), role: 'staff', name: 'Staff Member' },
      { id: '3', email: 'student@college.edu', password: bcrypt.hashSync('student123', 10), role: 'student', name: 'John Doe', studentId: 'STU001' }
    ],
    'admissions.json': [],
    'fees.json': [],
    'hostel.json': { rooms: [], allocations: [] },
    'exams.json': []
  };

  Object.keys(files).forEach(filename => {
    const filepath = path.join(dataDir, filename);
    if (!fs.existsSync(filepath)) fs.writeFileSync(filepath, JSON.stringify(files[filename], null, 2));
  });
};

initializeDataFiles();

// Helpers
const readData = (filename) => JSON.parse(fs.readFileSync(path.join(dataDir, filename), 'utf8'));
const writeData = (filename, data) => fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(data, null, 2));

// Auth middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// === Place your /api/... routes here (login, admissions, fees, hostel, exams, dashboard, PDFs) ===

// Serve React frontend
const CLIENT_BUILD_PATH = path.join(__dirname, '..', 'client', 'build');
if (fs.existsSync(CLIENT_BUILD_PATH)) {
  app.use(express.static(CLIENT_BUILD_PATH));
  app.get('*', (req, res) => {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  });
}

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
