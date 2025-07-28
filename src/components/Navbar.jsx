import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="relative z-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-white font-bold text-xl group"
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
      </div>
      <div
        className="h-0.5 bg-gradient-to-r from-purple-600 via-cyan-400 to-transparent"
        style={{
          background: 'linear-gradient(90deg, #B026FF, #00F0FF, transparent)',
        }}
      ></div>
    </header>
  );
}

export default Navbar;