import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack, Tooltip } from "@mui/material";
import GenerationsSwitch from "./SettingsMenu/GenerationSelector.jsx";
import QuestionIcon from "../../themes/custom_icons/QuestionIcon.jsx";
import { Close } from "@mui/icons-material";
import DifficultySwitch from "./SettingsMenu/DifficultySwitch.jsx";
import QuizTypeSwitch from "./SettingsMenu/QuizTypeSwitch.jsx";
import LoginAndRegisterIcon from "./LoginAndRegistration/LoginAndRegisterIcon.jsx";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useLogin } from "../../context/LoginProvider.jsx";
import "./ResponsiveAppBar.css"
import UserIcon from "./userMenu/UserIcon.jsx";
import useScreenSize from '../../hooks/useScreenSize.jsx';

function ResponsiveAppBar({ gameStarted }) {
  const { user } = useLogin();
  const { isMobile } = useScreenSize();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    if (!gameStarted) {
      setMobileOpen((prevState) => !prevState);
    } else {
      alert("You can't open settings while the game is in progress.");
    }
  };

  const handleLeaderboardClick = (event) => {
    if (gameStarted) {
      event.preventDefault();
      const confirmNavigation = window.confirm("Game in progress. Scores won't be saved. Are you sure you want to open leaderboards?");
      if (confirmNavigation) {
        window.location.href = "/leaderboard";
      }
    }
  };

  const drawer = (
    <Box sx={{ textAlign: 'left', paddingX: "10px" }}>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography variant="h6" sx={{ m: 2 }}>
          Options
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Stack>
      <Divider />
      <Stack direction={"column"} divider={<Divider orientation="horizontal" flexItem />}>
        <DifficultySwitch />
        <GenerationsSwitch />
        <QuizTypeSwitch />
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>

          {/* Settings */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="shake"
            disabled={gameStarted} // Disable the button when the game is running
          >
            <MenuIcon />
          </IconButton>

          {/* Home */}
          <Tooltip title="Home">
            <IconButton
              color="inherit"
              edge="start"
              href="/"
              sx={{ marginLeft: "4px" }}
              className="shake"
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>

          {/* Leaderboard */}
          <Tooltip title="Leaderboard">
            <IconButton
              color="inherit"
              edge="start"
              href="/leaderboard"
              sx={{ marginLeft: "4px" }}
              className="shake"
              onClick={handleLeaderboardClick}
            >
              <EmojiEventsIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
          }}>
            {!isMobile && (
              <QuestionIcon sx={{ fontSize: 80, marginRight: 3 }} />
            )}
          </Box>

          {/* GitHub */}
          <Tooltip title="View on GitHub">
            <IconButton
              color="inherit"
              href="https://github.com/Jackgito/pokemon-quiz"
              sx={{ marginLeft: "4px" }}
              target="_blank"
              rel="noopener noreferrer"
              className="shake"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          {user ? <UserIcon user={user} /> : <LoginAndRegisterIcon />}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          style={{ borderRadius: "25px" }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: "inherit",
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
              opacity: "100%"
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default ResponsiveAppBar;
