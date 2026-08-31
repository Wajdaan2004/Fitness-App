import express, {Router, type Request, type Response} from 'express'
import { prisma } from '../lib/prisma.ts';
import { Prisma } from '@prisma/client';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const router = Router();

//get food entries by id 
router.get('/food-entry/:id', authMiddleware, async(req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await prisma.food_entry.findMany({
            where: {
                id: String(id)
            },
        })
        return res.status(200).json({message: 'Food entries found', data: result})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Failed to get food entries', details: error})
    }
})

//create food entry
router.post('/food-entry', authMiddleware, async(req: Request, res: Response) => {
    const { diary_id, food_id, serving_amount, serving_unit } = req.body
    try {
    const result = await prisma.food_entry.create({
        data: {
            diary_id,
            food_id,
            serving_amount: new Prisma.Decimal(serving_amount),
            serving_unit: String(serving_unit),
        }
    })
    return res.status(201).json({message: 'Food entry created', data: result})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Failed to create food entry', details: error})
    }
})

//delete food entry
router.delete('/food-entry/:id', authMiddleware, async(req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await prisma.food_entry.delete({
            where: {
                id: String(id)
            }
        })
        return res.status(200).json({message: 'Food entry deleted', data: result})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Failed to delete food entry', details: error})
    }
})

//update food entry
router.put('/food-entry/:id', authMiddleware, async(req: Request, res: Response) => {
    const { id } = req.params
    const { diary_id, food_id, serving_amount, serving_unit } = req.body
    try {
        const result = await prisma.food_entry.update({
            where: {
                id: String(id)
            },
            data: {
                serving_amount: new Prisma.Decimal(serving_amount),
                serving_unit: String(serving_unit),
            }
        })
        return res.status(200).json({message: 'Food entry updated', data: result})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Failed to update food entry', details: error})
    }
})

export default router