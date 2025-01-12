import React, { useState } from 'react';
import './questionCard.css';

const QuestionCard = ({ question, choices, onAnswer, isDisabled }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Inline AnswerCard component
    const AnswerCard = ({ answer, onClick, isDisabled, isSelected, isCorrect }) => {
      return (
        <div 
          className={`answer-card ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isSelected && isCorrect ? 'correct' : ''} ${isSelected && !isCorrect ? 'incorrect' : ''}`} 
          onClick={() => !isDisabled && onClick()}
        >
          {answer}
        </div>
      );
    };

    // Pass the selected answer to the parent component
    const handleAnswerClick = (choice) => {
        if (!isDisabled) {
            setSelectedAnswer(choice.answer);  // Track the selected answer
            onAnswer(choice);  // Pass the selected answer to the parent component (object that contains answer string and correctAnswer boolean)
        }
    };

    return (
        <div className="question-card">
            <h2>{question}</h2>
            <div className="answer-container">
                {choices.map((choice, index) => (
                    <AnswerCard
                        key={index}
                        answer={choice.answer}
                        onClick={() => handleAnswerClick(choice)}
                        isDisabled={isDisabled}
                        isSelected={selectedAnswer === choice.answer}
                        isCorrect={choice.correctAnswer}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;