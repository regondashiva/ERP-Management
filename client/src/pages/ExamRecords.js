import React, { useState, useEffect } from 'react';
import { FileText, Award } from 'lucide-react';
import { createExamRecord, getExams } from '../api';

function ExamRecords() {
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    marks: '',
    maxMarks: '100',
    examDate: new Date().toISOString().split('T')[0],
    examType: 'Regular'
  });
  const [exams, setExams] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const response = await getExams();
      setExams(response.data);
    } catch (error) {
      console.error('Error loading exams:', error);
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
      const response = await createExamRecord(formData);
      setMessage({ 
        type: 'success', 
        text: `Exam record added successfully! Grade: ${response.data.exam.grade}` 
      });
      setFormData({
        studentId: '',
        subject: '',
        marks: '',
        maxMarks: '100',
        examDate: new Date().toISOString().split('T')[0],
        examType: 'Regular'
      });
      loadExams();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to add exam record. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700' }}>Examination Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <Award size={18} /> : <FileText size={18} />}
          {showForm ? 'View All Records' : 'Add New Record'}
        </button>
      </div>

      {showForm ? (
        <div className="card">
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={24} />
            Add Exam Record
          </h3>

          {message.text && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-2">
              <div className="form-group">
                <label>Student ID *</label>
                <input
                  type="text"
                  name="studentId"
                  className="form-control"
                  placeholder="Enter student ID (e.g., STU001)"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <select
                  name="subject"
                  className="form-select"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="English">English</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="Database Management">Database Management</option>
                  <option value="Operating Systems">Operating Systems</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Machine Learning">Machine Learning</option>
                </select>
              </div>

              <div className="form-group">
                <label>Marks Obtained *</label>
                <input
                  type="number"
                  name="marks"
                  className="form-control"
                  placeholder="Enter marks obtained"
                  value={formData.marks}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Maximum Marks *</label>
                <input
                  type="number"
                  name="maxMarks"
                  className="form-control"
                  placeholder="Enter maximum marks"
                  value={formData.maxMarks}
                  onChange={handleChange}
                  min="1"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Exam Date *</label>
                <input
                  type="date"
                  name="examDate"
                  className="form-control"
                  value={formData.examDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Exam Type *</label>
                <select
                  name="examType"
                  className="form-select"
                  value={formData.examType}
                  onChange={handleChange}
                  required
                >
                  <option value="Regular">Regular</option>
                  <option value="Mid-Term">Mid-Term</option>
                  <option value="Final">Final</option>
                  <option value="Quiz">Quiz</option>
                  <option value="Assignment">Assignment</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-success" disabled={loading}>
              <FileText size={18} />
              {loading ? 'Processing...' : 'Add Exam Record'}
            </button>
          </form>
        </div>
      ) : (
        <div className="card">
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={24} />
            All Exam Records ({exams.length})
          </h3>

          {exams.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
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
                      <td><strong>{exam.studentId}</strong></td>
                      <td>{exam.studentName}</td>
                      <td>{exam.subject}</td>
                      <td>{exam.marks}</td>
                      <td>{exam.maxMarks}</td>
                      <td><strong>{exam.percentage}%</strong></td>
                      <td>
                        <span className={`badge ${
                          exam.grade.startsWith('A') ? 'badge-success' : 
                          exam.grade.startsWith('B') ? 'badge-primary' : 
                          exam.grade.startsWith('C') ? 'badge-warning' : 
                          'badge-danger'
                        }`}>
                          {exam.grade}
                        </span>
                      </td>
                      <td>{exam.examType}</td>
                      <td>{new Date(exam.examDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              No exam records found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ExamRecords;
