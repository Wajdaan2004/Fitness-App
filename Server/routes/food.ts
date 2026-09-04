import { type Request, type Response, Router } from 'express'
import { supabase } from '../db.ts'
import { prisma } from '../lib/prisma.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const router = Router()


//get searched food
router.get('/food/search', async (req: Request, res: Response) => {
    const searched = req.query.searched as {searched: string}
    try{
    const result = await prisma.food.findFirst({
        where: {
            name: searched.searched
        }
    })
    return res.status(200).json({message: 'Food found', data: result})
} catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to get food', details: error})
    return
}
})


//get food by id
router.get('/food/:id', async(req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    try{
    const result = await prisma.food.findUnique({
        where: 
            {id: id}
    })
    return res.status(200).json({message: 'Food found', data: result})
} catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to get food', details: error})
    return
}
})

//create a custom food
router.post('/food', authMiddleware, async(req: Request, res: Response) => {
    const { name, calories, carbs, protein, fat } = req.body
    try{
    const result = await prisma.food.create({
        data: {
            name: name,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        }
    })
    return res.status(201).json({message: 'Food created successfully', data: result})
}  catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to create food', details: error})
    return
}
})


//update a custom food
router.put('/food/:id', authMiddleware, async(req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const { name, calories, carbs, protein, fat } = req.body
    try{
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
    return res.status(200).json({message: 'Food updated successfully', data: result})
}  catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to update food', details: error})
    return
}
})
export default router