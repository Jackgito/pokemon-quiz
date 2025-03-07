import { useState, useEffect, useContext } from 'react';
import ConfettiGenerator from "../ConfettiGenerator/ConfettiGenerator";
import Button from '@mui/material/Button';
import { ToastContext } from '../../../context/ToastProvider';
import { useLogin} from "../../../context/LoginProvider.jsx";
import { useSettings } from "../../../context/SettingsProvider.jsx";
import {getHighscore} from "../utils/highscore.js";


const GameOver = ({ score, restartGame, gameEnded, correctPokemonName }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [effectTriggered, setEffectTriggered] = useState(false);
  const { showToast } = useContext(ToastContext);

  const { getUser } = useLogin();
  const { getSelectedGenerations } = useSettings();

  useEffect( () => {
    ending();
  }, [gameEnded, score, effectTriggered, correctPokemonName, showToast]);

  const ending  = async () => {
    if (gameEnded && !effectTriggered) {
      showToast('Game over!', `The correct Pokémon was ${correctPokemonName}!`, 'error');


      const highScore = await getHighscore();

      if (highScore === null) {
        setEffectTriggered(true);
        return;
      }

      const difficultyMultiplier = difficultyToNumber(localStorage.getItem('difficulty'));
      if (score*difficultyMultiplier > highScore) {
        //localStorage.setItem('highScore', score);
        setTimeout(() => {
          showToast('New high score!', `The correct Pokémon was ${correctPokemonName}!`, 'success');
          setShowConfetti(true);
          sendScore();
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

  function difficultyToNumber(level) {
    const mapping = {
      easy: 1,
      normal: 2,
      hard: 3
    };
    return mapping[level.toLowerCase()] || 0;
  }

  const sendScore = async () => {
    const user = getUser();
    if (!user) {
      console.log("No user logged in, cannot send request")
      return;
    }

    const correctGuesses = parseInt(localStorage.getItem('highScore'))
    const difficulty = localStorage.getItem('difficulty')
    const gamemode = localStorage.getItem('quizType')
    let generations = getSelectedGenerations();
    const score = difficultyToNumber(difficulty)*correctGuesses;
    //Stringify the generations for db
    generations = generations.toString();

    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        username: user.email,
        correctGuesses,
        difficulty,
        gamemode,
        generations,
        score
      }),
    };

    try {
      const response = await fetch("/api/leaderboard/add", options);
      if (response.ok) {
        const data = await response.json()
        console.log(data);
      } else {
        console.log("Issue in adding to leaderboard")
      }

    } catch (err) {
      console.log(err)
      return;
    }
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