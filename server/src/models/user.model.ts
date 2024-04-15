import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface User extends Document {
    fullName: string;
    email: string;
    password: string;
    role: string;
}

const userSchema = new Schema<User>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager'], default: 'admin'},
});

// Encriptar contraseña antes de guardar
userSchema.pre<User>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

export default model<User>('User', userSchema);
