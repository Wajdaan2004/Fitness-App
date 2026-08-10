import express, { Router, type Request, type Response } from 'express'
import { prisma } from '../lib/prisma.ts';
import { Prisma } from '@prisma/client';

const router = Router();

//get goals by user id
router.get('/goals/:userId/:date', async (req: Request, res: Response) => {    const {userId, date} = req.params;
    const result = await prisma.goals.findFirst({
        where: {
            user_id: String(userId),
        },
        orderBy: {
            date: 'desc'
        }
    })
    if (!result) {
        res.status(404).json({error: 'Goals not found'})
        } else {
            res.status(200).json({message: 'Goals found', data: result})
        }
    })

//create or update goals
router.post('/goals', async (req: Request, res: Response) => {
    const { user_id, calorie_goal, fat_goal, carb_goal, protein_goal } = req.body
    const result = await prisma.goals.create({
        data: {
            user_id: String(user_id),
            calorie_goal: calorie_goal ? new Prisma.Decimal(calorie_goal) : null,
            fat_goal: fat_goal ? new Prisma.Decimal(fat_goal) : null,
            carb_goal: carb_goal ? new Prisma.Decimal(carb_goal) : null,
            protein_goal: protein_goal ? new Prisma.Decimal(protein_goal) : null
        }
    })
        if (!result) {
        res.status(500).json({error: 'Failed to create goals'})
    } else {
        res.status(201).json({message: 'Goals created successfully', data: result})
    }   
})

export default router