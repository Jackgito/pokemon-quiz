import express from "express";
import authentication from "./authentication";
import users from "./users";
import leaderboard from "./leaderboard";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    leaderboard(router);
    return router;
}