import React, { useState, useEffect } from 'react';
import { UserPlus, Users, Download } from 'lucide-react';
import { createAdmission, getAdmissions, downloadAdmissionCertificate } from '../api';

function AdmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    phone: '',
    address: '',
    dateOfBirth: ''
  });
  const [admissions, setAdmissions] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    loadAdmissions();
  }, []);

  const loadAdmissions = async () => {
    try {
      const response = await getAdmissions();
      setAdmissions(response.data);
    } catch (error) {
      console.error('Error loading admissions:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await createAdmission(formData);
      setMessage({ type: 'success', text: `Admission successful! Student ID: ${response.data.admission.studentId}` });
      setFormData({
        name: '',
        email: '',
        course: '',
        phone: '',
        address: '',
        dateOfBirth: ''
      });
      loadAdmissions();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Admission failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700' }}>Admission Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <Users size={18} /> : <UserPlus size={18} />}
          {showForm ? 'View All Admissions' : 'New Admission'}
        </button>
      </div>

      {showForm ? (
        <div className="card">
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserPlus size={24} />
            New Student Admission
          </h3>

          {message.text && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-2">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter student name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Course *</label>
                <select
                  name="course"
                  className="form-select"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                  <option value="B.Tech Mechanical">B.Tech Mechanical</option>
                  <option value="B.Tech Electrical">B.Tech Electrical</option>
                  <option value="B.Tech Civil">B.Tech Civil</option>
                  <option value="BBA">BBA</option>
                  <option value="BCA">BCA</option>
                  <option value="MBA">MBA</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success" disabled={loading}>
              <UserPlus size={18} />
              {loading ? 'Processing...' : 'Submit Admission'}
            </button>
          </form>
        </div>
      ) : (
        <div className="card">
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={24} />
            All Admissions ({admissions.length})
          </h3>

          {admissions.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Phone</th>
                    <th>Admission Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map((admission) => (
                    <tr key={admission.id}>
                      <td><strong>{admission.studentId}</strong></td>
                      <td>{admission.name}</td>
                      <td>{admission.email}</td>
                      <td>{admission.course}</td>
                      <td>{admission.phone}</td>
                      <td>{new Date(admission.admissionDate).toLocaleDateString()}</td>
                      <td><span className="badge badge-success">{admission.status}</span></td>
                      <td>
                        <button
                          className="btn btn-success"
                          style={{ fontSize: '12px', padding: '6px 12px' }}
                          onClick={() => downloadAdmissionCertificate(admission.studentId)}
                          title="Download Admission Certificate"
                        >
                          <Download size={14} />
                          Certificate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              No admissions found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdmissionForm;
