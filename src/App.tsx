import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Chapter1 from './pages/chapters/Chapter1';
import Chapter2 from './pages/chapters/Chapter2';
import Chapter3 from './pages/chapters/Chapter3';
import Chapter4 from './pages/chapters/Chapter4';
import Fireflies from './components/Fireflies';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/chapter1/*" element={<Chapter1 />} />
        <Route path="/chapter2" element={<Chapter2 />} />
        <Route path="/chapter3" element={<Chapter3 />} />
        <Route path="/chapter4" element={<Chapter4 />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-black">
        <Fireflies count={20} />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;