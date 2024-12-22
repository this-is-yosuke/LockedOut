import express from 'express';
import type { Request, Response } from 'express';
import { User, Room } from '../../models/index.js';

const router = express.Router();

// Get all users
router.get('/', async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            include: [{model: Room, as: 'rooms'}, {model: Room, as: 'roomsCreated/Creator'}],
            // room model goes in the brackets
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get a user by username (add this route)
router.get('/getByUsername', async (req: Request, res: Response) => {
    const username = req.query.username as string | undefined; // Typecast to string | undefined
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const user = await User.findOne({
            where: { username },
            include: [{ model: Room, as: 'rooms' }, { model: Room, as: 'roomsCreated/Creator' }],
            attributes: { exclude: ['password'] }
        });
        if (user) {
            return res.json(user); // Returning the user data
        } else {
            return res.status(404).json({ message: 'User not found' }); // Returning 404 if user is not found
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message }); // Catching errors and returning 500
    }
});

// Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            include: [{model: Room, as: 'rooms'}, {model: Room, as: 'roomsCreated/Creator'}], 
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new user POST
router.post('/', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});


// PUT /users/:id - Update a user by id
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.username = username;
            user.password = password;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export { router as userRouter };