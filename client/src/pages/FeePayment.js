import React, { useState, useEffect } from 'react';
import { DollarSign, Receipt, Download } from 'lucide-react';
import { createFeePayment, getFees, downloadFeeReceipt } from '../api';

function FeePayment() {
  const [formData, setFormData] = useState({
    studentId: '',
    amount: '',
    paymentMethod: 'Cash',
    description: 'Tuition Fee'
  });
  const [fees, setFees] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    loadFees();
  }, []);

  const loadFees = async () => {
    try {
      const response = await getFees();
      setFees(response.data);
    } catch (error) {
      console.error('Error loading fees:', error);
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
      const response = await createFeePayment(formData);
      setMessage({ 
        type: 'success', 
        text: `Payment successful! Receipt Number: ${response.data.payment.receiptNumber}` 
      });
      setFormData({
        studentId: '',
        amount: '',
        paymentMethod: 'Cash',
        description: 'Tuition Fee'
      });
      loadFees();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Payment failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const totalCollected = fees.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700' }}>Fee Payment Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <Receipt size={18} /> : <DollarSign size={18} />}
          {showForm ? 'View All Payments' : 'New Payment'}
        </button>
      </div>

      {!showForm && (
        <div className="card" style={{ 
          marginBottom: '20px', 
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', 
          color: 'white' 
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '8px', opacity: 0.9 }}>Total Fees Collected</h3>
          <p style={{ fontSize: '36px', fontWeight: '700' }}>₹{totalCollected.toLocaleString()}</p>
        </div>
      )}

      {showForm ? (
        <div className="card">
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={24} />
            Process Fee Payment
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
                <label>Amount (₹) *</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="1"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Payment Method *</label>
                <select
                  name="paymentMethod"
                  className="form-select"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <select
                  name="description"
                  className="form-select"
                  value={formData.description}
                  onChange={handleChange}
                  required
                >
                  <option value="Tuition Fee">Tuition Fee</option>
                  <option value="Hostel Fee">Hostel Fee</option>
                  <option value="Examination Fee">Examination Fee</option>
                  <option value="Library Fee">Library Fee</option>
                  <option value="Sports Fee">Sports Fee</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-success" disabled={loading}>
              <Receipt size={18} />
              {loading ? 'Processing...' : 'Process Payment'}
            </button>
          </form>
        </div>
      ) : (
        <div className="card">
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Receipt size={24} />
            All Fee Payments ({fees.length})
          </h3>

          {fees.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Receipt No.</th>
                    <th>Student ID</th>
                    <th>Student Name</th>
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
                      <td><strong>{fee.receiptNumber}</strong></td>
                      <td>{fee.studentId}</td>
                      <td>{fee.studentName}</td>
                      <td>{fee.description}</td>
                      <td><strong>₹{fee.amount.toLocaleString()}</strong></td>
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
            </div>
          ) : (
            <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              No fee payments found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default FeePayment;
