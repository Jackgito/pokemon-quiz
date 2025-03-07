import React, {useEffect, useState} from 'react';
import {stringAvatar} from "./utils.js";
import {Avatar, Menu, MenuItem, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import StarIcon from '@mui/icons-material/Star';
import LogoutIcon from '@mui/icons-material/Logout';
import {useLogin} from "../../../context/LoginProvider.jsx";
import {getHighscore} from "../../../pages/quiz/utils/highscore.js";


const UserMenu = ({user}) => {

	const [highscore, setHighscore] = useState(0)

	useEffect(() => {
		experiment()
	}, []);

	const experiment = async () => {
		const highscore = await getHighscore();
		setHighscore(highscore)
	}


	const {
		logOut
	} = useLogin()

	return (
		<Stack>
			<MenuItem sx={{cursor: 'default'}}>
				<Box display="flex" alignItems="center">
					<Avatar
						{...stringAvatar(user.first_name + " " + user.last_name)}
						src={user.pic}
						sx={{width: 40, height: 40, mr: 2}}
					/>
					<Box>
						<Box display="flex" alignItems="center">
							<Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
								{user.first_name + " " + user.last_name}
							</Typography>
						</Box>
						<Typography variant="body2" color="text.secondary">
							{user.email}
						</Typography>
					</Box>
				</Box>
			</MenuItem>

			<Divider/>

			{/* Action items */}
			<MenuItem>
				<StarIcon fontSize="small" sx={{mr: 1}}/>
				{"Highscore: " +  highscore}
			</MenuItem>
			<MenuItem onClick={logOut}>
				<LogoutIcon fontSize="small" sx={{mr: 1}}/>
				Sign out
			</MenuItem>
		</Stack>
	);
};

export default UserMenu;