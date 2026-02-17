import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = ({ theme, toggleTheme }) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="header"
    >
      <div className="header-background">
        <div className="header-glow"></div>
      </div>
      
      <div className="header-content">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="cricket-icon"
        >
          🏏
        </motion.div>
        
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="main-title"
        >
          <span className="title-word">CRICKET</span>
          <span className="title-word highlight">LEGENDS</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="subtitle"
        >
          ⚡ Experience the Greatest Players in Cricket History ⚡
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="theme-toggle"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </motion.button>
      </div>

      <div className="header-decoration">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="decoration-circle circle-1"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="decoration-circle circle-2"
        />
      </div>
    </motion.header>
  );
};

export default Header;
