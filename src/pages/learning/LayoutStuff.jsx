import { Paper} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextStuff from "./TextStuff.jsx";
import ButtonStuff from "./ButtonStuff.jsx";
import InputStuff from "./InputStuff.jsx";
import SelectStuff from "./SelectStuff.jsx";
import GameCard from "./GameCard.jsx";
import { useEffect, useState} from "react";
import {prominent} from "color.js";


const LayoutStuff = () => {
    const [pokemonName, setPokemonName] = useState("charmander")
    const [pokemon, setPokemon] = useState()
    const [fetchedColors, setFetchedColors] = useState([]);



    // Fetch Pokemon data and set the pic state
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => response.json())
            .then((data) => {
                setPokemon(data)
            });
    }, [pokemonName]);

    // Run prominent() whenever pic changes
    useEffect(() => {
        if (pokemon) {
            prominent(pokemon.sprites.front_default, { amount: 3, format: "hex" }).then((colors) => {
                console.log(colors);
                setFetchedColors(colors);
            });
        }
    }, [pokemon])

    return (
        <Paper style={{background: `linear-gradient(to right bottom, ${fetchedColors[1]},${fetchedColors[2]} )`}} sx={{padding: "16px"}} elevation={4}>
            <Grid container spacing={2}>
                <Grid size={{xs:12, md:6}}>
                    <GameCard pokemon={pokemon} colors={fetchedColors} setPokemonName={setPokemonName}/>
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <Paper style={{opacity: 0.7}} sx={{padding:"16px"}}>
                        <TextStuff></TextStuff>
                    </Paper>
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <Paper sx={{padding:"16px"}}>
                        <ButtonStuff/>
                    </Paper>
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <Paper sx={{padding:"16px"}}>
                        <InputStuff/>
                    </Paper>
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <Paper sx={{padding:"16px"}}>
                        <SelectStuff></SelectStuff>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default LayoutStuff;