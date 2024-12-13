import express from 'express';
import type { Request, Response } from 'express';
import { Riddle } from '../../models/riddle.js';

const router = express.Router();

//GET /riddles all riddles
router.get('/', async (_req: Request, res: Response) => {
    try {
        const riddles = await Riddle.findAll();
        res.status(200).json(riddles);
    }catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// GET /riddles/:id GET by ID
router.get('/:id', async (req:Request, res: Response) => {
    try{
        const riddle = await Riddle.findByPk(req.params.id);
        if(riddle){
            res.status(200).json(riddle);
        }else{
            res.status(404).json({error: 'Could not find the riddle'});
        }
    }catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// POST /riddles Create a new riddle
router.post('/', async (req:Request, res: Response) => {
    try{
        const newRiddle = await Riddle.create(req.body);
        res.status(201).json(newRiddle);
    }catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// PUT /riddle/:id Update a riddle
router.put('/:id', async (req: Request, res: Response) => {
    try{
        const riddle = await Riddle.findByPk(req.params.id);
        if(riddle){
            await riddle.update(req.body);
            res.status(200).json(riddle);
        }else{
            res.status(404).json({error: 'Riddle not found'});
        }
    }catch(error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// DELETE /riddle/:id to DELETE a riddle by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try{
        const riddle = await Riddle.findByPk(req.params.id);
        if(riddle){
            await riddle.destroy();
            res.status(204).send();
        }else{
            res.status(404).json({error: 'Could not find the riddle'});
        }
    }catch(error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

export { router as riddleRouter }