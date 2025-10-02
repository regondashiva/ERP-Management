import React, { useState, useEffect } from 'react';
import { Building, Home } from 'lucide-react';
import { allocateHostel, getHostelData } from '../api';

function HostelAllocation() {
  const [formData, setFormData] = useState({
    studentId: '',
    roomNumber: ''
  });
  const [hostelData, setHostelData] = useState({ rooms: [], allocations: [] });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    loadHostelData();
  }, []);

  const loadHostelData = async () => {
    try {
      const response = await getHostelData();
      setHostelData(response.data);
    } catch (error) {
      console.error('Error loading hostel data:', error);
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
      await allocateHostel(formData);
      setMessage({ 
        type: 'success', 
        text: `Hostel allocated successfully! Room ${formData.roomNumber}` 
      });
      setFormData({
        studentId: '',
        roomNumber: ''
      });
      loadHostelData();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Allocation failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const totalCapacity = hostelData.rooms.reduce((sum, room) => sum + room.capacity, 0);
  const totalOccupied = hostelData.rooms.reduce((sum, room) => sum + room.occupied, 0);
  const occupancyPercentage = totalCapacity > 0 ? ((totalOccupied / totalCapacity) * 100).toFixed(1) : 0;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700' }}>Hostel Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <Home size={18} /> : <Building size={18} />}
          {showForm ? 'View Rooms' : 'New Allocation'}
        </button>
      </div>

      <div className="grid grid-3" style={{ marginBottom: '20px' }}>
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
          color: 'white' 
        }}>
          <h3 style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9 }}>Total Capacity</h3>
          <p style={{ fontSize: '32px', fontWeight: '700' }}>{totalCapacity}</p>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', 
          color: 'white' 
        }}>
          <h3 style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9 }}>Occupied</h3>
          <p style={{ fontSize: '32px', fontWeight: '700' }}>{totalOccupied}</p>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white' 
        }}>
          <h3 style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9 }}>Occupancy</h3>
          <p style={{ fontSize: '32px', fontWeight: '700' }}>{occupancyPercentage}%</p>
        </div>
      </div>

      {showForm ? (
        <div className="card">
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={24} />
            Allocate Hostel Room
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
                <label>Room Number *</label>
                <select
                  name="roomNumber"
                  className="form-select"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Room</option>
                  {hostelData.rooms.map((room) => (
                    <option 
                      key={room.roomNumber} 
                      value={room.roomNumber}
                      disabled={room.occupied >= room.capacity}
                    >
                      Room {room.roomNumber} - {room.occupied}/{room.capacity} 
                      {room.occupied >= room.capacity ? ' (Full)' : ' (Available)'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-success" disabled={loading}>
              <Building size={18} />
              {loading ? 'Processing...' : 'Allocate Room'}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="card">
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Home size={24} />
              Room Availability
            </h3>

            <div className="grid grid-4">
              {hostelData.rooms.map((room) => {
                const available = room.capacity - room.occupied;
                const isFull = available === 0;
                
                return (
                  <div 
                    key={room.roomNumber} 
                    className="card" 
                    style={{ 
                      background: isFull ? '#f8d7da' : '#d4edda',
                      border: `2px solid ${isFull ? '#f5c6cb' : '#c3e6cb'}`
                    }}
                  >
                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                      Room {room.roomNumber}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                      Capacity: {room.capacity}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600' }}>
                        {room.occupied} / {room.capacity} Occupied
                      </span>
                      <span className={`badge ${isFull ? 'badge-danger' : 'badge-success'}`}>
                        {isFull ? 'Full' : `${available} Available`}
                      </span>
                    </div>
                    
                    {room.students.length > 0 && (
                      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #ddd' }}>
                        <p style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Students:</p>
                        {room.students.map((student, idx) => (
                          <p key={idx} style={{ fontSize: '11px', color: '#666' }}>
                            • {student.studentName} ({student.studentId})
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card" style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              All Allocations ({hostelData.allocations.length})
            </h3>

            {hostelData.allocations.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Room Number</th>
                    <th>Allocation Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hostelData.allocations.map((allocation) => (
                    <tr key={allocation.id}>
                      <td><strong>{allocation.studentId}</strong></td>
                      <td>{allocation.studentName}</td>
                      <td>Room {allocation.roomNumber}</td>
                      <td>{new Date(allocation.allocationDate).toLocaleDateString()}</td>
                      <td><span className="badge badge-success">{allocation.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No allocations found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HostelAllocation;
