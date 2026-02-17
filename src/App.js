import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import PlayerGrid from './components/PlayerGrid';
import StatsPanel from './components/StatsPanel';
import ParticleBackground from './components/ParticleBackground';
import LoadingScreen from './components/LoadingScreen';
import { playersData } from './data/playersData';
import './App.css';

function App() {
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 2500);
  }, []);

  const filteredPlayers = playersData.filter(player => {
    const matchesRole = selectedRole === 'all' || player.role === selectedRole;
    const matchesSearch = 
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`app ${theme}`}>
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="app-container"
      >
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <FilterSection
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <StatsPanel players={playersData} filteredPlayers={filteredPlayers} />

        <PlayerGrid
          players={filteredPlayers}
          viewMode={viewMode}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
        />

        <footer className="footer">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="footer-content"
          >
            <h3>🏆 Celebrating Cricket Excellence Since 1877</h3>
            <p className="footer-tagline">Legends Never Die, They Inspire Generations</p>
            <div className="footer-stats">
              <span>📊 {playersData.length} Legends</span>
              <span>🌍 10+ Countries</span>
              <span>⚡ Built with React</span>
            </div>
            <p className="footer-copyright">© 2026 Cricket Legends. Crafted with 💙 for Cricket Fans</p>
          </motion.div>
        </footer>
      </motion.div>

      <AnimatePresence>
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedPlayer(null)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              className="player-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedPlayer(null)}>✕</button>
              <div className="modal-content">
                <div className="modal-header" style={{ background: selectedPlayer.gradient }}>
                  <div className="modal-initials">{selectedPlayer.initials}</div>
                  <div className="modal-number">{selectedPlayer.number}</div>
                </div>
                <div className="modal-body">
                  <h2>{selectedPlayer.name}</h2>
                  <p className="modal-role">{selectedPlayer.role}</p>
                  <p className="modal-country">{selectedPlayer.country}</p>
                  <div className="modal-stats">
                    {Object.entries(selectedPlayer.stats).map(([key, value]) => (
                      <div key={key} className="modal-stat">
                        <span className="modal-stat-value">{value}</span>
                        <span className="modal-stat-label">{key}</span>
                      </div>
                    ))}
                  </div>
                  <p className="modal-achievement">{selectedPlayer.achievement}</p>
                  <div className="modal-bio">
                    <h3>About</h3>
                    <p>{selectedPlayer.bio}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
