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
    { name: 'Memories', locked: false, icon: '🎮' },
    { name: 'Records', locked: !unlockedFolders.includes('Records'), icon: '🧩' },
    { name: 'Hidden', locked: !unlockedFolders.includes('Hidden'), icon: '💔' },
    { name: 'Final', locked: !unlockedFolders.includes('Final'), icon: '🎁' }
  ];

  const handleFolderClick = (folder) => {
    if (!folder.locked) {
      setActiveFolder(folder.name);
      setActiveFile(null);
    } else {
      alert("Level is locked. Complete the previous stage first.");
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-black p-4 md:p-8 font-sans">
      
      {/* Nintendo Switch Console Frame */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-[2rem] md:rounded-[3rem] border-[8px] border-[#222] bg-[#1a1a1a] overflow-hidden relative">
        
        {/* Left Joy-Con (Blue) */}
        <div className="hidden md:flex w-24 bg-[#00C3E3] flex-col items-center justify-start pt-16 rounded-l-[2.5rem] border-r-8 border-[#111]">
          <div className="w-8 h-8 rounded-full bg-[#111] mb-8 shadow-inner"></div>
          <div className="grid grid-cols-3 gap-1 mb-8">
             <div className="col-start-2 w-4 h-4 bg-[#111] rounded-full"></div>
             <div className="col-start-1 w-4 h-4 bg-[#111] rounded-full"></div>
             <div className="col-start-3 w-4 h-4 bg-[#111] rounded-full"></div>
             <div className="col-start-2 w-4 h-4 bg-[#111] rounded-full"></div>
          </div>
          <div className="w-6 h-6 rounded-sm bg-[#111] mt-12"></div>
        </div>

        {/* Center Screen */}
        <div className="flex-1 flex flex-col min-h-[70vh] md:min-h-[600px] bg-[#1a1a1a] text-white overflow-hidden relative">
          
          {/* Top Navbar */}
          <div className="flex items-center justify-between p-4 border-b border-[#333] bg-[#111]">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold">R</div>
               <span className="font-bold tracking-widest text-sm text-gray-300">RIVER ARCHIVE SYSTEM</span>
            </div>
            <div className="text-gray-400 text-sm">100% 🔋</div>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            
            {/* Sidebar / Top Nav */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#333] bg-[#222] flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto p-4 gap-2">
              <h3 className="hidden md:block text-gray-400 font-bold mb-4 tracking-widest text-sm uppercase">Stages</h3>
              {folders.map((folder, index) => (
                <button 
                  key={folder.name} 
                  onClick={() => handleFolderClick(folder)}
                  className={`
                    w-full text-left px-4 py-3 rounded-full flex items-center gap-3 transition-all duration-200 font-bold
                    ${folder.locked ? 'opacity-50 cursor-not-allowed bg-[#111] text-gray-500' : 'cursor-pointer hover:bg-[#333] hover:scale-105 active:scale-95'}
                    ${activeFolder === folder.name ? 'bg-white text-black hover:bg-gray-200' : 'text-gray-300'}
                  `}
                >
                  <span className="text-xl">{folder.icon}</span>
                  <span className="hidden sm:inline">Stage {index + 1}: {folder.name}</span>
                  {folder.locked && <span className="ml-auto text-sm text-red-500">🔒</span>}
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-[#1a1a1a] p-6 overflow-y-auto relative flex flex-col">
              
              {/* Header Path */}
              <div className="text-xs font-bold text-gray-500 mb-6 uppercase tracking-wider flex items-center gap-2">
                <span className="text-[#00C3E3]">Home</span> 
                <span>/</span> 
                <span className="text-[#E60012]">{activeFolder}</span>
              </div>

              {/* Folder: Memories (Case 1) */}
              {activeFolder === 'Memories' && !activeFile && (
                <div 
                  onClick={() => setActiveFile('FirstContact')} 
                  className="cursor-pointer group flex flex-col items-center justify-center p-8 bg-[#222] hover:bg-[#E60012] border-2 border-transparent hover:border-white rounded-3xl transition-all duration-300 w-40 h-40 self-start shadow-lg"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">💬</div>
                  <div className="text-sm text-center font-bold text-gray-300 group-hover:text-white">Start Level</div>
                </div>
              )}
              {activeFolder === 'Memories' && activeFile === 'FirstContact' && (
                <div className="flex-1 flex justify-center items-center">
                  <MemoryWhatsApp onUnlock={() => {
                    alert("Level Cleared! Stage 2 unlocked.");
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
                  className="cursor-pointer group flex flex-col items-center justify-center p-8 bg-[#222] hover:bg-[#E60012] border-2 border-transparent hover:border-white rounded-3xl transition-all duration-300 w-40 h-40 self-start shadow-lg"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🧩</div>
                  <div className="text-sm text-center font-bold text-gray-300 group-hover:text-white">Start Level</div>
                </div>
              )}
              {activeFolder === 'Records' && activeFile === 'Anniversary' && (
                <div className="flex-1 flex justify-center items-center">
                  <MemoryPuzzle onUnlock={() => {
                    alert("Level Cleared! Stage 3 unlocked.");
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
                  className="cursor-pointer group flex flex-col items-center justify-center p-8 bg-[#222] hover:bg-[#E60012] border-2 border-transparent hover:border-white rounded-3xl transition-all duration-300 w-40 h-40 self-start shadow-lg"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">💔</div>
                  <div className="text-sm text-center font-bold text-gray-300 group-hover:text-white">Start Level</div>
                </div>
              )}
              {activeFolder === 'Hidden' && activeFile === 'Separation' && (
                <div className="flex-1 flex justify-center items-center">
                  <MemoryChatDrag onUnlock={() => {
                    alert("Level Cleared! Final Stage unlocked.");
                    unlockFolder('Final');
                    setActiveFile(null);
                    setActiveFolder('Final');
                  }} />
                </div>
              )}

              {/* Folder: Final (Scrapbook) */}
              {activeFolder === 'Final' && (
                <div className="flex-1 flex flex-col justify-center items-center gap-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#00C3E3] mb-2 uppercase tracking-widest">Congratulations</h2>
                    <p className="text-gray-400">You have completed all stages.</p>
                  </div>
                  <div 
                    onClick={() => {
                      alert("Launching Archive...");
                      window.location.href = 'https://canva.com/scrapbook-river'; // Placeholder Link
                    }} 
                    className="cursor-pointer group flex flex-col items-center justify-center p-10 bg-gradient-to-br from-[#E60012] to-[#ff4d5a] border-4 border-white rounded-[2rem] transition-all shadow-[0_0_30px_rgba(230,0,18,0.5)] transform hover:scale-110 active:scale-95"
                  >
                    <div className="text-7xl mb-4 drop-shadow-lg group-hover:animate-bounce">🎁</div>
                    <div className="text-xl font-black text-white tracking-widest">CLAIM REWARD</div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Joy-Con (Red) */}
        <div className="hidden md:flex w-24 bg-[#E60012] flex-col items-center justify-start pt-12 rounded-r-[2.5rem] border-l-8 border-[#111]">
           <div className="grid grid-cols-3 gap-1 mb-12">
             <div className="col-start-2 w-4 h-4 bg-[#111] rounded-full text-white text-[8px] flex items-center justify-center font-bold">X</div>
             <div className="col-start-1 w-4 h-4 bg-[#111] rounded-full text-white text-[8px] flex items-center justify-center font-bold">Y</div>
             <div className="col-start-3 w-4 h-4 bg-[#111] rounded-full text-white text-[8px] flex items-center justify-center font-bold">A</div>
             <div className="col-start-2 w-4 h-4 bg-[#111] rounded-full text-white text-[8px] flex items-center justify-center font-bold">B</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#111] shadow-inner mb-12"></div>
          <div className="w-6 h-6 rounded-full bg-[#111] mt-4"></div>
        </div>

      </div>
    </div>
  );
}
