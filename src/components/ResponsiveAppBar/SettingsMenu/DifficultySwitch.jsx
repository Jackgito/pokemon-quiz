import Typography from "@mui/material/Typography";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSettings } from '../../../context/SettingsProvider';
import InfoButton from "./InfoButton";

const DifficultySwitch = () => {
    const { difficulty, changeDifficulty } = useSettings();

    return (
        <Stack direction={"column"} spacing={1} padding={2}>
            <Typography variant={"Body"} color={"textSecondary"}>
                Difficulty
                <InfoButton text={"Easy: 3 choices & extra time\nNormal: 4 choices\nHard: Type the answer"} />
            </Typography>
            <ToggleButtonGroup
                color={"primary"}
                exclusive
                variant={"outlined"}
                orientation={"horizontal"}
                value={difficulty}
                onChange={(event, value) => changeDifficulty(value)}
            >
              <ToggleButton value={"Easy"}>Easy</ToggleButton>
              <ToggleButton value={"Normal"}>Normal</ToggleButton>
              <ToggleButton value={"Hard"}>Hard</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

export default DifficultySwitch;