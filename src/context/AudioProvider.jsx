/* eslint-disable react/prop-types */
// This is not currently used anywhere since it seems impossible to run music on page load

import { createContext, useContext, useState, useEffect, useRef } from 'react';

// Context to manage music state
const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  const playlist = [
    '/songs/song1.ogg',
    '/songs/song2.ogg',
    '/songs/song3.ogg'
  ];
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const playAudio = () => audioRef.current?.play();
  const pauseAudio = () => audioRef.current?.pause();

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  useEffect(() => {
    if (playlist.length > 0 && audioRef.current) {
      audioRef.current.src = playlist[currentTrackIndex];
      audioRef.current.volume = 0.50; // Set volume to 50%
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  return (
    <AudioContext.Provider value={{ playAudio, pauseAudio, nextTrack, prevTrack, playlist, currentTrackIndex }}>
      <audio ref={audioRef} />
      {children}
    </AudioContext.Provider>
  );
};

// Custom hook to use the AudioContext
const useAudio = () => useContext(AudioContext);

export { AudioProvider, useAudio };
