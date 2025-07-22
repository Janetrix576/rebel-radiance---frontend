import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, #B026FF 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, #00F0FF 0%, transparent 50%),
            radial-gradient(circle at 50% 10%, #B026FF 0%, transparent 40%),
            radial-gradient(circle at 90% 40%, #00F0FF 0%, transparent 40%)
          `,
          zIndex: 0,
        }}
      ></div>
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(176, 38, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3,
        }}
      ></div>
      <div className="relative z-20 text-center px-6 py-20 max-w-5xl mx-auto">
        <h1
          className="text-7xl md:text-9xl font-black mb-6 leading-none tracking-wide"
          style={{
            background: 'linear-gradient(90deg, #B026FF, #00F0FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px rgba(176, 38, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.4)',
          }}
        >
          REBEL
        </h1>
        <h2
          className="text-5xl md:text-7xl font-bold mb-8"
          style={{
            background: 'linear-gradient(90deg, #FFFFFF, #B026FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          RADIANCE
        </h2>
        <p
          className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-white/90"
          style={{
            textShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
          }}
        >
          Where <span className="text-[#B026FF] font-semibold">fearless style</span> meets <span className="text-[#00F0FF] font-semibold">electric energy</span>.  
          Step into the light. Own the night.
        </p>

        <Link
          to="/products"
          className="inline-block px-12 py-5 text-xl font-bold rounded-full 
                     bg-gradient-to-r from-[#B026FF] to-[#00F0FF] 
                     text-white shadow-2xl hover:shadow-[#00F0FF]/50 
                     transform hover:scale-105 transition-all duration-300
                     relative overflow-hidden group"
        >
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle, #00F0FF, #B026FF)',
              zIndex: -1,
            }}
          ></span>
          🔥 Explore the Collection →
        </Link>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: '3s',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;