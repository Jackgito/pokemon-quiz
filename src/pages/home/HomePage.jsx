import HomePageLayout from "./HomePageLayout.jsx";
import HomeTheme from "../../themes/HomeTheme.jsx";
import {CssBaseline, ThemeProvider} from "@mui/material";


const HomePage = () => {
  //Import the Homepages theme
  const theme = HomeTheme();

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <HomePageLayout/>
      </ThemeProvider>
  );
};

export default HomePage;