/* eslint-disable react/prop-types */

import MultipleChoiceAnswers from './MultipleChoiceAnswers';
import WrittenAnswer from './WrittenAnswer';

import { useSettings } from '../../../context/SettingsProvider';

import './questionCard.css';

const QuestionCard = ({ question, choices, onAnswer, isDisabled }) => {

  const { difficulty } = useSettings();

  // Pass the selected answer to the parent component
  const handleAnswer = (choice) => {
    if (isDisabled) return;
    onAnswer(choice); // Pass the selected answer to the parent component
  };

  // Find correct answer so it can be passed to the WrittenAnswer component
  if (!choices) return null;
  const correctAnswer = choices.find(choice => choice?.correctAnswer)?.answer;

  return (
    <div className="question-card">
      <h2>{question}</h2>
      <div className="answer-container">

        { difficulty === 'Easy' && (
          <MultipleChoiceAnswers
            choices={choices} 
            isDisabled={isDisabled} 
            handleAnswer={handleAnswer} 
          />
        )}

        { difficulty === 'Normal' && (
          <MultipleChoiceAnswers
            choices={choices} 
            isDisabled={isDisabled} 
            handleAnswer={handleAnswer} 
          />
        )}

        { difficulty === 'Hard' && (
          <WrittenAnswer
            correctAnswer={correctAnswer} 
            isDisabled={isDisabled} 
            handleAnswer={handleAnswer} 
          />
        )}

      </div>
    </div>
  );
};

export default QuestionCard;