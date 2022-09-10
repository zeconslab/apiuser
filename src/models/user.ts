import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document{
    name: string;
    lastname: string;
    email: string;
    password: string;
    verifyEmail: boolean;
    encrypPassword(password: string): Promise<string>;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    verifyEmail: {
        type: Boolean,
        require: false,
        default: false
    }
});

userSchema.methods.encrypPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(16);
    return bcrypt.hash(password, salt);
};

export default model<IUser>('User', userSchema);