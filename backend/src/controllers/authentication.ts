import { Request, Response } from "express";
import { createUser, getUserByUsername } from "../db/users"; // Updated to use getUserByUsername
import { authentication, random } from "../helpers";

// TODO: Add meaningful response messages

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({
                message: "Username or password missing"
            });
            return;
        }

        const user = await getUserByUsername(username).select('+authentication.salt +authentication.password');

        if (!user) {
            res.status(400).json({
                message: "User not found"
            });
            return;
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            res.status(403).json({
                message: "Wrong Password"
            });
            return;
        }

        // Update token on successful login
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();

        res.cookie('POKEMON-AUTH', user.authentication.sessionToken, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000000000
        })
            .status(200)
            .json(user);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}

export const logOut = (req: Request, res: Response) => {
    res.cookie('POKEMON-AUTH', "expired", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0
    })
        .status(200)
        .json({
            message: "session ended"
        });
    return;
}

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({
                message: 'Information missing'
            });
            return;
        }

        const existingUser = await getUserByUsername(username);

        if (existingUser) {
            res.status(400).json({
                message: "User already exists"
            });
            return;
        }

        const salt = random();
        const user = await createUser({
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        res.status(200).json(user); // Return the created user
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}
