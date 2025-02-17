import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
  {
    path: '',
    title: 'Defence Against the Dark Arts',
    content: [
      {
        type: 'narration',
        text: 'Third year students of Hufflepuff and Ravenclaw are assembled in their classroom, all looking at a new addition of a full-body mirror wardrobe in front of them.'
      },
      {
        type: 'dialogue',
        speaker: 'Professor Aldren',
        text: "Today, we're going to confront something that every witch and wizard must learn to face: fear."
      }
    ],
    background: 'https://media0.giphy.com/media/Tp2ikAVETWSxHfuxq1/giphy.gif'
  },
  {
    path: 'boggart',
    title: 'The Boggart Lesson',
    content: [
      {
        type: 'dialogue',
        speaker: 'Aditya Klra',
        text: 'A Boggart is a shape-shifting creature that takes the form of whatever it believes will frighten us the most.'
      },
      {
        type: 'dialogue',
        speaker: 'Professor Aldren',
        text: 'Precisely. Boggarts thrive on fear. But, as with many dark creatures, they have a weakness. Laughter.'
      }
    ],
    background: 'https://images.unsplash.com/photo-1598153346810-860daa814c4b?ixlib=rb-4.0.3'
  },
  {
    path: 'first-attempt',
    title: "Ms. Vance's Turn",
    content: [
      {
        type: 'narration',
        text: 'Ms Vance shuffled to the front, clutching her wand tightly. The wardrobe burst open.'
      },
      {
        type: 'action',
        text: 'A towering figure of her family doctor holding a gigantic needle emerged, glowering menacingly.'
      },
      {
        type: 'spell',
        text: 'Riddikulus!',
        effect: 'apples'
      }
    ],
    background: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?ixlib=rb-4.0.3'
  },
  {
    path: 'conclusion',
    title: 'Lesson Learned',
    content: [
      {
        type: 'dialogue',
        speaker: 'Professor Aldren',
        text: "Fear is only as powerful as we allow it to be. Remember that courage isn't the absence of fear, but the ability to face it."
      },
      {
        type: 'narration',
        text: 'The students left, buzzing with excitement, each carrying a newfound confidence in their ability to confront the things that scared them most.'
      }
    ],
    background: 'https://images.unsplash.com/photo-1618944847828-82e943c3bdb7?ixlib=rb-4.0.3'
  }
];

const PageTemplate = ({ content, background, title, onNext }: { content: any[]; background: string; title: string; onNext: () => void }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCharacter, setShowCharacter] = useState(true);

const handleNext = () => {
  if (currentIndex < content.length - 1) {
    setShowCharacter(false);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setShowCharacter(true);
    }, 500);
  } else {
    navigate('/chapter2');  // NEW - Now it moves to Chapter 2 correctly
  }
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay'
      }}
    >
     <button
        onClick={() => navigate('/')}  // This ensures the user is navigated to the Home page
        className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300"
      >
        <Home className="w-6 h-6 text-white" />
      </button>
 


      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
        <AnimatePresence mode="wait">
          {showCharacter && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md p-4 bg-black/50 backdrop-blur-md rounded-lg text-white"
            >
              {content[currentIndex].type === 'dialogue' ? (
                <>
                  <span className="font-bold">{content[currentIndex].speaker}: </span>
                  {content[currentIndex].text}
                </>
              ) : (
                content[currentIndex].text
              )}
            </motion.div>
          )}
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

const Chapter1 = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      {pages.map((page, index) => (
        <Route
          key={index}
          path={page.path}
          element={
            <PageTemplate 
              content={page.content} 
              background={page.background}
              title={page.title}
              onNext={() => {
                if (index === pages.length - 1) {
                  navigate('/chapter2');
                }
              }}
            />
          }
        />
      ))}
    </Routes>
  );
};

export default Chapter1;
