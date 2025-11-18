import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

try {
    await prisma.user.deleteMany();

    const usersData = [
        {
            username: '#1admin',
            email: 'theboss@hotel.com',
            passwordHash: await bcrypt.hash('admin123', 10),
            role: 'ADMIN',
        },
        {
            username: 'jimmy123',
            email: 'jimmy@hotel.com',
            passwordHash: await bcrypt.hash('jimmy123', 10),
            role: 'STAFF',
        },
        {
            username: 'smith45',
            email: 'asmith@hotel.com',
            passwordHash: await bcrypt.hash('smith45', 10),
            role: 'STAFF',
        },
        {
            username: 'ben123',
            email: 'ben@ben.ben',
            passwordHash: await bcrypt.hash('ben', 10),
            role: 'GUEST',
        },
        {
            username: 'larrysmith78',
            email: 'larrysmith@gmail.com',
            passwordHash: await bcrypt.hash('larry', 10),
            role: 'GUEST',
        },
        {
            username: 'freddybaseball88',
            email: 'sportsfred@outlook.com',
            passwordHash: await bcrypt.hash('fred', 10),
            role:'GUEST',
        },
    ];
    const users = await Promise.all(
        usersData.map((user) => prisma.user.create({ data: user })),
    );
} catch (error) {
    console.error('Seed failed:', error);
} finally {
    await prisma.$disconnect();
}