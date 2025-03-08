import {Request, Response} from "express";
import {getUserBySessionToken} from "../db/users";
import {createLeaderboardRow, getLeaderboard, getLeaderboardRowsByUsername, updateHighScoreByID} from "../db/leaderboard";
import {forEach} from "lodash";

export const addLeaderboardScore = async (req: Request, res: Response) => {
  try {
      const { username, gamemode, difficulty, generations, correctGuesses, score } = req.body;

      if (!username || !gamemode || !difficulty || !generations || !correctGuesses || !score) {
          res.sendStatus(400);
          return;
      }

      const rows = await getLeaderboardRowsByUsername(username);
      let isNewPersonalBest = false;
      let isNewHighScore = false;

      // Check if it's a new high score globally
      const leaderboard = await getLeaderboard();
      const topScore = leaderboard.length > 0 ? Math.max(...leaderboard.map(row => row.score)) : 0;
      if (score > topScore) {
          isNewHighScore = true;
      }

      if (rows.length === 0) {
          // First time entry, automatically a personal best
          isNewPersonalBest = true;
          await createLeaderboardRow({ username, gamemode, difficulty, generations, correctGuesses, score });
      } else {
          let currentPersonalBest = rows[0].score;
          if (score > currentPersonalBest) {
              isNewPersonalBest = true;
              await updateHighScoreByID(rows[0]._id.toString(), {
                gamemode,
                difficulty,
                generations,
                correctGuesses,
                score
              });
          }
      }

      res.status(200).json({
          isNewPersonalBest,
          isNewHighScore,
      });
  } catch (error) {
      console.log(error);
      res.sendStatus(400);
  }
};

export const getAllLeaderboardRows = async (req:Request, res:Response)=> {
    try {
        const rows = await getLeaderboard();
        res.status(200).json(rows);
        return;
    } catch (error) {
        console.log(error);
        res.status(400);
        return;
    }
};

export const getHighScore = async (req: Request, res: Response)=> {
    try {
        const user = await getUserBySessionToken(req.cookies['POKEMON-AUTH'])
        if (!user) {
            res.status(400);
            return;
        }
        const rows = await getLeaderboardRowsByUsername(user.username);

        if (!rows) {
            res.status(200).json({
                highscore: 0
            });
            return;
        }

        let curHighscore:number = 0;
        forEach(rows, function (row){
            if (row.score > curHighscore) {
                curHighscore = row.score;
            }
        });

        res.status(200).json({
            highscore: curHighscore
        });
        return;
    } catch (err) {
        console.log(err)
        res.status(400);
        return;
    }
}