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
        <div className="text-center font-mono w-full max-w-md px-4">
          <h1 className="text-3xl font-bold mb-4 text-[#00C3E3] tracking-[0.2em] uppercase">SYSTEM_ARCHIVE</h1>
          <div className="w-full h-4 bg-[#222] border-2 border-[#333] rounded-sm overflow-hidden mb-2 relative">
            <div 
              className="h-full bg-[#E60012] transition-all duration-500 ease-out"
              style={{ width: `${loading}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-sm">Loading modules... {loading}%</p>
        </div>
      )}

      {phase === 'glitch' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1, 
            x: [-2, 2, -2, 2, 0],
            textShadow: [
              "2px 0px 0px #E60012, -2px 0px 0px #00C3E3",
              "-2px 0px 0px #E60012, 2px 0px 0px #00C3E3",
              "2px 0px 0px #E60012, -2px 0px 0px #00C3E3",
              "0px 0px 0px transparent, 0px 0px 0px transparent"
            ]
          }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1 }}
          className="text-center px-4 font-mono text-xl md:text-2xl font-bold tracking-widest text-white uppercase"
        >
          <motion.p 
            initial={{ opacity: 1 }} 
            animate={{ opacity: [1, 0.5, 1, 0, 1] }} 
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
            className="mb-4"
          >
            Some memories refused to load.
          </motion.p>
          <p className="text-[#00C3E3]">...unless it's you.</p>
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
