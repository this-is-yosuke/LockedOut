import express from 'express';
import type { Request, Response } from 'express';
import { Room, Riddle } from '../../models/index.js';

const router = express.Router();

// GET /riddles - Get all riddles
router.get('/', async (_req: Request, res: Response) => {
    try {
        const riddles = await Riddle.findAll({
            include: [{model: Room}],
        });
        res.status(200).json(riddles);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /riddles/:id - Get a riddle by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const riddle = await Riddle.findByPk(req.params.id, {
            include: [{model: Room}],
        });
        if (riddle) {
            res.status(200).json(riddle);
        } else {
            res.status(404).json({ error: 'Could not find the riddle' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /riddles/room/:roomId - Get all riddles for a given roomId
router.get('/room/:roomId', async (req: Request, res: Response) => {
    try {
        // Fetch all riddles associated with the roomID (foreign key)
        const riddles = await Riddle.findAll({
            where: {
                roomId: req.params.roomId  // Match the roomID foreign key
            }
        });

        // If riddles are found, return them
        if (riddles.length > 0) {
            res.status(200).json(riddles);
        } else {
            res.status(404).json({ error: 'No riddles found for this roomID' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /riddles - Create a new riddle
router.post('/', async (req: Request, res: Response) => {
    try {
        const newRiddle = await Riddle.create(req.body);
        res.status(201).json(newRiddle);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /riddle/:id - Update a riddle by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const riddle = await Riddle.findByPk(req.params.id);
        if (riddle) {
            await riddle.update(req.body);
            res.status(200).json(riddle);
        } else {
            res.status(404).json({ error: 'Riddle not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /riddle/:id - Delete a riddle by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const riddle = await Riddle.findByPk(req.params.id);
        if (riddle) {
            await riddle.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Could not find the riddle' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router as riddleRouter };