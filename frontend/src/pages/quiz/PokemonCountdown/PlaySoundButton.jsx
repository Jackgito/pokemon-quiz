import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const PlaySoundButton = ({ cryUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05; // Decrease volume
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [cryUrl]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <IconButton 
        onClick={handlePlayPause}
        color="secondary"
        size='large'
      >
        {isPlaying ? <PauseIcon sx={{fontSize: 108}}/> : <PlayArrowIcon sx={{fontSize: 108}}/>}
      </IconButton>
      <audio
        ref={audioRef}
        src={cryUrl}
        onEnded={handleAudioEnd}
        preload="auto"
      />
    </div>
  );
};

export default PlaySoundButton;
