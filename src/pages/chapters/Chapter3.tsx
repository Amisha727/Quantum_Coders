import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
  {
    title: 'The Potions Class',
    content: [
      {
        type: 'narration',
        text: 'The dungeon classroom was filled with swirling vapors and the soft bubbling of cauldrons. Professor Nightshade stood at the front, her emerald robes gleaming in the torchlight.'
      },
      {
        type: 'dialogue',
        speaker: 'Professor Nightshade',
        text: 'Today, we will be brewing the Draught of Peace - a potion to calm anxiety and soothe agitation.'
      }
    ],
    background: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXBrcW1wb3VvdXFrYjV2eWMwdWxyeHdidjl4d2lxN3dmc2x4YW0zdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cDrBMKdYOYGCA/giphy.gif'
  },
  {
    title: 'The Brewing Process',
    content: [
      {
        type: 'action',
        text: 'Silver vapor rises from the cauldron as the moonstone powder is added.'
      },
      {
        type: 'dialogue',
        speaker: 'Professor Nightshade',
        text: 'Notice the silver vapor - that\'s exactly what we want to see. Now, add three drops of syrup of hellebore...'
      }
    ],
    background: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWthb3gyNjZtaGE3ZHpnYmF0OWh1emQxeTZlMzU5bjN1ejR6NDA3ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRzozg4TCBXv6QU/giphy.gif'
  }
];

const Cauldron = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="relative w-48 h-48">
      <motion.div
        className="absolute bottom-0 w-48 h-32 bg-[#2a2a2a] rounded-b-full"
        animate={{
          scale: isActive ? [1, 1.02, 1] : 1
        }}
        transition={{
          duration: 1,
          repeat: Infinity
        }}
      />
      {isActive && (
        <motion.div
          className="absolute top-16 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: -50
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          <div className="w-32 h-32 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-md" />
        </motion.div>
      )}
    </div>
  );
};

const Chapter3 = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCauldron, setShowCauldron] = useState(false);

  const handleNext = () => {
    if (currentIndex < pages[currentPage].content.length - 1) {
      setCurrentIndex(prev => prev + 1);
      if (pages[currentPage].content[currentIndex + 1].type === 'spell') {
        setShowCauldron(true);  // Show cauldron animation when spell appears
      }
    } else if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
      setCurrentIndex(0);
      setShowCauldron(false);  // Hide cauldron when moving to the next page
    } else {
      // Navigate to Chapter 4 after completing Chapter 3
      navigate('/chapter4');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${pages[currentPage].background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <button
        onClick={() => navigate('/')}  // Ensure this navigates to HomePage
        className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300"
      >
        <Home className="w-6 h-6 text-white" />
      </button>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-white mb-8">{pages[currentPage].title}</h1>

        {showCauldron && <Cauldron isActive={showCauldron} />}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md p-4 bg-black/50 backdrop-blur-md rounded-lg text-white mt-8"
          >
            {pages[currentPage].content[currentIndex].type === 'dialogue' ? (
              <>
                <span className="font-bold">{pages[currentPage].content[currentIndex].speaker}: </span>
                {pages[currentPage].content[currentIndex].text}
              </>
            ) : (
              pages[currentPage].content[currentIndex].text
            )}
          </motion.div>
        </AnimatePresence>

        <motion.button
          className="absolute bottom-8 right-8 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Chapter3;
