import { useState, useEffect, useContext } from 'react';
import ConfettiGenerator from "../ConfettiGenerator/ConfettiGenerator";
import Button from '@mui/material/Button';
import { ToastContext } from '../../../context/ToastProvider';

const GameOver = ({ score, restartGame, gameEnded, correctPokemonName }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [effectTriggered, setEffectTriggered] = useState(false);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    if (gameEnded && !effectTriggered) {
      const highScore = parseInt(localStorage.getItem('highScore')) || 0;

      showToast('Game over!', `The correct Pokémon was ${correctPokemonName}!`, 'error');

      if (score > highScore) {
        localStorage.setItem('highScore', score);
        setTimeout(() => {
          showToast('New high score!', `The correct Pokémon was ${correctPokemonName}!`, 'success');
          setShowConfetti(true);
        }, 2500);
      }

      setEffectTriggered(true);
    }
  }, [gameEnded, score, effectTriggered, correctPokemonName, showToast]);

  const handleRestart = () => {
    setShowConfetti(false);
    setEffectTriggered(false);
    restartGame();
  };

  return (
    <div className="game-over">
      {/* Confetti appears only for high score */}
      {showConfetti && <ConfettiGenerator />}

      <Button 
        variant="contained" 
        sx={{ 
          backgroundColor: '#333333',
          '&:hover': { backgroundColor: 'grey'},
          marginTop: '5px',
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