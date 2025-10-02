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
const CLIENT_BUILD_PATH = path.join(__dirname, 'client', 'build'); // frontend folder

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(bodyParser.json());

// Serve frontend if exists
if (fs.existsSync(CLIENT_BUILD_PATH)) {
  app.use(express.static(CLIENT_BUILD_PATH));
}

// Root route for testing backend
app.get('/', (req, res) => {
  if (fs.existsSync(path.join(CLIENT_BUILD_PATH, 'index.html'))) {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  } else {
    res.send('ERP Management backend is running!');
  }
});

// Data directory setup
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// Initialize data files
const initializeDataFiles = () => {
  const files = {
    'users.json': [
      { id: '1', email: 'admin@college.edu', password: bcrypt.hashSync('admin123', 10), role: 'admin', name: 'Admin User' },
      { id: '2', email: 'staff@college.edu', password: bcrypt.hashSync('staff123', 10), role: 'staff', name: 'Staff Member' },
      { id: '3', email: 'student@college.edu', password: bcrypt.hashSync('student123', 10), role: 'student', name: 'John Doe', studentId: 'STU001' }
    ],
    'admissions.json': [],
    'fees.json': [],
    'hostel.json': {
      rooms: [
        { roomNumber: '101', capacity: 2, occupied: 0, students: [] },
        { roomNumber: '102', capacity: 2, occupied: 0, students: [] },
        { roomNumber: '103', capacity: 3, occupied: 0, students: [] },
        { roomNumber: '104', capacity: 3, occupied: 0, students: [] },
        { roomNumber: '201', capacity: 2, occupied: 0, students: [] },
        { roomNumber: '202', capacity: 2, occupied: 0, students: [] },
        { roomNumber: '203', capacity: 3, occupied: 0, students: [] },
        { roomNumber: '204', capacity: 3, occupied: 0, students: [] }
      ],
      allocations: []
    },
    'exams.json': []
  };

  Object.keys(files).forEach(filename => {
    const filepath = path.join(dataDir, filename);
    if (!fs.existsSync(filepath)) fs.writeFileSync(filepath, JSON.stringify(files[filename], null, 2));
  });
};

initializeDataFiles();

// Helper functions
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

// === Your existing /api/... routes go here ===
// (Login, Admissions, Fees, Hostel, Exams, Dashboard, PDFs)

// --- Catch all other routes (frontend SPA) ---
if (fs.existsSync(CLIENT_BUILD_PATH)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
