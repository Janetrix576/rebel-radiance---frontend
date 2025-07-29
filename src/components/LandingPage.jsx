import { useState } from 'react';
import api from '../utils/auth'; // Ensure this path matches your project structure
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('auth/register/', {
        email,
        password,
        username,
        first_name: firstName,
        last_name: lastName,
      });
      setMessage('Registration successful! Please log in.');
      setFormType('login');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed. Check console for details.');
      console.error('Registration error:', error.response?.data || error.message);
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
      setMessage('Login successful!');
      navigate('/dashboard'); // Placeholder; create this route later
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed. Check console for details.');
      console.error('Login error:', error.response?.data || error.message);
    }
  };

const handleGoogleLogin = useGoogleLogin({
  onSuccess: async (codeResponse) => {
    try {
      console.log('Google code response:', codeResponse); // Should log the code
      const response = await api.post('auth/google/', {
        code: codeResponse.code, // Send the authorization code
      });
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      setMessage('Google login successful!');
      navigate('/dashboard');
    } catch (error) {
      setMessage('Google login failed.');
      console.error('Google login error:', error.response?.data || error.message);
    }
  },
  onError: (error) => {
    setMessage('Google login error occurred.');
    console.error('Google login error:', error);
  },
  scope: 'email profile openid',
  flow: 'auth-code', // Switch to authorization code flow
});

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Rebel Radiance</h1>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        {formType === 'login' ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
                Login
              </button>
            </form>
            <button
              onClick={() => setFormType('register')}
              className="w-full mt-2 text-indigo-600 hover:underline"
            >
              Need an account? Register
            </button>
            <button
              onClick={() => handleGoogleLogin()}
              className="w-full mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 flex items-center justify-center"
            >
              <span>Login with Google</span>
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
                Register
              </button>
            </form>
            <button
              onClick={() => setFormType('login')}
              className="w-full mt-2 text-indigo-600 hover:underline"
            >
              Already have an account? Login
            </button>
            <button
              onClick={() => handleGoogleLogin()}
              className="w-full mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 flex items-center justify-center"
            >
              <span>Register with Google</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;