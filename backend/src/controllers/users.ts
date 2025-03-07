import {Request, Response} from "express";
import multer from 'multer';
import { BlobServiceClient} from '@azure/storage-blob'
import {deleteUserById, getUserById, getUserBySessionToken, getUsers, updateUserById} from "../db/users";
import * as process from "process";


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

export const uploadPic = async (req:Request, res:Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file provided' });
            return;
        }

        // Create a BlobServiceClient
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_STRING);
        const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_CONTAINER);

        // Ensure container exists (or create it)
        await containerClient.createIfNotExists();

        // Optionally, generate a unique name for the blob (e.g., using timestamp)
        const blobName = `${Date.now()}-${req.file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Upload buffer to Azure
        await blockBlobClient.upload(req.file.buffer, req.file.buffer.length);

        // Get the URL of the uploaded blob
        const blobUrl = blockBlobClient.url;

        // Save the URL in MongoDB
        const userID = req.body.id;
        const user = await getUserById(userID);
        if (!user) {
            res.status(400).json({
                message: "No user found"
            });
            return;
        }
        await updateUserById(user._id.toString(), {pic:blobUrl});
        console.log('url: ' + blobUrl)
        res.status(200).json({ url: blobUrl });
        return;
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}