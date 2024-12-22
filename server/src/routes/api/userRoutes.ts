import express from 'express';
import type { Request, Response } from 'express';
import { User, Room } from '../../models/index.js';
import { Riddle } from '../../models'; 

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


router.get('/getByUsername', async (req: Request, res: Response) => {
    const { username, token } = req.query; // Extract the username and token from query params

    try {
        if (typeof username === 'string' && typeof token === 'string') {
            // Optionally, validate the token here
            const user = await User.findOne({
                where: { username }, // Query by username, not user.id
                include: [
                    { model: Room, as: 'rooms' }, // Include rooms associated with the user
                    { model: Riddle, as: 'riddles' } // Include riddles in the room
                ],
                attributes: { exclude: ['password'] }, // Optionally exclude sensitive data
            });

            if (user) {
                res.json(user); // Send the user data if found
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } else {
            res.status(400).json({ message: 'Invalid input' });
        }
    } catch (error: unknown) {
        // Check if the error is an instance of Error before accessing its message
        if (error instanceof Error) {
            console.error('Error fetching user:', error.message); // Log the error message
            res.status(500).json({ message: error.message });
        } else {
            // If the error is not an instance of Error, handle it as a generic unknown error
            console.error('Unknown error:', error);
            res.status(500).json({ message: 'An unknown error occurred' });
        }
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