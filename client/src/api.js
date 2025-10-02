import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => {
  return api.post('/login', { email, password });
};

export const getAdmissions = () => {
  return api.get('/admissions');
};

export const createAdmission = (data) => {
  return api.post('/admissions', data);
};

export const getFees = (studentId = null) => {
  return api.get('/fees', { params: { studentId } });
};

export const createFeePayment = (data) => {
  return api.post('/fees', data);
};

export const getHostelData = () => {
  return api.get('/hostel');
};

export const getHostelAllocations = (studentId = null) => {
  return api.get('/hostel/allocations', { params: { studentId } });
};

export const allocateHostel = (data) => {
  return api.post('/hostel', data);
};

export const getExams = (studentId = null) => {
  return api.get('/exams', { params: { studentId } });
};

export const createExamRecord = (data) => {
  return api.post('/exams', data);
};

export const getDashboardStats = () => {
  return api.get('/dashboard/stats');
};

// Download PDF receipts
export const downloadFeeReceipt = async (receiptNumber) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/fees/receipt/${receiptNumber}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to download receipt');
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receiptNumber}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading receipt:', error);
    alert('Failed to download receipt. Please try again.');
  }
};

export const downloadAdmissionCertificate = async (studentId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admissions/certificate/${studentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to download certificate');
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admission-${studentId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading certificate:', error);
    alert('Failed to download certificate. Please try again.');
  }
};

export default api;
