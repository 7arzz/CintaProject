import React, { useState } from 'react';
import { GAME_DATA } from '../data';

export default function MemoryWhatsApp({ onUnlock }) {
  const [input, setInput] = useState('');
  const [denied, setDenied] = useState(false);
  const target = GAME_DATA.firstContactChat;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === target.toLowerCase()) {
      onUnlock();
    } else {
      setDenied(true);
      setTimeout(() => setDenied(false), 1500);
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '380px',
      borderRadius: '10px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '480px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
    }}>

      {/* Header */}
      <div style={{
        background: 'var(--surface-2)',
        borderBottom: '1px solid var(--border)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '32px', height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), var(--cyan))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px'
        }}>R</div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>River</p>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>encrypted</p>
        </div>
      </div>

      {/* Chat Body */}
      <div style={{
        flex: 1,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflowY: 'auto',
        background: 'var(--bg)'
      }}>
        {/* Incoming */}
        <div style={{
          alignSelf: 'flex-start',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '4px 12px 12px 12px',
          padding: '10px 14px',
          maxWidth: '80%',
          fontSize: '13px',
          color: 'var(--text-muted)',
          fontStyle: 'italic'
        }}>
          Pesan sebelumnya terenkripsi...
        </div>

        {/* Outgoing */}
        <div style={{
          alignSelf: 'flex-end',
          background: 'rgba(0,212,255,0.08)',
          border: '1px solid rgba(0,212,255,0.15)',
          borderRadius: '12px 4px 12px 12px',
          padding: '10px 14px',
          maxWidth: '80%',
          fontSize: '13px',
          color: 'var(--text-sub)'
        }}>
          Menunggu input memory pertama...
        </div>

        {/* Instruction */}
        <div style={{
          marginTop: 'auto',
          background: 'transparent',
          borderTop: '1px solid var(--border)',
          paddingTop: '12px',
          textAlign: 'center',
          fontSize: '11px',
          fontFamily: "'JetBrains Mono',monospace",
          color: 'var(--text-muted)',
          fontStyle: 'italic'
        }}>
          // Masukkan kalimat pertama yang pernah kamu kirim
        </div>

        {denied && (
          <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono',monospace" }}>
            // memory incorrect
          </p>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        gap: '8px',
        padding: '12px',
        background: 'var(--surface-2)',
        borderTop: '1px solid var(--border)'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '9px 14px',
            borderRadius: '20px',
            border: '1px solid var(--border-2)',
            outline: 'none',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontSize: '13px',
            fontFamily: "'Inter',sans-serif"
          }}
        />
        <button
          type="submit"
          style={{
            width: '36px', height: '36px',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--accent)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}
        >
          ➤
        </button>
      </form>
    </div>
  );
}
