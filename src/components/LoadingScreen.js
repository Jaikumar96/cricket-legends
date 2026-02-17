import React from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="loading-icon"
        >
          🏏
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="loading-title"
        >
          CRICKET LEGENDS
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="loading-subtitle"
        >
          Loading the greatest players...
        </motion.p>

        <div className="loading-bar-container">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="loading-bar"
          />
        </div>

        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="loading-dots"
        >
          <span>●</span>
          <span>●</span>
          <span>●</span>
        </motion.div>
      </div>

      {/* Animated Background */}
      <div className="loading-background">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="loading-orb orb-1"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="loading-orb orb-2"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="loading-orb orb-3"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
