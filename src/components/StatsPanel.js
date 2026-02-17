import React from 'react';
import { motion } from 'framer-motion';
import './StatsPanel.css';

const StatsPanel = ({ players, filteredPlayers }) => {
  const stats = [
    {
      icon: '👥',
      label: 'Total Legends',
      value: players.length,
      color: '#0acffe'
    },
    {
      icon: '🔍',
      label: 'Showing',
      value: filteredPlayers.length,
      color: '#7b2ff7'
    },
    {
      icon: '🏏',
      label: 'Batsmen',
      value: players.filter(p => p.role === 'Batsman').length,
      color: '#00d9ff'
    },
    {
      icon: '⚡',
      label: 'Bowlers',
      value: players.filter(p => p.role === 'Bowler').length,
      color: '#ff2e97'
    },
    {
      icon: '💎',
      label: 'All-rounders',
      value: players.filter(p => p.role === 'All-rounder').length,
      color: '#b44aff'
    }
  ];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="stats-panel"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="stat-card"
          style={{ '--stat-color': stat.color }}
        >
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
              className="stat-value"
            >
              {stat.value}
            </motion.div>
            <div className="stat-label">{stat.label}</div>
          </div>
          <div className="stat-glow"></div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsPanel;
