import {useState} from "react";
import { Box, IconButton, Menu, Tooltip} from "@mui/material";
import {Face} from "@mui/icons-material";
import LogInMenu from "./LogInMenu.jsx";

const LoginAndRegisterIcon = () => {

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenSignUpMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    
    const handleCloseSignUpMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Sign Up or Log in">
                <IconButton onClick={handleOpenSignUpMenu} sx={{ p: 0 }}>
                    <Face sx={{color: 'white'}}/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px', maxWidth: '100vw'}}

                slotProps ={{
                    paper: {
                        sx:{
                            borderRadius: '25px'
                        }
                    }
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseSignUpMenu}
            >
                <LogInMenu/>
            </Menu>
        </Box>
    );
};

export default LoginAndRegisterIcon;