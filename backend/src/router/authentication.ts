import express from "express";

import {login, logOut, register} from "../controllers/authentication";
import {getUserData} from "../controllers/users";
import {isAuthenticated} from "../middlewares";

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.get('/auth/logout', isAuthenticated, logOut);
};