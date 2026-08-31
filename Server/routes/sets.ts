import Router, { type Request, type Response} from 'express'
import { prisma } from '../lib/prisma.ts';
import { Prisma } from '@prisma/client';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const router = Router();

//create set
router.post('/sets',authMiddleware, async(req: Request, res: Response) => {
    const { workout_exercise_id, set_number, reps, weight } = req.body
    try{
    const result = await prisma.sets.create({
        data: {
            workout_exercise_id: String(workout_exercise_id),
            set_number: Number(set_number),
            reps: Number(reps),
            weight: new Prisma.Decimal(weight)
        }
    })
    return res.status(201).json({message: 'Set created', data: result})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Internal server error'})
}
})

//get set by id
router.get('/sets/:id',authMiddleware, async(req: Request, res: Response) => {
    const { id } = req.params
    try{
    const result = await prisma.sets.findFirst({
        where: {
            id: String(id)
        }
    })
    return res.status(200).json({message: 'Set found', data: result})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Internal server error'})
    }
})

//update set by id
router.put('/sets/:id',authMiddleware, async(req: Request, res: Response) => {
    const { id } = req.params
    const { workout_exercise_id, set_number, reps, weight } = req.body
    try {
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
    return res.status(200).json({message: 'Set updated', data: result})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Internal server error'})
    }
})

//delete set by id
router.delete('/sets/:id',authMiddleware, async(req: Request, res: Response) => {
    const { id } = req.params
    try {
        await prisma.sets.delete({
            where: {
                id: String(id)
            }
        })
        return res.status(200).json({message: 'Set deleted'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Internal server error'})
    }
})

export default router