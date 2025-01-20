import {useState} from 'react';
import {IconButton, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {VisibilityOff} from "@mui/icons-material";



const InputStuff = () => {
    const [visibility, setVisibility] = useState(false);

    const handleVisibility = () => {
        visibility ? setVisibility(false) : setVisibility(true);
    }

    return (
        <>
            <Typography variant={"h5"} gutterBottom={true} textAlign={"center"}> This component showcases the input components for Material UI</Typography>
            <Stack spacing={4}>
                <Stack spacing={2} direction={"row"}>
                    <TextField variant={"outlined"} size={"small"} color={"primary"} label={"small"}></TextField>
                    <TextField variant={"filled"} size={"medium"} color={"secondary"} label={"medium"}></TextField>
                    <TextField variant={"standard"} size={"large"} color={"error"} label={"Large"}></TextField>
                </Stack>
                <Stack spacing={2} direction={"row"}>
                    <TextField
                        required
                        label={"password"}
                        type={visibility ? "text" : "password"}
                        helperText={"Use more than eight characters"}
                    >
                    </TextField>
                    <IconButton onClick={handleVisibility}>
                        {!visibility ? <VisibilityIcon/> : <VisibilityOff/>}
                    </IconButton>
                </Stack>
            </Stack>
        </>
    );
};

export default InputStuff;