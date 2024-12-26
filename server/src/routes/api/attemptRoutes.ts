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
import { ValidationError as SequelizeValidationError } from 'sequelize'; // Import Sequelize and ValidationError

router.post('/', async (req: Request, res: Response) => {
  const { duration, attemptNumber, isSuccessful, roomId, userId } = req.body;

  const attemptData = {
    duration,
    attemptNumber,
    isSuccessful,
    roomId,
    userId,
  };

  try {
    // Attempt to create a new attempt record in the database
    const attempt = await Attempt.create(attemptData);
    return res.status(201).json({ attempt }); // Send success response
  } catch (err: unknown) { // Type assertion for 'err' to unknown
    if (err instanceof SequelizeValidationError) {
      console.error('Validation error:', err.errors); // Log Sequelize validation errors
      return res.status(400).json({ message: 'Validation error', details: err.errors });
    } else if (err instanceof Error) {
      console.error('Unexpected error:', err.message); // Log unexpected errors
      return res.status(500).json({ message: 'Internal server error' });
    } else {
      console.error('Unknown error:', err); // Fallback for unknown errors
      return res.status(500).json({ message: 'Unknown error' });
    }
  }
});

export { router as attemptRouter }