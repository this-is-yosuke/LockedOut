import { Router } from 'express';
import authRoutes from './auth.routes.js';
//import apiRoutes from './api/index.js';
//import { riddleToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
//router.use('/api', riddleToken,  apiRoutes);

export default router;