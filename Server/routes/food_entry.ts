import express, {Router, type Request, type Response} from 'express'
import { prisma } from '../lib/prisma.ts';
import { Prisma } from '@prisma/client';

const router = Router();

//get food entries by id 
router.get('/food-entry/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const result = await prisma.food_entry.findMany({
        where: {
            id: String(id)
        },
    })
    if (!result) {
        res.status(404).json({error: 'Food entries not found'})
    } else {
        res.status(200).json({message: 'Food entries found', data: result})
    }
})

//create food entry
router.post('/food-entry', async(req: Request, res: Response) => {
    const { diary_id, food_id, serving_amount, serving_unit } = req.body
    const result = await prisma.food_entry.create({
        data: {
            diary_id,
            food_id,
            serving_amount: new Prisma.Decimal(serving_amount),
            serving_unit: String(serving_unit),
        }
    })
    if (!result) {
        res.status(500).json({error: 'Failed to create food entry'})
    } else {
        res.status(201).json({message: 'Food entry created', data: result})
    }
})

//delete food entry
router.delete('/food-entry/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const result = await prisma.food_entry.delete({
        where: {
            id: String(id)
        }
    })
    if (!result) {
        res.status(404).json({error: 'Food entry not found'})
    } else {
        res.status(200).json({message: 'Food entry deleted', data: result})
    }
})

//update food entry
router.put('/food-entry/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const { diary_id, food_id, serving_amount, serving_unit } = req.body
    const result = await prisma.food_entry.update({
        where: {
            id: String(id)
        },
        data: {
            serving_amount: new Prisma.Decimal(serving_amount),
            serving_unit: String(serving_unit),
        }
    })
    if (!result) {
        res.status(404).json({error: 'Food entry not found'})
    } else {
        res.status(200).json({message: 'Food entry updated', data: result})
    }
})

export default router