import express, { type Request, type Response } from 'express'
import { Router } from 'express'
import { prisma } from '../lib/prisma.ts';

const router = Router()
import { supabase } from '../db.ts'
//import { randomUUID } from 'node:crypto'

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
    username: string,
    is_deleted: boolean

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
        username: body.username,
        is_deleted: body.is_deleted
    }).select()

    if (error) {
        res.status(500).json({error: error.message})
    } else {
        res.status(201).json({message: 'User created successfully', data: data})
    }
})

//get user by id
router.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    if (!id) {
        res.status(400).json({error: 'User ID is required'})
        return
    }
    const result = await prisma.users.findUnique({
        where: {
            user_id: id
        }
    })
    if (!result) {
        res.status(404).json({error: 'User not found'})
    } else {
        res.status(200).json({data: result})
    }
})
const temp = prisma.goals.findMany()
//update user by id
router.put('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params 
    const body : CreateUserDto = req.body
    const { data, error } = await supabase
        .from('users')
        .update({
            name: body.name, 
            email: body.email,
            birthday: body.birthday,
            number: body.number,
            calorie_goal: body.calorie_goal,
            protein_goal: body.protein_goal,
            carb_goal: body.carb_goal,
            fat_goal: body.fat_goal,
            password: body.password,
            username: body.username,
            is_deleted: body.is_deleted
        })
        .eq('user_id', id)
        .select()

        if (error) {
            res.status(500).json({error: error.message})
        } else {
            res.status(200).json({message: 'User updated successfully', data: data})
        }
        })

//soft delete user by id
router.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { data, error } = await supabase
        .from ('users')
        .update({is_deleted: true})
        .eq('user_id', id)
        .select()
})

export default router