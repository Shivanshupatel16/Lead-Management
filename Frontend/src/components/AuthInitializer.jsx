// components/AuthInitializer.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authState = localStorage.getItem('authState');
    if (authState) {
      try {
        const parsedAuth = JSON.parse(authState);
        if (parsedAuth.user && parsedAuth.token) {
          dispatch({
            type: 'auth/login/fulfilled',
            payload: parsedAuth
          });
        }
      } catch (error) {
        console.error('Failed to parse auth state', error);
        localStorage.removeItem('authState');
      }
    }
  }, [dispatch]);

  return null;
}