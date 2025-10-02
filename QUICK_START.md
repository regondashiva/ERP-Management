# Quick Start Guide

## 🚀 Getting Started

### Option 1: Easy Start (Windows)
Simply double-click `start.bat` file. It will:
- Install all dependencies automatically
- Start both backend and frontend servers
- Open the application in your browser

### Option 2: Manual Start

1. **Install Dependencies**
```bash
npm install
cd client
npm install
cd ..
```

2. **Start Backend Server**
```bash
npm run server
```
Backend will run on: http://localhost:5000

3. **Start Frontend (in a new terminal)**
```bash
cd client
npm start
```
Frontend will run on: http://localhost:3000

## 🔐 Login Credentials

### Admin Account
- **Email:** admin@college.edu
- **Password:** admin123
- **Access:** Full system access with dashboard statistics

### Staff Account
- **Email:** staff@college.edu
- **Password:** staff123
- **Access:** Manage admissions, fees, hostel, and exams

### Student Account
- **Email:** student@college.edu
- **Password:** student123
- **Access:** View personal records (fees, hostel, exams)

## 📋 Features Overview

### 1. Login & Role-Based Access ✅
- Secure JWT-based authentication
- Three user roles: Admin, Staff, Student
- Role-specific dashboards and permissions

### 2. Admission Module ✅
- Online admission form with validation
- Auto-generated Student IDs (STU001, STU002, etc.)
- Centralized student database
- View all admissions in a table

### 3. Fee Payment Module ✅
- Fee payment processing
- Auto-generated receipt numbers (REC00001, REC00002, etc.)
- Multiple payment methods (Cash, Card, UPI, Net Banking, Cheque)
- Payment history tracking
- Real-time fee collection statistics

### 4. Hostel Module ✅
- Room allocation system
- Real-time occupancy tracking
- 8 rooms with varying capacities (2-3 beds each)
- Visual room availability display
- Prevents double allocation
- Shows current occupants per room

### 5. Examination Module ✅
- Exam record management
- Automatic grade calculation (A+, A, B+, B, C, D, F)
- Percentage calculation
- Multiple exam types (Regular, Mid-Term, Final, Quiz, Assignment)
- Student performance tracking

### 6. Admin Dashboard ✅
- **Total Admissions** - Count of all students
- **Total Fees Collected** - Sum of all payments
- **Hostel Occupancy** - Percentage and bed count
- **Total Exam Records** - Count of all assessments
- **Recent Admissions** - Last 5 admissions
- **Recent Payments** - Last 5 fee payments
- **Auto-refresh** - Updates every 5 seconds

## 🎯 Usage Flow

### For Admin/Staff:

1. **Add a New Student**
   - Go to Admissions → Fill form → Submit
   - Student gets auto-assigned ID and login credentials

2. **Process Fee Payment**
   - Go to Fee Payments → Enter Student ID → Enter amount → Submit
   - Receipt is auto-generated

3. **Allocate Hostel Room**
   - Go to Hostel → Enter Student ID → Select available room → Submit
   - Room occupancy updates automatically

4. **Add Exam Record**
   - Go to Examinations → Enter Student ID → Enter marks → Submit
   - Grade is calculated automatically

### For Students:

1. **View Fee Records**
   - Dashboard shows total fees paid
   - Detailed payment history with receipts

2. **Check Hostel Details**
   - View allocated room number
   - See allocation date and status

3. **View Exam Results**
   - See all exam records with grades
   - View average percentage

## 📁 Project Structure

```
college-management-system/
├── server/
│   ├── index.js              # Express server with all APIs
│   └── data/                 # JSON data storage (auto-created)
│       ├── users.json        # User accounts
│       ├── admissions.json   # Student admissions
│       ├── fees.json         # Fee payments
│       ├── hostel.json       # Hostel data
│       └── exams.json        # Exam records
├── client/
│   ├── public/
│   └── src/
│       ├── components/       # Reusable components
│       │   └── Navbar.js
│       ├── pages/            # Page components
│       │   ├── Login.js
│       │   ├── AdminDashboard.js
│       │   ├── StaffDashboard.js
│       │   ├── StudentDashboard.js
│       │   ├── AdmissionForm.js
│       │   ├── FeePayment.js
│       │   ├── HostelAllocation.js
│       │   └── ExamRecords.js
│       ├── App.js            # Main app with routing
│       ├── api.js            # API service layer
│       └── index.css         # Global styles
├── package.json              # Backend dependencies
├── README.md                 # Detailed documentation
├── QUICK_START.md            # This file
└── start.bat                 # Easy startup script

```

## 🔧 API Endpoints

- `POST /api/login` - User authentication
- `POST /api/admissions` - Create new admission
- `GET /api/admissions` - Get all admissions
- `POST /api/fees` - Process fee payment
- `GET /api/fees` - Get fee records
- `POST /api/hostel` - Allocate hostel room
- `GET /api/hostel` - Get hostel data
- `GET /api/hostel/allocations` - Get allocations
- `POST /api/exams` - Add exam record
- `GET /api/exams` - Get exam records
- `GET /api/dashboard/stats` - Get dashboard statistics

## 💡 Tips

1. **Data Persistence:** All data is stored in JSON files in `server/data/` directory
2. **Auto-refresh:** Admin dashboard auto-refreshes statistics every 5 seconds
3. **Validation:** Forms include client-side and server-side validation
4. **Responsive:** UI works on desktop, tablet, and mobile devices
5. **Error Handling:** Clear error messages for invalid operations

## 🎨 Technology Stack

- **Frontend:** React 18, React Router, Lucide Icons
- **Backend:** Node.js, Express
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Custom CSS with gradients and modern UI
- **Data Storage:** JSON files (easily upgradable to MongoDB/PostgreSQL)

## 🔄 Next Steps (Optional Enhancements)

- Connect to a real database (MongoDB, PostgreSQL)
- Add email notifications for receipts
- Implement password reset functionality
- Add file upload for student documents
- Generate PDF receipts
- Add charts and graphs for analytics
- Implement search and filter functionality
- Add export to Excel/CSV features

## ❓ Troubleshooting

**Port already in use:**
- Backend: Change PORT in `server/index.js`
- Frontend: Set PORT environment variable

**Dependencies not installing:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**CORS errors:**
- Ensure backend is running on port 5000
- Check CORS configuration in `server/index.js`

## 📞 Support

For issues or questions, check the console logs in:
- Browser Developer Tools (F12) for frontend errors
- Terminal/Command Prompt for backend errors

---

**Enjoy using the College Management System! 🎓**
