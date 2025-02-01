import { useState, useEffect } from 'react';
import ConfettiGenerator from "../ConfettiGenerator/ConfettiGenerator";
import Button from '@mui/material/Button';
import { Snackbar, AlertTitle, Alert } from '@mui/material';

const GameOver = ({ score, restartGame, gameEnded, correctPokemonName }) => {
  const [alertType, setAlertType] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [effectTriggered, setEffectTriggered] = useState(false);

  useEffect(() => {
    if (gameEnded && !effectTriggered) {
      const highScore = parseInt(localStorage.getItem('highScore')) || 0;
      setAlertType("gameOver"); // Always show Game Over first

      if (score > highScore) {
        localStorage.setItem('highScore', score);
        setTimeout(() => {
          setAlertType("highScore");
          setShowConfetti(true);
        }, 2500);
      }

      setEffectTriggered(true);
    }
  }, [gameEnded, score, effectTriggered]);

  const handleClose = () => setAlertType(null);

  const handleRestart = () => {
    setAlertType(null);
    setShowConfetti(false);
    setEffectTriggered(false);
    restartGame();
  };

  return (
    <div className="game-over">
      <Snackbar 
        open={!!alertType}
        autoHideDuration={8000}
        onClose={handleClose}
      >
        <Alert
        variant='outlined'
          onClose={handleClose} 
          severity={alertType === "highScore" ? "success" : "error"} 
          sx={{ width: '100%', display: alertType ? '' : 'none'}}
        >
          <AlertTitle>{alertType === "highScore" ? "New high score!" : "Game over!"}</AlertTitle>
          The correct Pokémon was {correctPokemonName}!
        </Alert>
      </Snackbar>

      {/* Confetti appears only for high score */}
      {showConfetti && <ConfettiGenerator />}

      <Button 
        variant="contained" 
        sx={{ 
          backgroundColor: '#333333',
          '&:hover': { backgroundColor: 'grey'},
          marginTop: '1rem',
          visibility: gameEnded ? 'visible' : 'hidden', 
        }} 
        onClick={handleRestart}
      >
        Restart
      </Button>
    </div>
  );
};

export default GameOver;
