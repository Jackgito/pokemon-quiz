import { useState } from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";
import "./StartButton.css";

const StartButton = ({ onGameStart }) => {
  const theme = useTheme();
  const [wasClicked, setWasClicked] = useState(false);

  const handleClick = () => {
    setWasClicked(true);

    // Move the divs
    const divs = document.querySelectorAll(".middle-div, .top-div, .bottom-div");
    divs.forEach((div) => {
      div.classList.add("move");
    });

    // Nofify the parent component that the button was clicked
    setTimeout(() => {
      onGameStart(true);
    }, 1500); // Match the div animation duration
  };

  return (
      <Button
        variant="contained"
        onClick={handleClick}
        className={`start-button hover-animation ${wasClicked ? "shrink-button" : ""}`}
        sx={{
          transition: "transform 1.5s linear",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          backgroundColor: theme.palette.secondary.main,
          border: `18px solid ${theme.palette.tertiary.main}`,
          color: "black",
          fontFamily: theme.typography.fontFamily,
        }}
      >
        Start
      </Button>
  );
};

export default StartButton;
