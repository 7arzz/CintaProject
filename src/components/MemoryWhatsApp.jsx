import React, { useState } from 'react';
import { GAME_DATA } from '../data';import dazaiImg from '../assets/dazai.jpg';

export default function MemoryWhatsApp({ onUnlock }) {
  const [input, setInput] = useState('');
  const [denied, setDenied] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState(null);
  const chatRef = React.useRef(null);
  const target = GAME_DATA.firstContactChat;

  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [submittedMsg, denied]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === target.toLowerCase()) {
      setSubmittedMsg(input);
      setInput('');
      setTimeout(() => {
        onUnlock();
      }, 1500);
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
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>Rp. Dewaᵃᶜᵃ'ᴬᵛᶻ..  ( ? )</p>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>encrypted</p>
        </div>
      </div>

      {/* Chat Body */}
      <div 
        ref={chatRef}
        style={{
        flex: 1,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        overflowY: 'auto',
        background: '#0b141a', // WhatsApp Web dark background
      }}>
        {/* Date */}
        <div style={{
          alignSelf: 'center',
          background: '#182229',
          color: '#8496a0',
          fontSize: '12px',
          padding: '4px 12px',
          borderRadius: '8px',
          marginBottom: '8px',
          marginTop: '4px'
        }}>
          November 30, 2025
        </div>

        {/* Incoming 1 */}
        <div style={{
          alignSelf: 'flex-start',
          background: '#202c33',
          borderRadius: '0 8px 8px 8px',
          padding: '6px 7px 8px 9px',
          maxWidth: '80%',
          color: '#e9edef',
          fontSize: '14.2px',
          position: 'relative',
          marginBottom: '2px'
        }}>
          Woi parit
          <span style={{ float: 'right', fontSize: '11px', color: '#8696a0', marginLeft: '12px', marginTop: '4px' }}>17:07</span>
        </div>

        {/* Outgoing 1 */}
        <div style={{
          alignSelf: 'flex-end',
          background: '#005c4b',
          borderRadius: '8px 0 8px 8px',
          padding: '6px 7px 8px 9px',
          maxWidth: '80%',
          color: '#e9edef',
          fontSize: '14.2px',
          marginBottom: '2px'
        }}>
          apaan den?
          <span style={{ float: 'right', fontSize: '11px', color: '#8696a0', marginLeft: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
            17:07
            <span style={{ color: '#53bdeb', fontSize: '14px', lineHeight: 1 }}>✓✓</span>
          </span>
        </div>

        {/* Outgoing 2 */}
        <div style={{
          alignSelf: 'flex-end',
          background: '#005c4b',
          borderRadius: '8px 8px 8px 8px',
          padding: '6px 7px 8px 9px',
          maxWidth: '80%',
          color: '#e9edef',
          fontSize: '14.2px',
          marginBottom: '2px'
        }}>
          mana, sini buruan
          <span style={{ float: 'right', fontSize: '11px', color: '#8696a0', marginLeft: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
            17:07
            <span style={{ color: '#53bdeb', fontSize: '14px', lineHeight: 1 }}>✓✓</span>
          </span>
        </div>

        {/* Incoming 2 (Image) */}
        <div style={{
          alignSelf: 'flex-start',
          background: '#202c33',
          borderRadius: '0 8px 8px 8px',
          padding: '4px',
          maxWidth: '80%',
          width: '240px',
          color: '#e9edef',
          fontSize: '14.2px',
          marginBottom: '2px',
          position: 'relative'
        }}>
          <img src={dazaiImg} alt="dazai" style={{ width: '100%', borderRadius: '6px', display: 'block' }} />
          <div style={{ padding: '4px 4px 2px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span>Nyoh</span>
            <span style={{ fontSize: '11px', color: '#8696a0' }}>17:08</span>
          </div>
        </div>

        {/* Instruction */}
        {!submittedMsg && (
          <div style={{
            marginTop: 'auto',
            background: 'transparent',
            paddingTop: '12px',
            textAlign: 'center',
            fontSize: '11px',
            fontFamily: "'JetBrains Mono',monospace",
            color: 'var(--text-muted)',
            fontStyle: 'italic'
          }}>
            // Masukkan balasan selanjutnya
          </div>
        )}

        {/* Submitted Message */}
        {submittedMsg && (
          <div style={{
            alignSelf: 'flex-end',
            background: '#005c4b',
            borderRadius: '8px 8px 8px 8px',
            padding: '6px 7px 8px 9px',
            maxWidth: '80%',
            color: '#e9edef',
            fontSize: '14.2px',
            marginTop: '8px',
            marginBottom: '2px'
          }}>
            {submittedMsg}
            <span style={{ float: 'right', fontSize: '11px', color: '#8696a0', marginLeft: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
              17:09
              <span style={{ color: '#8696a0', fontSize: '12px', lineHeight: 1 }}>✓</span>
            </span>
          </div>
        )}

        {denied && (
          <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono',monospace", marginTop: '4px' }}>
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
