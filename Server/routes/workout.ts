import Router, { type Request, type Response} from 'express'
import { prisma } from '../lib/prisma.ts';
import { Prisma } from '@prisma/client';

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
router.post('/workout', async(req: Request, res: Response) => {
    const {user_id, date} = req.body
    const result = await prisma.workout.create({
        data: {
            user_id: String(user_id),
            workout_exercises: {
                create: []
            }
        }
    })
    if (!result) {
        res.status(500).json({error: 'Failed to create workout'})
    } else {
        res.status(201).json({message: 'Workout created', data: result})
    }
})

//delete workout
router.delete('/workout/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const result = await prisma.workout.delete({
        where: {
            id: String(id)
        }
    })
    if (!result) {
        res.status(404).json({error: 'Workout not found'})
    } else {
        res.status(200).json({message: 'Workout deleted', data: result})
    }
})

export default router

