import {Router} from "express";
import {deleteUser, getAllUsers, getUserData, uploadPic} from "../controllers/users";
import {isAuthenticated, isOwner} from "../middlewares";
import multer from "multer";

// Multer configuration to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default ( router: Router ) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.get('/user', isAuthenticated, getUserData);
    router.post('/users/pic',upload.single('file'), uploadPic);
}