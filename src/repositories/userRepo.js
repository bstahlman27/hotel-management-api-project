import prisma from '../config/db.js';

export async function createUser({ username, email, passwordHash, role }){
    return await prisma.user.create({
        data: { username, email, passwordHash, role },
    });
}

export async function findAllUsers(){
    return await prisma.user.findMany();
}

export async function findUserById(id){
    return await prisma.user.findUnique({ where: { id }, });
}

export async function findUserByEmail(email){
    return await prisma.user.findUnique({ where: { email }, })
}

export async function updateUserById(id, data){
    return await prisma.user.update({ where: { id }, data });
}

export async function deleteUserById(id){
    return await prisma.user.delete({ where: { id }});
}