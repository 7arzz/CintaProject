import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_DATA } from '../data';
import acteImg from '../assets/acteDeMarriage.jpg';

export default function MemoryPuzzle({ onUnlock }) {
  const t = GAME_DATA.anniversaryTarget;
  const initialTiles = [t.year, t.day, null, t.month];
  const [tiles, setTiles] = useState(initialTiles);
  const [solved, setSolved] = useState(false);
  const [phase, setPhase] = useState('puzzle'); // 'puzzle' | 'scratch'
  const [scratchProgress, setScratchProgress] = useState(0);

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const handleTileClick = (index) => {
    if (solved) return;
    const emptyIndex = tiles.indexOf(null);
    if (Math.abs(emptyIndex - index) === 1 || Math.abs(emptyIndex - index) === 2) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = null;
      setTiles(newTiles);
    }
  };

  useEffect(() => {
    if (tiles[0] === t.day && tiles[1] === t.month && tiles[2] === t.year) {
      if (!solved) {
        setSolved(true);
        setTimeout(() => setPhase('scratch'), 1000);
      }
    }
  }, [tiles, t, solved]);

  useEffect(() => {
    if (phase === 'scratch' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      // Fill with a metallic/scratch-off looking color
      ctx.fillStyle = '#3a4a54';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some pattern or text
      ctx.fillStyle = '#8696a0';
      ctx.font = '16px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.fillText('// SCRATCH TO REVEAL', canvas.width / 2, canvas.height / 2);
    }
  }, [phase]);

  const handleScratch = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Calculate scale to fix mouse position if canvas is scaled by CSS
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Get clientX/Y from either mouse or touch event
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (!clientX || !clientY) return;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    setScratchProgress(prev => prev + 1);
  };

  if (phase === 'scratch') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ 
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: 9999,
          background: 'rgba(7, 7, 15, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '16px',
          gap: '20px'
        }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
        >
          <p style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '14px',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            textShadow: 'var(--glow-red)'
          }}>
            // NEW_RECORD_UNLOCKED
          </p>

          <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,0.6)', background: '#111' }}>
            <img 
              src={acteImg} 
              alt="Acte de Marriage" 
              style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', display: 'block', pointerEvents: 'none' }} 
            />
            <canvas
              ref={canvasRef}
              width={1000}
              height={700}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none' }}
              onMouseDown={() => isDrawing.current = true}
              onMouseUp={() => isDrawing.current = false}
              onMouseLeave={() => isDrawing.current = false}
              onMouseMove={handleScratch}
              onTouchStart={() => isDrawing.current = true}
              onTouchEnd={() => isDrawing.current = false}
              onTouchMove={handleScratch}
            />
          </div>

          <AnimatePresence>
            {scratchProgress > 60 && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onUnlock}
                style={{
                  padding: '12px 32px',
                  background: 'var(--cyan)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontFamily: "'JetBrains Mono',monospace",
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '16px',
                  boxShadow: 'var(--glow-cyan)'
                }}
              >
                NEXT ›
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '420px', width: '100%' }}>

      <p style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        letterSpacing: '0.25em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        marginBottom: '12px'
      }}>
        // memory_puzzle
      </p>

      <h2 style={{
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--text)',
        marginBottom: '6px'
      }}>
        Arrange the Anniversary Date
      </h2>

      <p style={{
        fontSize: '12px',
        color: 'var(--text-muted)',
        fontFamily: "'JetBrains Mono',monospace",
        marginBottom: '32px'
      }}>
        Format: DD / MM / YYYY / _
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        marginBottom: '28px'
      }}>
        {tiles.map((tile, i) => (
          <motion.div
            key={i}
            onClick={() => handleTileClick(i)}
            whileHover={tile ? { scale: 1.04 } : {}}
            whileTap={tile ? { scale: 0.96 } : {}}
            animate={solved ? { borderColor: 'var(--cyan)' } : {}}
            style={{
              height: '72px',
              background: tile
                ? solved
                  ? 'rgba(0,212,255,0.1)'
                  : 'var(--surface)'
                : 'var(--bg)',
              border: tile
                ? solved
                  ? '1px solid rgba(0,212,255,0.4)'
                  : '1px solid var(--border-2)'
                : '1px dashed var(--border)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 700,
              fontFamily: "'JetBrains Mono',monospace",
              cursor: tile ? 'pointer' : 'default',
              color: solved ? 'var(--cyan)' : 'var(--text)',
              transition: 'all 0.2s ease',
            }}
          >
            {tile ?? ''}
          </motion.div>
        ))}
      </div>

      <p style={{
        fontSize: '11px',
        fontFamily: "'JetBrains Mono',monospace",
        color: 'var(--text-muted)',
        fontStyle: 'italic'
      }}>
        {solved ? '// memory restored ✓' : '// click a tile next to the empty space'}
      </p>
    </div>
  );
}
