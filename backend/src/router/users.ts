import {Router} from "express";
import {deleteUser, getAllUsers, getUserData} from "../controllers/users";
import {isAuthenticated, isOwner} from "../middlewares";
import multer from "multer";

// Multer configuration to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default ( router: Router ) => {
    router.get('/api/users', isAuthenticated, getAllUsers);
    router.delete('/api/users/:id', isAuthenticated, isOwner, deleteUser);
    router.get('/api/user', isAuthenticated, getUserData);
}