import { useState, useEffect } from 'react';
import PokemonContainer from './PokemonContainer/PokemonContainer';
import QuestionTimer from './QuestionTimer/QuestionTimer';
import QuestionCard from './QuestionCard/QuestionCard';
import useFetchPokemonData from '../../hooks/useFetchPokemonData';

const QuizPage = () => {
  const [remainingPokemon, setRemainingPokemon] = useState([]); // List of Pokémon that haven't been guessed yet
  const [currentPokemon, setCurrentPokemon] = useState(null); // Current Pokémon to guess
  const [isSilhouette, setIsSilhouette] = useState(true); // Whether to show the Pokémon image or silhouette
  const [score, setScore] = useState(0); // Number of correct guesses
  const [key, setKey] = useState(0); // Key for resetting timer
  const [choices, setChoices] = useState([]); // Choices for the current question

  const { pokemonData, loading, error } = useFetchPokemonData();

  useEffect(() => {
    // Initialize the list of remaining Pokémon and select a random one
    if (pokemonData?.length > 0) {
      setRemainingPokemon([...pokemonData]);
      const randomIndex = Math.floor(Math.random() * pokemonData.length);
      setCurrentPokemon(pokemonData[randomIndex]);
    }
  }, [pokemonData]);

  useEffect(() => {
    if (currentPokemon && remainingPokemon.length > 0) {
      setChoices(generateQuestionChoices(5));
    }
  }, [currentPokemon, remainingPokemon]);

  const generateQuestionChoices = (choiceAmount) => {
    const correctAnswer = currentPokemon?.name;
    const choices = [{ answer: correctAnswer, correctAnswer: true }];

    while (choices.length < choiceAmount) {
      const randomIndex = Math.floor(Math.random() * remainingPokemon.length);
      const randomPokemon = remainingPokemon[randomIndex];
      const wrongAnswer = randomPokemon?.name;

      // Ensure the wrong answer is not the same as the correct answer or any already selected wrong answers
      if (!choices.some(choice => choice.answer === wrongAnswer)) {
        choices.push({ answer: wrongAnswer, correctAnswer: false });
      }
    }

    // Shuffle the choices array to randomize the order
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }

    return choices;
  };

  const moveToNextQuestion = (choice) => {
    setIsSilhouette(false);
    if (choice?.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => {
      setRemainingPokemon((prevRemainingPokemon) =>
        prevRemainingPokemon.filter((pokemon) => pokemon.id !== currentPokemon.id)
      );
      const randomIndex = Math.floor(Math.random() * remainingPokemon.length);
      setCurrentPokemon(remainingPokemon[randomIndex]);
      setIsSilhouette(true);
      setKey((prevKey) => prevKey + 1);
    }, 3000);
  };

  if (loading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page-container">
      <QuestionTimer
        initialTime={10}
        onTimeUp={moveToNextQuestion}
        key={key}
      />
      <PokemonContainer pokemonImage={currentPokemon?.imageUrl} isSilhouette={isSilhouette} />
      <QuestionCard 
        question={"Who's that Pokemon?"} 
        choices={choices}
        onAnswer={moveToNextQuestion}
      />
      <div>Score: {score}</div>
    </div>
  );
};

export default QuizPage;