import express from 'express';
import type { Request, Response } from 'express';
import { User, Room, Riddle } from '../../models/index.js';
import sequelize from '../../config/connection.js';

const router = express.Router();

// GET rooms
router.get('/', async (_req: Request, res: Response) => {
    try {
        const rooms = await Room.findAll({
            include: [{model: User, as: 'roomsCreated/Creator'}, { model: User }, { model: Riddle, as: 'riddles' }],
        });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'The server is down.' });
    }
});

// GET room by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const room = await Room.findByPk(req.params.id, {
            include: [{model: User, as: 'roomsCreated/Creator'}, { model: User }, { model: Riddle, as: 'riddles' }],
        });
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ error: 'Cannot find that room' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /rooms - Create a new room and riddles
router.post('/', async (req: Request, res: Response) => {
    const { title, description, type, difficulty, image, creatorID, riddles } = req.body;

    // Validation
    if (!title || !description || !type || !difficulty || !image || !creatorID || !riddles || riddles.length === 0) {
        return res.status(400).json({ error: 'Missing required fields or riddles.' });  // Add return here
    }

    const transaction = await sequelize.transaction(); // Using sequelize instance

    try {
        // Step 1: Create the room
        const newRoom = await Room.create({
            title,
            description,
            type,
            difficulty,
            image,
            creatorID,
        }, { transaction });  // Pass the transaction here

        // Step 2: Prepare the riddles associated with the new room
        const riddleEntries = riddles.map((riddle: any, index: number) => ({
            ...riddle,
            position: index + 1,
            roomId: newRoom.id,
        }));

        // Step 3: Create riddles in bulk
        await Riddle.bulkCreate(riddleEntries, { transaction });

        // Commit the transaction
        await transaction.commit();

        // Send back the newly created room and riddles as response
        return res.status(201).json({ room: newRoom, riddles: riddleEntries });  // Add return here

    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ error: 'Failed to create room and riddles' });  // Add return here
    }
});

// PUT /rooms/:id - Update a room
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (room) {
            await room.update(req.body);
            res.status(200).json(room);
        } else {
            res.status(404).json({ error: 'Could not find the room specified.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /room/:id - Delete a room
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (room) {
            await room.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Could not find the room.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router as roomRouter };