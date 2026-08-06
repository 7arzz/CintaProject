import React, { useState } from 'react';
import { GAME_DATA } from '../data';

export default function MemoryWhatsApp({ onUnlock }) {
  const [input, setInput] = useState('');
  // Target sentence from config
  const target = GAME_DATA.firstContactChat;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === target.toLowerCase()) {
      onUnlock();
    } else {
      alert('Incorrect memory.');
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', border: '1px solid #333', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '500px' }}>
      <div style={{ backgroundColor: '#075e54', color: 'white', padding: '15px', fontWeight: 'bold' }}>
        River
      </div>
      <div style={{ flex: 1, backgroundColor: '#ece5dd', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
        
        <div style={{ backgroundColor: '#fff', color: '#000', padding: '10px', borderRadius: '10px', alignSelf: 'flex-start', maxWidth: '80%' }}>
          Pesan sebelumnya terenkripsi...
        </div>
        <div style={{ backgroundColor: '#dcf8c6', color: '#000', padding: '10px', borderRadius: '10px', alignSelf: 'flex-end', maxWidth: '80%' }}>
          Menunggu input memory pertama untuk merestore riwayat.
        </div>
        
        <div style={{ marginTop: 'auto', backgroundColor: 'rgba(0,0,0,0.1)', color: '#333', padding: '10px', borderRadius: '10px', textAlign: 'center', fontStyle: 'italic', fontSize: '0.9rem' }}>
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
