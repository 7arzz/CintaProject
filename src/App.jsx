import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BrokenLinkStage from './components/BrokenLinkStage';
import LandingStage from './components/LandingStage';
import ArchiveStage from './components/ArchiveStage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BrokenLinkStage />} />
        <Route path="/landing" element={<LandingStage />} />
        <Route path="/archive/*" element={<ArchiveStage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
