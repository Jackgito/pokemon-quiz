import { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsProvider';

const useFetchPokemonData = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getSelectedGenerations } = useSettings();

  const capitalize = str => str.replace(/^\w/, c => c.toUpperCase());

  const fetchPokemonData = async () => {
    setLoading(true);
    setError(null);
    try {
      const selectedGens = getSelectedGenerations();
      const pokemonRanges = {
        1: [1, 151],
        2: [152, 251],
        3: [252, 386],
        4: [387, 493],
        5: [494, 649],
        6: [650, 721],
        7: [722, 809],
        8: [810, 898],
        9: [899, 1010]
      };

      let allPokemon = [];
      for (const gen of selectedGens) {
        const [start, end] = pokemonRanges[gen];
        const responses = await Promise.all(
          Array.from({ length: end - start + 1 }, (_, index) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${start + index}/`).then(res => {
              if (!res.ok) throw new Error(`Failed to fetch Pokémon ${start + index}`);
              return res.json();
            })
          )
        );

        const data = responses.map(pokemon => ({
          id: pokemon.id,
          name: capitalize(pokemon.name),
          imageUrl: pokemon.sprites?.front_default || null,
          types: pokemon.types.map((typeInfo) => capitalize(typeInfo.type.name))
        }));

        allPokemon = [...allPokemon, ...data];
      }

      setPokemonData(allPokemon);
    } catch (err) {
      setError(err.message || 'Failed to fetch Pokémon data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, [getSelectedGenerations]); // Re-fetch when selected generations change

  return { pokemonData, loading, error };
};

export default useFetchPokemonData;
