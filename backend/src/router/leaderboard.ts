import router from "./index";
import {Router} from "express";
import {isAuthenticated} from "../middlewares";
import {addLeaderboardScore, getAllLeaderboardRows, getHighScore} from "../controllers/leaderboard";


export default (router: Router) => {
    router.post("/leaderboard/add", isAuthenticated, addLeaderboardScore);
    router.get("/leaderboard", getAllLeaderboardRows);
    router.get("/leaderboard/highscore", isAuthenticated, getHighScore);
}