import { useState, useRef, useCallback } from 'react';
import { useSettings } from '../context/SettingsProvider';

const useFetchPokemonData = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getSelectedGenerations } = useSettings();
  const prevSelectedGenerations = useRef([]);
  const cachedData = useRef({}); // Cache to store data for each generation

  const capitalize = (str) => str.replace(/^\w/, (c) => c.toUpperCase());

  const fetchPokemonData = useCallback(async () => {

    const selectedGens = getSelectedGenerations();
    if (JSON.stringify(prevSelectedGenerations.current) === JSON.stringify(selectedGens)) return;

    setLoading(true);
    setError(null);

    try {
      const pokemonRanges = {
        1: [1, 151],
        2: [152, 251],
        3: [252, 386],
        4: [387, 493],
        5: [494, 649],
        6: [650, 721],
        7: [722, 809],
        8: [810, 898],
        9: [899, 1010],
      };

      let allPokemon = [];
      for (const gen of selectedGens) {
        if (cachedData.current[gen]) {
          // If the generation data is cached, use it
          allPokemon = [...allPokemon, ...cachedData.current[gen]];
        } else {
          // Fetch data for uncached generations
          const [start, end] = pokemonRanges[gen];
          const responses = await Promise.all(
            Array.from({ length: end - start + 1 }, (_, index) =>
              fetch(`https://pokeapi.co/api/v2/pokemon/${start + index}/`).then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch Pokémon ${start + index}`);
                return res.json();
              })
            )
          );

          const data = responses.map((pokemon) => ({
            id: pokemon.id,
            name: capitalize(pokemon.name),
            imageUrl: pokemon.sprites?.front_default || null,
            cryUrl: pokemon.cries?.latest || null,
            animationUrl: pokemon.sprites.other.showdown.front_default,
            types: pokemon.types.map((typeInfo) => capitalize(typeInfo.type.name)),
          }));

          console.log(data[0])

          cachedData.current[gen] = data; // Cache the data for this generation
          allPokemon = [...allPokemon, ...data];
        }
      }

      setPokemonData(allPokemon);
      prevSelectedGenerations.current = selectedGens;
    } catch (err) {
      setError(err.message || 'Failed to fetch Pokémon data');
    } finally {
      setLoading(false);
    }
  }, [getSelectedGenerations]);

  return { pokemonData, loading, error, fetchPokemonData };
};

export default useFetchPokemonData;
