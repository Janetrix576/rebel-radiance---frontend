import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../utils/auth';

const LandingPage = () => {
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      await api.post('auth/register/', {
        email,
        username,
        password,
        password2,
        first_name: firstName,
        last_name: lastName,
      });
      setMessage('Registration successful! Please log in.');
      setFormType('login');
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      const errorData = error.response?.data || {};
      const errorMessage = Object.values(errorData).flat().join(' ') || 'Registration failed.';
      setMessage(errorMessage);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('auth/login/', {
        email,
        password,
      });
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      navigate('/products');
    } catch (error) {
      console.error('Login error:', error.response?.data);
      setMessage(error.response?.data?.detail || 'Invalid credentials.');
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await api.post('auth/google/', { code: codeResponse.code });
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        navigate('/products');
      } catch (error) {
        console.error('Google login backend error:', error.response?.data);
        setMessage('Google login failed.');
      }
    },
    onError: (error) => {
      console.error('Google login process error:', error);
      setMessage('Google login process failed.');
    },
    flow: 'auth-code',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Rebel Radiance</h1>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        {formType === 'login' ? (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mt-1" required />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mt-1" required />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700">Login</button>
            </form>
            <div className="text-center my-4">
              <button onClick={() => setFormType('register')} className="text-indigo-600 hover:underline">Need an account? Register</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Register</h2>
            <form onSubmit={handleRegister} className="space-y-3">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded" required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
              <input type="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} className="w-full p-2 border rounded" required />
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border rounded" />
              <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700">Register</button>
            </form>
            <div className="text-center my-4">
              <button onClick={() => setFormType('login')} className="text-indigo-600 hover:underline">Already have an account? Login</button>
            </div>
          </>
        )}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
          <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">OR</span></div>
        </div>
        <button onClick={() => handleGoogleLogin()} className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 flex items-center justify-center">Login with Google</button>
      </div>
    </div>
  );
};

export default LandingPage;