import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getAllServicesHandler, getServiceByIdHandler, createServiceHandler, updateServiceHandler, deleteServiceHandler } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', getAllServicesHandler);
router.get('/:id', getServiceByIdHandler);

router.post('/', authenticate, createServiceHandler);
router.put('/:id', authenticate, updateServiceHandler);
router.delete('/:id', authenticate, deleteServiceHandler);

export default router;
