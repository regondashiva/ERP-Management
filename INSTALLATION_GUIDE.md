# 🚀 Installation Guide - College Management System with PDF Downloads

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge, Safari)

---

## 🔧 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd c:/Users/shiva/OneDrive/Desktop/sih2
```

### Step 2: Install Backend Dependencies

```bash
npm install
```

This will install all backend dependencies including:
- express
- cors
- body-parser
- jsonwebtoken
- bcryptjs
- uuid
- **pdfkit** (for PDF generation)

### Step 3: Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

This will install all frontend dependencies including:
- react
- react-dom
- react-router-dom
- axios
- lucide-react

---

## 🚀 Running the Application

### Option 1: Easy Start (Recommended)

**Windows:**
```bash
# Double-click the start.bat file
# OR run in terminal:
.\start.bat
```

This will:
1. Check and install dependencies if needed
2. Start the backend server
3. Start the frontend
4. Open your browser automatically

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
npm run server
```
Backend will run on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
Frontend will run on: http://localhost:3000

---

## 🔐 First Login

Once the application is running, open your browser to:
```
http://localhost:3000
```

### Default Credentials:

**Admin Account:**
- Email: `admin@college.edu`
- Password: `admin123`
- Access: Full system access + analytics

**Staff Account:**
- Email: `staff@college.edu`
- Password: `staff123`
- Access: Manage all modules

**Student Account:**
- Email: `student@college.edu`
- Password: `student123`
- Access: View personal records

---

## ✅ Verify Installation

### Check Backend:
1. Open browser to: http://localhost:5000
2. You should see: "Cannot GET /" (this is normal)
3. Backend is running correctly!

### Check Frontend:
1. Open browser to: http://localhost:3000
2. You should see the login page
3. Frontend is running correctly!

### Test PDF Feature:
1. Login as Admin or Staff
2. Go to Fee Payments
3. Add a test payment
4. Click "View All Payments"
5. Click "PDF" button
6. PDF should download! ✅

---

## 📦 Project Structure After Installation

```
sih2/
├── node_modules/              ← Backend dependencies (installed)
├── server/
│   ├── index.js
│   └── data/                  ← Auto-created on first run
│       ├── users.json
│       ├── admissions.json
│       ├── fees.json
│       ├── hostel.json
│       └── exams.json
├── client/
│   ├── node_modules/          ← Frontend dependencies (installed)
│   ├── src/
│   └── package.json
├── package.json
├── package-lock.json          ← Created after npm install
└── start.bat
```

---

## 🔍 Troubleshooting

### Issue: "npm is not recognized"
**Solution:**
- Install Node.js from https://nodejs.org/
- Restart your terminal/command prompt
- Verify: `node --version` and `npm --version`

### Issue: "Port 5000 already in use"
**Solution:**
- Find and stop the process using port 5000
- OR change the port in `server/index.js` (line 11):
  ```javascript
  const PORT = 5001; // Change to any available port
  ```

### Issue: "Port 3000 already in use"
**Solution:**
- When prompted, type `Y` to use a different port
- OR stop the process using port 3000

### Issue: "Cannot find module 'pdfkit'"
**Solution:**
```bash
npm install pdfkit
```

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Issue: Frontend won't start
**Solution:**
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: PDF not downloading
**Solution:**
1. Verify pdfkit is installed: `npm list pdfkit`
2. Restart the backend server
3. Clear browser cache
4. Try in a different browser

---

## 🎯 Quick Test Workflow

After installation, test all features:

### 1. Test Login
- [x] Login as Admin
- [x] Login as Staff
- [x] Login as Student

### 2. Test Admission Module
- [x] Add a new student admission
- [x] View all admissions
- [x] Download admission certificate PDF

### 3. Test Fee Payment Module
- [x] Process a fee payment
- [x] View all payments
- [x] Download fee receipt PDF

### 4. Test Hostel Module
- [x] Allocate a hostel room
- [x] View room occupancy
- [x] Check real-time updates

### 5. Test Examination Module
- [x] Add exam records
- [x] View automatic grading
- [x] Check grade calculation

### 6. Test Admin Dashboard
- [x] View statistics cards
- [x] Check recent activity
- [x] Verify auto-refresh

### 7. Test Student Dashboard
- [x] View personal statistics
- [x] Download fee receipts
- [x] Download admission certificate

---

## 📊 System Requirements

### Minimum Requirements:
- **OS**: Windows 10, macOS 10.14+, or Linux
- **RAM**: 4 GB
- **Storage**: 500 MB free space
- **Browser**: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+

### Recommended Requirements:
- **OS**: Windows 11, macOS 12+, or Ubuntu 20.04+
- **RAM**: 8 GB
- **Storage**: 1 GB free space
- **Browser**: Latest version of Chrome, Firefox, or Edge

---

## 🔄 Updating the Application

If you make changes to the code:

### Backend Changes:
```bash
# Restart the backend server
# Press Ctrl+C to stop
npm run server
```

### Frontend Changes:
```bash
# Frontend auto-reloads on save
# If not, restart:
cd client
npm start
```

### Dependency Changes:
```bash
# If package.json changes
npm install
cd client
npm install
cd ..
```

---

## 📝 Environment Variables (Optional)

Create a `.env` file in the root directory for custom configuration:

```env
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

---

## 🎉 Installation Complete!

You're all set! Your College Management System is now running with:

✅ Backend API on port 5000  
✅ Frontend on port 3000  
✅ PDF download feature enabled  
✅ All modules working  
✅ Sample data loaded  

### Next Steps:
1. Login with default credentials
2. Explore all modules
3. Test PDF downloads
4. Add your own data
5. Customize as needed

---

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the error messages in:
   - Backend: Terminal running `npm run server`
   - Frontend: Browser console (F12)
3. Check the documentation files:
   - `README.md` - Main documentation
   - `PDF_DOWNLOAD_FEATURE.md` - PDF feature guide
   - `QUICK_START.md` - Quick start guide

---

## 🔗 Useful Commands

```bash
# Install all dependencies
npm install && cd client && npm install && cd ..

# Start backend only
npm run server

# Start frontend only
cd client && npm start

# Check installed packages
npm list
cd client && npm list

# Update dependencies
npm update
cd client && npm update

# Clean install (if issues)
rm -rf node_modules package-lock.json
npm install
```

---

**Happy coding! 🚀**
