
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';

const WrittenAnswer = ({ correctAnswer, isDisabled, handleAnswer }) => {
  const [inputValue, setInputValue] = useState('');

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Check if the answer is correct
    if (value.toLowerCase() === correctAnswer.toLowerCase()) {
      handleAnswer({ answer: value, correctAnswer: true });
    }
  };

  // Reset the input when the correctAnswer changes
  useEffect(() => {
    setInputValue('');
  }, [correctAnswer]);

  return (
    <div>
      <TextField
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        disabled={isDisabled}
        fullWidth
        sx={{
          input: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white !important', // Ensure border color is always white
            },
          },
        }}
      />
    </div>
  );
};

export default WrittenAnswer;