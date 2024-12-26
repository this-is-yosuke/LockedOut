import express from 'express'
import type { Request, Response } from 'express'
import { Attempt, User, Room } from '../../models/index.js';

const router = express.Router();

// GET all Attempts
router.get('/', async (_req: Request, res: Response) => {
    try{
        const attempts = await Attempt.findAll({
            include: [
                {model: User}, {model: Room}
            ],
        });
        res.status(200).json(attempts);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// GET by USER
router.get('/user/:id', async (req: Request, res: Response) => {
    try{
        const attempts = await Attempt.findByPk(req.params.userID, {
            include: [
                {model: User}, {model: Room}
            ],
        });
        res.status(200).json(attempts);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// POST an attempt
router.post('/', async (req: Request, res: Response) => {
    const { duration, attemptNumber, isSuccessful, roomId, userId } = req.body;
    try {
        const newAttempt = await Attempt.create({ duration, attemptNumber, isSuccessful, roomId, userId });
        res.status(201).json(newAttempt);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});


export { router as attemptRouter }