import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BrokenLinkStage() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  // We're expecting something like 'r!v€r.a?ch!v€//★◇○'
  // But we'll just use a button or simple click on the broken text for now
  
  const handleFix = () => {
    navigate('/landing');
  };

  return (
    <div className="flex-center" style={{ flexDirection: 'column', gap: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1, textShadow: ["0px 0px 10px #ff3366", "2px -2px 0px #00ffcc", "-2px 2px 0px #ff3366"] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
        className="glitch"
        style={{ cursor: 'pointer' }}
        onClick={handleFix}
      >
        r!v€r.a?ch!v€//★◇○
      </motion.div>
      <p style={{ color: '#888' }}>[SYSTEM: The link appears broken. Can you fix it?]</p>
    </div>
  );
}
