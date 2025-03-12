import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import useSound from '../../../hooks/useSound';

const PlaySoundButton = ({ cryUrl }) => {
  const playSound = useSound();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      playSound(cryUrl);
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3000); // Assuming average sound duration
    }
  };

  return (
    <div>
      <IconButton 
        onClick={handlePlayPause}
        color="secondary"
        size='large'
      >
        {isPlaying ? <PauseIcon sx={{ fontSize: 108 }} /> : <PlayArrowIcon sx={{ fontSize: 108 }} />}
      </IconButton>
    </div>
  );
};

export default PlaySoundButton;