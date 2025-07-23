import React from 'react';
import { Link } from 'react-router-dom';

const colors = {
  darkBg: '#111827',
  primaryText: '#D1D5DB',
  darkerPurple: '#6D28D9',
  mutedCyan: '#0E7490',
};

function HomePage() {
  return (
    <div className={`min-h-screen bg-[${colors.darkBg}] text-[${colors.primaryText}] overflow-hidden`}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, ${colors.darkerPurple} 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, ${colors.mutedCyan} 0%, transparent 40%)
          `,
          zIndex: 0,
        }}
      ></div>
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(109, 40, 217, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 116, 144, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.2,
        }}
      ></div>
      <div className="relative z-20 text-center px-6 py-20 max-w-5xl mx-auto">
        <h1
          className="text-7xl md:text-9xl font-black mb-6 leading-none tracking-wide"
          style={{
            background: `linear-gradient(90deg, ${colors.darkerPurple}, ${colors.mutedCyan})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          REBEL
        </h1>
        <h2
          className="text-5xl md:text-7xl font-bold mb-8"
          style={{
            background: `linear-gradient(90deg, ${colors.primaryText}, ${colors.darkerPurple})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          RADIANCE
        </h2>
        <p className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
          Where <span className="font-semibold" style={{ color: colors.darkerPurple }}>fearless style</span> meets <span className="font-semibold" style={{ color: colors.mutedCyan }}>electric energy</span>.
          Step into the light. Own the night.
        </p>
        <Link
          to="/products"
          className={`inline-block px-12 py-5 text-xl font-bold rounded-full 
                     bg-gradient-to-r from-[${colors.darkerPurple}] to-[${colors.mutedCyan}] 
                     text-white shadow-lg hover:shadow-xl
                     transform hover:scale-105 transition-all duration-300`}
        >
          Explore the Collection →
        </Link>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-800 rounded-full opacity-50 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: '4s',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;