import {Request, Response} from "express";
import {deleteUserById, getUserBySessionToken, getUsers} from "../db/users";

export const getAllUsers = async (req:Request, res:Response)=> {
    try {
        const users = await getUsers();

        res.status(200).json(users);
        return;
    } catch (error) {
        console.log(error);
        res.status(400);
        return;
    }
};

export const getUserData = async (req:Request, res:Response)=> {

    try {
        const sessiostoken = req.cookies["POKEMON-AUTH"];
        const user = await getUserBySessionToken(sessiostoken);
        res.status(200).json(user);
        return;
    } catch (error) {
        console.log(error);
        res.status(400);
        return;
    }
};


export const deleteUser = async (req: Request, res: Response)=> {
    try {
        const { id } = req.params;
        const deleteUser = await deleteUserById(id);
        res.status(200).json(deleteUser);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}