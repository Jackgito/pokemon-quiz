import React, {useState} from 'react';
import {Avatar, Box, IconButton, Menu, Tooltip} from "@mui/material";
import {stringAvatar} from "./utils.js";
import UserMenu from "./UserMenu.jsx";

const UserIcon = ({user}) => {
	const [anchorElUser, setAnchorElUser] = useState(null);


	const handleOpenSignUpMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseSignUpMenu = () => {
		setAnchorElUser(null);
	};



	return (
		<Box sx={{ flexGrow: 0, marginLeft: '4px' }}>
			<Tooltip title="Sign up or Log in">
				<Avatar {...stringAvatar(user.first_name + " " + user.last_name)} src={user.pic} onClick = {handleOpenSignUpMenu} className="shake">

				</Avatar>
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
				onClose={handleCloseSignUpMenu}
			>
				<UserMenu user={user}/>
			</Menu>
		</Box>
	);
};

export default UserIcon;