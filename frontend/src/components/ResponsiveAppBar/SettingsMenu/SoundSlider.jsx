import Typography from "@mui/material/Typography";
import { Stack, Slider } from "@mui/material";
import { useSettings } from "../../../context/SettingsProvider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import useSound from "../../../hooks/useSound";

const SoundSlider = () => {
  const { sfxVolume } = useSettings();
  const playSound = useSound();

  const handleVolumeChange = (_, newVolume) => {
    localStorage.setItem('sfxVolume', newVolume.toString());
    playSound("start");
  };

  return (
    <Stack direction={"column"} spacing={1} padding={2}>
      <Typography variant="body1" color="textSecondary">
        Volume
      </Typography>
      <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }}>
        <VolumeDown />
        <Slider
          aria-label="Volume"
          value={sfxVolume}
          onChangeCommitted={handleVolumeChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}%`}
        />
        <VolumeUp />
      </Stack>
    </Stack>
  );
};

export default SoundSlider;
