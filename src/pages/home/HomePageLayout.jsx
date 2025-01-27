import {Box, Grid2, useTheme, Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar.jsx";
import {useLogin} from "../../context/LoginProvider.jsx";

const HomePageLayout = () => {
    //Import the theme that was provided in the HomePage.jsx component
    const theme = useTheme();

    const navigate = useNavigate();

    const handleStart = () => {
      navigate('/quiz');
    };

    return (
      <Box
      style={{
        height: "100vh",
        width: "100vw",
        background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.secondary.main}), url(/wallpaper.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      sx={{padding: "16px"}}
      elevation={4}
    >
            <Grid2 container spacing={2}>
                <Grid size={{xs:12, md:6}}>
                    <ResponsiveAppBar/>
                    {/* <br></br>
                    <br></br>
                    <Button variant="contained" color="primary" onClick={handleStart}>
                      Start Quiz
                    </Button> */}
                </Grid>
            </Grid2>
        </Box>
    );
};

export default HomePageLayout;