import { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsProvider';
import PokemonCountdown from './PokemonCountdown/PokemonCountdown';
import QuestionCard from './QuestionCard/QuestionCard.jsx';
import useFetchPokemonData from '../../hooks/useFetchPokemonData';
import generateQuestionChoices from './utils/generateQuestionChoices';
import GameOver from './GameOver/GameOver';
import ScoreDisplay from './ScoreDisplay/ScoreDisplay';
import CircularProgress from '@mui/material/CircularProgress';

import './QuizPage.css';

import HomeTheme from "../../themes/HomeTheme.jsx";
import { ThemeProvider } from "@mui/material";

const QuizPage = () => {
  const [remainingPokemon, setRemainingPokemon] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [isSilhouette, setIsSilhouette] = useState(true);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0); // Key is used to restart the timer
  const [choices, setChoices] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  const { pokemonData, loading, error, fetchPokemonData } = useFetchPokemonData();

  const { difficulty } = useSettings();

  const theme = HomeTheme();

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

  // If answer is correct, increment score and move to next question. Otherwise end the game.
  const checkAnswer = (choice) => {
    setIsSilhouette(false);
    if (choice?.correctAnswer) {
      setScore((prevScore) => prevScore + 1);

      // Filter the remaining Pokémon and store the result in a local variable
      const updatedRemainingPokemon = remainingPokemon.filter((pokemon) => pokemon.id !== currentPokemon.id)

      setRemainingPokemon((prevRemainingPokemon) =>
        prevRemainingPokemon.filter((pokemon) => pokemon.id !== currentPokemon.id)
      );

      // Move to next question, unless there are no Pokémon left
      setTimeout(() => {
        // End the game if no Pokémon are left
        if (updatedRemainingPokemon.length === 0) {
          setGameEnded(true);
        } else {
          const randomIndex = Math.floor(Math.random() * updatedRemainingPokemon.length);
          setCurrentPokemon(updatedRemainingPokemon[randomIndex]);
          setIsSilhouette(true);
          restartTimer();
        }
      }, 3000);

    } else {
      setGameEnded(true) // End the game if the answer is incorrect
      return;
    }
  };

  const restartGame = () => {
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    fetchPokemonData();
    setRemainingPokemon([...pokemonData]);
    setCurrentPokemon(pokemonData[randomIndex]);
    setScore(0);
    setGameEnded(false);
    setIsSilhouette(true);
    restartTimer();
  };

  let timerDuration = 15;
  if (difficulty === 'Normal' || difficulty === 'Hard') { timerDuration = 10; }

  return (
    <ThemeProvider theme={theme}>
      <div className="page-container">

        {loading && 
          <div>
            <CircularProgress size={200} style={{marginTop: 200}} />
          </div>
        }
        {error && <div>Error: {error}</div>}
        {!choices && <div>No choices available</div>}

        {!loading && !error && choices && (
          <>
            <PokemonCountdown
              duration={timerDuration}
              strokeWidth={10}
              onComplete={checkAnswer}
              pause={!isSilhouette}
              key={key}
              isSilhouette={isSilhouette}
              pokemonData={currentPokemon}
              currentPokemon={currentPokemon}
            />
            <QuestionCard
              question={"Who's that Pokémon?"}
              choices={choices}
              onAnswer={checkAnswer}
              isDisabled={!isSilhouette || gameEnded}
            />
            <ScoreDisplay score={parseInt(score, 10)} />
            <GameOver
              score={score}
              restartGame={restartGame}
              gameEnded={gameEnded}
              correctPokemonName={currentPokemon?.name}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default QuizPage;
