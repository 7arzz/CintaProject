import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BrokenLinkStage() {
  const navigate = useNavigate();

  const handleFix = () => {
    navigate('/landing');
  };

  return (
    <div className="flex-center" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,45,85,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="text-center flex flex-col items-center gap-6 px-6">
        {/* Small label above */}
        <p className="mono text-xs tracking-[0.35em] uppercase" style={{ color: 'var(--text-muted)' }}>
          [ SYSTEM: link broken ]
        </p>

        {/* Clickable glitch title */}
        <motion.div
          onClick={handleFix}
          style={{ cursor: 'pointer' }}
          animate={{
            textShadow: [
              '2px 0 var(--accent), -2px 0 var(--cyan)',
              '-2px 0 var(--accent),  2px 0 var(--cyan)',
              '1px 0  var(--accent), -1px 0 var(--cyan)',
              'none'
            ],
            x: [0, -1, 1, 0]
          }}
          transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <h1 className="mono font-bold" style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            color: 'var(--text)',
            letterSpacing: '0.12em',
            lineHeight: 1.4
          }}>
            r!v€r.a?ch!v€//★◇○
          </h1>
        </motion.div>

        {/* Hint below */}
        <motion.p
          className="mono text-xs"
          style={{ color: 'var(--cyan)' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          // tap to repair
        </motion.p>
      </div>
    </div>
  );
}
