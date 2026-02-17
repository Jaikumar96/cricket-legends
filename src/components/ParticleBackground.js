import React from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
  return (
    <div className="particle-background">
      <div className="stars-layer"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
      
      {/* Floating Cricket Balls */}
      <div className="floating-icons">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-icon"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + i * 2}s`
            }}
          >
            🏏
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticleBackground;
