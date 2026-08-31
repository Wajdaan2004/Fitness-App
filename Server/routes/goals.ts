import express, { Router, type Request, type Response } from 'express'
import { prisma } from '../lib/prisma.ts';
import { Prisma } from '@prisma/client';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import type { extRequest } from '../../definitions.ts';

const router = Router();

//create or update goals
router.post('/goals', authMiddleware, async (req: extRequest, res: Response) => {
    const { calorie_goal, fat_goal, carb_goal, protein_goal } = req.body
    try{
    const result = await prisma.goals.create({
        data: {
            user_id: String(req.user),
            calorie_goal: calorie_goal ? new Prisma.Decimal(calorie_goal) : null,
            fat_goal: fat_goal ? new Prisma.Decimal(fat_goal) : null,
            carb_goal: carb_goal ? new Prisma.Decimal(carb_goal) : null,
            protein_goal: protein_goal ? new Prisma.Decimal(protein_goal) : null,
            date: new Date()
        }
    })
    return res.status(201).json({message: 'Goals created', data: result})
} catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to create goals'})
    return
}
})
//get goals by user id
router.get('/goals/',authMiddleware, async (req: extRequest, res: Response) => { 
    try{
    const result = await prisma.goals.findFirst({
        where: {
            user_id: String(req.user),
        },
        orderBy: {
            date: 'desc'
        }
    })
    return res.status(200).json({message: 'Goals found', data: result})
} catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to get goals', details: error})
    return
}
})



export default router