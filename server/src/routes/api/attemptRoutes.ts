import express from 'express';
import type { Request, Response } from 'express';
import { Attempt, User, Room } from '../../models/index.js';
import { ValidationError as SequelizeValidationError } from 'sequelize';

const router = express.Router();

// GET an Attempt by userId and roomId
router.get('/attempt', async (req: Request, res: Response) => {
    const userId = Number(req.query.userId); // Explicitly convert to number
    const roomId = Number(req.query.roomId); // Explicitly convert to number

    // Validate query parameters
    if (isNaN(userId) || isNaN(roomId)) {
        return res.status(400).json({ error: 'userId and roomId must be valid numbers' });
    }

    try {
        const attempt = await Attempt.findOne({
            where: { userId, roomId },
            include: [{ model: User }, { model: Room }],
        });

        if (!attempt) {
            return res.status(404).json({ error: 'No attempt found for this user and room' });
        }

        return res.status(200).json(attempt);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST an attempt or update if it exists
router.post('/', async (req: Request, res: Response) => {
    const { duration, attemptNumber, isSuccessful, roomId: roomIdRaw, userId: userIdRaw } = req.body;

    const roomId = Number(roomIdRaw); // Explicitly convert to number
    const userId = Number(userIdRaw); // Explicitly convert to number

    // Validate body parameters
    if (isNaN(userId) || isNaN(roomId)) {
        return res.status(400).json({ error: 'userId and roomId must be valid numbers' });
    }

    try {
        // Check if an attempt already exists
        let attempt = await Attempt.findOne({ where: { userId, roomId } });

        if (attempt) {
            // Update the existing attempt
            attempt = await attempt.update({
                duration,
                attemptNumber: attempt.attemptNumber + 1,
                isSuccessful,
            });
            return res.status(200).json({ message: 'Attempt updated', attempt });
        }

        // Create a new attempt
        const newAttempt = await Attempt.create({
            duration,
            attemptNumber,
            isSuccessful,
            roomId,
            userId,
        });

        return res.status(201).json({ message: 'Attempt created', attempt: newAttempt });
    } catch (err: unknown) {
        if (err instanceof SequelizeValidationError) {
            return res.status(400).json({ message: 'Validation error', details: err.errors });
        }
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export { router as attemptRouter };