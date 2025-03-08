import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    },
});

// Create User model
export const UserModel = mongoose.model('User', UserSchema);

// Export functions to interact with the User collection
export const getUsers = () => UserModel.find();

export const getUserByUsername = (username: string) => UserModel.findOne({ username });

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
});

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save()
    .then((user) => user.toObject());

export const deleteUserById = async (id: string) => {
    console.log("ID at database model:" + id);
    await UserModel.findByIdAndDelete(id);
};

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
