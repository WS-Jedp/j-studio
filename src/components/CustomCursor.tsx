"use client";

import { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device is desktop based on hover capability
    const checkIfDesktop = () => {
      return window.matchMedia('(hover: hover)').matches && window.innerWidth >= 1024;
    };
    
    setIsDesktop(checkIfDesktop());
    
    // Update on window resize
    const handleResize = () => {
      setIsDesktop(checkIfDesktop());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Only add cursor event listeners if it's a desktop device
    if (!isDesktop) return;
    
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = () => {
      const target = document.elementFromPoint(position.x, position.y) as HTMLElement;
      
      // Check if cursor should be hidden
      const shouldHide = checkIfShouldHide(target);
      setIsHidden(shouldHide);
      
      // Only update pointer state if not hidden
      if (!shouldHide) {
        setIsPointer(
          window.getComputedStyle(target).cursor === "pointer" || 
          target.tagName === "A" || 
          target.tagName === "BUTTON" ||
          target.onclick !== null
        );
      }
    };
    
    // Function to check if cursor should be hidden
    const checkIfShouldHide = (element: HTMLElement | null): boolean => {
      if (!element) return false;
      
      // Check for data attribute
      if (element.getAttribute('data-hide-cursor') === 'true') return true;
      
      // Check for CSS class
      if (element.classList.contains('hide-cursor')) return true;
      
      // Check parent elements (up to 5 levels to prevent performance issues)
      let currentEl = element.parentElement;
      let depth = 0;
      
      while (currentEl && depth < 5) {
        if (currentEl.getAttribute('data-hide-cursor') === 'true' || 
            currentEl.classList.contains('hide-cursor')) {
          return true;
        }
        currentEl = currentEl.parentElement;
        depth++;
      }
      
      return false;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", updateCursorType);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", updateCursorType);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [position.x, position.y, isDesktop]);

  // Don't render custom cursor for non-desktop devices
  if (!isDesktop) return null;

  return (
    <>
      <div 
        className={`cursor-dot ${isClicking ? 'cursor-dot-clicking' : ''} ${isHidden ? 'cursor-hidden' : ''} z-[9999]`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      />
      <div 
        className={`cursor-ring ${isPointer ? 'cursor-pointer' : ''} ${isClicking ? 'cursor-clicking' : ''} ${isHidden ? 'cursor-hidden' : ''} z-[9998`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
        }}
      />
    </>
  );
};

export default CustomCursor;
