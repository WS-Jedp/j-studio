import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Introduction() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverInfo, setHoverInfo] = useState({ 
    title: '', 
    description: '',
    type: '' // Add type to determine which cursor to show
  });
  
  // New state for click-and-hold interactions
  const [clickedCard, setClickedCard] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isActionComplete, setIsActionComplete] = useState(false);
  
  // Fix type errors by using correct types for timer and interval refs
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const loadingDuration = 1000; // 1 second for loading
  const intervalStep = 10; // Update progress every 10ms
  
  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Add null checks before clearing
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    };
  }, []);

  const handleMouseEnter = (info: { title: string, description: string, type: string }) => {
    setIsHovering(true);
    setHoverInfo(info);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    cancelLoading();
  };

  // Start loading on mouse down
  const handleMouseDown = (cardType: string) => {
    setClickedCard(cardType);
    setLoadingProgress(0);
    setIsActionComplete(false);
    
    // Create interval to update progress
    loadingIntervalRef.current = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + (100 * intervalStep / loadingDuration);
        return newProgress > 100 ? 100 : newProgress;
      });
    }, intervalStep);
    
    // Set timer for completion
    loadingTimerRef.current = setTimeout(() => {
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
      setLoadingProgress(100);
      setIsActionComplete(true);
      // After completing, execute card-specific action
      executeCardAction(cardType);
    }, loadingDuration);
  };

  // Cancel loading if mouse up before completion
  const handleMouseUp = () => {
    if (loadingProgress < 100) {
      cancelLoading();
    }
  };

  // Cancel loading on mouse leave
  const cancelLoading = () => {
    if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    setClickedCard('');
    setLoadingProgress(0);
  };

  // Execute card-specific actions when loading completes
  const executeCardAction = (cardType: string) => {
    // TODO: Add your action logic here according to the card type
    console.log(`Action complete for ${cardType} card!`);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsActionComplete(false);
      setClickedCard('');
      setLoadingProgress(0);
    }, 2000);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="w-full h-auto md:h-[90vh] overflow-visible md:overflow-hidden grid grid-cols-1 md:grid-cols-5 auto-rows-auto md:grid-rows-8 gap-4 px-6 md:px-0 mb-[120px] md:mb-[300px] relative">
      {/* Custom cursor */}
      <motion.div 
        className={`fixed pointer-events-none z-50 flex items-center justify-center ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: 0,
          top: 0,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          transition: { type: "spring", damping: 25, stiffness: 300 }
        }}
      >
        {hoverInfo.type === 'digital' && (
          <motion.div className="w-[120px] h-[120px] relative">
            {/* Arched rotating text */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <path
                  id="digital-circle-text-path"
                  d="M 60,10 A 50 50 0 1 1 59.9999 10"
                  fill="none"
                  stroke="rgba(147, 197, 253, 0.1)"
                  strokeWidth="0.5"
                />
                <text className="text-[8px] font-black uppercase tracking-widest fill-blue-200/70">
                  <textPath href="#digital-circle-text-path" startOffset="0%">
                    • Coffi • concept to launch • Dream - Build - Launch
                  </textPath>
                </text>
              </motion.g>
              
              {/* Loading progress circle */}
              {clickedCard === 'digital' && (
                <circle 
                  cx="60" 
                  cy="60" 
                  r="55" 
                  fill="none" 
                  stroke="rgba(147, 197, 253, 0.3)" 
                  strokeWidth="2"
                  strokeDasharray={`${2 * Math.PI * 55 * loadingProgress / 100} ${2 * Math.PI * 55 * (1 - loadingProgress / 100)}`}
                  strokeDashoffset={2 * Math.PI * 55 * 0.25}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              )}
            </svg>
            
            <motion.div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-[60px] h-[60px] rounded-xl border border-blue-400/30 flex items-center justify-center bg-blue-500/5 backdrop-blur-md"
                animate={
                  clickedCard === 'digital' 
                    ? isActionComplete 
                      ? { scale: [1, 1.3, 1], backgroundColor: 'rgba(59, 130, 246, 0.3)' } 
                      : { scale: [1, 0.95, 1], rotate: [0, 2, 0, -2, 0] }
                    : { scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }
                }
                transition={
                  clickedCard === 'digital' && !isActionComplete
                    ? { duration: 0.3, repeat: Infinity }
                    : { duration: 3, repeat: Infinity }
                }
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M20 12H4" stroke="url(#digital-cursor)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 8L8 16M8 8L16 16" stroke="url(#digital-cursor)" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="digital-cursor" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#93C5FD" />
                      <stop offset="1" stopColor="#C4B5FD" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>
            <motion.div 
              className="absolute inset-0 w-full h-full rounded-full border border-blue-300/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute inset-0 w-full h-full rounded-full border border-purple-300/30" 
              style={{ rotate: "45deg" }}
            />
          </motion.div>
        )}

        {hoverInfo.type === 'experience' && (
          <motion.div className="w-[120px] h-[120px] relative">
            {/* Arched rotating text */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <path
                  id="experience-circle-text-path"
                  d="M 60,10 A 50 50 0 1 1 59.9999 10"
                  fill="none"
                  stroke="rgba(125, 211, 252, 0.1)"
                  strokeWidth="0.5"
                />
                <text className="text-[8px] font-black uppercase tracking-widest fill-cyan-200/70">
                  <textPath href="#experience-circle-text-path" startOffset="0%">
                    • My Journey • From Learner to Leader • Building Daily
                  </textPath>
                </text>
              </motion.g>
              
              {/* Loading progress circle */}
              {clickedCard === 'experience' && (
                <circle 
                  cx="60" 
                  cy="60" 
                  r="55" 
                  fill="none" 
                  stroke="rgba(125, 211, 252, 0.3)" 
                  strokeWidth="2"
                  strokeDasharray={`${2 * Math.PI * 55 * loadingProgress / 100} ${2 * Math.PI * 55 * (1 - loadingProgress / 100)}`}
                  strokeDashoffset={2 * Math.PI * 55 * 0.25}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              )}
            </svg>
            
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <motion.div 
                className="w-[70px] h-[70px] rounded-full border border-cyan-400/30 bg-cyan-500/5 backdrop-blur-md flex items-center justify-center"
                animate={
                  clickedCard === 'experience' 
                    ? isActionComplete 
                      ? { scale: [1, 1.3, 1], backgroundColor: 'rgba(14, 165, 233, 0.3)' } 
                      : { scale: [1, 0.9, 1] }
                    : {}
                }
                transition={
                  clickedCard === 'experience' && !isActionComplete
                    ? { duration: 0.4, repeat: Infinity }
                    : {}
                }
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6V12L16 16" stroke="url(#experience-cursor)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" stroke="url(#experience-cursor)" strokeWidth="1.5" />
                  <defs>
                    <linearGradient id="experience-cursor" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7DD3FC" />
                      <stop offset="1" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>
            <motion.div 
              className="absolute inset-0 w-full h-full border-2 border-dotted border-cyan-300/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}

        {hoverInfo.type === 'award' && (
          <motion.div className="w-[120px] h-[120px] relative">
            {/* Arched rotating text */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <path
                  id="award-circle-text-path"
                  d="M 60,10 A 50 50 0 1 1 59.9999 10"
                  fill="none"
                  stroke="rgba(216, 180, 254, 0.1)"
                  strokeWidth="0.5"
                />
                <text className="text-[8px] font-black uppercase tracking-widest fill-purple-200/70">
                  <textPath href="#award-circle-text-path" startOffset="0%">
                    • Award-Winning • WorldSkills • Code - Compete - Win
                  </textPath>
                </text>
              </motion.g>
              
              {/* Loading progress circle */}
              {clickedCard === 'award' && (
                <circle 
                  cx="60" 
                  cy="60" 
                  r="55" 
                  fill="none" 
                  stroke="rgba(216, 180, 254, 0.3)" 
                  strokeWidth="2"
                  strokeDasharray={`${2 * Math.PI * 55 * loadingProgress / 100} ${2 * Math.PI * 55 * (1 - loadingProgress / 100)}`}
                  strokeDashoffset={2 * Math.PI * 55 * 0.25}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              )}
            </svg>
            
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={
                clickedCard === 'award' && !isActionComplete
                  ? { rotate: [0, 10, 0, -10, 0] }
                  : { rotate: [0, 5, 0, -5, 0] }
              }
              transition={{ duration: clickedCard === 'award' && !isActionComplete ? 1 : 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="w-[70px] h-[70px] bg-purple-500/5 backdrop-blur-md flex items-center justify-center rounded-lg border border-purple-400/30"
                animate={
                  clickedCard === 'award' 
                    ? isActionComplete 
                      ? { scale: [1, 1.3, 1], backgroundColor: 'rgba(168, 85, 247, 0.3)' } 
                      : { scale: [1, 0.85, 1] }
                    : {}
                }
                transition={
                  clickedCard === 'award' && !isActionComplete
                    ? { duration: 0.3, repeat: Infinity }
                    : {}
                }
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" stroke="url(#award-cursor)" strokeWidth="1.5" />
                  <defs>
                    <linearGradient id="award-cursor" x1="3" y1="2" x2="21" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#D8B4FE" />
                      <stop offset="1" stopColor="#F9A8D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>
            <motion.div 
              className="absolute inset-0 w-full h-full rounded-full"
              style={{ 
                background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0) 70%)" 
              }}
              animate={
                clickedCard === 'award' && isActionComplete
                  ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }
                  : { scale: [0.8, 1.2, 0.8] }
              }
              transition={{ duration: clickedCard === 'award' && isActionComplete ? 0.8 : 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {hoverInfo.type === 'fullstack' && (
          <motion.div className="w-[120px] h-[120px] relative">
            {/* Arched rotating text */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <path
                  id="fullstack-circle-text-path"
                  d="M 60,10 A 50 50 0 1 1 59.9999 10"
                  fill="none"
                  stroke="rgba(110, 231, 183, 0.1)"
                  strokeWidth="0.5"
                />
                <text className="text-[8px] font-black uppercase tracking-widest fill-emerald-200/70">
                  <textPath href="#fullstack-circle-text-path" startOffset="0%">
                    • My Stack • Front to Back • Back to Front • Full Stack
                  </textPath>
                </text>
              </motion.g>
              
              {/* Loading progress circle */}
              {clickedCard === 'fullstack' && (
                <circle 
                  cx="60" 
                  cy="60" 
                  r="55" 
                  fill="none" 
                  stroke="rgba(110, 231, 183, 0.3)" 
                  strokeWidth="2"
                  strokeDasharray={`${2 * Math.PI * 55 * loadingProgress / 100} ${2 * Math.PI * 55 * (1 - loadingProgress / 100)}`}
                  strokeDashoffset={2 * Math.PI * 55 * 0.25}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              )}
            </svg>
            
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotateY: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <motion.div 
                className="w-[60px] h-[60px] bg-emerald-500/5 backdrop-blur-md border border-emerald-400/30 rounded flex items-center justify-center"
                animate={
                  clickedCard === 'fullstack' 
                    ? isActionComplete 
                      ? { scale: [1, 1.3, 1], backgroundColor: 'rgba(16, 185, 129, 0.3)' } 
                      : { rotateY: [0, 180, 360], scale: [1, 0.95, 1] }
                    : {}
                }
                transition={
                  clickedCard === 'fullstack' && !isActionComplete
                    ? { duration: 1, repeat: Infinity }
                    : {}
                }
              >
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 9L5 12L8 15" stroke="url(#fullstack-cursor)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 9L19 12L16 15" stroke="url(#fullstack-cursor)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 18L12 6" stroke="url(#fullstack-cursor)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="fullstack-cursor" x1="5" y1="6" x2="19" y2="18" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6EE7B7" />
                      <stop offset="1" stopColor="#22D3EE" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>
            <motion.div 
              className="absolute inset-0 w-full h-full rounded-full"
              animate={{ 
                boxShadow: [
                  "0 0 10px 2px rgba(110, 231, 183, 0.1)", 
                  "0 0 15px 4px rgba(110, 231, 183, 0.2)", 
                  "0 0 10px 2px rgba(110, 231, 183, 0.1)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute inset-0 w-full h-full border border-emerald-300/20 rounded-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}

        {hoverInfo.type === 'uiux' && (
          <motion.div className="w-[120px] h-[120px] relative">
            {/* Arched rotating text */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <path
                  id="uiux-circle-text-path"
                  d="M 60,10 A 50 50 0 1 1 59.9999 10"
                  fill="none"
                  stroke="rgba(251, 191, 36, 0.1)"
                  strokeWidth="0.5"
                />
                <text className="text-[8px] font-black uppercase tracking-widest fill-amber-200/70">
                  <textPath href="#uiux-circle-text-path" startOffset="0%">
                    • Design-Driven • Brand - Flow - Impact • Design-Driven
                  </textPath>
                </text>
              </motion.g>
              
              {/* Loading progress circle */}
              {clickedCard === 'uiux' && (
                <circle 
                  cx="60" 
                  cy="60" 
                  r="55" 
                  fill="none" 
                  stroke="rgba(251, 191, 36, 0.3)" 
                  strokeWidth="2"
                  strokeDasharray={`${2 * Math.PI * 55 * loadingProgress / 100} ${2 * Math.PI * 55 * (1 - loadingProgress / 100)}`}
                  strokeDashoffset={2 * Math.PI * 55 * 0.25}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              )}
            </svg>
            
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={
                clickedCard === 'uiux' && !isActionComplete
                  ? { rotate: [0, 15, 0, -15, 0] }
                  : { rotate: [0, 10, 0, -10, 0] }
              }
              transition={{ 
                duration: clickedCard === 'uiux' && !isActionComplete ? 0.8 : 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <motion.div 
                className="w-[70px] h-[70px] bg-amber-500/5 backdrop-blur-md border border-amber-400/30 rounded-lg flex items-center justify-center"
                animate={
                  clickedCard === 'uiux' 
                    ? isActionComplete 
                      ? { scale: [1, 1.3, 1], backgroundColor: 'rgba(245, 158, 11, 0.3)' } 
                      : { scale: [1, 0.9, 1] }
                    : { scale: [1, 1.05, 1] }
                }
                transition={
                  clickedCard === 'uiux' && !isActionComplete
                    ? { duration: 0.4, repeat: Infinity }
                    : { duration: 2, repeat: Infinity }
                }
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="url(#uiux-cursor)" strokeWidth="1.5" />
                  <path d="M3 9H21" stroke="url(#uiux-cursor)" strokeWidth="1.5" />
                  <circle cx="6.5" cy="7" r="1" fill="url(#uiux-cursor)" />
                  <circle cx="9.5" cy="7" r="1" fill="url(#uiux-cursor)" />
                  <defs>
                    <linearGradient id="uiux-cursor" x1="3" y1="5" x2="21" y2="19" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FDE68A" />
                      <stop offset="1" stopColor="#F97316" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>
            <motion.div 
              className="absolute inset-0 w-full h-full rounded-full"
              style={{ 
                borderWidth: "1px",
                borderStyle: "dashed",
                borderColor: "rgba(251, 191, 36, 0.2)"
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-0 w-full h-full rounded-full"
              style={{ 
                background: "radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0) 70%)" 
              }}
              animate={
                clickedCard === 'uiux' && isActionComplete
                  ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }
                  : { scale: [0.9, 1.1, 0.9] }
              }
              transition={{ 
                duration: clickedCard === 'uiux' && isActionComplete ? 0.8 : 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        )}
      </motion.div>
      
      {/* Tech decorative elements */}
      <div className="absolute top-[-50px] right-[10%] w-[150px] h-[150px] rounded-full bg-blue-500/10 blur-[60px] z-0"></div>
      <div className="absolute bottom-[20%] left-[5%] w-[100px] h-[100px] rounded-full bg-purple-500/10 blur-[50px] z-0"></div>
      <div className="hidden md:block absolute top-[15%] right-[15%] w-3 h-3 rounded-full bg-blue-400/70"></div>
      <div className="hidden md:block absolute bottom-[30%] left-[25%] w-2 h-2 rounded-full bg-purple-400/70"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none"></div>
      
      <motion.article 
        className="flex flex-col items-start justify-center p-9 col-span-1 md:col-span-5 md:row-span-4 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-white/[0.03] to-white/[0.08] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.1)] relative overflow-hidden group z-10 cursor-none"
        initial="hidden"
        data-hide-cursor="true"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        custom={0}
        onMouseEnter={() => handleMouseEnter({ 
          title: 'Digital Development', 
          description: 'Building seamless digital experiences from concept to deployment',
          type: 'digital'
        })}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => handleMouseDown('digital')}
        onMouseUp={handleMouseUp}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Loading indicator overlay */}
        <AnimatePresence>
          {clickedCard === 'digital' && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {!isActionComplete && (
                <motion.div className="text-xs text-j-celestial-white/60 text-center">
                  <p>Hold to explore Digital Development</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <h2 className="font-bold text-4xl md:text-7xl bg-gradient-to-r from-blue-200 to-purple-300 text-transparent bg-clip-text">
          End to End Digital Development
        </h2>
        <p className="mt-4 text-md text-start text-white/80">
          Crafting seamless experiences through code, design, and innovative thinking
        </p>
        <div className="absolute right-6 bottom-6 w-12 h-12 border border-white/10 rounded-full flex items-center justify-center opacity-70">
          <span className="text-xs text-white/80">01</span>
        </div>
      </motion.article>
      
      <motion.article 
        className="flex flex-col items-start justify-center col-span-1 md:col-span-2 md:row-span-2 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-white/[0.03] to-white/[0.08] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.1)] p-9 overflow-hidden relative group z-10 cursor-none"
        initial="hidden"
        data-hide-cursor="true"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        custom={1}
        onMouseEnter={() => handleMouseEnter({ 
          title: 'Experience', 
          description: 'Over 4 years building innovative digital products',
          type: 'experience'
        })}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => handleMouseDown('experience')}
        onMouseUp={handleMouseUp}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Loading indicator overlay */}
        <AnimatePresence>
          {clickedCard === 'experience' && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {!isActionComplete && (
                <motion.div className="text-xs text-j-celestial-white/60 text-center">
                  <p>Hold to view experience details</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <h2 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-cyan-200 to-blue-300 text-transparent bg-clip-text">+5</h2>
        <p className="font-light text-white/80">Years of Experience Building Digital Products</p>
        <div className="absolute right-6 bottom-6 w-10 h-10 border border-white/10 rounded-full flex items-center justify-center opacity-70">
          <span className="text-xs text-white/80">02</span>
        </div>
      </motion.article>
      
      {/* Remaining articles with similar changes */}
      <motion.article 
        className="flex flex-col items-start justify-center col-span-1 md:col-span-3 md:row-span-2 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-white/[0.03] to-white/[0.08] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.1)] p-9 overflow-hidden relative group z-10 cursor-none"
        initial="hidden"
        data-hide-cursor="true"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        custom={2}
        onMouseEnter={() => handleMouseEnter({ 
          title: 'Award-Winning', 
          description: 'Recognized excellence in international competitions',
          type: 'award'
        })}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => handleMouseDown('award')}
        onMouseUp={handleMouseUp}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Loading indicator overlay */}
        <AnimatePresence>
          {clickedCard === 'award' && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {!isActionComplete &&  (
                <motion.div className="text-sm text-j-celestial-white/60 text-center">
                  <p>Hold to view awards</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <h2 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-purple-200 to-pink-300 text-transparent bg-clip-text">International</h2>
        <p className="font-light text-white/80">Award-Winning Competition Experience</p>
        <div className="absolute right-6 bottom-6 w-10 h-10 border border-white/10 rounded-full flex items-center justify-center opacity-70">
          <span className="text-xs text-white/80">03</span>
        </div>
      </motion.article>
      
      <motion.article 
        className="flex flex-col items-start justify-center col-span-1 md:col-span-3 md:row-span-2 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-white/[0.03] to-white/[0.08] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.1)] p-9 overflow-hidden relative group z-10 cursor-none"
        initial="hidden"
        data-hide-cursor="true"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        custom={3}
        onMouseEnter={() => handleMouseEnter({ 
          title: 'Full Stack', 
          description: 'End-to-end development from backend to frontend',
          type: 'fullstack'
        })}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => handleMouseDown('fullstack')}
        onMouseUp={handleMouseUp}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Loading indicator overlay */}
        <AnimatePresence>
          {clickedCard === 'fullstack' && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm bg-gradient-to-r from-emerald-500/20 to-cyan-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {!isActionComplete &&  (
                <motion.div className="text-sm text-j-celestial-white/60 text-center">
                  <p>Hold to explore stack details</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <h2 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-emerald-200 to-cyan-300 text-transparent bg-clip-text">Full Stack</h2>
        <p className="font-light text-white/80">Software Engineer</p>
        <div className="absolute right-6 bottom-6 w-10 h-10 border border-white/10 rounded-full flex items-center justify-center opacity-70">
          <span className="text-xs text-white/80">04</span>
        </div>
      </motion.article>
      
      <motion.article 
        className="flex flex-col items-start justify-center col-span-1 md:col-span-2 md:row-span-2 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-white/[0.03] to-white/[0.08] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.1)] p-9 overflow-hidden relative group z-10 cursor-none"
        initial="hidden"
        data-hide-cursor="true"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        custom={4}
        onMouseEnter={() => handleMouseEnter({ 
          title: 'UI/UX Design', 
          description: 'Creating intuitive and beautiful user experiences',
          type: 'uiux'
        })}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => handleMouseDown('uiux')}
        onMouseUp={handleMouseUp}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Loading indicator overlay */}
        <AnimatePresence>
          {clickedCard === 'uiux' && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm bg-gradient-to-r from-amber-500/20 to-orange-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {!isActionComplete && (
                <motion.div className="text-sm text-j-celestial-white/60 text-center">
                  <p>Hold to explore design details</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <h2 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 text-transparent bg-clip-text">UI/UX</h2>
        <p className="font-light text-white/80">Transforming Ideas into Powerful Solutions</p>
        <div className="absolute right-6 bottom-6 w-10 h-10 border border-white/10 rounded-full flex items-center justify-center opacity-70">
          <span className="text-xs text-white/80">05</span>
        </div>
      </motion.article>
    </section>
  );
}
