import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";


export const isOwner = async (req:Request, res:Response, next: NextFunction)=> {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
        res.sendStatus(403);
        return;
    }

    if (currentUserId.toString() != id) {
        res.sendStatus(403);
        return;
    }

    next();
}
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const sessionToken = req.cookies['POKEMON-AUTH'];

        if (!sessionToken) {
            res.sendStatus(403);
            return;
        }

        const  existingUser = await  getUserBySessionToken(sessionToken);

        if (!existingUser) {
            res.sendStatus(403);
            return;
        }
        merge(req, {identity:existingUser});

        return next();
    } catch (error) {
        console.log(error);
        res.status(400);
        return;
    }
}