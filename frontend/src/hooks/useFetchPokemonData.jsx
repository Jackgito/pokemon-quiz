import { useState, useRef, useCallback } from 'react';
import { useSettings } from '../context/SettingsProvider';
import { useToast } from "../context/ToastProvider";

// Fetch Pokémon data from the PokeAPI and store it in sessionStorage
const useFetchPokemonData = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getSelectedGenerations } = useSettings();
  const prevSelectedGenerations = useRef([]);

  const { showToast } = useToast();

  const capitalize = (str) => str.replace(/^\w/, (c) => c.toUpperCase());

  const fetchPokemonData = useCallback(async () => {
  
    const selectedGens = getSelectedGenerations();
    if (JSON.stringify(prevSelectedGenerations.current) === JSON.stringify(selectedGens)) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const pokemonRanges = {
        1: [1, 151], 2: [152, 251], 3: [252, 386], 4: [387, 493],
        5: [494, 649], 6: [650, 721], 7: [722, 809], 8: [810, 898], 9: [899, 1010]
      };
  
      let allPokemon = [];
      for (const gen of selectedGens) {
        const cachedGen = sessionStorage.getItem(`gen-${gen}`);
        if (cachedGen) {
          allPokemon = [...allPokemon, ...JSON.parse(cachedGen)];
        } else {
          const [start, end] = pokemonRanges[gen];
  
          const responses = await Promise.allSettled(
            Array.from({ length: end - start + 1 }, (_, index) =>
              fetch(`https://pokeapi.co/api/v2/pokemon/${start + index}/`)
            )
          );
  
          const validResponses = responses
            .filter((res) => res.status === "fulfilled" && res.value.ok)
            .map((res) => res.value);
  
          const data = await Promise.all(validResponses.map((res) => res.json()));
  
          const formattedData = data.map((pokemon) => ({
            id: pokemon.id,
            name: capitalize(pokemon.species.name),
            imageUrl: pokemon.sprites?.front_default || null,
            cryUrl: pokemon.cries?.latest || null,
            animationUrl: pokemon.sprites.other.showdown.front_default || pokemon.sprites?.front_default,
            types: pokemon.types.map((typeInfo) => capitalize(typeInfo.type.name)),
          }));
  
          sessionStorage.setItem(`gen-${gen}`, JSON.stringify(formattedData));
          allPokemon = [...allPokemon, ...formattedData];
        }
      }
  
      setPokemonData(allPokemon);
      prevSelectedGenerations.current = selectedGens;
  
    } catch (err) {
      setError(err.message || "Failed to fetch Pokémon data");
      showToast("Error", "Failed to load Pokémon data.", "error");
    } finally {
      setLoading(false);
    }
  }, [getSelectedGenerations]);
  
  

  return { pokemonData, loading, error, fetchPokemonData };
};

export default useFetchPokemonData;
