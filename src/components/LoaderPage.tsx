import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CosmicBackground } from './cosmic-background';

interface LoaderPageProps {
  onLoadComplete: () => void;
  duration?: number; // Time in milliseconds for the loader to be displayed
}

export default function LoaderPage({ onLoadComplete, duration = 4000 }: LoaderPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const textTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Show text after a delay
    textTimeoutRef.current = setTimeout(() => {
      setShowText(true);
    }, 400);

    // Start progress animation
    const startTime = Date.now();
    const updateInterval = 20; // update every 20ms for smooth animation
    
    progressIntervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsedTime / duration) * 100);
      
      setProgress(newProgress);
      
      if (elapsedTime >= duration) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        
        // Begin exit animation
        setIsLoading(false);
        
        // Call onLoadComplete after exit animation
        setTimeout(() => {
          onLoadComplete();
        }, 1000); // Exit animation duration
      }
    }, updateInterval);
    
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
    };
  }, [duration, onLoadComplete]);

  // Intro text animation variants
  const introTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: "easeOut"
      }
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -20,
      transition: {
        delay: 0.05 * i,
        duration: 0.6,
        ease: "easeIn"
      }
    })
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 w-full h-full flex flex-col items-center justify-center z-[9999] bg-j-deep-black"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: "easeInOut" }
          }}
        >
          {/* Dynamic Cosmic Background with high intensity */}
          <CosmicBackground 
            colorScheme="blue-purple" 
            intensity="high"
          />
          
          <div className="relative w-full max-w-2xl px-6 flex flex-col items-center">
            {/* J Studio logo/wordmark */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.8, 
                  ease: "easeOut" 
                }
              }}
              exit={{ 
                opacity: 0,
                scale: 1.2,
                transition: { 
                  duration: 0.6, 
                  ease: "easeIn" 
                }
              }}
            >
              <div className="flex flex-row flex-nowrap items-center space-x-3">
                <motion.div 
                  className="bg-j-celestial-white w-[20px] h-[20px] rounded-full"
                  animate={{ 
                    boxShadow: [
                      '0 0 0 rgba(255, 255, 255, 0.4)',
                      '0 0 15px rgba(255, 255, 255, 0.8)',
                      '0 0 0 rgba(255, 255, 255, 0.4)'
                    ] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-white/90">J Studio</h1>
              </div>
            </motion.div>
            
            {/* Animated welcome text */}
            <AnimatePresence>
              {showText && (
                <motion.div 
                  className="text-center mb-14"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.h2 
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-300 text-transparent bg-clip-text mb-3"
                    variants={introTextVariants}
                    custom={0}
                  >
                    Welcome to My Creative Universe
                  </motion.h2>
                  
                  <motion.p 
                    className="text-sm md:text-base text-white/70 max-w-md mx-auto"
                    variants={introTextVariants}
                    custom={1}
                  >
                    Where Art and Technology Meet to Create Extraordinary Digital Experiences
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Animated progress bar */}
            <div className="w-full max-w-[300px] relative">
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                />
              </div>
              
              {/* Floating particles along the progress bar */}
              <motion.div 
                className="absolute top-0 w-2 h-2 -mt-[3px] rounded-full bg-blue-400/80"
                style={{ left: `${progress}%` }}
                animate={{ 
                  boxShadow: [
                    '0 0 2px rgba(96, 165, 250, 0.7)',
                    '0 0 8px rgba(96, 165, 250, 0.9)',
                    '0 0 2px rgba(96, 165, 250, 0.7)'
                  ] 
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {/* Progress text */}
              <motion.p 
                className="mt-4 text-xs text-white/60 text-center"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {Math.round(progress)}% · Entering J's universe
              </motion.p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-[15%] right-[10%] w-[150px] h-[150px] rounded-full bg-blue-500/10 blur-[60px] z-0"></div>
          <div className="absolute bottom-[20%] left-[10%] w-[120px] h-[120px] rounded-full bg-purple-500/10 blur-[50px] z-0"></div>
          <div className="absolute top-[30%] left-[15%] w-2 h-2 rounded-full bg-blue-400/70"></div>
          <div className="absolute bottom-[30%] right-[25%] w-1.5 h-1.5 rounded-full bg-purple-400/70"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}