import router from "./index";
import {Router} from "express";
import {isAuthenticated} from "../middlewares";
import {addLeaderboardScore, getAllLeaderboardRows, getHighScore} from "../controllers/leaderboard";

export default (router: Router) => {
    router.post("/api/leaderboard/add", isAuthenticated, addLeaderboardScore);
    router.get("/api/leaderboard", getAllLeaderboardRows);
    router.get("/api/leaderboard/highscore", isAuthenticated, getHighScore);
}