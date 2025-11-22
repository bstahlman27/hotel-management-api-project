import { createRoom, findAllRooms, findRoomById, updateRoomById, deleteRoomById } from '../repositories/roomRepo.js';

export async function listRooms() {
  return await findAllRooms();
}

export async function getRoom(id) {
  const room = await findRoomById(id);
  if (!room) {
    const err = new Error('Room not found');
    err.status = 404;
    throw err;
  }
  return room;
}

export async function createNewRoom({ name, price, capacity }) {
  if (!name || !price || !capacity) {
    const err = new Error('name, price, and capacity are required');
    err.status = 400;
    throw err;
  }
  return await createRoom({ name, price, capacity });
}

export async function updateRoom(id, data) {
  // Check if room exists
  await getRoom(id);
  return await updateRoomById(id, data);
}

export async function deleteRoom(id) {
  // Check if room exists
  await getRoom(id);
  return await deleteRoomById(id);
}
