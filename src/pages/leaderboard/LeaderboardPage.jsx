import { useEffect, useState } from 'react';
import useFetchLeaderboard from '../../hooks/useFetchLeaderboard.jsx';
import { 
  Container, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Chip, Stack, 
  TableFooter, TablePagination, Switch, FormControlLabel, useTheme, CircularProgress
} from '@mui/material';

import ResponsiveAppBar from '../../components/ResponsiveAppBar/ResponsiveAppBar.jsx';
import ShinyText from './ShinyText.jsx';
import useScreenSize from '../../hooks/useScreenSize.jsx';



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
  const { leaderboardData, loading, error, fetchLeaderboard } = useFetchLeaderboard();
  const { isMobile } = useScreenSize();

  const [page, setPage] = useState(0);
  const [detailedView, setDetailedView] = useState(!isMobile);

  const theme = useTheme();

  useEffect(() => {
    if (!leaderboardData || leaderboardData.length === 0) {
      fetchLeaderboard();
    }
  }, [leaderboardData, fetchLeaderboard]);

  const sortedData = leaderboardData.sort((a, b) => b.score - a.score);

  useEffect(() => {
    if (isMobile) setDetailedView(false);
  }, [isMobile]);

  return (
    <>
      <ResponsiveAppBar />
      <div style={{backgroundColor: theme.palette.tertiary.main, height: "60px"}}></div>

      {loading &&
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress size={200} style={{marginTop: 200}} />
        </div>
      }

      {!loading && !error && (
        <Container maxWidth="xl" sx={{ marginTop: 4 }}>
          <Stack direction="row" alignItems="center" justifyContent={isMobile ? "center" : "space-between"}>
            <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>Leaderboard</Typography>
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
              maxHeight: `${(isMobile ? "63vh" : "76vh")}`,
              overflowY: "auto", // Enable only vertical scrolling
              overflowX: "hidden", // Hide horizontal scrolling

            }}
          >
            <Table size={isMobile ? "small" : ""}>
              <LeaderboardHeader detailedView={detailedView} />
              { leaderboardData && leaderboardData.length === 0 && <div style={{margin: 10, color: 'white'}}>No data found</div> }
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
      )}
    </>
  );
};

export default Leaderboard;
