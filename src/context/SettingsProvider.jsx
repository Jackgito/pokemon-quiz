import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState(() => {
    return localStorage.getItem('difficulty') || 'Normal'; // Easy, Normal, Hard
  });
  const [quizType, setQuizType] = useState(() => {
    return localStorage.getItem('quizType') || 'Retro'; // Retro, Modern, Sound
  });
  const [generations, setGenerations] = useState(() => {
    const storedGenerations = localStorage.getItem('generations');
    return storedGenerations ? JSON.parse(storedGenerations) : [
      { name: "Gen. I", value: 1, selected: true },
      { name: "Gen. II", value: 2, selected: false },
      { name: "Gen. III", value: 3, selected: false },
      { name: "Gen. IV", value: 4, selected: false },
      { name: "Gen. V", value: 5, selected: false },
      { name: "Gen. VI", value: 6, selected: false },
      { name: "Gen. VII", value: 7, selected: false },
      { name: "Gen. VIII", value: 8, selected: false },
      { name: "Gen. IX", value: 9, selected: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem('difficulty', difficulty);
  }, [difficulty]);

  useEffect(() => {
    localStorage.setItem('quizType', quizType);
  }, [quizType]);

  useEffect(() => {
    localStorage.setItem('generations', JSON.stringify(generations));
  }, [generations]);

  const changeGenerations = (newGenerations) => {
    setGenerations(newGenerations);
  };

  const getSelectedGenerations = () => {
    return generations.filter(gen => gen.selected).map(gen => gen.value);
  };

  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <SettingsContext.Provider 
      value={{ difficulty, changeDifficulty, generations, changeGenerations, getSelectedGenerations, quizType, setQuizType }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };