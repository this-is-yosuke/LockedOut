import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
    try {
        
        const { username, email, password } = req.body; 
        const user = await User.create({ username, email, password });
        const secretKey = process.env.JWT_SECRET_KEY || '';
        
        const token = jwt.sign({ id:user.userId, username: user.username, email: user.email }, secretKey, { expiresIn: '1h' }); //attaching username, id and email to token
        return res.status(200).json({ token }); //register username, email and id
    } catch (error) {
    console.log(error);
    return res.status(500).json(error);
    }
    }


export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body; //changed username 

    const user = await User.findOne({
        where: { username }, //changed to username 
    });
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed, Password is invalid' });
    }

    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign({ id:user.userId, username: user.username, email: user.email }, secretKey, { expiresIn: '1h' }); //attaching username, id and email to token
    return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);
router.post('/register', register); //added route for register

export default router;