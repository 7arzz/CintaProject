import React, { useState } from 'react';

export default function MemoryWhatsApp({ onUnlock }) {
  const [input, setInput] = useState('');
  // Target sentence (placeholder)
  const target = 'halo';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === target.toLowerCase()) {
      onUnlock();
    } else {
      alert('Incorrect memory.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '500px' }}>
      <div style={{ backgroundColor: '#075e54', color: 'white', padding: '15px', fontWeight: 'bold' }}>
        River
      </div>
      <div style={{ flex: 1, backgroundColor: '#ece5dd', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Placeholder Chat Bubbles */}
        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '10px', alignSelf: 'flex-start', maxWidth: '70%' }}>
          ...
        </div>
        <div style={{ backgroundColor: '#dcf8c6', padding: '10px', borderRadius: '10px', alignSelf: 'flex-end', maxWidth: '70%' }}>
          ...
        </div>
        
        <div style={{ marginTop: 'auto', backgroundColor: 'rgba(255,255,255,0.5)', padding: '10px', borderRadius: '10px', textAlign: 'center', fontStyle: 'italic' }}>
          Instruction: Masukkan kalimat pertama yang pernah kamu kirim.
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ccc', outline: 'none' }}
          placeholder="Type a message"
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px 15px', borderRadius: '50%', border: 'none', backgroundColor: '#25d366', color: 'white', cursor: 'pointer' }}>
          ➤
        </button>
      </form>
    </div>
  );
}
