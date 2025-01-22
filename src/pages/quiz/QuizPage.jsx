import { useState, useEffect } from 'react';
import PokemonCountdown from './PokemonCountdown/PokemonCountdown';
import QuestionCard from './QuestionCard/questionCard';
import useFetchPokemonData from '../../hooks/useFetchPokemonData';
import getBackgroundStyle from './utils/getBackgroundColor';
import generateQuestionChoices from './utils/generateQuestionChoices';
import GameOver from './GameOver/GameOver';
import { useSettings } from '../../context/SettingsProvider';

import './QuizPage.css';

const QuizPage = () => {
  const [remainingPokemon, setRemainingPokemon] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [isSilhouette, setIsSilhouette] = useState(true);
  const [score, setScore] = useState(0);
  const [animateScore, setAnimateScore] = useState(false); // Track score animation
  const [key, setKey] = useState(0);
  const [choices, setChoices] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  const { pokemonData, loading, error } = useFetchPokemonData();

  const { difficulty } = useSettings();

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

  // Reset the animation class for the score after it has been applied
  useEffect(() => {
    if (animateScore) {
      const timeout = setTimeout(() => setAnimateScore(false), 200); // Animation duration
      return () => clearTimeout(timeout);
    }
  }, [animateScore]);

  const restartTimer = () => {
    setKey((prevKey) => prevKey + 1);
  };

  // If answer is correct, increment score and move to next question. Otherwise end the game.
  const checkAnswer = (choice) => {
    setIsSilhouette(false);
  
    if (choice?.correctAnswer) {
      setAnimateScore(true); // Trigger score animation
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
    setRemainingPokemon([...pokemonData]);
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    setCurrentPokemon(pokemonData[randomIndex]);
    setScore(0);
    setGameEnded(false);
    setIsSilhouette(true);
    restartTimer();
  };

  if (loading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!choices) return null;

  let timerDuration = 15;
  if (difficulty === 'Normal' || difficulty === 'Hard') { timerDuration = 10; }

  return (
    <div
      className="page-container"
      style={!isSilhouette ? { background: getBackgroundStyle(currentPokemon?.types) } : {}}
    >
      <PokemonCountdown
        duration={timerDuration}
        size={350}
        strokeWidth={10}
        onComplete={checkAnswer}
        pause={!isSilhouette}
        key={key}
        isSilhouette={isSilhouette}
        pokemonImage={currentPokemon?.imageUrl}
      />
      <QuestionCard
        question={"Who's that Pokémon?"}
        choices={choices}
        onAnswer={checkAnswer}
        isDisabled={!isSilhouette || gameEnded}
      />
      <h2>Score</h2>
      <h2 className={`score ${animateScore ? 'animate' : ''}`}>{score}</h2>

      {gameEnded && (
        <GameOver
          score={score}
          restartGame={restartGame}
        />
      )}
    </div>
  );
};

export default QuizPage;
