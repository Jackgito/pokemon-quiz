import { useState, useEffect } from 'react';

const useScreenSize = (mobileBreakpoint = 768) => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < mobileBreakpoint,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < mobileBreakpoint,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileBreakpoint]);

  return screenSize;
};

export default useScreenSize;
