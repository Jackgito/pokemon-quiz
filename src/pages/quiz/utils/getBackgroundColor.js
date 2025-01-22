// No longer used
const getBackgroundColor = (types) => {
  const typeColors = {
    Normal: '#A8A77A',
    Fire: '#EE8130',
    Water: '#6390F0',
    Electric: '#F7D02C',
    Grass: '#7AC74C',
    Ice: '#96D9D6',
    Fighting: '#C22E28',
    Poison: '#A33EA1',
    Ground: '#E2BF65',
    Flying: '#A98FF3',
    Psychic: '#F95587',
    Bug: '#A6B91A',
    Rock: '#B6A136',
    Ghost: '#735797',
    Dragon: '#6F35FC',
    Dark: '#705746',
    Steel: '#B7B7CE',
    Fairy: '#D685AD',
  };

  // Return a solid color if no types are provided or if there's only one type
  if (!types || types.length === 0) return '#fff';  // Fallback to a default color (white)
  if (types.length === 1) return typeColors[types[0]] || '#fff';  // Fallback if invalid type

  // If there are two types, return a linear gradient
  const [type1, type2] = types;
  const color1 = typeColors[type1] || '#fff';  // Fallback if type1 is invalid
  const color2 = typeColors[type2] || '#fff';  // Fallback if type2 is invalid

  // Return the linear gradient string for SVG use
  return `linear-gradient(135deg, ${color1}, ${color2})`;
};

export default getBackgroundColor;
