import { useState, useCallback } from 'react';

// Fetch Pokémon data from the PokeAPI and store it in sessionStorage
const useFetchLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboard = useCallback(async () => {
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/leaderboard/'); // Replace with real API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLeaderboardData(data);
    } catch (err) {
      const mockData = [
        { username: 'Alice', gamemode: 'Retro', difficulty: 'Easy', generations: 'I', correctGuesses: 50, score: 1000 },
        { username: 'Bob', gamemode: 'Modern', difficulty: 'Normal', generations: 'II', correctGuesses: 45, score: 900 },
        { username: 'Charlie', gamemode: 'Sound', difficulty: 'Hard', generations: 'I,II,III,IV', correctGuesses: 40, score: 800 },
        { username: 'David', gamemode: 'Retro', difficulty: 'Hard', generations: 'I,II,III,IV,V', correctGuesses: 38, score: 750 },
        { username: 'Eve', gamemode: 'Modern', difficulty: 'Easy', generations: 'I,II', correctGuesses: 35, score: 700 },
      ];
      setLeaderboardData(mockData);

    } finally {
      setLoading(false);
    }
  }, []);
  
  return { leaderboardData, loading, error, fetchLeaderboard };
};

export default useFetchLeaderboard;



