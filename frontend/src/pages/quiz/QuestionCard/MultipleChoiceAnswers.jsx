import { useState } from 'react';

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

const MultipleChoiceAnswers = ({ choices, isDisabled, handleAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Function to handle answer selection
  const handleAnswerSelection = (choice) => {
    if (isDisabled) return;
    setSelectedAnswer(choice.answer);
    handleAnswer(choice);
  };

  const containerClass = choices.length <= 3 ? 'multiple-choice-container three-or-less' : 'multiple-choice-container';

  return (
    <div className={containerClass}>
      {choices.map((choice, index) => (
        <div
          key={index}
          className={`answer-card
            ${selectedAnswer === choice.answer ? 'selected' : ''} 
            ${selectedAnswer === choice.answer && choice.correctAnswer ? 'correct' : ''}
            ${selectedAnswer === choice.answer && !choice.correctAnswer ? 'incorrect' : ''}
          `}
          onClick={() => handleAnswerSelection(choice)}
          style={{ cursor: isDisabled ? 'default' : 'pointer' }}
        >
          {choice.answer}
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceAnswers;
