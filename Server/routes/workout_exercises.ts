import Router, { type Request, type Response} from 'express'
import { prisma } from '../lib/prisma.ts';
import { Prisma } from '@prisma/client';

const router = Router();

//create workout exercise
router.post('/workout-exercise', async(req: Request, res: Response) => {
    const { workout_id, exercise_id, sets, reps, weight } = req.body
    const result = await prisma.workout_exercises.create({
        data: {
            workout_id: String(workout_id),
            exercise_id: String(exercise_id),
            sets: {
                create: sets.map((set: any) => ({
                    set_number: set.set_number,
                    reps: set.reps,
                    weight: set.weight
                }))
            }
        },
        include: {
            sets: true
        }
    })
    if (!result) {
        res.status(500).json({error: 'Failed to create workout exercise'})
    } else {
        res.status(201).json({message: 'Workout exercise created', data: result})
    }
})

//get workout exercise by id
router.get('/workout-exercise/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const result = await prisma.workout_exercises.findFirst({
        where: {
            id: String(id)
        }
    })
    if (!result) {
        res.status(404).json({error: 'Workout exercise not found'})
    } else {
        res.status(200).json({message: 'Workout exercise found', data: result})
    }
})



export default router
