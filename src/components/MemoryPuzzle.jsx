import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_DATA } from '../data';

export default function MemoryPuzzle({ onUnlock }) {
  const t = GAME_DATA.anniversaryTarget;
  const initialTiles = [t.year, t.day, null, t.month];
  const [tiles, setTiles] = useState(initialTiles);
  const [solved, setSolved] = useState(false);

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
      setSolved(true);
      setTimeout(() => onUnlock(), 800);
    }
  }, [tiles, onUnlock, t]);

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
