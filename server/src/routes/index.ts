import { Router } from 'express';
import authRoutes from './auth.routes.js';
import apiRoutes from './api/index.js';
import riddleRoutes from './api/index.js';
import { userRouter } from './api/userRoutes.js';

//import { riddleToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);
router.use('/api', riddleRoutes);
router.use('/api', userRouter);


export default router;