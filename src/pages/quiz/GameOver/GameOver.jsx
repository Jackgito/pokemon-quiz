import { useState, useEffect } from 'react';
import ConfettiGenerator from "../ConfettiGenerator/ConfettiGenerator";
import Button from '@mui/material/Button';
import { Snackbar, Alert } from '@mui/material';

const GameOver = ({ score, restartGame, gameEnded, correctPokemonName }) => {
  const [isHighScore, setIsHighScore] = useState(false);
  const [open, setOpen] = useState(false);
  const [pokemonAlertOpen, setPokemonAlertOpen] = useState(false);
  const [effectTriggered, setEffectTriggered] = useState(false); // Prevent repeated triggering

  // Save score to local storage if it is higher than the current high score
  useEffect(() => {
    if (gameEnded && !effectTriggered) {
      const highScore = parseInt(localStorage.getItem('highScore')) || 0; // Convert to number
      console.log("High score from storage:", highScore);
      if (score > highScore) {
        console.log("New high score:", score);
        localStorage.setItem('highScore', score);
        setIsHighScore(true);
        setOpen(true); // Show alert for high score
      } else {
        setIsHighScore(false);
        setPokemonAlertOpen(true); // Show Pokémon alert if not a high score
      }
      setEffectTriggered(true); // Prevent re-triggering the effect
    }
  }, [gameEnded, score, effectTriggered]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setPokemonAlertOpen(false);
  };

  const handleRestart = () => {
    setOpen(false);
    setPokemonAlertOpen(false);
    setEffectTriggered(false);
    restartGame();
  };

  return (
    <div className="game-over">
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', visibility: gameEnded ? 'visible' : 'hidden' }}>
          New high score! The correct Pokémon was {correctPokemonName}!
        </Alert>
      </Snackbar>
      <Snackbar open={pokemonAlertOpen} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%', visibility: gameEnded ? 'visible' : 'hidden' }}>
          Game over! The correct Pokémon was {correctPokemonName}!
        </Alert>
      </Snackbar>
      {isHighScore && <ConfettiGenerator />}
      <Button 
        variant="contained" 
        sx={{ 
          backgroundColor: '#333333', 
          '&:hover': { backgroundColor: 'grey' }, 
          marginTop: '1rem',
          visibility: gameEnded ? 'visible' : 'hidden' 
        }} 
        onClick={handleRestart}
      >
        Restart
      </Button>
    </div>
  );
};

export default GameOver;
