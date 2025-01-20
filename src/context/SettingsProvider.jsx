/* eslint-disable react/prop-types */

// How to access and modify settings example:
// import { useSettings } from '../../context/SettingsProvider';
// const { difficulty, changeDifficulty } = useSettings();
// changeDifficulty('Normal');

import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState('Normal'); // Easy , Normal, Hard

  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <SettingsContext.Provider value={{ difficulty, changeDifficulty }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };
