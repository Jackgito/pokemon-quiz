import mongoose from "mongoose";
import {UserModel} from "./users";
import {emit} from "nodemon";

const LeaderboardSchema = new mongoose.Schema({
    username: { type: String, required: true },
    gamemode: { type: String, required: true },
    difficulty: { type: String, required: true },
    generations: { type: String, required: true },
    correctGuesses: { type: Number, required: true },
    score: { type: Number, required: true },
});

export const LeaderboardModel = mongoose.model('Leaderboard', LeaderboardSchema);

export const createLeaderboardRow = (values: Record<string, any>) => new LeaderboardModel(values)
    .save()
    .then((row) => row.toObject());

export const getLeaderboard = () => LeaderboardModel.find();

export const getLeaderboardRowsByUsername = (username:String) => LeaderboardModel.find({username: username});

export const updateHighScoreByID = (id: string, updateData: {
  gamemode: string,
  difficulty: string,
  generations: number,
  correctGuesses: number,
  score: number
}) => LeaderboardModel.findByIdAndUpdate(id, updateData, { new: true });