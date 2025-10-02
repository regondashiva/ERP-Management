import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AdminDashboard from './AdminDashboard';
import AdmissionForm from './AdmissionForm';
import FeePayment from './FeePayment';
import HostelAllocation from './HostelAllocation';
import ExamRecords from './ExamRecords';

function StaffDashboard({ user, onLogout }) {
  return (
    <div>
      <Navbar user={user} onLogout={onLogout} basePath="/staff" />
      <div className="container">
        <Routes>
          <Route path="/" element={<StaffHome />} />
          <Route path="/admissions" element={<AdmissionForm />} />
          <Route path="/fees" element={<FeePayment />} />
          <Route path="/hostel" element={<HostelAllocation />} />
          <Route path="/exams" element={<ExamRecords />} />
        </Routes>
      </div>
    </div>
  );
}

function StaffHome() {
  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
          Staff Dashboard
        </h1>
        <p style={{ color: '#666' }}>
          Manage student admissions, fees, hostel allocations, and examination records.
        </p>
      </div>

      <div className="grid grid-2">
        <div className="card" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          cursor: 'pointer'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
            Admissions
          </h3>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            Process new student admissions and manage student records.
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          color: 'white',
          cursor: 'pointer'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
            Fee Payments
          </h3>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            Record fee payments and generate receipts for students.
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          cursor: 'pointer'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
            Hostel Management
          </h3>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            Allocate hostel rooms and track occupancy status.
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          color: 'white',
          cursor: 'pointer'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
            Examinations
          </h3>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            Enter exam marks and manage student assessment records.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
