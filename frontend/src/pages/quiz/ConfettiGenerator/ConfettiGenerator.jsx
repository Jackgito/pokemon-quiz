/* eslint-disable react/prop-types */
// https://www.npmjs.com/package/canvas-confetti

import { useEffect } from "react";
import confetti from "canvas-confetti";

const ConfettiGenerator = ({ duration = 5000 }) => {
  useEffect(() => {
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fire from two random positions
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [duration]);

  return null; // This component doesn't render any DOM elements
};

export default ConfettiGenerator;
