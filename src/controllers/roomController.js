import { listRooms, getRoom, createNewRoom, updateRoom, deleteRoom } from '../services/roomService.js';

export async function getAllRoomsHandler(req, res, next) {
  try {
    const rooms = await listRooms();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
}

export async function getRoomByIdHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    const room = await getRoom(id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
}

export async function createRoomHandler(req, res, next) {
  try {
    // Authorization check: Only ADMIN can create rooms
    if (!req.user || req.user.role !== 'ADMIN') {
        const err = new Error('Forbidden');
        err.status = 403;
        throw err;
    }
    const { name, price, capacity } = req.body;
    const room = await createNewRoom({ name, price, capacity });
    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
}

export async function updateRoomHandler(req, res, next) {
  try {
    // Authorization check: Only ADMIN can update rooms
    if (!req.user || req.user.role !== 'ADMIN') {
        const err = new Error('Forbidden');
        err.status = 403;
        throw err;
    }
    const id = Number(req.params.id);
    const data = req.body;
    const updated = await updateRoom(id, data);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteRoomHandler(req, res, next) {
  try {
    // Authorization check: Only ADMIN can delete rooms
    if (!req.user || req.user.role !== 'ADMIN') {
        const err = new Error('Forbidden');
        err.status = 403;
        throw err;
    }
    const id = Number(req.params.id);
    await deleteRoom(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
