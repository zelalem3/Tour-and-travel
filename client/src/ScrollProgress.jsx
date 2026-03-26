import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // useSpring smooths out the bar so it doesn't "jitter" if the user scrolls fast
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px', // Thickness of the bar
        backgroundColor: '#fbbf24', // Your gold theme color
        transformOrigin: '0%', // Ensures it grows from left to right
        zIndex: 9999, // Keeps it above everything else
      }}
    />
  );
};

export default ScrollProgress;