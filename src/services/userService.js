import bcrypt from 'bcrypt';
import { createUser, findAllUsers, findUserById, updateUserById, deleteUserById, findUserByEmail } from '../repositories/userRepo.js';

const SALT_ROUNDS = 10;

function dontSendPassword(user) {
    if (!user) return user;
    const { passwordHash, ...rest } = user;
    return rest;
}

export async function listUsers(){
    const users = await findAllUsers();
    return users.map(dontSendPassword);
}

export async function getUser(id){
    const user = await findUserById(id);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }
    return dontSendPassword(user);
}

export async function createUserAccount({ username, email, password }){
    if (!username || !email || !password){
        const err = new Error('username, password, and email are required');
        err.status = 400;
        throw err;
    }
    const existing = await findUserByEmail(email);
    if (existing){
        const err = new Error('Email in use');
        err.status = 400;
        throw err;
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({
        username,
        email,
        passwordHash,
        role: 'GUEST'
    });
    return dontSendPassword(user);
}

export async function updateUserAccount(id, { username, email, password }){
    const data = {};
    if (username !== undefined) data.username = username;
    if (email !== undefined) data.email = email;
    if (password !== undefined){
        data.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    }
    if (Object.keys(data).length === 0){
        const err = new Error('No fields to update');
        err.status = 400;
        throw err;
    }
    try {
        const updated = await updateUserById(id, data);
        return dontSendPassword(updated);
    } catch (err) {
        if (err.code === 'P2025'){
            const e = new Error('User not found');
            e.status = 404;
            throw e;
        }
        throw err;
    }
}

export async function deleteUserAccount(id){
    try {
        await deleteUserById(id);
    } catch (err) {
        if (err.code === 'P2025') {
            const e = new Error('User not found');
            e.status = 404;
            throw e;
        }
        throw err;
    }
}