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

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(bodyParser.json());

// Data directory setup
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize data files
const initializeDataFiles = () => {
  const files = {
    'users.json': [
      {
        id: '1',
        email: 'admin@college.edu',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        name: 'Admin User'
      },
      {
        id: '2',
        email: 'staff@college.edu',
        password: bcrypt.hashSync('staff123', 10),
        role: 'staff',
        name: 'Staff Member'
      },
      {
        id: '3',
        email: 'student@college.edu',
        password: bcrypt.hashSync('student123', 10),
        role: 'student',
        name: 'John Doe',
        studentId: 'STU001'
      }
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
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, JSON.stringify(files[filename], null, 2));
    }
  });
};

initializeDataFiles();

// Helper functions
const readData = (filename) => {
  const filepath = path.join(dataDir, filename);
  const data = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(data);
};

const writeData = (filename, data) => {
  const filepath = path.join(dataDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = readData('users.json');
  
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const validPassword = bcrypt.compareSync(password, user.password);
  
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      studentId: user.studentId
    }
  });
});

// Admissions
app.post('/api/admissions', authenticateToken, (req, res) => {
  const { name, email, course, phone, address, dateOfBirth } = req.body;
  
  const admissions = readData('admissions.json');
  const users = readData('users.json');
  
  const studentId = `STU${String(admissions.length + 1).padStart(3, '0')}`;
  
  const newAdmission = {
    id: uuidv4(),
    studentId,
    name,
    email,
    course,
    phone,
    address,
    dateOfBirth,
    admissionDate: new Date().toISOString(),
    status: 'Admitted'
  };
  
  admissions.push(newAdmission);
  writeData('admissions.json', admissions);
  
  // Create student user account
  const newUser = {
    id: uuidv4(),
    email,
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    name,
    studentId
  };
  
  users.push(newUser);
  writeData('users.json', users);
  
  res.json({ success: true, admission: newAdmission });
});

app.get('/api/admissions', authenticateToken, (req, res) => {
  const admissions = readData('admissions.json');
  res.json(admissions);
});

// Fee Payments
app.post('/api/fees', authenticateToken, (req, res) => {
  const { studentId, amount, paymentMethod, description } = req.body;
  
  const fees = readData('fees.json');
  const admissions = readData('admissions.json');
  
  const student = admissions.find(s => s.studentId === studentId);
  
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  const receiptNumber = `REC${String(fees.length + 1).padStart(5, '0')}`;
  
  const newPayment = {
    id: uuidv4(),
    receiptNumber,
    studentId,
    studentName: student.name,
    amount: parseFloat(amount),
    paymentMethod,
    description: description || 'Tuition Fee',
    paymentDate: new Date().toISOString(),
    status: 'Paid'
  };
  
  fees.push(newPayment);
  writeData('fees.json', fees);
  
  res.json({ success: true, payment: newPayment });
});

app.get('/api/fees', authenticateToken, (req, res) => {
  const fees = readData('fees.json');
  const { studentId } = req.query;
  
  if (studentId) {
    const studentFees = fees.filter(f => f.studentId === studentId);
    return res.json(studentFees);
  }
  
  res.json(fees);
});

// Hostel Management
app.post('/api/hostel', authenticateToken, (req, res) => {
  const { studentId, roomNumber } = req.body;
  
  const hostelData = readData('hostel.json');
  const admissions = readData('admissions.json');
  
  const student = admissions.find(s => s.studentId === studentId);
  
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  const room = hostelData.rooms.find(r => r.roomNumber === roomNumber);
  
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  if (room.occupied >= room.capacity) {
    return res.status(400).json({ error: 'Room is full' });
  }
  
  // Check if student already has a room
  const existingAllocation = hostelData.allocations.find(a => a.studentId === studentId);
  if (existingAllocation) {
    return res.status(400).json({ error: 'Student already has a room allocated' });
  }
  
  const newAllocation = {
    id: uuidv4(),
    studentId,
    studentName: student.name,
    roomNumber,
    allocationDate: new Date().toISOString(),
    status: 'Active'
  };
  
  hostelData.allocations.push(newAllocation);
  room.occupied += 1;
  room.students.push({ studentId, studentName: student.name });
  
  writeData('hostel.json', hostelData);
  
  res.json({ success: true, allocation: newAllocation });
});

app.get('/api/hostel', authenticateToken, (req, res) => {
  const hostelData = readData('hostel.json');
  res.json(hostelData);
});

app.get('/api/hostel/allocations', authenticateToken, (req, res) => {
  const hostelData = readData('hostel.json');
  const { studentId } = req.query;
  
  if (studentId) {
    const allocation = hostelData.allocations.find(a => a.studentId === studentId);
    return res.json(allocation || null);
  }
  
  res.json(hostelData.allocations);
});

// Examination
app.post('/api/exams', authenticateToken, (req, res) => {
  const { studentId, subject, marks, maxMarks, examDate, examType } = req.body;
  
  const exams = readData('exams.json');
  const admissions = readData('admissions.json');
  
  const student = admissions.find(s => s.studentId === studentId);
  
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  const newExam = {
    id: uuidv4(),
    studentId,
    studentName: student.name,
    subject,
    marks: parseFloat(marks),
    maxMarks: parseFloat(maxMarks),
    percentage: ((parseFloat(marks) / parseFloat(maxMarks)) * 100).toFixed(2),
    examDate: examDate || new Date().toISOString(),
    examType: examType || 'Regular',
    grade: calculateGrade((parseFloat(marks) / parseFloat(maxMarks)) * 100)
  };
  
  exams.push(newExam);
  writeData('exams.json', exams);
  
  res.json({ success: true, exam: newExam });
});

app.get('/api/exams', authenticateToken, (req, res) => {
  const exams = readData('exams.json');
  const { studentId } = req.query;
  
  if (studentId) {
    const studentExams = exams.filter(e => e.studentId === studentId);
    return res.json(studentExams);
  }
  
  res.json(exams);
});

// Dashboard Statistics
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  const admissions = readData('admissions.json');
  const fees = readData('fees.json');
  const hostelData = readData('hostel.json');
  const exams = readData('exams.json');
  
  const totalAdmissions = admissions.length;
  const totalFeesCollected = fees.reduce((sum, fee) => sum + fee.amount, 0);
  
  const totalHostelCapacity = hostelData.rooms.reduce((sum, room) => sum + room.capacity, 0);
  const totalHostelOccupied = hostelData.rooms.reduce((sum, room) => sum + room.occupied, 0);
  
  const totalExamRecords = exams.length;
  
  const recentAdmissions = admissions.slice(-5).reverse();
  const recentPayments = fees.slice(-5).reverse();
  
  res.json({
    totalAdmissions,
    totalFeesCollected,
    hostelOccupancy: {
      occupied: totalHostelOccupied,
      capacity: totalHostelCapacity,
      percentage: ((totalHostelOccupied / totalHostelCapacity) * 100).toFixed(1)
    },
    totalExamRecords,
    recentAdmissions,
    recentPayments
  });
});

// Helper function
function calculateGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
}

// PDF Generation Routes

// Generate Fee Receipt PDF
app.get('/api/fees/receipt/:receiptNumber', authenticateToken, (req, res) => {
  const { receiptNumber } = req.params;
  const fees = readData('fees.json');
  
  const payment = fees.find(f => f.receiptNumber === receiptNumber);
  
  if (!payment) {
    return res.status(404).json({ error: 'Receipt not found' });
  }
  
  const doc = new PDFDocument({ margin: 50 });
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=receipt-${receiptNumber}.pdf`);
  
  doc.pipe(res);
  
  // Header
  doc.fontSize(24).fillColor('#667eea').text('College Management System', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(20).fillColor('#333').text('FEE PAYMENT RECEIPT', { align: 'center' });
  doc.moveDown(1);
  
  // Receipt Details Box
  doc.rect(50, doc.y, 495, 200).stroke();
  doc.moveDown(0.5);
  
  // Receipt Information
  doc.fontSize(12).fillColor('#666').text('Receipt Number:', 70, doc.y + 10);
  doc.fontSize(14).fillColor('#000').text(payment.receiptNumber, 250, doc.y);
  doc.moveDown(1);
  
  doc.fontSize(12).fillColor('#666').text('Date:', 70, doc.y);
  doc.fontSize(14).fillColor('#000').text(new Date(payment.paymentDate).toLocaleDateString(), 250, doc.y);
  doc.moveDown(1);
  
  doc.fontSize(12).fillColor('#666').text('Student ID:', 70, doc.y);
  doc.fontSize(14).fillColor('#000').text(payment.studentId, 250, doc.y);
  doc.moveDown(1);
  
  doc.fontSize(12).fillColor('#666').text('Student Name:', 70, doc.y);
  doc.fontSize(14).fillColor('#000').text(payment.studentName, 250, doc.y);
  doc.moveDown(1);
  
  doc.fontSize(12).fillColor('#666').text('Description:', 70, doc.y);
  doc.fontSize(14).fillColor('#000').text(payment.description, 250, doc.y);
  doc.moveDown(1);
  
  doc.fontSize(12).fillColor('#666').text('Payment Method:', 70, doc.y);
  doc.fontSize(14).fillColor('#000').text(payment.paymentMethod, 250, doc.y);
  doc.moveDown(2);
  
  // Amount Box
  doc.rect(50, doc.y, 495, 60).fillAndStroke('#f0f4ff', '#667eea');
  doc.fontSize(14).fillColor('#667eea').text('Amount Paid:', 70, doc.y + 20);
  doc.fontSize(20).fillColor('#667eea').text(`₹${payment.amount.toLocaleString()}`, 250, doc.y);
  doc.moveDown(3);
  
  // Status
  doc.fontSize(12).fillColor('#28a745').text(`Status: ${payment.status}`, 70, doc.y);
  doc.moveDown(2);
  
  // Footer
  doc.moveDown(2);
  doc.fontSize(10).fillColor('#999').text('This is a computer-generated receipt and does not require a signature.', { align: 'center' });
  doc.text('For any queries, please contact the administration office.', { align: 'center' });
  
  doc.end();
});

// Generate Admission Certificate PDF
app.get('/api/admissions/certificate/:studentId', authenticateToken, (req, res) => {
  const { studentId } = req.params;
  const admissions = readData('admissions.json');
  
  const admission = admissions.find(a => a.studentId === studentId);
  
  if (!admission) {
    return res.status(404).json({ error: 'Admission record not found' });
  }
  
  const doc = new PDFDocument({ margin: 50 });
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=admission-${studentId}.pdf`);
  
  doc.pipe(res);
  
  // Header
  doc.fontSize(24).fillColor('#667eea').text('College Management System', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(20).fillColor('#333').text('ADMISSION CERTIFICATE', { align: 'center' });
  doc.moveDown(2);
  
  // Certificate Border
  doc.rect(40, 40, 515, 720).lineWidth(3).stroke('#667eea');
  doc.rect(45, 45, 505, 710).lineWidth(1).stroke('#667eea');
  
  doc.moveDown(1);
  
  // Certificate Content
  doc.fontSize(14).fillColor('#333').text('This is to certify that', { align: 'center' });
  doc.moveDown(1);
  
  doc.fontSize(22).fillColor('#667eea').text(admission.name, { align: 'center', underline: true });
  doc.moveDown(1);
  
  doc.fontSize(14).fillColor('#333').text('has been successfully admitted to', { align: 'center' });
  doc.moveDown(1);
  
  doc.fontSize(18).fillColor('#667eea').text(admission.course, { align: 'center', underline: true });
  doc.moveDown(2);
  
  // Details Box
  doc.rect(100, doc.y, 395, 200).stroke();
  doc.moveDown(0.5);
  
  doc.fontSize(12).fillColor('#666').text('Student ID:', 120, doc.y + 10);
  doc.fontSize(14).fillColor('#000').text(admission.studentId, 280, doc.y);
  doc.moveDown(1.5);
  
  doc.fontSize(12).fillColor('#666').text('Email:', 120, doc.y);
  doc.fontSize(14).fillColor('#000').text(admission.email, 280, doc.y);
  doc.moveDown(1.5);
  
  doc.fontSize(12).fillColor('#666').text('Phone:', 120, doc.y);
  doc.fontSize(14).fillColor('#000').text(admission.phone, 280, doc.y);
  doc.moveDown(1.5);
  
  doc.fontSize(12).fillColor('#666').text('Date of Birth:', 120, doc.y);
  doc.fontSize(14).fillColor('#000').text(new Date(admission.dateOfBirth).toLocaleDateString(), 280, doc.y);
  doc.moveDown(1.5);
  
  doc.fontSize(12).fillColor('#666').text('Admission Date:', 120, doc.y);
  doc.fontSize(14).fillColor('#000').text(new Date(admission.admissionDate).toLocaleDateString(), 280, doc.y);
  doc.moveDown(1.5);
  
  doc.fontSize(12).fillColor('#666').text('Status:', 120, doc.y);
  doc.fontSize(14).fillColor('#28a745').text(admission.status, 280, doc.y);
  doc.moveDown(3);
  
  // Signature Section
  doc.moveDown(3);
  doc.fontSize(12).fillColor('#333').text('_____________________', 100, doc.y);
  doc.text('_____________________', 350, doc.y);
  doc.moveDown(0.5);
  doc.text('Authorized Signature', 100, doc.y);
  doc.text('Principal Signature', 350, doc.y);
  doc.moveDown(2);
  
  // Footer
  doc.fontSize(10).fillColor('#999').text('This is an official admission certificate issued by the institution.', { align: 'center' });
  
  doc.end();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
