import {createTheme} from "@mui/material";

const HomeTheme = () => {
    let theme = createTheme({
        palette: {
            primary: {
                //main: '#EE1515',
                main:'rgb(0,0,0)',
            },
            secondary: {
                //main: '#F0F0F0',
                main:'rgb(35,35,35)',
            },

        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        // You can add other styles here, like boxShadow, padding, etc.
                    },
                },
            },
        },
    });

    return (theme);
};

export default HomeTheme;