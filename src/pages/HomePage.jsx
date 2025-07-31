import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const productCategories = [
        { icon: "✨", title: "Skincare", description: "Revolutionary formulas that defy convention to illuminate your natural rebellion." },
        { icon: "💫", title: "Haircare", description: "Untamed textures and bold transformations for the fearlessly authentic." },
        { icon: "🌙", title: "Fragrance", description: "Scents that tell your story. Mysterious, electric, and utterly unforgettable." },
        { icon: "⚡", title: "Grooming", description: "Precision meets rebellion. Tools for those who craft their image with artistic flair." }
    ];

    return (
        <div className="bg-dark-bg text-white min-h-screen">
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
                <div className="absolute inset-0 bg-gradient-to-r from-electric-purple via-electric-blue to-dark-bg opacity-20 animate-gradientShift" style={{ backgroundSize: '400% 400%' }}></div>
                <div className="absolute top-20 left-10 w-32 h-32 bg-electric-purple rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-electric-blue rounded-full opacity-15 animate-bounce"></div>

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-black text-shadow-glow mb-4">
                        <span className="bg-gradient-to-r from-electric-purple via-electric-blue to-electric-purple bg-clip-text text-transparent">
                            REBEL RADIANCE
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light">
                        Beauty Without Boundaries • Radiance Without Rules
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {productCategories.map((category, index) => (
                            <div key={index} className="bg-dark-gray/50 backdrop-blur-sm border border-electric-blue/20 rounded-xl p-6 transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-card-hover">
                                <div className="text-4xl mb-4">{category.icon}</div>
                                <h3 className="text-xl font-semibold text-electric-blue mb-3">{category.title}</h3>
                                <p className="text-slate-400 text-sm">{category.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-dark-gray/30 backdrop-blur-sm border border-electric-purple/20 rounded-2xl p-8 mb-12 shadow-glow-effect">
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                            <span className="text-electric-purple font-semibold">Rebel Radiance</span> isn't just beauty—it's a movement. We create for those who dare to be different, who find power in authenticity, and who believe true radiance comes from an untamed spirit.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/products')}
                        className="animate-pulseGlow bg-gradient-to-r from-electric-purple to-electric-blue hover:from-purple-700 hover:to-cyan-600 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Explore The Collection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;