import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { toggleCart, cartCount } = useCart();

  return (
    <header className="relative z-50 p-4 bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 font-bold text-xl group"
        >
          <span
            className="text-2xl"
            style={{
              background: 'linear-gradient(90deg, #B026FF, #00F0FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 15px rgba(176, 38, 255, 0.4)',
            }}
          >
            Rebel Radiance
          </span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link to="/products" className="hover:text-cyan-400 transition">Products</Link>
          <Link to="/my-orders" className="hover:text-cyan-400 transition">My Orders</Link>
          <button onClick={toggleCart} className="relative hover:text-cyan-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;