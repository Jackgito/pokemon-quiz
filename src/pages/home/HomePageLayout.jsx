import { Box, Grid2, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar.jsx";

const HomePageLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.secondary.main}), url(/wallpaper.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "16px",
      }}
    >
      <ResponsiveAppBar />
      <Grid2
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ height: "calc(100vh - 64px)" }} // Subtract AppBar height if necessary
      >
        <Grid2 item>
          <Button variant="contained" color="primary" onClick={handleStart}>
            Start Quiz
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default HomePageLayout;
