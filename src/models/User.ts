import { Model, model, Schema } from "mongoose";
import { hash, compare } from 'bcrypt';
import { isEmail } from 'validator';

export interface UserI {
    username: string;
    email: string;
    password: string;
    status: 'online' | 'offline';
    createdAt: Date;
    updatedAt: Date;
}

interface UserMethods {
    isValidPassword: (password: string) => Promise<boolean>
}

type UserModel = Model<UserI, {}, UserMethods>

const UserSchema = new Schema<UserI, UserModel, UserMethods>({
    username: { 
        type: String, 
        required: [true, 'Username is required!'],
        unique: [true, 'Username already exists!'],
        minlength: [6, 'Username must be at least 6 characters!']
    },
    email: { 
        type: String, 
        required: [true, 'Email is required!'],
        unique: [true, 'Account already exists!'],
        validate: [isEmail, 'Please enter a valid email!']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required!'], 
        minlength: [8, 'Password must be at least 8 characters!']
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online'
    }
}, { timestamps: true} )

/* Hashing password before saving user */
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword
    next();
});

UserSchema.method('isValidPassword', async function (password: string): Promise<boolean> {
    const isValid = await compare(password, this.password);
    return isValid;
})

const User = model('User', UserSchema);
export default User;