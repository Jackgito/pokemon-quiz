import { ToggleButton, ToggleButtonGroup, Stack, Typography } from '@mui/material';
import { useSettings } from '../../../context/SettingsProvider';
import InfoButton from './InfoButton';

const QuizTypeSwitch = () => {
  const { quizType, setQuizType } = useSettings();

  const handleQuizTypeChange = (event, newQuizType) => {
    if (newQuizType !== null) {
      setQuizType(newQuizType);
    }
  };

  return (
    <Stack direction={"column"} spacing={1} padding={2}>
      <Typography variant={"Body"} color="textSecondary">
        Quiz Type
        <InfoButton text={"Retro: 2D pixel images\nModern: 3D animations\nSound: Pokemon cries. +1 point after score multipliers"} />
      </Typography>
      <ToggleButtonGroup
        value={quizType}
        exclusive
        onChange={handleQuizTypeChange}
        color={"primary"}
      >
        <ToggleButton value="Retro" sx={{ width: '100%' }}>
          Retro
        </ToggleButton>
        <ToggleButton value="Modern" sx={{ width: '100%' }}>
          Modern
        </ToggleButton>
        <ToggleButton value="Sound" sx={{ width: '100%' }}>
          Sound
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default QuizTypeSwitch;