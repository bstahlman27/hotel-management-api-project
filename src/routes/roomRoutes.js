import express from 'express';
import { getAllRoomsHandler, getRoomByIdHandler, createRoomHandler, updateRoomHandler, deleteRoomHandler } from '../controllers/roomController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllRoomsHandler);
router.get('/:id', getRoomByIdHandler);

router.post('/', authenticate, createRoomHandler);
router.put('/:id', authenticate, updateRoomHandler);
router.delete('/:id', authenticate, deleteRoomHandler);

export default router;
