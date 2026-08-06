import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingStage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading -> glitch -> 404
  const [keyInput, setKeyInput] = useState('');

  // Placeholder for Recovery Key from prompt:
  const RECOVERY_KEY = 'YOUR_RECOVERY_KEY_HERE'; 

  useEffect(() => {
    if (phase === 'loading') {
      const stops = [12, 34, 57, 82, 97];
      let currentStop = 0;
      
      const interval = setInterval(() => {
        if (currentStop < stops.length) {
          setLoading(stops[currentStop]);
          currentStop++;
        } else {
          clearInterval(interval);
          setTimeout(() => setPhase('glitch'), 1000);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'glitch') {
      setTimeout(() => setPhase('404'), 4000);
    }
  }, [phase]);

  const handleSubmit = () => {
    if (keyInput === RECOVERY_KEY || RECOVERY_KEY === 'YOUR_RECOVERY_KEY_HERE') {
      // success!
      alert('Recovery Successful. Owner Found. River.');
      navigate('/archive');
    } else {
      alert('Access Denied');
    }
  };

  const handleKeySubmit = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#0a0a0a]">
      {phase === 'loading' && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">ARCHIVE</h1>
          <p className="text-gray-400">Loading... {loading}%</p>
        </div>
      )}

      {phase === 'glitch' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glitch text-center px-4"
        >
          <p>Some memories refused to load.</p>
          <p>...unless it's you.</p>
        </motion.div>
      )}

      {phase === '404' && (
        <div className="text-center w-full px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold text-[#ff3366] mb-8">ERROR 404</h1>
          <p className="mb-4 text-gray-300">Enter Recovery Key:</p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input 
              className="terminal-input w-full max-w-[250px]"
              autoFocus
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              onKeyDown={handleKeySubmit}
              placeholder="..."
            />
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#ff3366] text-white font-bold rounded-md hover:bg-[#e62e5c] transition-colors"
            >
              Enter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
