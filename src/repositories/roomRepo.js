import prisma from '../config/db.js';

export async function createRoom({ name, price, capacity }) {
  return await prisma.room.create({
    data: { name, price, capacity },
  });
}

export async function findAllRooms() {
  return await prisma.room.findMany();
}

export async function findRoomById(id) {
  return await prisma.room.findUnique({ where: { id } });
}

export async function updateRoomById(id, data) {
  return await prisma.room.update({ where: { id }, data });
}

export async function deleteRoomById(id) {
  return await prisma.room.delete({ where: { id } });
}
