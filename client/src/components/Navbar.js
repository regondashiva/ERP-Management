import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, GraduationCap, Home, UserPlus, DollarSign, Building, FileText } from 'lucide-react';

function Navbar({ user, onLogout, basePath }) {
  const location = useLocation();

  const navItems = {
    admin: [
      { path: '', label: 'Dashboard', icon: Home },
      { path: '/admissions', label: 'Admissions', icon: UserPlus },
      { path: '/fees', label: 'Fee Payments', icon: DollarSign },
      { path: '/hostel', label: 'Hostel', icon: Building },
      { path: '/exams', label: 'Examinations', icon: FileText }
    ],
    staff: [
      { path: '', label: 'Dashboard', icon: Home },
      { path: '/admissions', label: 'Admissions', icon: UserPlus },
      { path: '/fees', label: 'Fee Payments', icon: DollarSign },
      { path: '/hostel', label: 'Hostel', icon: Building },
      { path: '/exams', label: 'Examinations', icon: FileText }
    ],
    student: [
      { path: '', label: 'Dashboard', icon: Home },
      { path: '/fees', label: 'My Fees', icon: DollarSign },
      { path: '/hostel', label: 'My Hostel', icon: Building },
      { path: '/exams', label: 'My Exams', icon: FileText }
    ]
  };

  const items = navItems[user.role] || [];

  return (
    <nav style={{
      background: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px'
          }}>
            <GraduationCap size={24} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#333' }}>
              College Management
            </h2>
            <p style={{ fontSize: '12px', color: '#666' }}>
              {user.name} ({user.role.charAt(0).toUpperCase() + user.role.slice(1)})
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === `${basePath}${item.path}`;
            return (
              <Link
                key={item.path}
                to={`${basePath}${item.path}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: isActive ? '#667eea' : '#666',
                  background: isActive ? '#f0f4ff' : 'transparent',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
          
          <button
            onClick={onLogout}
            className="btn btn-danger"
            style={{ fontSize: '14px' }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
