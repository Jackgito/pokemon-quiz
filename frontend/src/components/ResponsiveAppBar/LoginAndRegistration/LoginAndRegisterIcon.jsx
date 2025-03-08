import { useState } from "react";
import { Box, IconButton, Menu, Tooltip } from "@mui/material";
import { Face } from "@mui/icons-material";
import LogInMenu from "./LogInMenu.jsx";

const LoginAndRegisterIcon = () => {

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenRegisterMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseRegisterMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0, marginLeft: '4px' }}>
      <Tooltip title="Register or log in to save best score to leaderboard">
        <IconButton onClick={handleOpenRegisterMenu} sx={{ color: 'white' }} className="shake">
          <Face sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px', maxWidth: '100vw' }}

        slotProps={{
          paper: {
            sx: {
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
        onClose={handleCloseRegisterMenu}
      >
        <LogInMenu />
      </Menu>
    </Box>
  );
};

export default LoginAndRegisterIcon;