import express from 'express';
import { Attempt } from '../../models/index.js'; // Import your Attempt model
import type { Request, Response } from 'express';

const router = express.Router();

// GET attempt by userId and roomId
router.get('/', async (req: Request, res: Response) => {
    const { userId, roomId } = req.query;

    // Ensure userId and roomId are strings and not arrays or objects
    const userIdString = Array.isArray(userId) ? userId[0] : userId;
    const roomIdString = Array.isArray(roomId) ? roomId[0] : roomId;

    // Validate that userId and roomId are present and are strings
    if (!userIdString || !roomIdString) {
        return res.status(400).json({ error: 'Missing userId or roomId.' });
    }

    try {
        const attempt = await Attempt.findOne({
            where: {
                userId: userIdString, // Ensure these are strings
                roomId: roomIdString,  // Ensure these are strings
            },
        });

        if (attempt) {
            return res.status(200).json(attempt);
        } else {
            return res.status(404).json({ error: 'Attempt not found.' });
        }
    } catch (error) {
        console.error('Error fetching attempt:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST create a new attempt
router.post('/', async (req: Request, res: Response) => {
    const { userId, roomId, isSuccessful, duration, attemptNumber } = req.body;

    // Validate input
    if (!userId || !roomId || isSuccessful === undefined || !duration || !attemptNumber) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
        // Attempt to create a new attempt record
        const newAttempt = await Attempt.create({
            userId,
            roomId,
            isSuccessful,
            duration,
            attemptNumber,
        });

        return res.status(201).json(newAttempt);
    } catch (error) {
        console.error('Error creating attempt:', error);

        // Ensure a response is sent on error
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT update an existing attempt
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const attempt = await Attempt.findByPk(req.params.id);

        if (!attempt) {
            return res.status(404).json({ error: 'Attempt not found.' });
        }

        await attempt.update(req.body);
        return res.status(200).json(attempt);  // Ensure this path always returns a response
    } catch (error) {
        console.error('Error updating attempt:', error);
        return res.status(500).json({ error: 'Internal server error.' });  // Ensure this path returns a response
    }
});

export { router as attemptRouter };