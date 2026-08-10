import Router, { type Request, type Response} from 'express'
import { prisma } from '../lib/prisma.ts';
import { Prisma } from '@prisma/client';

const router = Router();

//create set
router.post('/sets', async(req: Request, res: Response) => {
    const { workout_exercise_id, set_number, reps, weight } = req.body
    const result = await prisma.sets.create({
        data: {
            workout_exercise_id: String(workout_exercise_id),
            set_number: Number(set_number),
            reps: Number(reps),
            weight: new Prisma.Decimal(weight)
        }
    })
    if (!result) {
        res.status(500).json({error: 'Failed to create set'})
    } else {
        res.status(201).json({message: 'Set created', data: result})
    }
})

//get set by id
router.get('/sets/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const result = await prisma.sets.findFirst({
        where: {
            id: String(id)
        }
    })
    if (!result) {
        res.status(404).json({error: 'Set not found'})
    } else {
        res.status(200).json({message: 'Set found', data: result})
    }
})

//update set by id
router.put('/sets/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const { workout_exercise_id, set_number, reps, weight } = req.body
    const result = await prisma.sets.update({
        where: {
            id: String(id)
        },
        data: {
            workout_exercise_id: String(workout_exercise_id),
            set_number: Number(set_number),
            reps: Number(reps),
            weight: new Prisma.Decimal(weight)
        }
    })
    if (!result) {
        res.status(404).json({error: 'Set not found'})
    } else {
        res.status(200).json({message: 'Set updated', data: result})
    }
})

//delete set by id
router.delete('/sets/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const result = await prisma.sets.delete({
        where: {
            id: String(id)
        }
    })
    if (!result) {
        res.status(404).json({error: 'Set not found'})
    } else {
        res.status(200).json({message: 'Set deleted', data: result})
    }
})

export default router