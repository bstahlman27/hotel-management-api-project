import express from 'express';
import { 
  getAllBookingsHandler, 
  getBookingByIdHandler, 
  createBookingHandler, 
  updateBookingHandler, 
  deleteBookingHandler 
} from '../controllers/bookingController.js';

import { authenticate } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { authorizeBookingOwnershipOrRoles } from '../middleware/authorizeBookingOwnership.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN', 'STAFF'), getAllBookingsHandler);

router.get('/:id', authenticate, authorizeOwnershipOrRoles('ADMIN', 'STAFF'), getBookingByIdHandler);

router.post('/', authenticate, createBookingHandler);

router.put('/:id', authenticate, authorizeOwnershipOrRoles('ADMIN', 'STAFF'), updateBookingHandler);

router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteBookingHandler);

export default router;
