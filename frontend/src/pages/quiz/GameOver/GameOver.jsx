import { useState, useEffect, useContext } from 'react';
import ConfettiGenerator from "../ConfettiGenerator/ConfettiGenerator";
import Button from '@mui/material/Button';
import { ToastContext } from '../../../context/ToastProvider';
import { useLogin} from "../../../context/LoginProvider.jsx";
import { useSettings } from "../../../context/SettingsProvider.jsx";
import {getHighscore} from "../utils/highscore.js";

const GameOver = ({ score, restartGame, gameEnded, correctPokemonName, correctGuesses }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [effectTriggered, setEffectTriggered] = useState(false);
  const { showToast } = useContext(ToastContext);
  console.log(correctGuesses)

  const { getUser } = useLogin();
  const { getSelectedGenerations } = useSettings();

  useEffect(() => {
    ending();
  }, [gameEnded, score, effectTriggered, correctPokemonName, showToast]);

  const ending = async () => {
    if (gameEnded && !effectTriggered) {
      showToast('Game over!', `The correct Pokémon was ${correctPokemonName}!`, 'error');

      const highScore = await getHighscore();
      if (highScore === null) {
        setEffectTriggered(true);
        return;
      }

      const scoreResult = await sendScore(score, correctGuesses);

      if (scoreResult.isNewHighScore) {
        setTimeout(() => {
          showToast('New high score!', `The correct Pokémon was ${correctPokemonName}!`, 'success');
          setShowConfetti(true);
        }, 2500);
      } else if (scoreResult.isNewPersonalBest) {
        setTimeout(() => {
          showToast('New personal best!', `The correct Pokémon was ${correctPokemonName}!`, 'success');
        }, 2500);
      }

      setEffectTriggered(true);
    }
  }

  const handleRestart = () => {
    setShowConfetti(false);
    setEffectTriggered(false);
    restartGame();
  };

  const sendScore = async (score, correctGuesses) => {
    const user = getUser();
    if (!user) {
      // No user logged in, cannot send request
      return { isNewPersonalBest: false, isNewHighScore: false };
    }

    const difficulty = localStorage.getItem('difficulty')
    const gamemode = localStorage.getItem('quizType')
    let generations = getSelectedGenerations();

    //Stringify the generations for db
    generations = generations.toString();

    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        username: user.username,
        correctGuesses,
        difficulty,
        gamemode,
        generations,
        score
      }),
    };

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
      const response = await fetch(`${backendUrl}/api/leaderboard/add", options`);
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err)
      return { isNewPersonalBest: false, isNewHighScore: false };
    }
  };

  return (
    <div className="game-over">
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
