import {Box, IconButton, Paper, Stack, TextField} from "@mui/material";
import Timer from "./Timer.jsx";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import {useState} from "react";

const GameCard = ({pokemon, colors, setPokemonName}) => {

    const [input, setInput] = useState()

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleSubmit = () => {
        setPokemonName(input)
        console.log(input)
    }


    return (
        <Paper sx={{padding:"16px", borderRadius:"25px"}} elevation={6}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Stack direction={"column"}>
                    <Timer time={10} colors={colors}/> {/*Change the time in seconds*/}

                    {pokemon ? <img src={pokemon.sprites.front_default}/>: <></>}

                </Stack>
            </Box>
            <Stack direction={"row"}>
                <TextField fullWidth={true} variant={"standard"} onChange={handleChange} size={"large"} color={"error"} label={pokemon? pokemon.name:"Pokemon"}></TextField>
                <IconButton onClick={handleSubmit}>
                    <CatchingPokemonIcon/>
                </IconButton>
            </Stack>
        </Paper>
    );
};

export default GameCard;