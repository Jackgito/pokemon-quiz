import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    NativeSelect,
    OutlinedInput,
    Select, Stack,
    useTheme
} from "@mui/material";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const WIDTH = 250;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: WIDTH,
        },
    },
};

const generations = [
    "Gen. I",
    "Gen. II",
    "Gen. III",
    "Gen. IV",
    "Gen. V",
    "Gen. VI",
    "Gen. VII",
    "Gen. VIII",
    "Gen. IX"
];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}
const GenerationsSwitch = () => {
    const theme = useTheme();
    const [genName, setGenName] = useState(["Gen. I"]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setGenName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Stack direction={"column"} spacing={2} padding={2}>
            <Typography variant={"Body"} color={"textSecondary"}>
                Choose Generations
            </Typography>

            <FormControl sx={{ m: 1, width: WIDTH }}>
                <InputLabel id="demo-multiple-chip-label">Generations</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={genName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Generations" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {generations.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, genName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );

};

export default GenerationsSwitch;
