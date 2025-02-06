import { useState } from 'react';
import { 
  Container, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Chip, Stack, 
  TableFooter, TablePagination, Switch, FormControlLabel, useTheme
} from '@mui/material';

import ResponsiveAppBar from '../../components/ResponsiveAppBar/ResponsiveAppBar.jsx';

import ShinyText from './ShinyText.jsx';

// import './Leaderboard.css';

const mockData = [
  { username: 'Alice', gamemode: 'Retro', difficulty: 'Easy', generations: 'I', correctGuesses: 50, score: 1000 },
  { username: 'Bob', gamemode: 'Modern', difficulty: 'Normal', generations: 'II', correctGuesses: 45, score: 900 },
  { username: 'Charlie', gamemode: 'Sound', difficulty: 'Hard', generations: 'I,II,III,IV', correctGuesses: 40, score: 800 },
  { username: 'David', gamemode: 'Retro', difficulty: 'Hard', generations: 'I,II,III,IV,V', correctGuesses: 38, score: 750 },
  { username: 'Eve', gamemode: 'Modern', difficulty: 'Easy', generations: 'I,II', correctGuesses: 35, score: 700 },
  { username: 'Frank', gamemode: 'Sound', difficulty: 'Normal', generations: 'III,IV,V,VI', correctGuesses: 33, score: 650 },
  { username: 'Grace', gamemode: 'Retro', difficulty: 'Hard', generations: 'I,II,III,IV,V,VI,VII', correctGuesses: 30, score: 600 },
  { username: 'Hank', gamemode: 'Modern', difficulty: 'Easy', generations: 'I,III,V,VII,VIII', correctGuesses: 28, score: 550 },
  { username: 'Ivy', gamemode: 'Sound', difficulty: 'Normal', generations: 'II,IV,VI,VIII', correctGuesses: 25, score: 500 },
  { username: 'Jack', gamemode: 'Retro', difficulty: 'Hard', generations: 'I,II,III,IV,V,VI,VII,VIII,IX', correctGuesses: 20, score: 450 },
];

// Function to render MUI Chips for generations
const formatGenerations = (generations) => {
  return generations.split(',').map((gen) => (
    <Chip key={gen} label={`${gen}`} size="small" variant="outlined" sx={{color: "white"}} />
  ));
};

const Leaderboard = () => {
  const [page, setPage] = useState(0);
  const [detailedView, setDetailedView] = useState(true);

  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const toggleView = () => {
    setDetailedView(!detailedView);
  };

  const sortedData = mockData.sort((a, b) => b.score - a.score);

  const getRowClass = (index) => {
    const globalIndex = index + page * rowsPerPage;
    if (globalIndex === 0) return {  color: 'orange', shineColor: 'white' };
    if (globalIndex === 1) return {  color: 'silver', shineColor: 'black' };
    if (globalIndex === 2) return {  color: 'brown', shineColor: 'white' };
    return {};
  };

  const rowsPerPage = 20;

  return (
    <Container maxWidth="xl" sx={{ marginTop: 20 }}>
      <ResponsiveAppBar />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Leaderboard
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={detailedView}
              onChange={toggleView}
              color="primary"
            />
          }
          label={detailedView ? "Detailed View" : "Simple View"}
        />
      </Stack>

      <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.tertiary.dark }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white' }}>Ranking</TableCell>
              <TableCell style={{ color: 'white' }}>Username</TableCell>
              <TableCell style={{ color: 'white' }}>Score</TableCell>
              {detailedView && (
                <>
                  <TableCell style={{ color: 'white' }}>Gamemode</TableCell>
                  <TableCell style={{ color: 'white' }}>Difficulty</TableCell>
                  <TableCell style={{ color: 'white' }}>Generations</TableCell>
                  <TableCell style={{ color: 'white' }}>Guesses</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((player, index) => {
              const { color, shineColor } = getRowClass(index);
              return (
                <TableRow key={index} sx={{ backgroundColor: theme.palette.tertiary.main }}>
                  <TableCell style={{ color: 'white' }}>
                    {color ? <ShinyText text={index + 1 + page * rowsPerPage} disabled={false} speed={3} color={color} shineColor={shineColor} /> : index + 1 + page * rowsPerPage}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {color ? <ShinyText text={player.username} disabled={false} speed={3} color={color} shineColor={shineColor} /> : player.username}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {color ? <ShinyText text={player.score} disabled={false} speed={3} color={color} shineColor={shineColor} /> : player.score}
                  </TableCell>
                  {detailedView && (
                    <>
                      <TableCell style={{ color: 'white' }}>
                        {color ? <ShinyText text={player.gamemode} disabled={false} speed={3} color={color} shineColor={shineColor} /> : player.gamemode}
                      </TableCell>
                      <TableCell style={{ color: 'white' }}>
                        {color ? <ShinyText text={player.difficulty} disabled={false} speed={3} color={color} shineColor={shineColor} /> : player.difficulty}
                      </TableCell>
                      <TableCell style={{ color: 'white' }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {formatGenerations(player.generations)}
                        </Stack>
                      </TableCell>
                      <TableCell style={{ color: 'white' }}>
                        {color ? <ShinyText text={player.correctGuesses} disabled={false} speed={3} color={color} shineColor={shineColor} /> : player.correctGuesses}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                style={{ color: 'white', fill: 'white' }}
                count={sortedData.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard;