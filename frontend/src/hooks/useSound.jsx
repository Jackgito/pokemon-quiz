import { useEffect, useState, useCallback } from "react";

/**
 * Custom hook to manage and play sound effects.
 * 
 * Supports both predefined local sounds and dynamic sounds provided via API URLs.
 * 
 * Usage:
 * 1. To play a predefined sound: playSound("start");
 * 2. To play a sound from a URL: playSound("https://example.com/sound.mp3");
 */
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

  const playSound = useCallback((soundIdentifier) => {
    let audio;
    
    // Check if soundIdentifier is a predefined sound name
    if (audioMap[soundIdentifier]) {
      audio = audioMap[soundIdentifier];
    } 
    // Check if soundIdentifier is a valid URL
    else if (typeof soundIdentifier === "string" && soundIdentifier.startsWith("http")) {
      audio = new Audio(soundIdentifier);
    }
    
    if (audio) {
      const storedVolume = localStorage.getItem("sfxVolume");
      const volumeLevel = storedVolume ? Number(storedVolume) / 100 : 1;
      audio.volume = volumeLevel;
      audio.currentTime = 0; // Restart sound
      audio.play();
    } else {
      console.warn(`Sound "${soundIdentifier}" not found or invalid URL.`);
    }
  }, [audioMap]);

  return playSound;
};

export default useSound;
