import {createTheme} from "@mui/material";

const HomeTheme = () => {
    let theme = createTheme({
        palette: {
            primary: {
                main: '#EE1515',
            },
            secondary: {
                main: '#F0F0F0',
            },

        },
    });

    return (theme);
};

export default HomeTheme;