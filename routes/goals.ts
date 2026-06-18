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
})

//create or update goals
router.post('/goals', async (req: Request, res: Response) => {
    const { user_id, calorie_goal, fat_goal, carb_goal, protein_goal } = req.body
    const result = await prisma.goals.create({
        where: {user_id: String(user_id)},
        data: {
            user_id: String(user_id),
            calorie_goal: calorie_goal ? new Prisma.Decimal(calorie_goal) : null,
            fat_goal: fat_goal ? new Prisma.Decimal(fat_goal) : null,
            carb_goal: carb_goal ? new Prisma.Decimal(carb_goal) : null,
            protein_goal: protein_goal ? new Prisma.Decimal(protein_goal) : null
        }
    })