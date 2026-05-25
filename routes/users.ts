import express, { type Request, type Response } from 'express'
import { Router } from 'express'

const router = Router()
import { supabase } from '../db.ts'
import { randomUUID } from 'node:crypto'

export type CreateUserDto  = {
    name: string,
    email: string,
    birthday: string,
    number: string,
    calorie_goal: number,
    protein_goal: number,
    carb_goal: number,
    fat_goal: number,
    password: string,
    username: string

}
//create a new user
router.post('/users', async (req : Request, res : Response) => {
    const body : CreateUserDto = req.body
    const { data, error } = await supabase
        .from('users')
        .insert({
        name: body.name,
        email: body.email,
        birthday: body.birthday,
        number: body.number,
        calorie_goal: body.calorie_goal,
        protein_goal: body.protein_goal,
        carb_goal: body.carb_goal,
        fat_goal: body.fat_goal,
        password: body.password,
        username: body.username
    }).select()

    if (error) {
        res.status(500).json({error: error.message})
    } else {
        res.status(201).json({message: 'User created successfully', data: data})
    }
})
export default router