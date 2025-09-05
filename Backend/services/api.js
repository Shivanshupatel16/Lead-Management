import axios from 'axios';
import { store } from '../app/store';

const API_BASE_URL ='http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const leadAPI = {
  getLeads: (params = {}) => api.get('/leads', { params }),
  
  getLead: (id) => api.get(`/leads/${id}`),
  
  createLead: (leadData) => api.post('/leads', leadData),
  
  updateLead: (id, leadData) => api.put(`/leads/${id}`, leadData),
  
  deleteLead: (id) => api.delete(`/leads/${id}`),
  
  getStats: () => api.get('/leads/stats'),
};

export default api;