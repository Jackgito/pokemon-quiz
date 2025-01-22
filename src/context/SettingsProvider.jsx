/* eslint-disable react/prop-types */

// How to access and modify settings example:
// import { useSettings } from '../../context/SettingsProvider';
// const { difficulty, changeDifficulty } = useSettings();
// changeDifficulty('Normal');

import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState('Normal'); // Easy , Normal, Hard
  const [generations, setGenerations] = useState([
    { name: "Gen. I", value: 1, selected: true },
    { name: "Gen. II", value: 2, selected: false },
    { name: "Gen. III", value: 3, selected: false },
    { name: "Gen. IV", value: 4, selected: false },
    { name: "Gen. V", value: 5, selected: false },
    { name: "Gen. VI", value: 6, selected: false },
    { name: "Gen. VII", value: 7, selected: false },
    { name: "Gen. VIII", value: 8, selected: false },
    { name: "Gen. IX", value: 9, selected: false },
  ]);

  const changeGenerations = (newDifficulty) => {
    setGenerations(newDifficulty);
  };

  const getSelectedGenerations = () => {
    return generations.filter(gen => gen.selected).map(gen => gen.value);
  };

  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <SettingsContext.Provider 
      value={{ difficulty, changeDifficulty, generations, changeGenerations, getSelectedGenerations }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };
