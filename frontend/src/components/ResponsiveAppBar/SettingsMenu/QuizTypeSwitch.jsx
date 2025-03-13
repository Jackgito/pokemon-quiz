import { useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup, Stack, Typography } from '@mui/material';
import { useSettings } from '../../../context/SettingsProvider';
import { useToast } from '../../../context/ToastProvider';
import InfoButton from './InfoButton';

const QuizTypeSwitch = (isDisabled) => {
  const { quizType, setQuizType, generations } = useSettings();

  const { showToast } = useToast();

  useEffect(() => {
    const isGenIXSelected = generations.some((gen) => gen.value === 9 && gen.selected);
    if (quizType === "Modern" && isGenIXSelected) {
      showToast("Warning", "Gen 9 doesn't contain animated sprites, only images.", "warning");
    }
  }, [quizType, generations, showToast]);

  const handleQuizTypeChange = (event, newQuizType) => {
    if (newQuizType !== null) {
      setQuizType(newQuizType);
    }
  };

  return (
    <Stack direction={"column"} spacing={1} padding={2}>
      <Typography variant={"Body"} color="textSecondary">
        Quiz Type
        <InfoButton text={"Retro: 2D pixel images\nModern: 3D animations\nSound: Pokemon cries. 2x score"} />
      </Typography>
      <ToggleButtonGroup
        disabled={isDisabled.isDisabled}
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