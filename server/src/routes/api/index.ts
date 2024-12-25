import { Router } from 'express';
import { userRouter } from './userRoutes.js';
import { roomRouter } from './roomRoutes.js';
import { riddleRouter } from './riddleRoutes.js';
import { attemptRouter } from './attemptRoutes.js'

const router = Router();

router.use('/users', userRouter);
router.use('/rooms', roomRouter);
router.use('/riddles', riddleRouter);
router.use('/attempts', attemptRouter);

export default router;