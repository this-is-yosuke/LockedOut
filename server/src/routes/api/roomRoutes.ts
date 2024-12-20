import express from 'express';
import type { Request, Response } from 'express';
import { Room } from '../../models/index.js';
import { User } from '../../models/user.js';
import { Riddle } from '../../models/riddle.js';

const router = express.Router();

// GET rooms
router.get('/', async (_req: Request, res: Response) => {
    try{
        const rooms = await Room.findAll({
            // This includes the User in the room's json
            include: [{ model: User,}, { model: Riddle, as: 'riddles'}],
        });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({error: 'The server is down.'});
    }
});

// GET rooms by ID /rooms/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const room = await Room.findByPk(req.params.id, {
            include: [{model: User}, { model: Riddle, as: 'riddles'}],
        });
        if(room){
            res.status(200).json(room);
        }else{
            res.status(404).json({error: 'Cannot find that room'})
        }
    }catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
});

// POST /rooms
router.post('/', async (req: Request, res: Response) => {
    try{
        const newRoom = await Room.create(req.body);
        res.status(201).json(newRoom);
    }catch (error) {
        res.status(500).json({error: 'Internal server error!'});
    }
});

//PUT /rooms/:id to update a room
router.put('/:id', async (req: Request, res: Response) => {
    try{
        const room = await Room.findByPk(req.params.id);
        if(room){
            await room.update(req.body);
            res.status(200).json(room);
        }else{
            res.status(404).json({error: 'Could not find the room specified.'})
        }
    }catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// DELETE /room/:id to delete a room by id
router.delete('/:id', async (req: Request, res: Response) => {
    try{
        const room = await Room.findByPk(req.params.id);
        if(room){
            await room.destroy();
            res.status(204).send();
        }else{
            res.status(404).json({error: 'Could not find the room.'});
        }
    }catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

export { router as roomRouter }