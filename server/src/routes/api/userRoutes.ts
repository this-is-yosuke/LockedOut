import express from 'express';
import type { Request, Response } from 'express';
import { User, Room } from '../../models/index.js';

const router = express.Router();

// Get all users
router.get('/', async (_req: Request, res: Response) => {
    try{
        const users = await User.findAll({
            attributes: {exclude: ['password']}
        });
        res.json(users);
    }catch(error: any){
        res.status(500).json({message: error.message});
    }
})

// Get User by Username
router.get('/getByUsername', async (req: Request, res: Response) => {
    const username = req.query.username;

    // Check if username is provided and ensure it's a string (handle case if it's an array)
    if (typeof username !== 'string') {
        return res.status(400).json({ message: 'Username must be a valid string' });
    }

    try {
        // Fetch the user along with the rooms they created and completed
        const user = await User.findOne({
            where: { username },
            include: [
                {
                    model: Room,
                    as: 'roomsCreated',  // Rooms created by the user
                    attributes: ['id', 'title', 'description'],
                },
                {
                    model: Room,
                    as: 'roomsCompleted',  // Rooms completed by the user via Attempt
                    attributes: ['id', 'title', 'description'],
                    through: { attributes: [] }, // Exclude attributes from the join table (Attempt)
                }
            ],
            attributes: { exclude: ['password'] },  // Exclude password from the response
        });

        // If no user is found, return a 404 response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the found user data
        return res.json(user);
    } catch (error: any) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            include: [
                // These lines of code are causing the 500 error
                { model: Room, as: 'rooms' }, // Alias for the rooms the user has participated in
                { model: Room, as: 'roomsCreated' } // Alias for the rooms the user has created
                // -----------
            ],
            attributes: { exclude: ['password'] },
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