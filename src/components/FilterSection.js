import React from 'react';
import { motion } from 'framer-motion';
import './FilterSection.css';

const FilterSection = ({ 
  selectedRole, 
  setSelectedRole, 
  searchTerm, 
  setSearchTerm,
  viewMode,
  setViewMode 
}) => {
  const roles = [
    { value: 'all', label: '⚡ All Players', icon: '🌟' },
    { value: 'Batsman', label: 'Batsmen', icon: '🏏' },
    { value: 'Bowler', label: 'Bowlers', icon: '⚡' },
    { value: 'All-rounder', label: 'All-rounders', icon: '💎' }
  ];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="filter-section"
    >
      <div className="search-container">
        <motion.div
          whileFocus={{ scale: 1.02 }}
          className="search-wrapper"
        >
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, country, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchTerm('')}
              className="clear-search"
            >
              ✕
            </motion.button>
          )}
        </motion.div>
      </div>

      <div className="filter-controls">
        <div className="filter-buttons">
          {roles.map((role, index) => (
            <motion.button
              key={role.value}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRole(role.value)}
              className={`filter-btn ${selectedRole === role.value ? 'active' : ''}`}
            >
              <span className="filter-icon">{role.icon}</span>
              <span>{role.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="view-toggle">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setViewMode('grid')}
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            title="Grid View"
          >
            ▦
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setViewMode('list')}
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            title="List View"
          >
            ☰
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSection;
