import { type Request, type Response, Router } from 'express'
import { supabase } from '../db.js'
import { prisma } from '../lib/prisma.ts';

const router = Router()


//get searched food
router.get('/food/search', async (req: Request, res: Response) => {
    const searched = req.query.searched as string
    const { data, error } = await supabase
        .from('food')
        .select('*')
        .ilike('name', `%${searched}%`)
    
    if (error) {
        res.status(500).json({error: error.message})
    } else {
        res.status(200).json({data: data})
    }

//get food by id
router.get('/food/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const { data, error } = await supabase
        .from ('food')
        .select('*')
        .eq ('food_id', id)
        .single()
    
    if (error) {
        res.status(500).json({error: error.message})
    } else {
        res.status(200).json({data: data})
    }
})

//create a custom food
router.post('/food', async(req: Request, res: Response) => {
    const { name, calories, carbs, protein, fat } = req.body
    const { data, error } = await supabase
        .from('food')
        .insert({ name, calories, carbs, protein, fat })
        .select()
        .single()
    
    if (error) {
        res.status(500).json({error: error.message})
    } else {
        res.status(201).json({message: 'Food created successfully', data: data})
    }
})

//update a custom food
router.put('food/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const { name, calories, carbs, protein, fat } = req.body
    const { data, error } = await supabase
        .from('food')
        .update({ name, calories, carbs, protein, fat })
        .eq('food_id', id)
        .select()
        .single()

    if (error) {
        res.status(500).json({error: error.message})
    } else {
        res.status(200).json({message: 'Food updated successfully', data: data})
    }
})



})