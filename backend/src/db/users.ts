//UserSchema and model
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pic: {type: String},
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
});

export const getUserById = (id:string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save()
    .then((user) => user.toObject());
export const deleteUserById = async (id: string) => {
    console.log("ID at database model:" + id)
    await UserModel.findByIdAndDelete(id);
};

export const updateUserById = (id:string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);