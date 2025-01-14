/* eslint-disable react/prop-types */

import './PokemonContainer.css';

const PokemonContainer = ({ pokemonImage, isSilhouette }) => {
  return (
    <div className="pokemon-container">
      <img
        src={pokemonImage}
        alt="Pokemon"
        className={`pokemon-image ${isSilhouette ? 'silhouette' : 'no-silhoutte'}`}
      />
    </div>
  );
};

export default PokemonContainer;