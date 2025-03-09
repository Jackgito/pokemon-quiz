import { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsProvider';
import PokemonCountdown from './PokemonCountdown/PokemonCountdown';
import QuestionCard from './QuestionCard/QuestionCard.jsx';
import useFetchPokemonData from '../../hooks/useFetchPokemonData';
import generateQuestionChoices from './utils/generateQuestionChoices';
import GameOver from './GameOver/GameOver';
import ScoreDisplay from './ScoreDisplay/ScoreDisplay';
import CircularProgress from '@mui/material/CircularProgress';
import useSound from '../../hooks/useSound.jsx';

import './QuizPage.css';

const QuizPage = ({ onGameEnd, onGameRestart }) => {
  const [remainingPokemon, setRemainingPokemon] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [isSilhouette, setIsSilhouette] = useState(true);
  const [score, setScore] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0)
  const [key, setKey] = useState(0); // Used to restart the timer
  const [choices, setChoices] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  const playSound = useSound();

  const { pokemonData, loading, error, fetchPokemonData } = useFetchPokemonData();
  const { difficulty } = useSettings();

  const handleGameOver = () => {
    if (onGameEnd) {
      onGameEnd(); // Ensure it is called only if it exists
    }
    setGameEnded(true);
  };

  useEffect(() => {
    if (!pokemonData || pokemonData.length === 0) {
      fetchPokemonData();
    }
  }, [pokemonData, fetchPokemonData]);

  // Initialize the game with a random Pokémon
  useEffect(() => {
    if (pokemonData?.length > 0) {
      setRemainingPokemon([...pokemonData]);
      const randomIndex = Math.floor(Math.random() * pokemonData.length);
      setCurrentPokemon(pokemonData[randomIndex]);
    }
  }, [pokemonData]);

  // Generate new question choices when the player answers correctly
  useEffect(() => {
    if (currentPokemon && remainingPokemon.length > 0) {
      setChoices(generateQuestionChoices(currentPokemon, remainingPokemon, difficulty));
    }
  }, [currentPokemon, difficulty]);

  const restartTimer = () => {
    setKey((prevKey) => prevKey + 1);
  };

  // Score * difficulty (1, 2, 3) + 1 (if sound mode) 
  const scoreMultiplier = () => {
    const difficulty = localStorage.getItem('difficulty') || 'easy';
    const quizType = localStorage.getItem('quizType') || '';
    const difficultyMultipliers = { easy: 1, normal: 2, hard: 3 };
    let multiplier = difficultyMultipliers[difficulty.toLowerCase()] || 1;
    if (quizType.toLowerCase() === 'sound') {
      multiplier += 1; // Add extra point for Sound quiz type
    }
    return multiplier;
  };

  // If answer is correct, increment score and move to next question. Otherwise end the game.
  const checkAnswer = (choice) => {
    setIsSilhouette(false);
    if (choice?.correctAnswer) {
      playSound("start")
      setScore((prevScore) => prevScore + scoreMultiplier());
      setCorrectGuesses((prevQuesses) => prevQuesses + 1)

      // Filter the remaining Pokémon and store the result in a local variable
      const updatedRemainingPokemon = remainingPokemon.filter((pokemon) => pokemon.id !== currentPokemon.id);
      setRemainingPokemon(updatedRemainingPokemon);

      // Move to next question, unless there are no Pokémon left
      setTimeout(() => {
        if (updatedRemainingPokemon.length === 0) {
          handleGameOver(); // Call game over if no Pokémon left
        } else {
          const randomIndex = Math.floor(Math.random() * updatedRemainingPokemon.length);
          setCurrentPokemon(updatedRemainingPokemon[randomIndex]);
          setIsSilhouette(true);
          restartTimer();
        }
      }, 3000);
    } else {
      handleGameOver(); // End the game if the answer is incorrect
    }
  };

  const restartGame = () => {
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    fetchPokemonData();
    setRemainingPokemon([...pokemonData]);
    setCurrentPokemon(pokemonData[randomIndex]);
    setScore(0);
    setCorrectGuesses(0);
    setGameEnded(false);
    setIsSilhouette(true);
    restartTimer();
    onGameRestart();
  };

  return (
    <div className="page-container">
      {loading && <CircularProgress size={200} style={{ marginTop: 200 }} />}
      {error && <div>Error: {error}</div>}
      {!loading && !error && choices && (
        <>
          <PokemonCountdown
            duration={difficulty === 'Easy' ? 15 : 10}
            strokeWidth={10}
            onComplete={checkAnswer}
            pause={!isSilhouette}
            key={key}
            isSilhouette={isSilhouette}
            pokemonData={currentPokemon}
          />
          <QuestionCard
            question={"Who's that Pokémon?"}
            choices={choices}
            onAnswer={checkAnswer}
            isDisabled={!isSilhouette || gameEnded}
          />
          <ScoreDisplay score={score} />
          <GameOver
            score={score}
            restartGame={restartGame}
            gameEnded={gameEnded}
            correctPokemonName={currentPokemon?.name}
            correctGuesses={correctGuesses}
          />
        </>
      )}
    </div>
  );
};

export default QuizPage;
