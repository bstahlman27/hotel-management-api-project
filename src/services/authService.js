import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/userRepo.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export async function logIn(email, password) {
    if (!email || !password){
        const err = new Error('email and password are required');
        err.status = 400;
        throw err;
    }
    const user = await findUserByEmail(email);
    if (!user){
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }
    
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch){
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role },
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRES_IN }
    );
    return {
        accessToken: token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    };
}