const getBackgroundStyle = (types) => {

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

  if (!types || types.length === 0) return 'var(--primary-color)';
  if (types.length === 1) return typeColors[types[0]] || '#fff';
  const [type1, type2] = types;
  return `linear-gradient(135deg, ${typeColors[type1] || '#fff'}, ${typeColors[type2] || '#fff'})`;
};

export default getBackgroundStyle;