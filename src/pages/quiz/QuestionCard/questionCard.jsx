/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import './questionCard.css';

const QuestionCard = ({ question, choices, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(false);
  }, [choices]);

  // Reset states when question changes
  useEffect(() => {
    setSelectedAnswer(null);
  }, [question]);

  // Pass the selected answer to the parent component
  const handleAnswerClick = (choice) => {
    if (isDisabled) return;
    setIsDisabled(true); // Stop further clicks until question changes
    setSelectedAnswer(choice.answer); // Track the selected answer
    onAnswer(choice); // Pass the selected answer to the parent component (object that contains answer string and correctAnswer boolean)
  };

  return (
    <div className="question-card">
      <h2>{question}</h2>
      <div className="answer-container">
        {choices.map((choice, index) => (
          <div
            key={index}
            className={`answer-card ${isDisabled ? 'disabled' : ''} ${selectedAnswer === choice.answer ? 'selected' : ''} ${selectedAnswer === choice.answer && choice.correctAnswer ? 'correct' : ''} ${selectedAnswer === choice.answer && !choice.correctAnswer ? 'incorrect' : ''}`} 
            onClick={() => handleAnswerClick(choice)}
          >
            {choice.answer}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;