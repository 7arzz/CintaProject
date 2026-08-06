import React, { useState } from 'react';
import MemoryWhatsApp from './MemoryWhatsApp';
import MemoryPuzzle from './MemoryPuzzle';
import MemoryChatDrag from './MemoryChatDrag';

export default function ArchiveStage() {
  const [unlockedFolders, setUnlockedFolders] = useState(['Memories']);
  const [activeFolder, setActiveFolder] = useState('Memories');
  const [activeFile, setActiveFile] = useState(null);

  const unlockFolder = (folderName) => {
    if (!unlockedFolders.includes(folderName)) {
      setUnlockedFolders([...unlockedFolders, folderName]);
    }
  };

  const folders = [
    { name: 'Memories', locked: false, icon: '📁' },
    { name: 'Records', locked: !unlockedFolders.includes('Records'), icon: '📁' },
    { name: 'Hidden', locked: !unlockedFolders.includes('Hidden'), icon: '📁' },
    { name: 'Final', locked: !unlockedFolders.includes('Final'), icon: '📁' }
  ];

  const handleFolderClick = (folder) => {
    if (!folder.locked) {
      setActiveFolder(folder.name);
      setActiveFile(null); // Reset active file when changing folder
    } else {
      alert("This folder is locked. Restore memories to unlock it.");
    }
  };

  return (
    <div className="min-h-screen w-screen p-2 sm:p-4 md:p-8 flex flex-col bg-black font-sans">
      <div className="flex-1 flex flex-col bg-[#111111] border-2 border-[#333333] shadow-[0_0_20px_rgba(230,0,18,0.3)] overflow-hidden mx-auto w-full max-w-5xl rounded-md relative">
        
        {/* Title Bar (Red) */}
        <div className="bg-[#E60012] text-white px-3 py-2 flex justify-between font-bold text-sm sm:text-base border-b border-[#E60012] shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📁</span>
            <span>RIVER_ARCHIVE.EXE</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="cursor-pointer hover:text-black transition-colors">—</span>
            <span className="cursor-pointer hover:text-black transition-colors">□</span>
            <span className="cursor-pointer hover:text-black transition-colors text-lg">×</span>
          </div>
        </div>

        {/* Top Menu Bar (Dark) */}
        <div className="bg-[#1a1a1a] border-b border-[#333] px-3 py-1 text-xs text-gray-300 flex gap-4">
          <span className="hover:bg-[#333] px-2 py-1 cursor-pointer">File</span>
          <span className="hover:bg-[#333] px-2 py-1 cursor-pointer">Edit</span>
          <span className="hover:bg-[#333] px-2 py-1 cursor-pointer">View</span>
          <span className="hover:bg-[#333] px-2 py-1 cursor-pointer">Help</span>
        </div>

        {/* Address Bar */}
        <div className="bg-[#111] border-b border-[#333] p-2 flex items-center gap-2">
          <span className="text-gray-400">Address:</span>
          <div className="flex-1 bg-[#222] border border-[#444] text-gray-300 px-2 py-1 text-sm flex items-center gap-2 font-mono">
            <span>C:\River\Archive\{activeFolder}</span>
            {activeFile && <span>\{activeFile}.exe</span>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar / Left Pane */}
          <div className="w-full md:w-56 lg:w-64 border-b-2 md:border-b-0 md:border-r-2 border-[#333] bg-[#1a1a1a] text-gray-200 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible md:overflow-y-auto">
            <h3 className="hidden md:block p-4 mb-2 border-b border-[#333] font-semibold text-[#00C3E3] tracking-wide text-sm uppercase">System Folders</h3>
            <ul className="flex flex-row md:flex-col list-none p-2 md:p-3 m-0 gap-1">
              {folders.map(folder => (
                <li 
                  key={folder.name} 
                  onClick={() => handleFolderClick(folder)}
                  className={`
                    p-2 rounded-sm flex items-center gap-3 whitespace-nowrap md:whitespace-normal transition-colors
                    ${folder.locked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#333]'}
                    ${activeFolder === folder.name ? 'bg-[#00C3E3] text-black font-bold' : ''}
                  `}
                >
                  <span className="text-xl">{folder.icon}</span>
                  <span className="text-sm">{folder.name}</span>
                  {folder.locked && <span className="ml-auto text-xs text-[#E60012]">🔒</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content Area (Right Pane) */}
          <div className="flex-1 bg-[#0a0a0a] text-white relative overflow-y-auto p-4 sm:p-6 flex flex-col">
            
            {/* Folder: Memories (Case 1) */}
            {activeFolder === 'Memories' && !activeFile && (
              <div 
                onClick={() => setActiveFile('FirstContact')} 
                className="cursor-pointer inline-flex flex-col items-center justify-center p-4 border border-transparent hover:bg-[#222] hover:border-[#00C3E3] rounded transition-colors w-32 h-32 self-start"
              >
                <div className="text-5xl mb-2 text-white">💬</div>
                <div className="text-sm text-center font-medium font-mono text-[#00C3E3]">FirstContact.exe</div>
              </div>
            )}
            {activeFolder === 'Memories' && activeFile === 'FirstContact' && (
              <div className="flex-1 flex justify-center items-center">
                <MemoryWhatsApp onUnlock={() => {
                  alert("Memory Restored! Folder 'Records' is now open.");
                  unlockFolder('Records');
                  setActiveFile(null);
                  setActiveFolder('Records');
                }} />
              </div>
            )}

            {/* Folder: Records (Case 2) */}
            {activeFolder === 'Records' && !activeFile && (
              <div 
                onClick={() => setActiveFile('Anniversary')} 
                className="cursor-pointer inline-flex flex-col items-center justify-center p-4 border border-transparent hover:bg-[#222] hover:border-[#00C3E3] rounded transition-colors w-32 h-32 self-start"
              >
                <div className="text-5xl mb-2">🧩</div>
                <div className="text-sm text-center font-medium font-mono text-[#00C3E3]">Anniversary.exe</div>
              </div>
            )}
            {activeFolder === 'Records' && activeFile === 'Anniversary' && (
              <div className="flex-1 flex justify-center items-center">
                <MemoryPuzzle onUnlock={() => {
                  alert("Memory Restored! Folder 'Hidden' is now open.");
                  unlockFolder('Hidden');
                  setActiveFile(null);
                  setActiveFolder('Hidden');
                }} />
              </div>
            )}

            {/* Folder: Hidden (Case 3) */}
            {activeFolder === 'Hidden' && !activeFile && (
              <div 
                onClick={() => setActiveFile('Separation')} 
                className="cursor-pointer inline-flex flex-col items-center justify-center p-4 border border-transparent hover:bg-[#222] hover:border-[#00C3E3] rounded transition-colors w-32 h-32 self-start"
              >
                <div className="text-5xl mb-2">💔</div>
                <div className="text-sm text-center font-medium font-mono text-[#00C3E3]">Separation.exe</div>
              </div>
            )}
            {activeFolder === 'Hidden' && activeFile === 'Separation' && (
              <div className="flex-1 flex justify-center items-center">
                <MemoryChatDrag onUnlock={() => {
                  alert("Memory Restored! 'Some endings are still worth remembering.' Folder 'Final' is now open.");
                  unlockFolder('Final');
                  setActiveFile(null);
                  setActiveFolder('Final');
                }} />
              </div>
            )}

            {/* Folder: Final (Scrapbook) */}
            {activeFolder === 'Final' && (
              <div className="flex-1 flex flex-col justify-center items-center gap-6">
                <div className="text-center text-gray-300 mb-4 max-w-md bg-[#1a1a1a] p-4 border border-[#333]">
                  <p className="font-mono text-sm">System diagnostic complete.</p>
                  <p className="font-medium mt-2 text-[#00C3E3]">All memories successfully extracted.</p>
                </div>
                <div 
                  onClick={() => {
                    alert("Launching Archive...");
                    window.location.href = 'https://canva.com/scrapbook-river'; // Placeholder Link
                  }} 
                  className="cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-[#E60012] bg-[#1a1a1a] hover:bg-[#333] rounded transition-all shadow-[0_0_15px_#E60012] transform hover:scale-105"
                >
                  <div className="text-6xl mb-4 drop-shadow-md">🎁</div>
                  <div className="text-lg font-bold text-[#E60012] font-mono">SCRAPBOOK.exe</div>
                </div>
              </div>
            )}

          </div>
        </div>
        
        {/* Status Bar */}
        <div className="bg-[#111] border-t border-[#333] px-3 py-1 flex justify-between text-xs text-gray-400">
          <span>{folders.filter(f => !f.locked).length} object(s) unlocked</span>
          <span>My Computer</span>
        </div>
      </div>
    </div>
  );
}
