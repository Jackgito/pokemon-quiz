import {
    Avatar,
    Box,
    IconButton,
    Menu,
    Tooltip,
} from "@mui/material";
import {useState} from "react";
import UserIconMenu from "./UserIconMenu.jsx";

const exampleProfile = {
    first_name: "Arttu",
    last_name: "Korpela",
    email: "arttu@email.com",
    pic: "./test2.png"
}

const UserIcon = () => {

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [profile, setProfile] = useState(exampleProfile)

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={profile.pic}/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px', maxWidth: '40vw'}}

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
                onClose={handleCloseUserMenu}
            >
                <UserIconMenu profile={profile}/>
            </Menu>
        </Box>
    );
};

export default UserIcon;