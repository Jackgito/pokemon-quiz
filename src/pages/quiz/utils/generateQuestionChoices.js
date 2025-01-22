/* Example of choices
[
  {
      "answer": "Exeggutor",
      "correctAnswer": false
  },
  {
      "answer": "Eevee",
      "correctAnswer": false
  },
  {
      "answer": "Articuno",
      "correctAnswer": false
  },
  {
      "answer": "Moltres",
      "correctAnswer": true
  },
  {
      "answer": "Hypno",
      "correctAnswer": false
  }
]
*/

const generateQuestionChoices = (currentPokemon, remainingPokemon, difficulty) => {
  let choiceAmount = 3;
  if (difficulty === 'Normal') {
    choiceAmount = 4;
  }

  // Ensure choiceAmount does not exceed the number of available Pokémon
  choiceAmount = Math.min(choiceAmount, remainingPokemon.length);

  const correctAnswer = currentPokemon?.name;

  // Start the choices array with the correct answer
  const choices = [{ answer: correctAnswer, correctAnswer: true }];

  // If there aren't enough Pokémon to generate wrong answers, return the existing choices
  if (remainingPokemon.length < choiceAmount - 1) {
    console.warn(
      `Insufficient Pokémon remaining. Returning ${remainingPokemon.length + 1} choices.`
    );
    return choices.concat(
      remainingPokemon.map(pokemon => ({
        answer: pokemon.name,
        correctAnswer: false,
      }))
    );
  }

  // Add unique wrong answers to the choices array
  while (choices.length < choiceAmount) {
    const randomIndex = Math.floor(Math.random() * remainingPokemon.length);
    const randomPokemon = remainingPokemon[randomIndex];
    const wrongAnswer = randomPokemon?.name;

    // Ensure the wrong answer isn't already in the choices array
    if (!choices.some(choice => choice.answer === wrongAnswer)) {
      choices.push({ answer: wrongAnswer, correctAnswer: false });
    }
  }

  // Shuffle the choices array
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  return choices;
};

export default generateQuestionChoices;
