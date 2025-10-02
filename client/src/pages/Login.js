import React, { useState } from 'react';
import { LogIn, GraduationCap } from 'lucide-react';
import { login } from '../api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(email, password);
      onLogin(response.data.user, response.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (role) => {
    const credentials = {
      admin: { email: 'admin@college.edu', password: 'admin123' },
      staff: { email: 'staff@college.edu', password: 'staff123' },
      student: { email: 'student@college.edu', password: 'student123' }
    };
    
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            marginBottom: '20px'
          }}>
            <GraduationCap size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
            College Management System
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Sign in to access your dashboard
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px', textAlign: 'center' }}>
            Quick Login (Demo)
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-secondary" 
              style={{ flex: 1, fontSize: '12px' }}
              onClick={() => quickLogin('admin')}
              type="button"
            >
              Admin
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ flex: 1, fontSize: '12px' }}
              onClick={() => quickLogin('staff')}
              type="button"
            >
              Staff
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ flex: 1, fontSize: '12px' }}
              onClick={() => quickLogin('student')}
              type="button"
            >
              Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
