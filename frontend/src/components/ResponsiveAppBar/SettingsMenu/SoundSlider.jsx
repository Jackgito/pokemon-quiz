import Typography from "@mui/material/Typography";
import { Stack, Slider } from "@mui/material";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import useSound from "../../../hooks/useSound";
import { useMusic } from "../../../context/MusicProvider";
import { useState, useEffect } from "react";

// This is used for changing sound and music volumes in the settings
const SoundSlider = ({ type }) => {
  const playSound = useSound();
  const { playMusic, pauseMusic, audioRef } = useMusic();
  
  // State to control the volume
  const defaultVolume = type === "music" ? 0 : localStorage.getItem("sfxVolume");
  const [volume, setVolume] = useState(defaultVolume);

  const handleVolumeChange = (_, newVolume) => {
    setVolume(newVolume); // Update the volume in state
    
    // Update the volume in localStorage
    if (type === "sfx") {
      localStorage.setItem('sfxVolume', newVolume.toString());
    } else {
      localStorage.setItem('musicVolume', newVolume.toString());
      if (audioRef?.current) {
        audioRef.current.volume = newVolume / 100; // Adjust music volume
      }
      newVolume > 0 ? playMusic() : pauseMusic(); // Start/stop music
    }
  };

  useEffect(() => {
    if (audioRef?.current && type === "music") {
      audioRef.current.volume = volume / 100; // Apply initial volume
    }
  }, [volume, audioRef]);

  return (
    <Stack direction="column" spacing={1} padding={2}>
      <Typography variant="body1" color="textSecondary">
        {type === "music" ? "Music Volume" : "SFX Volume"}
      </Typography>
      <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }}>
        <VolumeDown />
        <Slider
          aria-label="Volume"
          value={volume}
          onChange={handleVolumeChange}
          onChangeCommitted={() => playSound("start")}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}%`}
          min={0}
          max={100}
        />
        <VolumeUp />
      </Stack>
    </Stack>
  );
};

export default SoundSlider;
