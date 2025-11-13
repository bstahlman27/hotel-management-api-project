import { listUsers, getUser, createUserAccount, updateUserAccount, deleteUserAccount } from '../services/userService.js';

export async function getAllUsersHandler(req, res, next) {
    try {
        const users = await listUsers();
        res.status(200).json(users);
    } catch (err){
        next(err);
    }
}

export async function getUserByIdHandler(req, res, next){
    try {
        const id = Number(req.params.id);
        const user = await getUser(id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export async function createUserHandler(req, res, next){
    try { 
        const { username, email, password } = req.body;
        const user = await createUserAccount({ username, email, password });
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

export async function updateUserHandler(req, res, next){
    try {
        const id = Number(req.params.id);
        if (!req.user || req.user.id !== id){
            return res.status(403).json({ message: 'Forbidden' });
        }
        const { username, email, password } = req.body;
        const updated = await updateUserAccount(id, { username, email, password });
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
}


export async function deleteUserHandler(req, res, next){
    try {
        const id = Number(req.params.id);
        if (!req.user || req.user.id !== id){
            return res.status(403).json({ message: 'Forbidden' });
        }
        await deleteUserAccount(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
