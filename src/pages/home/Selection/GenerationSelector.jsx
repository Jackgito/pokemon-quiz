import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  useTheme
} from "@mui/material";

import Typography from "@mui/material/Typography";
import { useSettings } from "../../../context/SettingsProvider";

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

function getStyles(name, genName, theme) {
  return {
      fontWeight: genName.includes(name)
          ? theme.typography.fontWeightMedium
          : theme.typography.fontWeightRegular,
  };
}

const GenerationsSwitch = () => {
  const theme = useTheme();
  const { generations, changeGenerations } = useSettings();
  const selectedGenerations = generations.filter(gen => gen.selected).map(gen => gen.name);

  const handleChange = (event) => {
      const {
          target: { value },
      } = event;
      const updatedGenerations = generations.map(gen => ({
          ...gen,
          selected: value.includes(gen.name),
      }));
      changeGenerations(updatedGenerations);
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
                  value={selectedGenerations}
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
                  {generations.map((gen) => (
                      <MenuItem
                          key={gen.name}
                          value={gen.name}
                          style={getStyles(gen.name, selectedGenerations, theme)}
                      >
                          {gen.name}
                      </MenuItem>
                  ))}
              </Select>
          </FormControl>
      </Stack>
  );
};

export default GenerationsSwitch;