import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CosmicBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  colorScheme?: 'blue-purple' | 'cyan-blue' | 'emerald-cyan' | 'purple-pink';
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = React.memo(({
  intensity = 'medium',
  colorScheme = 'blue-purple'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const nebulaeRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Memoize colors to prevent recalculations
  const colors = useMemo(() => {
    switch(colorScheme) {
      case 'cyan-blue':
        return {
          primary: 'rgba(125, 211, 252, 0.15)',
          secondary: 'rgba(59, 130, 246, 0.15)',
          tertiary: 'rgba(14, 165, 233, 0.1)',
          cssVar: 'var(--cyan-blue)'
        };
      case 'emerald-cyan':
        return {
          primary: 'rgba(110, 231, 183, 0.15)',
          secondary: 'rgba(34, 211, 238, 0.15)',
          tertiary: 'rgba(16, 185, 129, 0.1)',
          cssVar: 'var(--emerald-cyan)'
        };
      case 'purple-pink':
        return {
          primary: 'rgba(216, 180, 254, 0.15)',
          secondary: 'rgba(249, 168, 212, 0.15)',
          tertiary: 'rgba(168, 85, 247, 0.1)',
          cssVar: 'var(--purple-pink)'
        };
      default: // blue-purple
        return {
          primary: 'rgba(147, 197, 253, 0.15)',
          secondary: 'rgba(196, 181, 253, 0.15)',
          tertiary: 'rgba(59, 130, 246, 0.1)',
          cssVar: 'var(--blue-purple)'
        };
    }
  }, [colorScheme]);

  // Memoize counts to prevent recalculations
  const counts = useMemo(() => {
    switch(intensity) {
      case 'low':
        return { stars: 50, particles: 2, nebulae: 2 };
      case 'high':
        return { stars: 150, particles: 5, nebulae: 4 };
      default: // medium
        return { stars: 100, particles: 3, nebulae: 3 };
    }
  }, [intensity]);
  
  // Optimized star rendering with Canvas API
  const renderStars = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    
    // Generate stars only once
    const stars = Array.from({ length: counts.stars }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.5 + Math.random() * 1.5,
      opacity: 0.2 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2, // Random starting phase
      speed: 0.0005 + Math.random() * 0.001
    }));
    
    // Handle window resize (throttled)
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        setCanvasSize();
      }, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        // Calculate pulsating opacity
        const opacity = 0.2 + 0.6 * Math.sin(time * star.speed + star.phase);
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [counts.stars]);
  
  // Generate dynamic nebulae positions
  const generateNebulaeStyles = useCallback(() => {
    if (!nebulaeRef.current) return;
    
    const nebulaeContainer = nebulaeRef.current;
    nebulaeContainer.innerHTML = '';
    
    for (let i = 0; i < counts.nebulae; i++) {
      const nebula = document.createElement('div');
      
      // Apply styles
      Object.assign(nebula.style, {
        position: 'absolute',
        borderRadius: '50%',
        opacity: '0.2',
        filter: 'blur(100px)',
        background: i % 2 === 0 
          ? `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`
          : `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
        width: `${300 + Math.random() * 400}px`,
        height: `${300 + Math.random() * 400}px`,
        left: `${Math.random() * 80}%`,
        top: `${Math.random() * 80}%`,
        transform: 'translate(-50%, -50%)',
        animation: `float-nebula ${30 + Math.random() * 20}s ease-in-out infinite alternate`,
        animationDelay: `${-Math.random() * 10}s`
      });
      
      nebulaeContainer.appendChild(nebula);
    }
  }, [counts.nebulae, colors]);
  
  // Generate noise texture
  const generateNoise = useCallback(() => {
    const canvas = noiseCanvasRef.current;
    if (!canvas) return;
    
    // Use a smaller size for performance, then scale with CSS
    const width = 256;
    const height = 256;
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Create noise data
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Get base color from current scheme for tinting
    const baseColor = colorScheme === 'blue-purple' ? [147, 197, 253] : 
                      colorScheme === 'cyan-blue' ? [125, 211, 252] :
                      colorScheme === 'emerald-cyan' ? [110, 231, 183] :
                      [216, 180, 254]; // purple-pink
    
    // Fill with noise
    for (let i = 0; i < data.length; i += 4) {
      // Generate monochrome noise with slight color tint
      const value = Math.floor(Math.random() * 255);
      
      // Apply very subtle color tint based on the theme
      data[i] = Math.min(255, value + baseColor[0] * 0.03);     // R
      data[i + 1] = Math.min(255, value + baseColor[1] * 0.03); // G
      data[i + 2] = Math.min(255, value + baseColor[2] * 0.03); // B
      
      // Very low alpha for subtlety
      data[i + 3] = Math.random() * 12; 
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // Set to repeat as a pattern
    document.body.style.setProperty('--noise-background', `url(${canvas.toDataURL('image/png')})`);
  }, [colorScheme]);
  
  // Set up CSS variables for color schemes
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
    document.documentElement.style.setProperty('--tertiary-color', colors.tertiary);
    
    // Add keyframes for nebula animation if not already added
    if (!document.getElementById('cosmic-keyframes')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'cosmic-keyframes';
      styleSheet.textContent = `
        @keyframes float-nebula {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
          50% { transform: translate(-60%, -40%) scale(1.1); opacity: 0.25; }
          100% { transform: translate(-40%, -60%) scale(0.9); opacity: 0.15; }
        }
        
        @keyframes float-particle {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          50% { transform: translate(100px, -100px) scale(1); opacity: 0.8; }
          100% { transform: translate(200px, 0) scale(0); opacity: 0; }
        }
      `;
      document.head.appendChild(styleSheet);
    }
    
    // Generate noise once when color scheme changes
    generateNoise();
    
    // Add noise animation keyframes if needed
    if (!document.getElementById('noise-keyframes')) {
      const noiseStyleSheet = document.createElement('style');
      noiseStyleSheet.id = 'noise-keyframes';
      noiseStyleSheet.textContent = `
        @keyframes noise-shift {
          0% { transform: scale(1) }
          10% { transform: scale(1.2) }
          20% { transform: scale(1.1) }
          30% { transform: scale(1.3) }
          40% { transform: scale(1.5) }
          50% { transform: scale(1.8) }
          60% { transform: scale(1.6) }
          70% { transform: scale(1.3) }
          80% { transform: scale(1.2) }
          90% { transform: scale(1.1) }
          100% { transform: scale(1) }
        }
      `;
      document.head.appendChild(noiseStyleSheet);
    }
    
    // Clean up canvas animation and event listeners
    const starCleanup = renderStars();
    
    // Generate nebulae
    generateNebulaeStyles();
    
    return () => {
      if (starCleanup) starCleanup();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [colors, renderStars, generateNebulaeStyles, generateNoise]);
  
  return (
    <div 
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={{
        '--blue-purple': 'linear-gradient(to right, rgba(147, 197, 253, 0.05), rgba(196, 181, 253, 0.05))',
        '--cyan-blue': 'linear-gradient(to right, rgba(125, 211, 252, 0.05), rgba(59, 130, 246, 0.05))',
        '--emerald-cyan': 'linear-gradient(to right, rgba(110, 231, 183, 0.05), rgba(34, 211, 238, 0.05))',
        '--purple-pink': 'linear-gradient(to right, rgba(216, 180, 254, 0.05), rgba(249, 168, 212, 0.05))'
      } as React.CSSProperties}
    >
      {/* Container for nebulae */}
      <div ref={nebulaeRef} className="absolute inset-0"></div>
      
      {/* Noise texture canvas (hidden, used to generate pattern) */}
      <canvas 
        ref={noiseCanvasRef}
        className="hidden"
      />
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-60 pointer-events-none"
        style={{
          backgroundImage: 'var(--noise-background)',
          backgroundRepeat: 'repeat',
          animation: 'noise-shift 30s infinite alternate'
        }}
      />
      
      {/* Static noise filter for additional texture */}
      <div 
        className="absolute inset-0 opacity-5 mix-blend-soft-light pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      
      {/* Canvas for stars - more performant than DOM elements */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Grid pattern - using CSS for static elements */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
      
      {/* Animated grid - using CSS variables for better performance */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)]"
        style={{ backgroundSize: '50px 50px' }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Optimized cosmic particles - using CSS where possible */}
      <div className="absolute inset-0">
        {Array.from({ length: counts.particles }).map((_, index) => (
          <div
            key={`particle-optimized-${index}`}
            className="absolute rounded-full"
            style={{
              background: index % 3 === 0 
                ? colors.primary 
                : index % 3 === 1 
                  ? colors.secondary 
                  : colors.tertiary,
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
              boxShadow: `0 0 8px ${colors.primary}`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0,
              animation: `float-particle ${10 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${index * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Light rays - using a single element with animation */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${colors.tertiary} 0%, transparent 50%)`,
        }}
        animate={{
          opacity: [0, 0.2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      
      {/* Subtle color overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: colors.cssVar }}
      />
    </div>
  );
});

// Add display name for better debugging
CosmicBackground.displayName = 'CosmicBackground';
