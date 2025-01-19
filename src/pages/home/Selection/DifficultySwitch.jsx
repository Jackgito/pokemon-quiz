import Typography from "@mui/material/Typography";
import {Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useState} from "react";

const DifficultySwitch = () => {
    const [difficulties, setDifficulties] = useState("medium");
    const handleFormatChange = (_event, chosenDifficulty) => {
        setDifficulties(chosenDifficulty)
    }
    return (
        <Stack direction={"column"} spacing={1} padding={2}>
            <Typography variant={"Body"} color={"textSecondary"}>
                Choose Difficulty
            </Typography>
            <ToggleButtonGroup color={"primary"} exclusive variant={"outlined"} orientation={"horizontal"} value={difficulties} onChange={handleFormatChange}>
                <ToggleButton value={"easy"}>Easy</ToggleButton>
                <ToggleButton value={"medium"}>Medium</ToggleButton>
                <ToggleButton value={"hard"}>Hard</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

export default DifficultySwitch;