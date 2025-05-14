import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Avoid running on server-side
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Initial check
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      
      // Add listener for changes
      const listener = () => setMatches(media.matches);
      media.addEventListener('change', listener);
      
      // Clean up
      return () => media.removeEventListener('change', listener);
    }
  }, [matches, query]);
  
  return matches;
};
