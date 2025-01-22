import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, MenuItem, MenuList, Typography} from "@mui/material";
import {Logout, Person, Settings} from "@mui/icons-material";

const UserIconMenu = ({profile}) => {
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="./test2.png" />
                </ListItemAvatar>
                <ListItemText primary={profile.first_name + " " + profile.last_name} secondary={profile.email}/>
            </ListItem>
        <Divider />
        <MenuList>
            <MenuItem>
                <Settings color={"action"} sx={{mr:"10px"}}/>
                <Typography color={"textSecondary"} variant={"body"}>Settings</Typography>
            </MenuItem>
            <MenuItem>
                <Person color={"action"} sx={{mr:"10px"}}/>
                <Typography color={"textSecondary"} variant={"body"}>Profile</Typography>
            </MenuItem>
            <MenuItem>
                <Logout  color={"action"} sx={{mr:"10px"}}/>
                <Typography color={"textSecondary"} variant={"body"}>Sign Out</Typography>
            </MenuItem>
        </MenuList>
        </>
    );
};

export default UserIconMenu;