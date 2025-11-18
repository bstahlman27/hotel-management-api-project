import express from 'express';
import { logInHandler } from '../controllers/authController.js';
const router = express.Router();

router.post('/login', logInHandler);

export default router;