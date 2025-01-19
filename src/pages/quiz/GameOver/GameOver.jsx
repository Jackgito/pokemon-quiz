/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import ConfettiGenerator from "../ConfettiGenerator/ConfettiGenerator";
import Button from '@mui/material/Button';

const GameOver = ({ score, restartGame }) => {
  const [isHighScore, setIsHighScore] = useState(false);
  
  // Save score to local storage if it is higher than the current high score
  useEffect(() => {
    const highScore = localStorage.getItem('highScore');
    if (highScore) {
      if (score > highScore) {
        localStorage.setItem('highScore', score);
        setIsHighScore(true);
      }
    } else {
      localStorage.setItem('highScore', score);
      setIsHighScore(true);
    }
  }, [score]);

  return (
    <div className="game-over">
      <h1>Game Over</h1>
      {isHighScore && (
        <>
          <h2>New high score!</h2> 
          <ConfettiGenerator />
        </>
      )}
      <Button 
        variant="contained" 
        sx={{ backgroundColor: '#333333', '&:hover': { backgroundColor: 'grey' } }} 
        onClick={restartGame}
      >
        Restart
      </Button>
    </div>
  );
};

export default GameOver;