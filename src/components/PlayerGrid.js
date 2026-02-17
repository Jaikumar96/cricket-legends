import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PlayerGrid.css';

const PlayerGrid = ({ players, viewMode, setSelectedPlayer }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`players-grid ${viewMode}`}
    >
      <AnimatePresence mode="wait">
        {players.map((player) => (
          <motion.div
            key={player.id}
            variants={itemVariants}
            layout
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={() => setSelectedPlayer(player)}
            className="player-card"
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="player-image" style={{ background: player.gradient }}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="player-initials"
                  >
                    {player.initials}
                  </motion.div>
                  <div className="player-number">{player.number}</div>
                  <div className="image-overlay"></div>
                </div>
                <div className="player-info">
                  <h2 className="player-name">{player.name}</h2>
                  <p className="player-role">
                    <span className="role-icon">
                      {player.role === 'Batsman' ? '🏏' : player.role === 'Bowler' ? '⚡' : '💎'}
                    </span>
                    {player.role}
                  </p>
                  <p className="player-country">{player.country}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="view-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlayer(player);
                    }}
                  >
                    View Details →
                  </motion.button>
                </div>
              </div>
              
              <div className="card-glow" style={{ background: player.gradient }}></div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {players.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="no-results"
        >
          <div className="no-results-icon">🔍</div>
          <h3>No Players Found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlayerGrid;
