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
    console.log('Incoming request body:', req.body); // Log the incoming request data
  
    const { duration, attemptNumber, isSuccessful, roomId, userId } = req.body;
  
    const attemptData = {
      duration,
      attemptNumber,
      isSuccessful,
      roomId,
      userId,
    };
  
    console.log('Prepared attemptData:', attemptData); // Log the attemptData being used for creation
  
    try {
      console.log('Attempting to create an Attempt record...'); // Log before calling create
      const attempt = await Attempt.create(attemptData);
      console.log('Attempt record created successfully:', attempt.toJSON()); // Log success
      return res.status(201).json({ attempt }); // Send success response
    } catch (err: unknown) {
      console.error('Error occurred while creating Attempt:', err); // Log the raw error
  
      if (err instanceof SequelizeValidationError) {
        console.error('Validation error details:', JSON.stringify(err.errors, null, 2)); // Log validation error details
        return res.status(400).json({ message: 'Validation error', details: err.errors });
      } else if (err instanceof Error) {
        console.error('Unexpected error message:', err.message); // Log unexpected error message
        return res.status(500).json({ message: 'Internal server error' });
      } else {
        console.error('Unknown error type:', err); // Log fallback for unknown error type
        return res.status(500).json({ message: 'Unknown error' });
      }
    }
  });

export { router as attemptRouter }