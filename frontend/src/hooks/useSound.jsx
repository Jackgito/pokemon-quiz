import { useEffect, useState, useCallback } from "react";

const useSound = () => {
  const [audioMap, setAudioMap] = useState({});

  useEffect(() => {
    const sounds = {
      start: "sfx/start.mp3",
      personalBest: "sfx/personalBest.mp3",
      highscore: "sfx/highscore.mp3",
      wrongAnswer: "sfx/wrongAnswer.mp3",
      // Add more sounds here
    };

    const loadedAudioMap = {};
    Object.entries(sounds).forEach(([name, path]) => {
      loadedAudioMap[name] = new Audio(`/${path}`);
    });

    setAudioMap(loadedAudioMap);
  }, []);

  const playSound = useCallback((soundName) => {
    const audio = audioMap[soundName];
    if (audio) {
      const storedVolume = localStorage.getItem("sfxVolume");
      const volumeLevel = storedVolume ? Number(storedVolume) / 100 : 1;
      audio.volume = volumeLevel;
      audio.currentTime = 0; // Restart sound
      audio.play();
    } else {
      console.warn(`Sound "${soundName}" not found`);
    }
  }, [audioMap]);

  return playSound;
};

export default useSound;
