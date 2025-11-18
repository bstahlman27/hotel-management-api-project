import express from 'express';
import { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createUserHandler);

router.get('/', authenticate, getAllUsersHandler);
router.get('/:id', authenticate, getUserByIdHandler);
router.put('/:id', authenticate, updateUserHandler);
router.delete('/:id', authenticate, deleteUserHandler);

export default router;