import { useEffect, useState } from 'react';
import { 
  Container, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Chip, Stack, 
  TableFooter, TablePagination, Switch, FormControlLabel, useTheme
} from '@mui/material';

import ResponsiveAppBar from '../../components/ResponsiveAppBar/ResponsiveAppBar.jsx';
import ShinyText from './ShinyText.jsx';
import useScreenSize from '../../hooks/useScreenSize.jsx';

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

// Renders chips for generations
const formatGenerations = (generations) => (
  <Stack direction="row" spacing={1} flexWrap="wrap">
    {generations.split(',').map((gen) => (
      <Chip key={gen} label={gen} size="small" variant="outlined" sx={{ color: "white" }} />
    ))}
  </Stack>
);

// Determines row styling based on ranking
const getRowClass = (index, page) => {
  const globalIndex = index + page * rowsPerPage;
  if (globalIndex === 0) return { color: 'orange', shineColor: 'white' };
  if (globalIndex === 1) return { color: 'silver', shineColor: 'black' };
  if (globalIndex === 2) return { color: 'brown', shineColor: 'white' };
  return {};
};

const LeaderboardRow = ({ player, index, page, detailedView }) => {
  const theme = useTheme();
  const { color, shineColor } = getRowClass(index, page);
  const renderText = (text) =>
    color ? <ShinyText text={text} disabled={false} speed={3} color={color} shineColor={shineColor} /> : text;

  return (
    <TableRow sx={{ backgroundColor: theme.palette.tertiary.main }}>
      <TableCell style={{ color: 'white' }}>{renderText(index + 1 + page * rowsPerPage)}</TableCell>
      <TableCell style={{ color: 'white' }}>{renderText(player.username)}</TableCell>
      <TableCell style={{ color: 'white' }}>{renderText(player.score)}</TableCell>
      {detailedView && (
        <>
          <TableCell style={{ color: 'white' }}>{renderText(player.gamemode)}</TableCell>
          <TableCell style={{ color: 'white' }}>{renderText(player.difficulty)}</TableCell>
          <TableCell style={{ color: 'white' }}>{formatGenerations(player.generations)}</TableCell>
          <TableCell style={{ color: 'white' }}>{renderText(player.correctGuesses)}</TableCell>
        </>
      )}
    </TableRow>
  );
};

const LeaderboardHeader = ({ detailedView }) => (
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
);

const rowsPerPage = 100;

const Leaderboard = () => {
  const { isMobile } = useScreenSize();
  const [page, setPage] = useState(0);
  const [detailedView, setDetailedView] = useState(!isMobile);
  const theme = useTheme();
  const sortedData = mockData.sort((a, b) => b.score - a.score);

  useEffect(() => {
    if (isMobile) setDetailedView(false);
  }, [isMobile]);

  return (
    <>
      <ResponsiveAppBar />
      <div style={{backgroundColor: theme.palette.tertiary.main, height: "10vh"}}></div>

    <Container maxWidth="xl" sx={{ marginTop: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>Leaderboard</Typography>
        {!isMobile && (
          <FormControlLabel
            control={<Switch checked={detailedView} onChange={() => setDetailedView(!detailedView)} color="primary" />}
            label={detailedView ? "Detailed View" : "Simple View"}
          />
        )}
      </Stack>

      <TableContainer component={Paper}
        sx={{
          backgroundColor: theme.palette.tertiary.dark,
          maxHeight: `${(isMobile ? 11 : 16) * 58.1}px`, // Adjust row height if needed
          overflow: 'auto',
        }}
      >
        <Table>
          <LeaderboardHeader detailedView={detailedView} />
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((player, index) => (
                <LeaderboardRow key={index} player={player} index={index} page={page} detailedView={detailedView} />
              ))}
          </TableBody>

          {/* Pagination. Show only if more than 100 rows */}
          {sortedData.length > rowsPerPage && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  style={{ color: 'white', fill: 'white' }}
                  count={sortedData.length}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[]}
                  page={page}
                  onPageChange={(event, newPage) => setPage(newPage)}
                />
              </TableRow>
            </TableFooter>
          )}

        </Table>
      </TableContainer>
    </Container>
    </>
  );
};

export default Leaderboard;
