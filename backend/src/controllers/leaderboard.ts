import {Request, Response} from "express";
import {createUser, getUserByEmail, getUserBySessionToken, getUsers} from "../db/users";
import {authentication, random} from "../helpers";
import {createLeaderboardRow, getLeaderboard, getLeaderboardRowsByEmail, updateHighScoreByID} from "../db/leaderboard";
import {forEach} from "lodash";


export const addLeaderboardScore = async (req:Request, res:Response)=> {
    try {
        const { username, gamemode, difficulty, generations, correctGuesses, score } = req.body;

        if ( !username || !gamemode || !difficulty || !generations || !correctGuesses || !score) {
            res.sendStatus(400);
            return;
        }
        const rows:Array<any> = await getLeaderboardRowsByEmail(username);

        if (rows.length == 0) {
            const leaderboardRow = await createLeaderboardRow(
                {
                    username,
                    gamemode,
                    difficulty,
                    generations,
                    correctGuesses,
                    score
                }
            )
            res.status(200).json(leaderboardRow);
            return;
        } else {
            await updateHighScoreByID(rows[0]._id.toString(), score);
            res.status(200).json(rows);
            return;
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(400);
        return;
    }
}

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
        const rows = await getLeaderboardRowsByEmail(user.email);

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
            highscrore: curHighscore
        });
        return;
    } catch (err) {
        console.log(err)
        res.status(400);
        return;
    }
}