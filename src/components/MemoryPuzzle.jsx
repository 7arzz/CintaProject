import React, { useState, useEffect } from 'react';
import { GAME_DATA } from '../data';

export default function MemoryPuzzle({ onUnlock }) {
  // Target from config
  const t = GAME_DATA.anniversaryTarget;
  // We have 4 slots: 3 numbers + 1 empty
  const initialTiles = [t.year, t.day, null, t.month];
  const [tiles, setTiles] = useState(initialTiles);

  const handleTileClick = (index) => {
    const emptyIndex = tiles.indexOf(null);
    // Check if adjacent (simplified for a 1x4 row or 2x2 grid)
    // Let's just allow swapping with empty if they are next to each other
    if (Math.abs(emptyIndex - index) === 1 || Math.abs(emptyIndex - index) === 2) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = null;
      setTiles(newTiles);
    }
  };

  useEffect(() => {
    // Check win condition
    if (tiles[0] === t.day && tiles[1] === t.month && tiles[2] === t.year) {
      setTimeout(() => {
        onUnlock();
      }, 500);
    }
  }, [tiles, onUnlock, t]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Arrange the Anniversary Date</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '2rem', maxWidth: '400px', margin: '2rem auto' }}>
        {tiles.map((tile, i) => (
          <div 
            key={i} 
            onClick={() => handleTileClick(i)}
            style={{ 
              height: '80px', 
              backgroundColor: tile ? '#0078d7' : '#eee', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              cursor: tile ? 'pointer' : 'default',
              borderRadius: '5px',
              border: tile ? '2px solid #005a9e' : '2px dashed #ccc'
            }}
          >
            {tile}
          </div>
        ))}
      </div>
      <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#666' }}>
        Click a tile next to the empty space to slide it.
      </p>
    </div>
  );
}
