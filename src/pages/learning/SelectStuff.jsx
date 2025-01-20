import React, {useState} from 'react';
import {Box, MenuItem, TextField, } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const SelectStuff = () => {
    const [country, setCountry] = useState('');



    const handleChange = (event) => {
        setCountry(event.target.value);
    }

    return (
        <Box width={"inherit"}>
            <TextField label={"Select country"}
                       select={true}
                       value={country}
                       onChange={handleChange}
                       fullWidth={true}
            >
                <MenuItem value={"FI"}>Finland</MenuItem>
                <MenuItem value={"USA"}>United States</MenuItem>
                <MenuItem value={"SWE"}>Sweden</MenuItem>
                
            </TextField>




        </Box>
    );
};

export default SelectStuff;