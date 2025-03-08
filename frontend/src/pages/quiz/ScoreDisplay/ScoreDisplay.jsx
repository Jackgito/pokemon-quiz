import { useState, useEffect } from 'react';
import useScreenSize from '../../../hooks/useScreenSize';
import './ScoreDisplay.css';

const ScoreDisplay = ({ score }) => {
  const [animateScore, setAnimateScore] = useState(false);
  const { isMobile } = useScreenSize();

  // Trigger animation when the score changes
  useEffect(() => {
    setAnimateScore(true);
    const timeout = setTimeout(() => {
      setAnimateScore(false);
    }, 200); // Match this duration with the CSS transition duration

    return () => clearTimeout(timeout);
  }, [score]);

  return (
    <div className="scoreContainer">
      {isMobile ? (
        <div className="scoreRow">
          <h2>Score</h2>
          <h2 className={`score ${animateScore ? 'animate' : ''}`}>{score}</h2>
        </div>
      ) : (
        <>
          <h2>Score</h2>
          <h2 className={`score ${animateScore ? 'animate' : ''}`}>{score}</h2>
        </>
      )}
    </div>
  );
  
};

export default ScoreDisplay;
