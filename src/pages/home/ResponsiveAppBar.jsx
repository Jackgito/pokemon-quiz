import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";
import GenerationsSwitch from "./Selection/GenerationSwitch.jsx";
import QuestionIcon from "../../themes/custom_icons/QuestionIcon.jsx";
import {Close} from "@mui/icons-material";
import DifficultySwitch from "./Selection/DifficultySwitch.jsx";
import UserIcon from "./User/UserIcon.jsx";
import {useLogin} from "../../context/LoginProvider.jsx";
import LoginAndRegisterIcon from "./Login/LoginAndRegisterIcon.jsx";

// How to access and modify settings example:
// import { useSettings } from '../../context/SettingsProvider';
// const { difficulty, changeDifficulty } = useSettings();
// changeDifficulty('Normal');


function ResponsiveAppBar() {


    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { getUser } = useLogin();

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box /*onClick={handleDrawerToggle}*/ sx={{ textAlign: 'left',  paddingX:"10px"}}>
            <Stack
                direction={"row"}
                sx={{
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Typography variant="h6" sx={{ m: 2 }}>
                    Menu
                </Typography>
                <IconButton onClick={handleDrawerToggle}>
                    <Close/>
                </IconButton>
            </Stack>
            <Divider />
            <Stack direction={"column"} divider={<Divider orientation="horizontal" flexItem />}>
                <DifficultySwitch/>
                <GenerationsSwitch/>
            </Stack>
        </Box>
    );


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'center', // Horizontal alignment
                        alignItems: 'center',
                    }}>
                        <QuestionIcon sx={{fontSize: 80}}/>
                    </Box>
                    {getUser() ?
                        <UserIcon/>
                        :
                        <LoginAndRegisterIcon/>
                    } {/*The get users returns the users information from the LoginProvider.
                        If the user hasn't logged in null is returned
                        */}
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: "inherit",
                            borderTopRightRadius: '20px',
                            borderBottomRightRadius: '20px',
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

export default ResponsiveAppBar;
