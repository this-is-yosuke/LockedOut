import { Router } from 'express';
import { userRoutes } from './userRoutes.js';
import { roomRoutes } from './roomRoutes.js';
import { riddleRoutes } from './riddleRoutes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
router.use('/riddles', riddleRoutes);

export default router;