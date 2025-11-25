import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

try {
    await prisma.booking.deleteMany();
    await prisma.user.deleteMany();
    await prisma.room.deleteMany();
    await prisma.service.deleteMany();

    const roomsData = [
        { name: 'Standard Room', price: 100.0, capacity: 2 },
        { name: 'Deluxe Room', price: 150.0, capacity: 2 },
        { name: 'Family Suite', price: 250.0, capacity: 4 },
        { name: 'Presidential Suite', price: 500.0, capacity: 2 },
    ];

    const rooms = await Promise.all(
        roomsData.map((room) => prisma.room.create({ data: room }))
    );

    const servicesData = [
        { name: 'Breakfast', description: 'Free continental breakfast from 6am to 11am.' },
        { name: 'Pool', description: 'Indoor heated pool open 7am to 10pm.' },
        { name: 'Room Service', description: 'Hot meals and snacks delivered to your door.' },
    ];

    await Promise.all(
        servicesData.map((service) => prisma.service.create({ data: service }))
    );

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

    const bookingsData = [
        {
            user_id: users[3].id,
            room_id: rooms[0].id,
            check_in: new Date("2025-01-10T15:00:00Z"),
            check_out: new Date("2025-01-12T11:00:00Z"),
            total_price: 250.00,
            status: "CONFIRMED",
        },
        {
            user_id: users[4].id,
            room_id: rooms[1].id,
            check_in: new Date("2025-02-02T15:00:00Z"),
            check_out: new Date("2025-02-05T11:00:00Z"),
            total_price: 480.00,
            status: "CHECKED_IN",
        },
        {
            user_id: users[5].id,
            room_id: rooms[0].id,
            check_in: new Date("2025-03-01T15:00:00Z"),
            check_out: new Date("2025-03-03T11:00:00Z"),
            total_price: 180.00,
            status: "CANCELLED",
        },
    ];
    await Promise.all(
        bookingsData.map((booking) => prisma.booking.create({ data: booking }))
    );

} catch (error) {
    console.error('Seed failed:', error);
} finally {
    await prisma.$disconnect();
}