import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";
import GenerationsSwitch from "../pages/home/Selection/GenerationSelector.jsx";
import QuestionIcon from "../themes/custom_icons/QuestionIcon.jsx";
import {Close} from "@mui/icons-material";
import DifficultySwitch from "../pages/home/Selection/DifficultySwitch.jsx";
import UserIcon from "../pages/home/User/UserIcon.jsx";

function ResponsiveAppBar() {


    const [mobileOpen, setMobileOpen] = React.useState(false);
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
                    <UserIcon></UserIcon>

                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    style={{borderRadius:"25px"}}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: "inherit",
                            borderTopRightRadius: '20px',
                            borderBottomRightRadius: '20px',
                            opacity:"100%"

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
