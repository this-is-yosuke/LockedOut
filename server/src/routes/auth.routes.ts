import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
    const { id, password } = req.body; //changed username to id

    const user = await User.findOne({
        where: { id }, //changed username to id
    });
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign({ id }, secretKey, { expiresIn: '1h' }); //changed username to id
    return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
