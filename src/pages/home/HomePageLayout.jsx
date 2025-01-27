import {Box, Grid2, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ResponsiveAppBar from "./ResponsiveAppBar.jsx";
import {useLogin} from "../../context/LoginProvider.jsx";
import {useEffect} from "react";
//import QuizPage from "../quiz/QuizPage.jsx";

const HomePageLayout = () => {
    //Import the theme that was provided in the HomePage.jsx component
    const theme = useTheme();
    const {alert, generateAlert} = useLogin()

    return (
        <Box style={{height: "100vh", width: "100vw", background: `linear-gradient( ${theme.palette.primary.main},${theme.palette.secondary.main} )`}} sx={{padding: "16px"}} elevation={4}>
            <Grid2 container spacing={2}>
                <Grid size={{xs:12, md:6}}>
                    <ResponsiveAppBar/>
                    {/*<QuizPage></QuizPage>*/}
                  {alert ? generateAlert(alert) : null}
                </Grid>
            </Grid2>
        </Box>
    );
};

export default HomePageLayout;