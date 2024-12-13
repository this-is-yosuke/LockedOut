import { Router } from 'express';
import { userRouter } from './userRoutes.js';
import { roomRouter } from './roomRoutes.js';
import { riddleRouter } from './riddleRoutes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/rooms', roomRouter);
router.use('/riddles', riddleRouter);

export default router;