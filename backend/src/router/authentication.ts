import express from "express";

import {login, logOut, register} from "../controllers/authentication";
import {isAuthenticated} from "../middlewares";

export default (router: express.Router) => {
    router.post('/api/auth/register', register);
    router.post('/api/auth/login', login);
    router.get('/api/auth/logout', isAuthenticated, logOut);
};