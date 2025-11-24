import express from 'express';
import { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { authorizeOwnershipOrRoles } from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.post('/', createUserHandler);

//if (process.env.NODE_ENV === 'production') {
  router.get('/', authenticate, authorizeRoles('ADMIN', 'STAFF'), getAllUsersHandler);
  router.get('/:id', authenticate, authorizeOwnershipOrRoles('ADMIN', 'STAFF'), getUserByIdHandler);
  router.put('/:id', authenticate, authorizeOwnershipOrRoles('ADMIN', 'STAFF'), updateUserHandler);
  router.delete('/:id', authenticate, authorizeOwnershipOrRoles('ADMIN'), deleteUserHandler);
/*} else { //for swagger so we dont have to login to test on there
  router.get('/', getAllUsersHandler);
  router.get('/:id', getUserByIdHandler);
  router.put('/:id', updateUserHandler);
  router.delete('/:id', deleteUserHandler);
}*/


export default router;