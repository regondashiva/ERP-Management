# College Management System

A comprehensive college management system with role-based access control.

## Features

- **Login & Role-Based Access**: Student, Staff, and Admin roles with dedicated dashboards
- **Admission Module**: Online admission form with centralized student database
- **Fee Payment Module**: Fee payment processing with auto-generated receipts
- **Hostel Module**: Hostel allocation with real-time occupancy tracking
- **Examination Module**: Exam record management and grade tracking
- **Admin Dashboard**: Real-time statistics and analytics
- **PDF Downloads**: Downloadable fee receipts and admission certificates (NEW!)

## Tech Stack

- **Frontend**: React, TailwindCSS, Lucide Icons
- **Backend**: Node.js, Express
- **Data Storage**: JSON-based file storage (easily adaptable to databases)

## Installation

1. Install all dependencies:
```bash
npm run install-all
```

2. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## Default Login Credentials

### Admin
- Email: admin@college.edu
- Password: admin123

### Staff
- Email: staff@college.edu
- Password: staff123

### Student
- Email: student@college.edu
- Password: student123

## Project Structure

```
college-management-system/
├── server/
│   ├── index.js          # Express server
│   ├── auth.js           # Authentication middleware
│   ├── routes/           # API routes
│   └── data/             # JSON data storage
├── client/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main app component
│   └── package.json
└── package.json
```

## API Endpoints

- `POST /api/login` - User authentication
- `POST /api/admissions` - Create admission
- `GET /api/admissions` - Get all admissions
- `GET /api/admissions/certificate/:studentId` - Download admission certificate PDF
- `POST /api/fees` - Process fee payment
- `GET /api/fees` - Get fee records
- `GET /api/fees/receipt/:receiptNumber` - Download fee receipt PDF
- `POST /api/hostel` - Allocate hostel room
- `GET /api/hostel` - Get hostel data
- `POST /api/exams` - Add exam record
- `GET /api/exams` - Get exam records
- `GET /api/dashboard/stats` - Get dashboard statistics
