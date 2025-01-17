import { useState, useEffect } from 'react';
import PokemonCountdown from './PokemonCountdown/PokemonCountdown';
import QuestionCard from './QuestionCard/questionCard';
import useFetchPokemonData from '../../hooks/useFetchPokemonData';
import getBackgroundStyle from './utils/getBackgroundColor';
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

  const { pokemonData, loading, error } = useFetchPokemonData();

  const { difficulty } = useSettings();

  useEffect(() => {
    if (pokemonData?.length > 0) {
      setRemainingPokemon([...pokemonData]);
      const randomIndex = Math.floor(Math.random() * pokemonData.length);
      setCurrentPokemon(pokemonData[randomIndex]);
    }
  }, [pokemonData]);

  useEffect(() => {
    if (currentPokemon && remainingPokemon.length > 0) {
      setChoices(generateQuestionChoices());
    }
  }, [currentPokemon, remainingPokemon]);

  const generateQuestionChoices = () => {
    let choiceAmount = 4;
    if (difficulty === 'Normal') { choiceAmount = 5; }
    const correctAnswer = currentPokemon?.name;
    const choices = [{ answer: correctAnswer, correctAnswer: true }];

    while (choices.length < choiceAmount) {
      const randomIndex = Math.floor(Math.random() * remainingPokemon.length);
      const randomPokemon = remainingPokemon[randomIndex];
      const wrongAnswer = randomPokemon?.name;

      if (!choices.some(choice => choice.answer === wrongAnswer)) {
        choices.push({ answer: wrongAnswer, correctAnswer: false });
      }
    }

    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }

    return choices;
  };

  const restartTimer = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const moveToNextQuestion = (choice) => {
    setIsSilhouette(false);
    if (choice?.correctAnswer) {
      setAnimateScore(true); // Trigger score animation
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => {
      setRemainingPokemon((prevRemainingPokemon) =>
        prevRemainingPokemon.filter((pokemon) => pokemon.id !== currentPokemon.id)
      );
      const randomIndex = Math.floor(Math.random() * remainingPokemon.length);
      setCurrentPokemon(remainingPokemon[randomIndex]);
      setIsSilhouette(true);
      restartTimer();
    }, 3000);
  };

  // Reset the animation class for the score after it has been applied
  useEffect(() => {
    if (animateScore) {
      const timeout = setTimeout(() => setAnimateScore(false), 200); // Animation duration
      return () => clearTimeout(timeout);
    }
  }, [animateScore]);

  if (loading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!choices) return null;

  let timerDuration = 15;
  if (difficulty === 'Normal') { timerDuration = 10; }

  return (
    <div
      className="page-container"
      style={!isSilhouette ? { background: getBackgroundStyle(currentPokemon?.types) } : {}}
    >
      <PokemonCountdown
        duration={timerDuration}
        size={350}
        strokeWidth={10}
        onComplete={moveToNextQuestion}
        pause={!isSilhouette}
        key={key}
        isSilhouette={isSilhouette}
        pokemonImage={currentPokemon?.imageUrl}
      />
      <QuestionCard
        question={"Who's that Pokemon?"}
        choices={choices}
        onAnswer={moveToNextQuestion}
      />
      <h2>Score</h2>
      <h2 className={`score ${animateScore ? 'animate' : ''}`}>{score}</h2>
    </div>
  );
};

export default QuizPage;
