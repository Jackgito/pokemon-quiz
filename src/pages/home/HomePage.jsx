import { useState } from "react";
import { useTheme } from "@mui/material";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar.jsx";
import StartButton from "./StartButton/StartButton.jsx";
import QuizPage from "../quiz/QuizPage.jsx";

import './HomePage.css';

const HomePage = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const theme = useTheme();

  const handleGameStart = () => {
    setGameStarted(true);
  };

  return (
    <>
      <ResponsiveAppBar />
      {/* Do no not change div class names. They are used in StartButton as well */}
      <div className="top-div" style={{ '--theme-palette-primary-main': theme.palette.primary.main }}>
        <h1 className="title">Who&apos;s That Pokémon?</h1>
        <p>Put your Pokémon knowledge to the ultimate test. Prove that you are the very best like no one ever was!</p>
      </div>

      <div className="middle-container">
        <div
          className="middle-div"
          style={{
            backgroundColor: theme.palette.tertiary.main,
            height: "5vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </div>

        {gameStarted ? (<QuizPage />) : (
          <StartButton onGameStart={handleGameStart}/>
        )}

        <div
          className="middle-div"
          style={{
            backgroundColor: theme.palette.tertiary.main,
            height: "5vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </div>
      </div>

      <div className="bottom-div" style={{ '--theme-palette-secondary-main': theme.palette.secondary.main }}></div>
    </>
  );
};

export default HomePage;
