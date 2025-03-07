import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils"; // Helps merge custom palette extensions

const HomeTheme = () => {
  let baseTheme = createTheme({
    palette: {
      primary: {
        main: "#DE1515",
      },
      secondary: {
        main: "#F0F0F0",
      },
    },

    // When changing font, remember to update the main.css file as well
    typography: {
      fontFamily: 'Orbitron, sans-serif !important',
    },
  });

  // Extend the theme to include "tertiary"
  const theme = createTheme(deepmerge(baseTheme, {
    palette: {
      tertiary: {
        main: "rgb(35,35,35)",
        dark: "rgb(25,25,25)",
      },
    },
  }));

  return theme;
};

export default HomeTheme;
