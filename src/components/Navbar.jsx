import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { googleLogout } from '@react-oauth/google';
import  api  from '../api';

function Navbar() {
  const { toggleCart, cartCount } = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      if (refreshToken) {
        await api.post('auth/logout/', { refresh: refreshToken });
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      googleLogout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete api.defaults.headers.common['Authorization'];
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem('accessToken'));
    window.addEventListener('storage', checkAuth);
    checkAuth();
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <header className="relative z-50 p-4 bg-dark-bg/80 backdrop-blur-md text-white shadow-lg border-b border-light-gray/10 sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black bg-gradient-to-r from-electric-purple to-electric-blue bg-clip-text text-transparent text-shadow-glow">
          Rebel Radiance
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/products" className="hover:text-electric-blue transition">Products</Link>
          {isLoggedIn && <Link to="/my-orders" className="hover:text-electric-blue transition">My Orders</Link>}
          <button onClick={toggleCart} className="relative hover:text-electric-blue transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-electric-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}
          </button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Logout</button>
          ) : (
            <Link to="/login" className="bg-electric-blue hover:opacity-90 text-dark-bg font-bold py-2 px-4 rounded-lg transition-colors">Logout</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;