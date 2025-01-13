import { useState, useEffect } from 'react';

// Makes API call to PokeApi to fetch data for the first 151 Pokémon
const useFetchPokemonData = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const capitalize = str => str.replace(/^\w/, c => c.toUpperCase());

  // Fetch function defined outside of useEffect to avoid re-creating it on each render
  const fetchPokemonData = async () => {
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(
        Array.from({ length: 151 }, (_, index) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}/`).then(res => {
            if (!res.ok) throw new Error(`Failed to fetch Pokémon ${index + 1}`);
            return res.json();
          })
        )
      );

      const data = responses.map(pokemon => ({
        id: pokemon.id,
        name: capitalize(pokemon.name),
        imageUrl: pokemon.sprites?.front_default || null,
      }));

      setPokemonData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch Pokémon data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []); // Only run once on mount

  return { pokemonData, loading, error };
};

export default useFetchPokemonData;
