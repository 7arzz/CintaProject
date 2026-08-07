import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_DATA } from '../data';

export default function LandingStage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(0);
  const [phase, setPhase] = useState('loading');
  const [keyInput, setKeyInput] = useState('');
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (phase === 'loading') {
      const stops = [12, 34, 57, 82, 97];
      let i = 0;
      const interval = setInterval(() => {
        if (i < stops.length) {
          setLoading(stops[i++]);
        } else {
          clearInterval(interval);
          setTimeout(() => setPhase('glitch'), 800);
        }
      }, 700);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'glitch') {
      setTimeout(() => setPhase('404'), 3500);
    }
  }, [phase]);

  const handleSubmit = () => {
    const trimmed = keyInput.trim();
    console.log('[DEBUG] input:', JSON.stringify(trimmed));
    console.log('[DEBUG] expected:', JSON.stringify(GAME_DATA.recoveryKey));
    console.log('[DEBUG] match:', trimmed === GAME_DATA.recoveryKey);
    if (trimmed === GAME_DATA.recoveryKey) {
      navigate('/archive');
    } else {
      setDenied(true);
      setTimeout(() => setDenied(false), 1200);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen relative overflow-hidden"
      style={{ background: 'var(--bg)' }}>

      {/* Subtle grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      <AnimatePresence mode="wait">

        {/* ── LOADING ── */}
        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="text-center w-full max-w-xs px-6"
          >
            <p className="mono text-xs tracking-[0.3em] text-[var(--text-muted)] uppercase mb-6">
              System Archive
            </p>
            <div style={{
              width: '100%', height: '2px',
              background: 'var(--border-2)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--cyan), var(--accent))',
                  borderRadius: '2px',
                }}
                animate={{ width: `${loading}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <p className="mono text-xs" style={{ color: 'var(--text-muted)' }}>
              Loading... {loading}%
            </p>
          </motion.div>
        )}

        {/* ── GLITCH ── */}
        {phase === 'glitch' && (
          <motion.div
            key="glitch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center px-6"
          >
            <motion.p
              className="mono text-lg md:text-xl tracking-widest"
              style={{ color: 'var(--text)' }}
              animate={{
                x: [0, -2, 2, -1, 0],
                textShadow: [
                  '2px 0 var(--accent), -2px 0 var(--cyan)',
                  '-2px 0 var(--accent), 2px 0 var(--cyan)',
                  '1px 0 var(--accent), -1px 0 var(--cyan)',
                  'none'
                ]
              }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1.2 }}
            >
              Some memories refused to load.
            </motion.p>
            <motion.p
              className="mono text-sm mt-4"
              style={{ color: 'var(--cyan)' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ...unless it's you.
            </motion.p>
          </motion.div>
        )}

        {/* ── 404 ── */}
        {phase === '404' && (
          <motion.div
            key="404"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full px-6 flex flex-col items-center gap-6"
          >
            <div>
              <motion.h1
                className="mono font-bold"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 5rem)',
                  color: 'var(--accent)',
                  letterSpacing: '0.05em',
                  lineHeight: 1
                }}
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ERROR 404
              </motion.h1>
              <p className="mono text-xs tracking-[0.25em] mt-2"
                style={{ color: 'var(--text-muted)' }}>
                MEMORY_NOT_FOUND
              </p>
            </div>

            <div style={{
              width: '1px', height: '40px',
              background: 'linear-gradient(to bottom, var(--border-2), transparent)'
            }} />

            <div className="flex flex-col items-center gap-4 w-full max-w-[280px]">
              <p className="text-xs tracking-widest uppercase"
                style={{ color: 'var(--text-muted)' }}>
                Enter Recovery Key
              </p>
              <motion.div
                animate={denied ? { x: [-6, 6, -6, 6, 0] } : {}}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <input
                  className="terminal-input w-full mono"
                  autoFocus
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="_ _ _ - _ _ _ _ _ - _ _ _ _"
                  style={{
                    borderColor: denied ? 'var(--accent)' : undefined
                  }}
                />
              </motion.div>

              {denied && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mono text-xs"
                  style={{ color: 'var(--accent)' }}
                >
                  // ACCESS DENIED
                </motion.p>
              )}

              <button
                onClick={handleSubmit}
                className="w-full mono text-xs tracking-widest py-3 transition-all duration-200"
                style={{
                  background: 'var(--accent-dim)',
                  border: '1px solid rgba(255,45,85,0.4)',
                  borderRadius: '4px',
                  color: 'var(--accent)',
                  letterSpacing: '0.2em'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--accent-dim)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
              >
                EXECUTE
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
