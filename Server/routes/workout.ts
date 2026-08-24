import Router, { type Request, type Response} from 'express'
import { prisma } from '../lib/prisma.ts';
import { Prisma } from '@prisma/client';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import type { extRequest } from '../../definitions.ts';


const router = Router();

//get workout by id
router.get('/workout/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const result = await prisma.workout.findFirst({
        where: {
            id: String(id)
        }
    })
    if (!result) {
        res.status(404).json({error: 'Workout not found'})
    } else {
        res.status(200).json({message: 'Workout found', data: result})
    }
})

//create workout
router.post('/workout', authMiddleware, async(req: extRequest, res: Response) => {
    const {user_id, date} = req.body
    try{
    const result = await prisma.workout.create({
        data: {
            user_id: String(req.user),
            date: new Date(date)
        }
    })
    return res.status(201).json({message: 'Workout created', data: result})
    } catch (error) {
        return res.status(500).json({error: 'Failed to create workout', details: error})
    }
})

//delete workout
router.delete('/workout/:id', authMiddleware, async(req: extRequest, res: Response) => {
    const { id } = req.params
    try{
    const result = await prisma.workout.delete({
        where: {
            id: String(id),
            user_id: String(req.user)
        }
    })
    return res.status(200).json({message: 'Workout deleted', data: result})
    } catch (error) {
        return res.status(500).json({error: 'Failed to delete workout', details: error})
    }
})

export default router

