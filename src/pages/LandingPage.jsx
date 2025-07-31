import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../api';

export default function LandingPage() {
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = formType === 'login' ? '/auth/login/' : '/auth/register/';
    const payload = formType === 'login' ? { email, password } : { email, username, password };

    try {
      const response = await api.post(endpoint, payload);
      if (formType === 'register') {
        setMessage('Registration successful! Please log in.');
        setFormType('login');
      } else {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        navigate('/products');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.detail || Object.values(error.response?.data || {}).flat().join(' ') || 'An error occurred.';
      setMessage(errorMsg);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await api.post('/auth/google/', { code: codeResponse.code });
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        navigate('/products');
      } catch (error) {
        setMessage('Google login failed. Please try again.');
      }
    },
    onError: () => setMessage('Google login cancelled or failed.'),
    flow: 'auth-code',
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-dark-gray p-8 rounded-lg shadow-2xl w-full max-w-md border border-electric-purple/20">
        <h1 className="text-3xl font-bold text-center text-white mb-6 text-shadow-glow">Rebel Radiance</h1>
        {message && <p className="text-center text-red-400 mb-4">{message}</p>}
        <form onSubmit={handleAuth} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-electric-blue mb-4">{formType === 'login' ? 'Login' : 'Register'}</h2>
          {formType === 'register' && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-dark-bg border border-light-gray/20 rounded mt-1 text-white"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-dark-bg border border-light-gray/20 rounded mt-1 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-dark-bg border border-light-gray/20 rounded mt-1 text-white"
            required
          />
          <button type="submit" className="w-full bg-gradient-to-r from-electric-purple to-electric-blue text-white p-3 rounded hover:opacity-90 font-bold">
            {formType === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="text-center my-4">
          <button onClick={() => setFormType(formType === 'login' ? 'register' : 'login')} className="text-electric-blue hover:underline">
            {formType === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-light-gray/30"></span></div>
          <div className="relative flex justify-center text-sm"><span className="bg-dark-gray px-2 text-light-gray">OR</span></div>
        </div>
        <button onClick={handleGoogleLogin} className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 flex items-center justify-center">
          Login with Google
        </button>
      </div>
    </div>
  );
}