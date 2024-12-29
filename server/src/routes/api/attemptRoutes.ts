import express from 'express';
import { Attempt } from '../../models/index.js'; // Import your Attempt model
import type { Request, Response } from 'express';

const router = express.Router();

// GET attempt by userId and roomId
router.get('/', async (req: Request, res: Response) => {
    // Extract query parameters and assert them as strings
    const { userId, roomId } = req.query;

    // Safely handle query parameters as strings
    const userIdString = typeof userId === 'string' ? userId : String(userId);
    const roomIdString = typeof roomId === 'string' ? roomId : String(roomId);

    // Validate that userId and roomId are present
    if (!userIdString || !roomIdString) {
        return res.status(400).json({ error: 'Missing userId or roomId.' });
    }

    // Convert userId and roomId to numbers if they are valid numeric strings
    const userIdNumber = parseInt(userIdString, 10);
    const roomIdNumber = parseInt(roomIdString, 10);

    // Ensure the parsed values are valid numbers
    if (isNaN(userIdNumber) || isNaN(roomIdNumber)) {
        return res.status(400).json({ error: 'userId or roomId must be a valid number.' });
    }

    try {
        const attempt = await Attempt.findOne({
            where: {
                userId: userIdNumber, // Now it's a number
                roomId: roomIdNumber,  // Now it's a number
            },
        });

        if (attempt) {
            return res.status(200).json(attempt); // Return the existing attempt
        } else {
            // If no attempt is found, proceed with creating a new attempt
            const newAttempt = await Attempt.create({
                userId: userIdNumber,
                roomId: roomIdNumber,
                attemptNumber: 1, // New attempt starts with attempt number 1
                isSuccessful: false, // Default to unsuccessful until user tries
                duration: 0, // Placeholder value for duration
            });

            return res.status(201).json(newAttempt); // Return the newly created attempt
        }
    } catch (error) {
        console.error('Error fetching or creating attempt:', error);
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
        return res.status(200).json(attempt); // Return the updated attempt
    } catch (error) {
        console.error('Error updating attempt:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

export { router as attemptRouter };