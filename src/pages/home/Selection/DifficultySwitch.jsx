import Typography from "@mui/material/Typography";
import {Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useSettings} from "../../../context/SettingsProvider.jsx";
// How to access and modify settings example:
// import { useSettings } from '../../context/SettingsProvider';
// const { difficulty, changeDifficulty } = useSettings();
// changeDifficulty('Normal');

const DifficultySwitch = () => {
    const { difficulty, changeDifficulty } = useSettings();


    const handleDifficultyChange = (_event, chosenDifficulty) => {
        changeDifficulty(chosenDifficulty);
    }
    return (
        <Stack direction={"column"} spacing={1} padding={2}>
            <Typography variant={"Body"} color={"textSecondary"}>
                Choose Difficulty
            </Typography>
            <ToggleButtonGroup color={"primary"} exclusive variant={"outlined"} orientation={"horizontal"} value={difficulty} onChange={handleDifficultyChange}>
                <ToggleButton value={"Easy"}>Easy</ToggleButton>
                <ToggleButton value={"Medium"}>Medium</ToggleButton>
                <ToggleButton value={"Hard"}>Hard</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

export default DifficultySwitch;