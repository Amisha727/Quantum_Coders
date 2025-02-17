import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Book, BookOpen, BookKey, BookLock, BookMarked } from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
  const icons = [
    { Icon: Home, path: "/", label: "Home" },
    { Icon: Book, path: "/about", label: "Story" },
    { Icon: BookOpen, path: "/chapter1", label: "Chapter 1" },
    { Icon: BookKey, path: "/chapter2", label: "Chapter 2" },
    { Icon: BookLock, path: "/chapter3", label: "Chapter 3" },
    { Icon: BookMarked, path: "/chapter4", label: "Chapter 4" },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDFjZWYzeDcyenlwY2o5djNneTZtd3k0Y295dnBydW5wNzg3ZzZ2dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Bkat0h8jENmq5lYuVE/giphy.gif)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backgroundBlendMode: "overlay",
      }}
    >
      <h1 className="text-4xl font-bold text-yellow-300 mb-6" style={{ textShadow: "0 0 10px #ffff99" }}>
        The Magical Journey Begins
      </h1>
      <motion.div
        className="relative w-[400px] h-[400px]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 40, // Slower rotation
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {icons.map((IconItem, index) => {
          const angle = (index * 60 * Math.PI) / 180;
          const x = 200 + 180 * Math.cos(angle); // Increased radius
          const y = 200 + 180 * Math.sin(angle);

          return (
            <motion.div
              key={index}
              className="icon-wrapper absolute cursor-pointer"
              style={{
                left: `${x - 35}px`, // Adjusted for larger size
                top: `${y - 35}px`,
                rotate: "-360deg",
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => navigate(IconItem.path)}
            >
              <motion.div
                className="w-[70px] h-[70px] bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 40, // Match outer rotation speed
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <IconItem.Icon className="w-10 h-10 text-white" />
              </motion.div>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-white text-sm whitespace-nowrap">
                {IconItem.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HomePage;
