import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { DollarSign, Building, FileText, User, Download } from 'lucide-react';
import { getFees, getHostelAllocations, getExams, downloadFeeReceipt, downloadAdmissionCertificate } from '../api';

function StudentDashboard({ user, onLogout }) {
  return (
    <div>
      <Navbar user={user} onLogout={onLogout} basePath="/student" />
      <div className="container">
        <Routes>
          <Route path="/" element={<StudentHome user={user} />} />
          <Route path="/fees" element={<StudentFees user={user} />} />
          <Route path="/hostel" element={<StudentHostel user={user} />} />
          <Route path="/exams" element={<StudentExams user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

function StudentHome({ user }) {
  const [stats, setStats] = useState({
    totalFees: 0,
    hostelRoom: null,
    examCount: 0,
    averageMarks: 0
  });

  useEffect(() => {
    loadStudentStats();
  }, [user.studentId]);

  const loadStudentStats = async () => {
    try {
      const [feesRes, hostelRes, examsRes] = await Promise.all([
        getFees(user.studentId),
        getHostelAllocations(user.studentId),
        getExams(user.studentId)
      ]);

      const totalFees = feesRes.data.reduce((sum, fee) => sum + fee.amount, 0);
      const avgMarks = examsRes.data.length > 0
        ? (examsRes.data.reduce((sum, exam) => sum + parseFloat(exam.percentage), 0) / examsRes.data.length).toFixed(2)
        : 0;

      setStats({
        totalFees,
        hostelRoom: hostelRes.data,
        examCount: examsRes.data.length,
        averageMarks: avgMarks
      });
    } catch (error) {
      console.error('Error loading student stats:', error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
          Student Dashboard
        </h1>
        <p style={{ color: '#666' }}>
          Welcome, {user.name}! Student ID: {user.studentId}
        </p>
      </div>

      <div className="grid grid-4" style={{ marginBottom: '30px' }}>
        <div className="card" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', opacity: 0.9 }}>Student ID</h3>
            <User size={24} />
          </div>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>
            {user.studentId}
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', opacity: 0.9 }}>Total Fees Paid</h3>
            <DollarSign size={24} />
          </div>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>
            ₹{stats.totalFees.toLocaleString()}
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', opacity: 0.9 }}>Hostel Room</h3>
            <Building size={24} />
          </div>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>
            {stats.hostelRoom ? `Room ${stats.hostelRoom.roomNumber}` : 'Not Allocated'}
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', opacity: 0.9 }}>Average Score</h3>
            <FileText size={24} />
          </div>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>
            {stats.averageMarks}%
          </p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Quick Actions
        </h3>
        <div className="grid grid-4">
          <a href="/student/fees" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <DollarSign size={32} color="#667eea" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontWeight: '600', color: '#333' }}>View Fee Records</p>
            </div>
          </a>
          <a href="/student/hostel" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <Building size={32} color="#667eea" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontWeight: '600', color: '#333' }}>Hostel Details</p>
            </div>
          </a>
          <a href="/student/exams" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <FileText size={32} color="#667eea" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontWeight: '600', color: '#333' }}>Exam Results</p>
            </div>
          </a>
          <div 
            style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: 'white'
            }}
            onClick={() => downloadAdmissionCertificate(user.studentId)}
          >
            <Download size={32} color="white" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontWeight: '600' }}>Download Certificate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentFees({ user }) {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFees();
  }, [user.studentId]);

  const loadFees = async () => {
    try {
      const response = await getFees(user.studentId);
      setFees(response.data);
    } catch (error) {
      console.error('Error loading fees:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  const totalPaid = fees.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
        My Fee Records
      </h2>

      <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: 'white' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px', opacity: 0.9 }}>Total Fees Paid</h3>
        <p style={{ fontSize: '32px', fontWeight: '700' }}>₹{totalPaid.toLocaleString()}</p>
      </div>

      <div className="card">
        {fees.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Receipt No.</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr key={fee.id}>
                  <td>{fee.receiptNumber}</td>
                  <td>{fee.description}</td>
                  <td>₹{fee.amount.toLocaleString()}</td>
                  <td>{fee.paymentMethod}</td>
                  <td>{new Date(fee.paymentDate).toLocaleDateString()}</td>
                  <td><span className="badge badge-success">{fee.status}</span></td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: '12px', padding: '6px 12px' }}
                      onClick={() => downloadFeeReceipt(fee.receiptNumber)}
                      title="Download Receipt PDF"
                    >
                      <Download size={14} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No fee records found
          </p>
        )}
      </div>
    </div>
  );
}

function StudentHostel({ user }) {
  const [allocation, setAllocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHostelInfo();
  }, [user.studentId]);

  const loadHostelInfo = async () => {
    try {
      const response = await getHostelAllocations(user.studentId);
      setAllocation(response.data);
    } catch (error) {
      console.error('Error loading hostel info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
        My Hostel Information
      </h2>

      {allocation ? (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building size={40} color="white" />
            </div>
            <div>
              <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#333' }}>
                Room {allocation.roomNumber}
              </h3>
              <p style={{ color: '#666' }}>Allocated on {new Date(allocation.allocationDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-2">
            <div>
              <p style={{ color: '#666', marginBottom: '4px' }}>Student Name</p>
              <p style={{ fontWeight: '600', fontSize: '16px' }}>{allocation.studentName}</p>
            </div>
            <div>
              <p style={{ color: '#666', marginBottom: '4px' }}>Student ID</p>
              <p style={{ fontWeight: '600', fontSize: '16px' }}>{allocation.studentId}</p>
            </div>
            <div>
              <p style={{ color: '#666', marginBottom: '4px' }}>Room Number</p>
              <p style={{ fontWeight: '600', fontSize: '16px' }}>{allocation.roomNumber}</p>
            </div>
            <div>
              <p style={{ color: '#666', marginBottom: '4px' }}>Status</p>
              <span className="badge badge-success">{allocation.status}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <Building size={64} color="#ccc" style={{ margin: '0 auto 20px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
            No Hostel Allocated
          </h3>
          <p style={{ color: '#666' }}>
            You have not been allocated a hostel room yet. Please contact the administration.
          </p>
        </div>
      )}
    </div>
  );
}

function StudentExams({ user }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExams();
  }, [user.studentId]);

  const loadExams = async () => {
    try {
      const response = await getExams(user.studentId);
      setExams(response.data);
    } catch (error) {
      console.error('Error loading exams:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  const averagePercentage = exams.length > 0
    ? (exams.reduce((sum, exam) => sum + parseFloat(exam.percentage), 0) / exams.length).toFixed(2)
    : 0;

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
        My Exam Results
      </h2>

      <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px', opacity: 0.9 }}>Average Percentage</h3>
        <p style={{ fontSize: '32px', fontWeight: '700' }}>{averagePercentage}%</p>
      </div>

      <div className="card">
        {exams.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Max Marks</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th>Exam Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id}>
                  <td>{exam.subject}</td>
                  <td>{exam.marks}</td>
                  <td>{exam.maxMarks}</td>
                  <td>{exam.percentage}%</td>
                  <td><span className="badge badge-primary">{exam.grade}</span></td>
                  <td>{exam.examType}</td>
                  <td>{new Date(exam.examDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No exam records found
          </p>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
