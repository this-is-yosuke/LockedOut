import express from 'express';
import { Request, Response } from 'express';
import { User, Room, Riddle } from '../../models/index.js';
import { riddleToken } from '../../middleware/auth.js'; // Import the riddleToken middleware

const router = express.Router();

// Use the riddleToken middleware for this route
router.get('/getByUsername', riddleToken, async (req: Request, res: Response) => {
    const { username } = req.query;
  
    if (typeof username === 'string') {
      try {
        const user = await User.findOne({
          where: { username },
          include: [
            { model: Room, as: 'rooms' },
            { model: Riddle, as: 'riddles' },
          ],
          attributes: { exclude: ['password'] },
        });
  
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error: any) {
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
      }
    } else {
      res.status(400).json({ message: 'Invalid input. Username must be a string.' });
    }
  });

// Get all users
router.get('/', async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            include: [{ model: Room, as: 'rooms' }, { model: Room, as: 'roomsCreated' }],
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error: unknown) {
        // Handle the unknown error type
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});

// Get a user by id
router.get('/:id', riddleToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            include: [{ model: Room, as: 'rooms' }],
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: unknown) {
        // Handle the unknown error type
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});

// Create a new user POST
router.post('/', async (req: Request, res: Response) => {
    console.log("Request body:", req.body); // Log the incoming request body
    const { username, email, password } = req.body;
    try {
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error: unknown) {
        // Handle the unknown error type
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unexpected error occurred' });
        }
    }
});

// PUT /users/:id - Update a user by id
router.put('/:id', riddleToken, async (req: Request, res: Response) => {
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
    } catch (error: unknown) {
        // Handle the unknown error type
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unexpected error occurred' });
        }
    }
});

// DELETE /users/:id - Delete a user by id
router.delete('/:id', riddleToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: unknown) {
        // Handle the unknown error type
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});

export { router as userRouter };