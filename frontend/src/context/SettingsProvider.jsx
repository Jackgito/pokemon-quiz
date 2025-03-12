import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

// The app settings can be easily accessed from here (excluding music and sound volume since they need to be checked from local storage directly for performance reasons)
const SettingsProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState(() => 
    localStorage.getItem("difficulty") || "Normal"
  );

  const [quizType, setQuizType] = useState(() => 
    localStorage.getItem("quizType") || "Retro"
  );

  const [generations, setGenerations] = useState(() => {
    const storedGenerations = localStorage.getItem("generations");
    return storedGenerations
      ? JSON.parse(storedGenerations)
      : [
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

  const [sfxVolume, setSfxVolume] = useState(() => 
    localStorage.getItem("sfxVolume") || 0
  );

  useEffect(() => {
    localStorage.setItem("sfxVolume", sfxVolume);
  }, [sfxVolume]);

  // Auto-sync state with localStorage
  useEffect(() => {
    localStorage.setItem("difficulty", difficulty);
  }, [difficulty]);

  useEffect(() => {
    localStorage.setItem("quizType", quizType);
  }, [quizType]);

  useEffect(() => {
    localStorage.setItem("generations", JSON.stringify(generations));
  }, [generations]);

  const getSelectedGenerations = () =>
    generations.filter((gen) => gen.selected).map((gen) => gen.value);

  return (
    <SettingsContext.Provider
      value={{
        difficulty,
        setDifficulty,
        quizType,
        setQuizType,
        generations,
        setGenerations,
        getSelectedGenerations,
        sfxVolume,
        setSfxVolume
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };
