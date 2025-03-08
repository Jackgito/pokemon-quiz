import {useState} from 'react';
import {Avatar, Box, Menu} from "@mui/material";
import UserMenu from "./UserMenu.jsx";

const UserIcon = ({user}) => {
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenRegisterMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseRegisterMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{ flexGrow: 0, marginLeft: '4px' }}>
      <Avatar onClick={handleOpenRegisterMenu} className="shake">
        {user?.username?.[0]?.toUpperCase()}
      </Avatar>

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
				<UserMenu user={user}/>
			</Menu>
		</Box>
	);
};

export default UserIcon;