import { type Request, type Response, Router } from 'express'
import { supabase } from '../db.js'
import { prisma } from '../lib/prisma.ts';

const router = Router()


//get searched food
router.get('/food/search', async (req: Request, res: Response) => {
    const searched = req.query.searched as {searched: string}
    const result = await prisma.food.findFirst({
        where: {
            name: searched.searched
        }
    })

    if (!result) {
        res.status(404).json({error: 'Food not found'})
    } else {
        res.status(200).json({data: result})
    }
})

//get food by id
router.get('/food/:id', async(req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const result = await prisma.food.findUnique({
        where: 
            {id: id}
    })

    if (!result) {
        res.status(404).json({error: 'Food not found'})
    } else {
        res.status(200).json({data: result})
    }
})

//create a custom food
router.post('/food', async(req: Request, res: Response) => {
    const { name, calories, carbs, protein, fat } = req.body
    const result = await prisma.food.create({
        data: {
            name: name,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        }
    })
    if (!result) {
        res.status(500).json({error: 'Failed to create food'})
    } else {
        res.status(201).json({message: 'Food created successfully', data: result})
    }


//update a custom food
router.put('/food/:id', async(req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const { name, calories, carbs, protein, fat } = req.body
    const result = await prisma.food.update({
        where: {id: id},
        data: {
            name: name,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        }
    })
    if (!result) {
        res.status(500).json({error: 'Failed to update food'})
    } else {
        res.status(200).json({message: 'Food updated successfully', data: result})
    }
    })
})
export default router