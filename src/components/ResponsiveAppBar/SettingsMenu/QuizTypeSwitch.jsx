import { ToggleButton, ToggleButtonGroup, Stack, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useSettings } from '../../../context/SettingsProvider';

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
      </Typography>
      <ToggleButtonGroup
        value={quizType}
        exclusive
        onChange={handleQuizTypeChange}
        color={"primary"}
      >
        <ToggleButton value="Image" aria-label="image">
          <ImageIcon />
          Image
        </ToggleButton>
        <ToggleButton value="Sound" aria-label="sound">
          <MusicNoteIcon />
          Sound
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default QuizTypeSwitch;