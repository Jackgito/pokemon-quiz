import {
    Button,
    ButtonGroup,
    Divider,
    IconButton,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import {FormatBoldSharp} from "@mui/icons-material";
import {FormatItalicSharp} from "@mui/icons-material";
import {FormatUnderlinedSharp} from "@mui/icons-material";
import {useState} from "react";


const ButtonStuff = () => {
    const [colorIndex, setColorIndex] = useState(0)
    const [curColor, setCurColor] = useState("primary")

    const colors = ["primary", "secondary", "error","warning", "info", "success"];

    const changeColor = () => {
        if (colorIndex >= colors.length-1) {
            setColorIndex(0)
        } else {
            setColorIndex(colorIndex+1);
        }

        setCurColor(colors[colorIndex])
    }

    const [sizeIndex, setSizeIndex] = useState(0)
    const [size, setSize] = useState("small")

    const sizes = ["small","medium","large"];

    const changeSize = () => {
        if (sizeIndex >= sizes.length-1) {
            setSizeIndex(0)
        } else {
            setSizeIndex(sizeIndex+1);
        }

        setSize(sizes[sizeIndex])
    }

    const [formats, setFormats] = useState([]);
    const handleFormatChange = (_event, updatedFormats) => {
        setFormats(updatedFormats)
    }

    return (
        <div>
            <Typography variant={"h5"} gutterBottom={true} textAlign={"center"}> This component showcases the button styles for Material UI</Typography>
            <Divider></Divider>
            <Stack spacing={1}>
                <Stack spacing={2} direction={"row"}>
                    <Button variant={"text"}>Text</Button>
                    <Button variant={"contained"}>Contained</Button>
                    <Button variant={"outlined"}>Outlined</Button>
                </Stack>
                <Typography>Press the button below to change its color</Typography>
                <Button variant={"contained"} color={curColor} onClick={changeColor}>Button color: {curColor}</Button>
                <Typography>Press the button below to change its size</Typography>
                <Button variant={"contained"} size={size} onClick={changeSize}>Button size: {size}</Button>
                <Typography>You can also do buttons with icons</Typography>
                <Stack spacing={2} direction={"row"}>
                    <Button variant={"contained"} startIcon={<CatchingPokemonIcon/>}>startIcon</Button>
                    <Button variant={"contained"} endIcon={<CatchingPokemonIcon/>}>endIcon</Button>
                    <IconButton>
                        <CatchingPokemonIcon/>
                    </IconButton>
                </Stack>
                <Typography>We can also do button groups</Typography>
                <Stack direction={"row"} >
                    <ButtonGroup variant={"outlined"} orientation={"vertical"}>
                        <Button>left up</Button>
                        <Button>left down</Button>
                    </ButtonGroup>
                    <ButtonGroup variant={"outlined"} orientation={"vertical"}>
                        <Button>right up</Button>
                        <Button>right down</Button>
                    </ButtonGroup>
                </Stack>
                <Typography> Here is a ToggleButtonGroup. Selected: {formats.join(", ")} </Typography>
                <Stack direction={"row"}>
                    <ToggleButtonGroup value={formats} onChange={handleFormatChange}>
                        <ToggleButton value={"bold"}>
                            <FormatBoldSharp/>
                        </ToggleButton>
                        <ToggleButton value={"italic"}>
                            <FormatItalicSharp/>
                        </ToggleButton>
                        <ToggleButton value={"underlined"}>
                            <FormatUnderlinedSharp/>
                        </ToggleButton>
                    </ToggleButtonGroup>

                </Stack>

            </Stack>

        </div>
    );
};

export default ButtonStuff;