# 🏗️ System Architecture - College Management System

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
│                     (React Frontend)                        │
│                   http://localhost:3000                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    Login     │  │    Admin     │  │    Staff     │    │
│  │     Page     │  │  Dashboard   │  │  Dashboard   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Student    │  │  Admissions  │  │     Fees     │    │
│  │  Dashboard   │  │    Module    │  │    Module    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                       │
│  │    Hostel    │  │     Exam     │                       │
│  │    Module    │  │    Module    │                       │
│  └──────────────┘  └──────────────┘                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS (Axios)
                            │ REST API Calls
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        SERVER SIDE                          │
│                   (Node.js + Express)                       │
│                   http://localhost:5000                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Authentication Middleware                   │  │
│  │              (JWT Token Verification)                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                │
│  ┌─────────────────────────┴────────────────────────────┐  │
│  │                  API Routes                           │  │
│  │                                                       │  │
│  │  • POST /api/login                                   │  │
│  │  • POST /api/admissions                              │  │
│  │  • GET  /api/admissions                              │  │
│  │  • POST /api/fees                                    │  │
│  │  • GET  /api/fees                                    │  │
│  │  • POST /api/hostel                                  │  │
│  │  • GET  /api/hostel                                  │  │
│  │  • GET  /api/hostel/allocations                      │  │
│  │  • POST /api/exams                                   │  │
│  │  • GET  /api/exams                                   │  │
│  │  • GET  /api/dashboard/stats                         │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                │
└────────────────────────────┼────────────────────────────────┘
                            │
                            │ File I/O (fs module)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA STORAGE                           │
│                    (JSON Files)                             │
│                   server/data/                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  users.json  │  │admissions.json│ │  fees.json   │    │
│  │              │  │              │  │              │    │
│  │ • User       │  │ • Student    │  │ • Payment    │    │
│  │   accounts   │  │   records    │  │   records    │    │
│  │ • Passwords  │  │ • Courses    │  │ • Receipts   │    │
│  │ • Roles      │  │ • Details    │  │ • Amounts    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                       │
│  │ hostel.json  │  │  exams.json  │                       │
│  │              │  │              │                       │
│  │ • Rooms      │  │ • Exam       │                       │
│  │ • Allocations│  │   records    │                       │
│  │ • Occupancy  │  │ • Grades     │                       │
│  └──────────────┘  └──────────────┘                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
┌──────────┐
│  User    │
│  Login   │
└────┬─────┘
     │
     │ 1. POST /api/login
     │    { email, password }
     ▼
┌──────────────────┐
│  Backend Server  │
│                  │
│  2. Verify       │──────┐
│     credentials  │      │ 3. Read users.json
│                  │◄─────┘
│  4. Compare      │
│     password     │
│     (bcrypt)     │
│                  │
│  5. Generate     │
│     JWT token    │
└────┬─────────────┘
     │
     │ 6. Return token + user data
     │    { token, user: { id, email, role, name } }
     ▼
┌──────────────────┐
│  Frontend        │
│                  │
│  7. Store token  │
│     in localStorage
│                  │
│  8. Store user   │
│     data in state│
│                  │
│  9. Redirect to  │
│     role-based   │
│     dashboard    │
└──────────────────┘
```

---

## 🔄 Data Flow - Example: Adding Admission

```
┌─────────────────┐
│  Admin/Staff    │
│  Fills Form     │
└────────┬────────┘
         │
         │ 1. User submits form
         ▼
┌─────────────────────────────┐
│  AdmissionForm Component    │
│                             │
│  2. Validate form data      │
│  3. Call createAdmission()  │
└────────┬────────────────────┘
         │
         │ 4. POST /api/admissions
         │    Headers: { Authorization: Bearer <token> }
         │    Body: { name, email, course, phone, ... }
         ▼
┌─────────────────────────────────────────┐
│  Backend Server                         │
│                                         │
│  5. authenticateToken middleware        │
│     • Verify JWT token                  │
│     • Extract user info                 │
│                                         │
│  6. POST /api/admissions handler        │
│     • Read admissions.json              │
│     • Generate Student ID (STU001)      │
│     • Create admission record           │
│     • Save to admissions.json           │
│     • Create user account               │
│     • Save to users.json                │
│                                         │
│  7. Return success response             │
│     { success: true, admission: {...} } │
└────────┬────────────────────────────────┘
         │
         │ 8. Response received
         ▼
┌─────────────────────────────┐
│  AdmissionForm Component    │
│                             │
│  9. Display success message │
│  10. Clear form             │
│  11. Reload admissions list │
└─────────────────────────────┘
```

---

## 🗂️ Component Hierarchy

```
App.js (Root)
│
├── Router
│   │
│   ├── /login
│   │   └── Login.js
│   │
│   ├── /admin/*
│   │   ├── Navbar.js
│   │   └── AdminDashboard.js
│   │       ├── / (Dashboard Home)
│   │       ├── /admissions → AdmissionForm.js
│   │       ├── /fees → FeePayment.js
│   │       ├── /hostel → HostelAllocation.js
│   │       └── /exams → ExamRecords.js
│   │
│   ├── /staff/*
│   │   ├── Navbar.js
│   │   └── StaffDashboard.js
│   │       ├── / (Dashboard Home)
│   │       ├── /admissions → AdmissionForm.js
│   │       ├── /fees → FeePayment.js
│   │       ├── /hostel → HostelAllocation.js
│   │       └── /exams → ExamRecords.js
│   │
│   └── /student/*
│       ├── Navbar.js
│       └── StudentDashboard.js
│           ├── / (Dashboard Home)
│           ├── /fees → StudentFees Component
│           ├── /hostel → StudentHostel Component
│           └── /exams → StudentExams Component
```

---

## 🔌 API Architecture

### Request/Response Pattern

```
┌──────────────┐
│   Frontend   │
│   Component  │
└──────┬───────┘
       │
       │ 1. Import API function
       │    import { createAdmission } from '../api'
       │
       │ 2. Call API function
       │    const response = await createAdmission(data)
       ▼
┌──────────────────┐
│    api.js        │
│  (Service Layer) │
│                  │
│  3. Axios call   │
│     with token   │
└──────┬───────────┘
       │
       │ 4. HTTP Request
       │    POST http://localhost:5000/api/admissions
       │    Headers: { Authorization: Bearer <token> }
       │    Body: JSON data
       ▼
┌──────────────────────┐
│  Express Server      │
│                      │
│  5. CORS middleware  │
│  6. Body parser      │
│  7. Auth middleware  │
│  8. Route handler    │
└──────┬───────────────┘
       │
       │ 9. HTTP Response
       │    Status: 200 OK
       │    Body: { success: true, data: {...} }
       ▼
┌──────────────────┐
│    api.js        │
│                  │
│  10. Return data │
└──────┬───────────┘
       │
       │ 11. Response data
       ▼
┌──────────────┐
│   Frontend   │
│   Component  │
│              │
│  12. Update  │
│      state   │
│  13. Re-render│
└──────────────┘
```

---

## 🎭 Role-Based Access Control

```
┌─────────────────────────────────────────────────────────┐
│                    User Roles                           │
└─────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    ADMIN     │     │    STAFF     │     │   STUDENT    │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                     │
       │                    │                     │
       ▼                    ▼                     ▼

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Dashboard    │     │ Dashboard    │     │ Dashboard    │
│ • Statistics │     │ • Quick      │     │ • Personal   │
│ • Analytics  │     │   Links      │     │   Stats      │
│ • Recent     │     │              │     │              │
│   Activity   │     │              │     │              │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                     │
       ▼                    ▼                     ▼

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Admissions   │     │ Admissions   │     │   My Fees    │
│ • Create     │     │ • Create     │     │ • View only  │
│ • View All   │     │ • View All   │     │              │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                     │
       ▼                    ▼                     ▼

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Fee Payments │     │ Fee Payments │     │  My Hostel   │
│ • Process    │     │ • Process    │     │ • View only  │
│ • View All   │     │ • View All   │     │              │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                     │
       ▼                    ▼                     ▼

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Hostel Mgmt  │     │ Hostel Mgmt  │     │  My Exams    │
│ • Allocate   │     │ • Allocate   │     │ • View only  │
│ • View All   │     │ • View All   │     │              │
└──────┬───────┘     └──────┬───────┘     └──────────────┘
       │                    │
       ▼                    ▼

┌──────────────┐     ┌──────────────┐
│ Examinations │     │ Examinations │
│ • Add Record │     │ • Add Record │
│ • View All   │     │ • View All   │
└──────────────┘     └──────────────┘
```

---

## 💾 Data Models

### User Model
```javascript
{
  id: String (UUID),
  email: String (unique),
  password: String (bcrypt hashed),
  role: Enum ['admin', 'staff', 'student'],
  name: String,
  studentId: String (optional, for students only)
}
```

### Admission Model
```javascript
{
  id: String (UUID),
  studentId: String (auto-generated: STU001, STU002...),
  name: String,
  email: String,
  course: String,
  phone: String,
  address: String,
  dateOfBirth: Date,
  admissionDate: ISO Timestamp,
  status: String (default: 'Admitted')
}
```

### Fee Payment Model
```javascript
{
  id: String (UUID),
  receiptNumber: String (auto-generated: REC00001...),
  studentId: String (foreign key),
  studentName: String,
  amount: Number,
  paymentMethod: Enum ['Cash', 'Card', 'UPI', 'Net Banking', 'Cheque'],
  description: String,
  paymentDate: ISO Timestamp,
  status: String (default: 'Paid')
}
```

### Hostel Model
```javascript
{
  rooms: [
    {
      roomNumber: String,
      capacity: Number,
      occupied: Number,
      students: [
        {
          studentId: String,
          studentName: String
        }
      ]
    }
  ],
  allocations: [
    {
      id: String (UUID),
      studentId: String (foreign key),
      studentName: String,
      roomNumber: String,
      allocationDate: ISO Timestamp,
      status: String (default: 'Active')
    }
  ]
}
```

### Exam Model
```javascript
{
  id: String (UUID),
  studentId: String (foreign key),
  studentName: String,
  subject: String,
  marks: Number,
  maxMarks: Number,
  percentage: String (calculated),
  examDate: ISO Timestamp,
  examType: Enum ['Regular', 'Mid-Term', 'Final', 'Quiz', 'Assignment'],
  grade: String (auto-calculated: A+, A, B+, B, C, D, F)
}
```

---

## 🔒 Security Features

```
┌─────────────────────────────────────────────────────────┐
│                  Security Layers                        │
└─────────────────────────────────────────────────────────┘

1. Password Security
   ├── bcrypt hashing (10 rounds)
   ├── No plain text storage
   └── Secure comparison

2. Authentication
   ├── JWT tokens
   ├── 24-hour expiration
   ├── Token verification on each request
   └── Secure secret key

3. Authorization
   ├── Role-based access control
   ├── Protected routes
   ├── Middleware validation
   └── Frontend route guards

4. Data Validation
   ├── Client-side form validation
   ├── Server-side validation
   ├── Type checking
   └── Required field enforcement

5. CORS Protection
   ├── Configured origins
   ├── Credential support
   └── Method restrictions
```

---

## 📡 State Management

```
┌─────────────────────────────────────────────────────────┐
│              React State Management                     │
└─────────────────────────────────────────────────────────┘

App.js (Root Level)
├── user: Object | null
│   ├── Stored in localStorage
│   ├── Persists across page reloads
│   └── Cleared on logout
│
└── loading: Boolean
    └── Prevents premature rendering

Component Level (e.g., AdmissionForm)
├── formData: Object
│   └── Controlled form inputs
│
├── admissions: Array
│   └── List of all admissions
│
├── message: Object { type, text }
│   └── Success/error alerts
│
├── loading: Boolean
│   └── Submit button state
│
└── showForm: Boolean
    └── Toggle between form/list view
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 Production Deployment                   │
└─────────────────────────────────────────────────────────┘

Frontend (React)
├── Build: npm run build
├── Output: client/build/
├── Deploy to:
│   ├── Netlify
│   ├── Vercel
│   ├── AWS S3 + CloudFront
│   └── GitHub Pages

Backend (Node.js)
├── Deploy to:
│   ├── Heroku
│   ├── AWS EC2
│   ├── DigitalOcean
│   ├── Railway
│   └── Render

Database (Upgrade from JSON)
├── MongoDB Atlas
├── PostgreSQL (Heroku/AWS RDS)
├── MySQL
└── Firebase Firestore

Environment Variables
├── JWT_SECRET
├── DATABASE_URL
├── PORT
└── CORS_ORIGIN
```

---

## 🔄 Future Enhancements Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Potential Additions                        │
└─────────────────────────────────────────────────────────┘

1. Real Database
   └── Replace JSON files with MongoDB/PostgreSQL

2. File Upload
   ├── Student photos
   ├── Documents
   └── AWS S3 / Cloudinary integration

3. Email Service
   ├── Admission confirmation
   ├── Fee receipts
   └── SendGrid / Nodemailer

4. PDF Generation
   ├── Fee receipts
   ├── Admit cards
   └── PDFKit / Puppeteer

5. Analytics Dashboard
   ├── Charts (Chart.js / Recharts)
   ├── Reports
   └── Export to Excel

6. Real-time Updates
   ├── WebSockets (Socket.io)
   ├── Live notifications
   └── Chat support

7. Mobile App
   ├── React Native
   ├── Same backend API
   └── Push notifications
```

---

## 📊 Performance Considerations

```
Current Implementation:
├── JSON file I/O (synchronous)
├── No caching
├── No pagination
└── Client-side filtering

Optimization Opportunities:
├── Database indexing
├── Redis caching
├── Server-side pagination
├── Lazy loading
├── Code splitting
├── Image optimization
└── CDN for static assets
```

---

This architecture document provides a comprehensive overview of the College Management System's structure, data flow, and design patterns. The system is built with scalability and maintainability in mind, making it easy to extend and enhance in the future.
