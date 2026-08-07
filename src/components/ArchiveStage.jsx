import React, { useState } from 'react';
import MemoryWhatsApp from './MemoryWhatsApp';
import MemoryPuzzle from './MemoryPuzzle';
import MemoryChatDrag from './MemoryChatDrag';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_DATA } from '../data';

const FOLDERS = [
  { name: 'Memories',  icon: '💬', desc: 'First Contact' },
  { name: 'Records',   icon: '🧩', desc: 'Anniversary' },
  { name: 'Hidden',    icon: '💔', desc: 'Separation' },
  { name: 'Final',     icon: '🎁', desc: 'Archive' },
];

export default function ArchiveStage() {
  const [unlockedFolders, setUnlockedFolders] = useState(['Memories']);
  const [activeFolder, setActiveFolder]       = useState('Memories');
  const [activeFile, setActiveFile]           = useState(null);
  const [lockedFlash, setLockedFlash]         = useState(null);
  const [isSidebarOpen, setIsSidebarOpen]     = useState(false);

  const unlockFolder = (name) => {
    if (!unlockedFolders.includes(name)) {
      setUnlockedFolders(prev => [...prev, name]);
    }
  };

  const handleFolderClick = (folder) => {
    if (!unlockedFolders.includes(folder.name)) {
      setLockedFlash(folder.name);
      setTimeout(() => setLockedFlash(null), 800);
      return;
    }
    setActiveFolder(folder.name);
    setActiveFile(null);
    setIsSidebarOpen(false); // Close sidebar on mobile when an item is clicked
  };

  const FILE_MAP = {
    Memories: { file: 'FirstContact', label: 'FirstContact.exe', icon: '💬' },
    Records:  { file: 'Anniversary',  label: 'Anniversary.exe',  icon: '🧩' },
    Hidden:   { file: 'Separation',   label: 'Separation.exe',   icon: '💔' },
  };

  return (
    <div style={{
      height: '100vh', width: '100vw',
      background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      padding: '12px',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Window Container */}
      <div style={{
        flex: 1,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '960px',
        margin: '0 auto',
        width: '100%',
        boxShadow: '0 0 40px rgba(255,45,85,0.08), 0 0 80px rgba(0,212,255,0.04)'
      }}>

        {/* ── Title Bar ── */}
        <div style={{
          background: 'var(--surface-2)',
          borderBottom: '1px solid var(--border)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
              RIVER_ARCHIVE.EXE
            </span>
            <span className="badge-red">v1.0</span>
          </div>
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
              <div key={i} style={{
                width: 11, height: 11, borderRadius: '50%',
                background: c, opacity: 0.8
              }} />
            ))}
          </div>
        </div>

        {/* ── Menu Bar ── */}
        <div style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '4px 12px',
          display: 'flex',
          gap: '2px'
        }}>
          {['File', 'Edit', 'View', 'Help'].map(m => (
            <span key={m} style={{
              padding: '3px 10px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              borderRadius: '4px',
              cursor: 'default',
              fontFamily: "'JetBrains Mono', monospace"
            }}>{m}</span>
          ))}
        </div>

        {/* ── Address Bar ── */}
        <div style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {/* Hamburger Menu for Mobile */}
          <button 
            className="md:hidden" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '0 4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            ☰
          </button>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>›</span>
          <div style={{
            flex: 1,
            background: 'var(--bg)',
            border: '1px solid var(--border-2)',
            borderRadius: '4px',
            padding: '4px 10px',
            fontSize: '12px',
            fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--text-sub)',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <span style={{ color: 'var(--accent)', opacity: 0.7 }}>C:\</span>
            <span>River\Archive\{activeFolder}</span>
            {activeFile && <span style={{ color: 'var(--text-muted)' }}>\{activeFile}.exe</span>}
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

          {/* Sidebar */}
          <div className={`${isSidebarOpen ? 'flex' : 'hidden'} md:flex absolute md:relative z-40 h-full`} style={{
            width: '180px',
            background: 'var(--bg)',
            borderRight: '1px solid var(--border)',
            flexDirection: 'column',
            padding: '12px 8px',
            gap: '2px',
            flexShrink: 0
          }}>
            <p style={{
              fontSize: '9px', letterSpacing: '0.25em', color: 'var(--text-muted)',
              textTransform: 'uppercase',
              padding: '0 8px',
              marginBottom: '8px',
              fontFamily: "'JetBrains Mono', monospace"
            }}>
              Folders
            </p>
            {FOLDERS.map(folder => {
              const isLocked  = !unlockedFolders.includes(folder.name);
              const isActive  = activeFolder === folder.name;
              const isFlashing = lockedFlash === folder.name;

              return (
                <motion.div
                  key={folder.name}
                  onClick={() => handleFolderClick(folder)}
                  animate={isFlashing ? { x: [-4, 4, -4, 0] } : {}}
                  transition={{ duration: 0.25 }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '5px',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: isActive
                      ? 'rgba(0,212,255,0.1)'
                      : 'transparent',
                    border: isActive
                      ? '1px solid rgba(0,212,255,0.2)'
                      : '1px solid transparent',
                    opacity: isLocked ? 0.4 : 1,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{folder.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '12px',
                      color: isActive ? 'var(--cyan)' : 'var(--text)',
                      fontWeight: isActive ? 600 : 400,
                      lineHeight: 1.2
                    }}>{folder.name}</p>
                    <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{folder.desc}</p>
                  </div>
                  {isLocked && (
                    <span style={{ fontSize: '10px', color: 'var(--accent)' }}>🔒</span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Main Content */}
          <div style={{
            flex: 1,
            background: 'var(--bg)',
            overflow: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <AnimatePresence mode="wait">

              {/* File icon view (no active file) */}
              {activeFolder !== 'Final' && !activeFile && FILE_MAP[activeFolder] && (
                <motion.div
                  key={`icon-${activeFolder}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <FileIcon
                    icon={FILE_MAP[activeFolder].icon}
                    label={FILE_MAP[activeFolder].label}
                    onClick={() => setActiveFile(FILE_MAP[activeFolder].file)}
                  />
                </motion.div>
              )}

              {/* Memories → FirstContact */}
              {activeFolder === 'Memories' && activeFile === 'FirstContact' && (
                <motion.div
                  key="whatsapp"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <MemoryWhatsApp onUnlock={() => {
                    unlockFolder('Records');
                    setActiveFile(null);
                    setActiveFolder('Records');
                  }} />
                </motion.div>
              )}

              {/* Records → Anniversary */}
              {activeFolder === 'Records' && activeFile === 'Anniversary' && (
                <motion.div
                  key="puzzle"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <MemoryPuzzle onUnlock={() => {
                    unlockFolder('Hidden');
                    setActiveFile(null);
                    setActiveFolder('Hidden');
                  }} />
                </motion.div>
              )}

              {/* Hidden → Separation */}
              {activeFolder === 'Hidden' && activeFile === 'Separation' && (
                <motion.div
                  key="drag"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <MemoryChatDrag onUnlock={() => {
                    unlockFolder('Final');
                    setActiveFile(null);
                    setActiveFolder('Final');
                  }} />
                </motion.div>
              )}

              {/* Final */}
              {activeFolder === 'Final' && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    flex: 1, display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '24px'
                  }}
                >
                  <div style={{
                    textAlign: 'center',
                    padding: '16px 24px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    maxWidth: '340px'
                  }}>
                    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', color: 'var(--text-muted)' }}>
                      // System diagnostic complete.
                    </p>
                    <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--cyan)' }}>
                      All memories successfully extracted.
                    </p>
                  </div>

                  <motion.div
                    onClick={() => { window.location.href = GAME_DATA.scrapbookLink; }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '28px 36px',
                      background: 'var(--surface)',
                      border: '1px solid var(--accent)',
                      borderRadius: '8px',
                      boxShadow: 'var(--glow-red)',
                      gap: '12px',
                    }}
                  >
                    <span style={{ fontSize: '3rem' }}>🎁</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: '13px',
                      color: 'var(--accent)',
                      letterSpacing: '0.15em'
                    }}>
                      SCRAPBOOK.exe
                    </span>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* ── Status Bar ── */}
        <div style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          padding: '4px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>
            {unlockedFolders.length} / {FOLDERS.length} unlocked
          </span>
          <span className="badge-cyan">SECURE</span>
        </div>
      </div>
    </div>
  );
}

function FileIcon({ icon, label, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        borderRadius: '8px',
        width: '110px',
        height: '110px',
        cursor: 'pointer',
        background: hovered ? 'var(--surface-2)' : 'transparent',
        border: hovered ? '1px solid rgba(0,212,255,0.25)' : '1px solid transparent',
        transition: 'all 0.15s ease',
        gap: '10px'
      }}
    >
      <span style={{ fontSize: '2.2rem' }}>{icon}</span>
      <span style={{
        fontSize: '11px',
        fontFamily: "'JetBrains Mono', monospace",
        color: hovered ? 'var(--cyan)' : 'var(--text-sub)',
        textAlign: 'center',
        lineHeight: 1.3,
        transition: 'color 0.15s'
      }}>{label}</span>
    </div>
  );
}
