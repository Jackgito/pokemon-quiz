import { useState, useEffect } from 'react';
import ConfettiGenerator from "../ConfettiGenerator/ConfettiGenerator";
import Button from '@mui/material/Button';
import { Snackbar, Alert } from '@mui/material';

const GameOver = ({ score, restartGame, gameEnded, correctPokemonName }) => {
  const [isHighScore, setIsHighScore] = useState(false);
  const [open, setOpen] = useState(false);
  const [pokemonAlertOpen, setPokemonAlertOpen] = useState(false);

  // Save score to local storage if it is higher than the current high score
  useEffect(() => {
    if (gameEnded) {
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
    }
  }, [score, gameEnded]);

  // Trigger Pokémon alert when the game ends
  useEffect(() => {
    if (gameEnded) {
      setPokemonAlertOpen(true);
    }
  }, [gameEnded]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handlePokemonAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setPokemonAlertOpen(false);
  };

  const handleRestart = () => {
    setOpen(false);
    setPokemonAlertOpen(false);
    restartGame();
  };

  return (
    <div className="game-over">
      <Snackbar open={open || pokemonAlertOpen} autoHideDuration={5000} onClose={isHighScore ? handleClose : handlePokemonAlertClose}>
        {}
        <Alert onClose={isHighScore && gameEnded ? handleClose : handlePokemonAlertClose} severity={isHighScore ? "success" : "error"} sx={{ width: '100%', visibility: gameEnded ? 'visible' : 'hidden'  }}>
          {isHighScore ? `New high score! The correct Pokémon was ${correctPokemonName}!` : `Game over! The correct Pokémon was ${correctPokemonName}!`}
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