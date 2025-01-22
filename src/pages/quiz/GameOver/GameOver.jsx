/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import ConfettiGenerator from "../ConfettiGenerator/ConfettiGenerator";
import Button from '@mui/material/Button';
import { Snackbar, Alert } from '@mui/material';

const GameOver = ({ score, restartGame }) => {
  const [isHighScore, setIsHighScore] = useState(false);
  const [open, setOpen] = useState(false);
  
  // Save score to local storage if it is higher than the current high score
  useEffect(() => {
    const highScore = localStorage.getItem('highScore');
    if (highScore) {
      if (score > highScore) {
        setOpen(true);
        localStorage.setItem('highScore', score);
        setIsHighScore(true);
      }
    } else {
      localStorage.setItem('highScore', score);
      setIsHighScore(true);
    }
  }, [score]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="game-over">
      {isHighScore && (
        <>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            New high score!
          </Alert>
        </Snackbar>
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