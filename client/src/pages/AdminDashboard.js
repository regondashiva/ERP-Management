import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Users, DollarSign, Building, FileText, TrendingUp, Calendar } from 'lucide-react';
import { getDashboardStats } from '../api';
import AdmissionForm from './AdmissionForm';
import FeePayment from './FeePayment';
import HostelAllocation from './HostelAllocation';
import ExamRecords from './ExamRecords';

function AdminDashboard({ user, onLogout }) {
  return (
    <div>
      <Navbar user={user} onLogout={onLogout} basePath="/admin" />
      <div className="container">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/admissions" element={<AdmissionForm />} />
          <Route path="/fees" element={<FeePayment />} />
          <Route path="/hostel" element={<HostelAllocation />} />
          <Route path="/exams" element={<ExamRecords />} />
        </Routes>
      </div>
    </div>
  );
}

function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
          Admin Dashboard
        </h1>
        <p style={{ color: '#666' }}>
          Welcome back! Here's an overview of your college management system.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-4" style={{ marginBottom: '30px' }}>
        <div className="card" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', opacity: 0.9 }}>Total Admissions</h3>
            <Users size={24} />
          </div>
          <p style={{ fontSize: '36px', fontWeight: '700' }}>
            {stats?.totalAdmissions || 0}
          </p>
          <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>
            <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Active students
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', opacity: 0.9 }}>Fees Collected</h3>
            <DollarSign size={24} />
          </div>
          <p style={{ fontSize: '36px', fontWeight: '700' }}>
            ₹{stats?.totalFeesCollected?.toLocaleString() || 0}
          </p>
          <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>
            <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Total revenue
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', opacity: 0.9 }}>Hostel Occupancy</h3>
            <Building size={24} />
          </div>
          <p style={{ fontSize: '36px', fontWeight: '700' }}>
            {stats?.hostelOccupancy?.percentage || 0}%
          </p>
          <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>
            {stats?.hostelOccupancy?.occupied || 0} / {stats?.hostelOccupancy?.capacity || 0} beds
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', opacity: 0.9 }}>Exam Records</h3>
            <FileText size={24} />
          </div>
          <p style={{ fontSize: '36px', fontWeight: '700' }}>
            {stats?.totalExamRecords || 0}
          </p>
          <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Total assessments
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-2">
        <div className="card">
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
            Recent Admissions
          </h3>
          {stats?.recentAdmissions?.length > 0 ? (
            <div>
              {stats.recentAdmissions.map((admission) => (
                <div key={admission.id} style={{
                  padding: '12px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                        {admission.name}
                      </p>
                      <p style={{ fontSize: '12px', color: '#666' }}>
                        {admission.course} • {admission.studentId}
                      </p>
                    </div>
                    <span className="badge badge-success">
                      {admission.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
              No recent admissions
            </p>
          )}
        </div>

        <div className="card">
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
            Recent Payments
          </h3>
          {stats?.recentPayments?.length > 0 ? (
            <div>
              {stats.recentPayments.map((payment) => (
                <div key={payment.id} style={{
                  padding: '12px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                        {payment.studentName}
                      </p>
                      <p style={{ fontSize: '12px', color: '#666' }}>
                        {payment.description} • {payment.receiptNumber}
                      </p>
                    </div>
                    <span style={{ fontWeight: '700', color: '#11998e' }}>
                      ₹{payment.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
              No recent payments
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
