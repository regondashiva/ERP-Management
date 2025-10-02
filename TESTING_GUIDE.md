# 🧪 Testing Guide - College Management System

This guide will help you test all features of the College Management System.

---

## 🚀 Step 1: Start the Application

1. Double-click `start.bat` (or run `npm run dev`)
2. Wait for both servers to start
3. Browser should automatically open to http://localhost:3000

---

## 🔐 Step 2: Test Login & Authentication

### Test Admin Login
1. Click "Admin" quick login button (or enter credentials manually)
   - Email: `admin@college.edu`
   - Password: `admin123`
2. Click "Sign In"
3. ✅ **Expected:** Redirected to Admin Dashboard with statistics

### Test Staff Login
1. Logout from Admin account
2. Click "Staff" quick login button
   - Email: `staff@college.edu`
   - Password: `staff123`
3. ✅ **Expected:** Redirected to Staff Dashboard

### Test Student Login
1. Logout from Staff account
2. Click "Student" quick login button
   - Email: `student@college.edu`
   - Password: `student123`
3. ✅ **Expected:** Redirected to Student Dashboard with personal info

### Test Invalid Login
1. Logout
2. Enter wrong credentials
3. ✅ **Expected:** Error message displayed

---

## 📝 Step 3: Test Admission Module

**Login as:** Admin or Staff

### Create New Admission
1. Navigate to "Admissions" from navbar
2. Fill the form:
   - Name: `John Smith`
   - Email: `john.smith@student.edu`
   - Course: `B.Tech Computer Science`
   - Phone: `9876543210`
   - Date of Birth: `2002-05-15`
   - Address: `123 Main Street, City`
3. Click "Submit Admission"
4. ✅ **Expected:** 
   - Success message with Student ID (e.g., STU001)
   - Form clears
   - New student added to database

### View All Admissions
1. Click "View All Admissions" button
2. ✅ **Expected:** 
   - Table showing all admitted students
   - Student ID, Name, Email, Course, Phone, Date, Status

### Create Multiple Admissions
1. Add 2-3 more students with different courses
2. ✅ **Expected:** Each gets unique Student ID (STU002, STU003, etc.)

---

## 💰 Step 4: Test Fee Payment Module

**Login as:** Admin or Staff

### Process Fee Payment
1. Navigate to "Fee Payments" from navbar
2. Fill the form:
   - Student ID: `STU001` (from previous test)
   - Amount: `50000`
   - Payment Method: `UPI`
   - Description: `Tuition Fee`
3. Click "Process Payment"
4. ✅ **Expected:**
   - Success message with Receipt Number (REC00001)
   - Form clears

### Test Invalid Student ID
1. Enter Student ID: `STU999` (non-existent)
2. Enter Amount: `10000`
3. Click "Process Payment"
4. ✅ **Expected:** Error message "Student not found"

### View All Payments
1. Click "View All Payments" button
2. ✅ **Expected:**
   - Total fees collected displayed at top
   - Table with all payment records
   - Receipt numbers, student details, amounts

### Process Multiple Payments
1. Add payments for different students
2. Try different payment methods (Cash, Card, Cheque)
3. ✅ **Expected:** Total fees collected updates

---

## 🏠 Step 5: Test Hostel Module

**Login as:** Admin or Staff

### Check Initial State
1. Navigate to "Hostel" from navbar
2. ✅ **Expected:**
   - Total Capacity: 20 beds
   - Occupied: 0
   - Occupancy: 0%

### Allocate First Room
1. Fill the form:
   - Student ID: `STU001`
   - Room Number: `101`
2. Click "Allocate Room"
3. ✅ **Expected:**
   - Success message
   - Occupancy updates to 5% (1/20)

### View Room Status
1. Click "View Rooms" button
2. ✅ **Expected:**
   - Room 101 shows 1/2 occupied
   - Student name displayed in room card
   - Room 101 marked as "1 Available"

### Test Room Full Scenario
1. Allocate another student to Room 101
2. Try to allocate a third student to Room 101
3. ✅ **Expected:** Error "Room is full"

### Test Double Allocation Prevention
1. Try to allocate STU001 to another room
2. ✅ **Expected:** Error "Student already has a room allocated"

### Allocate Multiple Rooms
1. Allocate students to different rooms (102, 103, 104)
2. ✅ **Expected:**
   - Occupancy percentage increases
   - Each room shows correct occupied count
   - Allocation table shows all allocations

---

## 📊 Step 6: Test Examination Module

**Login as:** Admin or Staff

### Add Exam Record
1. Navigate to "Examinations" from navbar
2. Fill the form:
   - Student ID: `STU001`
   - Subject: `Mathematics`
   - Marks Obtained: `85`
   - Maximum Marks: `100`
   - Exam Date: (today's date)
   - Exam Type: `Mid-Term`
3. Click "Add Exam Record"
4. ✅ **Expected:**
   - Success message with Grade (should be "A")
   - Percentage calculated as 85%

### Test Grade Calculation
Add multiple exams with different marks:
- 95/100 → ✅ Grade: A+ (90-100%)
- 75/100 → ✅ Grade: B+ (70-79%)
- 55/100 → ✅ Grade: C (50-59%)
- 35/100 → ✅ Grade: F (below 40%)

### View All Exam Records
1. Click "View All Records" button
2. ✅ **Expected:**
   - Table with all exam records
   - Marks, percentage, grade, exam type
   - Color-coded grade badges

### Add Exams for Multiple Students
1. Add exam records for STU002, STU003
2. Try different subjects (Physics, Chemistry, Computer Science)
3. ✅ **Expected:** All records stored and displayed

---

## 📈 Step 7: Test Admin Dashboard

**Login as:** Admin

### Check Statistics Cards
1. Go to Admin Dashboard (home page)
2. ✅ **Expected to see:**
   - **Total Admissions:** Count of students added
   - **Total Fees Collected:** Sum of all payments (₹)
   - **Hostel Occupancy:** Percentage and beds used/total
   - **Total Exam Records:** Count of exam entries

### Verify Recent Activity
1. Scroll down to Recent Admissions section
2. ✅ **Expected:** Last 5 admissions displayed with details

3. Check Recent Payments section
4. ✅ **Expected:** Last 5 payments with amounts

### Test Auto-Refresh
1. Keep dashboard open
2. Open another browser tab
3. Add a new admission or payment in the new tab
4. Switch back to dashboard tab
5. ✅ **Expected:** Statistics update within 5 seconds (auto-refresh)

---

## 👨‍🎓 Step 8: Test Student Dashboard

**Login as:** Student (student@college.edu / student123)

### Check Personal Statistics
1. View dashboard home page
2. ✅ **Expected to see:**
   - Student ID: STU001
   - Total Fees Paid: (sum of your payments)
   - Hostel Room: (if allocated)
   - Average Score: (if exams recorded)

### View Fee Records
1. Click "My Fees" from navbar
2. ✅ **Expected:**
   - Total fees paid card at top
   - Table with all your payment records
   - Receipt numbers, amounts, dates

### View Hostel Information
1. Click "My Hostel" from navbar
2. ✅ **Expected (if allocated):**
   - Room number displayed
   - Allocation date
   - Status: Active
3. ✅ **Expected (if not allocated):**
   - "No Hostel Allocated" message

### View Exam Results
1. Click "My Exams" from navbar
2. ✅ **Expected:**
   - Average percentage card at top
   - Table with all exam records
   - Subjects, marks, grades, percentages

---

## 🔄 Step 9: Test Navigation & Routing

### Test Role-Based Navigation
1. Login as Admin
2. ✅ **Expected:** See Dashboard, Admissions, Fee Payments, Hostel, Examinations

3. Login as Student
4. ✅ **Expected:** See Dashboard, My Fees, My Hostel, My Exams (no admin options)

### Test Active Page Highlighting
1. Click through different pages
2. ✅ **Expected:** Current page highlighted in navbar

### Test Direct URL Access
1. While logged in as Student, try accessing: http://localhost:3000/admin
2. ✅ **Expected:** Redirected to /login (unauthorized access prevented)

---

## 🎨 Step 10: Test UI/UX Features

### Test Responsive Design
1. Resize browser window
2. ✅ **Expected:** Layout adapts to different screen sizes

### Test Form Validation
1. Try submitting empty forms
2. ✅ **Expected:** Browser validation messages

3. Try invalid email format
4. ✅ **Expected:** Email validation error

### Test Loading States
1. Submit a form
2. ✅ **Expected:** Button shows "Processing..." and is disabled

### Test Success/Error Messages
1. Perform valid operation
2. ✅ **Expected:** Green success alert appears

3. Perform invalid operation
4. ✅ **Expected:** Red error alert appears

### Test Toggle Views
1. On any module page, click toggle button
2. ✅ **Expected:** Switches between form view and list view

---

## 🔍 Step 11: Test Data Persistence

### Verify Data Storage
1. Add some admissions, fees, hostel allocations, and exams
2. Stop the server (Ctrl+C in terminal)
3. Restart the server
4. Login again
5. ✅ **Expected:** All data is still present

### Check Data Files
1. Navigate to `server/data/` folder
2. ✅ **Expected to see:**
   - `users.json`
   - `admissions.json`
   - `fees.json`
   - `hostel.json`
   - `exams.json`

3. Open any file in text editor
4. ✅ **Expected:** JSON formatted data with your entries

---

## 🧩 Step 12: Test Complete Workflow

### End-to-End Test Scenario

**Scenario:** New student admission to exam results

1. **Login as Staff**
   - Email: staff@college.edu
   - Password: staff123

2. **Admit New Student**
   - Go to Admissions
   - Add student: "Alice Johnson", alice@student.edu, "BCA"
   - Note the Student ID (e.g., STU004)

3. **Process Fee Payment**
   - Go to Fee Payments
   - Student ID: STU004
   - Amount: 45000
   - Payment Method: Card
   - Description: Tuition Fee
   - Note Receipt Number

4. **Allocate Hostel**
   - Go to Hostel
   - Student ID: STU004
   - Room: Select any available room
   - Verify occupancy updates

5. **Add Exam Records**
   - Go to Examinations
   - Add 3 exams for STU004:
     - Math: 88/100
     - Physics: 92/100
     - Chemistry: 85/100

6. **Check Admin Dashboard**
   - Logout and login as Admin
   - Verify all statistics updated:
     - Total Admissions increased
     - Total Fees increased by 45000
     - Hostel Occupancy increased
     - Exam Records increased by 3
   - Check Recent Admissions (Alice should appear)
   - Check Recent Payments (45000 payment should appear)

7. **Login as New Student**
   - Logout
   - Login with: alice@student.edu / student123
   - ✅ **Expected:** See all personal data:
     - Student ID: STU004
     - Total Fees: ₹45,000
     - Hostel Room: (allocated room)
     - Average Score: 88.33%

---

## ✅ Testing Checklist

Use this checklist to track your testing:

- [ ] Admin login works
- [ ] Staff login works
- [ ] Student login works
- [ ] Invalid login shows error
- [ ] Create admission with auto Student ID
- [ ] View all admissions
- [ ] Process fee payment with auto Receipt Number
- [ ] View all payments with total
- [ ] Invalid student ID shows error
- [ ] Allocate hostel room
- [ ] Occupancy updates in real-time
- [ ] Room full prevention works
- [ ] Double allocation prevention works
- [ ] View room availability
- [ ] Add exam record with auto grade
- [ ] Grade calculation correct
- [ ] View all exam records
- [ ] Admin dashboard shows correct stats
- [ ] Dashboard auto-refreshes
- [ ] Recent activity displays
- [ ] Student can view own fees
- [ ] Student can view own hostel
- [ ] Student can view own exams
- [ ] Role-based navigation works
- [ ] Unauthorized access prevented
- [ ] Forms validate correctly
- [ ] Success/error messages display
- [ ] Data persists after restart
- [ ] Complete workflow works end-to-end

---

## 🐛 Common Issues & Solutions

### Issue: Port already in use
**Solution:** 
- Change backend port in `server/index.js` (line 7)
- Change frontend port: `set PORT=3001 && npm start`

### Issue: Cannot connect to backend
**Solution:**
- Ensure backend is running on port 5000
- Check `client/src/api.js` has correct URL

### Issue: Data not persisting
**Solution:**
- Check `server/data/` folder exists
- Ensure write permissions on folder

### Issue: Login not working
**Solution:**
- Clear browser localStorage
- Check browser console for errors
- Verify backend is running

---

## 📊 Expected Test Results Summary

After completing all tests, you should have:

- ✅ 3+ student admissions (STU001, STU002, STU003, STU004)
- ✅ 3+ fee payments with receipts
- ✅ 3+ hostel allocations
- ✅ 5+ exam records
- ✅ Dashboard showing accurate statistics
- ✅ All data persisted in JSON files
- ✅ All three user roles working correctly

---

## 🎉 Testing Complete!

If all tests pass, your College Management System is fully functional and ready for production use!

**Next Steps:**
- Deploy to a server
- Connect to a real database
- Add more features as needed
- Customize for your specific requirements

**Happy Testing! 🚀**
