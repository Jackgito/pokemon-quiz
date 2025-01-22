/* eslint-disable react/prop-types */

import { useState, useEffect, useRef } from 'react';
import './PokemonCountdown.css';
import { useSettings } from '../../../context/SettingsProvider';
import PlaySoundButton from './PlaySoundButton';
import useScreenSize from '../../../hooks/useScreenSize';

const PokemonCountdown = ({ duration, strokeWidth, onComplete, pause, pokemonData, isSilhouette }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [size, setSize] = useState(350);
  const requestRef = useRef();
  const startTimeRef = useRef();
  const { isMobile } = useScreenSize();
  const { quizType } = useSettings();

  useEffect(() => {
    if (isMobile) {
      setSize(240);
    } else {
      setSize(350);
    }
  }, [isMobile]);

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
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [duration, onComplete, pause]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  const colorTransition = `rgb(${255 * (1 - timeLeft / duration)}, ${255 * (timeLeft / duration)}, 0)`;

  return (
    <div className="question-timer-container">
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
        {quizType === 'Image' ? (
          <img
            src={pokemonData?.imageUrl}
            // src={pokemonData?.animationUrl}
            alt="Pokemon"
            className={`pokemon-image ${isSilhouette ? 'silhouette' : 'no-silhouette'}`}
          />
        ) : (
          <PlaySoundButton cryUrl={pokemonData?.cryUrl} />
        )}
      </div>
      <div className="question-timer-number">
        <span className="question-timer-text">{Math.ceil(timeLeft)}</span>
      </div>
    </div>
  );
};

export default PokemonCountdown;