import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors';
import mongoose from "mongoose";
import router from "./router";
import dotenv from 'dotenv';
import * as process from "process";

const app = express();
module.exports = app;
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: [
      'https://whos-that-pokemon-psi.vercel.app/',
      'http://localhost:5173'
  ],
    // origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log('Server running on ' + `http://localhost:${PORT}/`)
});

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error:Error) => {
    console.log(error);
})


app.use("/", router())