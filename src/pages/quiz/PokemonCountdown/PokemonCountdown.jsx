/* eslint-disable react/prop-types */

import { useState, useEffect, useRef } from 'react';
import './PokemonCountdown.css';

// This component displays a Pokemon and countdown timer around it
const PokemonCountdown = ({ duration, size, strokeWidth, onComplete, pause, pokemonImage, isSilhouette }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const requestRef = useRef();
  const startTimeRef = useRef();

  const animate = (time) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = time;
    }

    const elapsed = (time - startTimeRef.current) / 1000;
    const newTimeLeft = Math.max(duration - elapsed, 0);

    setTimeLeft(newTimeLeft);

    if (newTimeLeft > 0) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    if (!pause) {
      // Only start the timer if it's not paused
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // If paused, cancel the animation frame
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
    
    return () => {
      // Clean up on component unmount or when pause state changes
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [duration, onComplete, pause]); // Re-run effect if pause changes

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  const colorTransition = `rgb(${255 * (1 - timeLeft / duration)}, ${255 * (timeLeft / duration)}, 0)`;

  return (
    <div className="question-timer-container" style={{ width: size, height: size }}>
      <svg
        className="question-timer-svg"
        width={size}
        height={size}
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
        }}
      >
        <circle
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={colorTransition}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="pokemon-container" style={{ width: size - 58, height: size - 58 }}>
          <img
            src={pokemonImage}
            alt="Pokemon"
            className={`pokemon-image ${isSilhouette ? 'silhouette' : 'no-silhoutte'}`}
          />
        </div>
      <div className="question-timer-number">
        <span className="question-timer-text">{Math.ceil(timeLeft)}</span>
      </div>
    </div>
  );
};

export default PokemonCountdown;
