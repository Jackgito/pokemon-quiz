import { createContext, useContext, useState, useRef } from 'react';

// Context to manage music state
const AudioContext = createContext();

const MusicProvider = ({ children }) => {
  const playlist = [
    '/music/Lake Valor (Zame Remaster).mp3',
    '/music/Accumula Town (Furret Walk).mp3',
    '/music/Driftveil City.mp3',
    '/music/Skyarrow Bridge (Zame Remaster).mp3',
    '/music/Unova Pokémon Center (Zame Remaster).mp3',
  ];

  const getRandomTrackIndex = () => Math.floor(Math.random() * playlist.length);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    () => parseInt(localStorage.getItem('currentTrackIndex'), 10) || getRandomTrackIndex()
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(playlist[currentTrackIndex]));

  // Play the music
  const playMusic = () => {
    if (!isPlaying) {
      const musicVolume = parseInt(localStorage.getItem('musicVolume'), 10) || 0;
      audioRef.current.src = playlist[currentTrackIndex];
      audioRef.current.volume = musicVolume / 100; // Scale to [0, 1]
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Pause the music
  const pauseMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Play next track
  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % playlist.length;
      audioRef.current.src = playlist[newIndex];
      audioRef.current.play();
      setIsPlaying(true);
      return newIndex;
    });
  };

  // Play previous track
  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + playlist.length) % playlist.length;
      audioRef.current.src = playlist[newIndex];
      audioRef.current.play();
      setIsPlaying(true);
      return newIndex;
    });
  };

  // Handle the end of the track and move to the next one
  const handleSongEnd = () => {
    nextTrack();
  };

  // Set up the event listener for track end when the component mounts
  audioRef.current.addEventListener('ended', handleSongEnd);

  // Cleanup the event listener when component unmounts
  const cleanup = () => {
    audioRef.current.removeEventListener('ended', handleSongEnd);
  };

  // Cleanup logic when the component unmounts or track changes
  return (
    <AudioContext.Provider value={{ playMusic, pauseMusic, nextTrack, prevTrack, playlist, currentTrackIndex, audioRef }}>
      <audio ref={audioRef} onEnded={handleSongEnd} />
      {children}
    </AudioContext.Provider>
  );
};

const useMusic = () => useContext(AudioContext);

export { MusicProvider, useMusic };
