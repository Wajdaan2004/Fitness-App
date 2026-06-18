import express, { type Request, type Response } from 'express'
import { Router } from 'express'
import { prisma } from '../lib/prisma.ts';

const router = Router()
import { supabase } from '../db.ts'
//import { randomUUID } from 'node:crypto'

export type CreateUserDto  = {
    name: string,
    birthday: string,    
    email: string,
    number: string,
    username: string,    
    password: string,
    is_deleted: boolean

}
//create a new user
router.post('/users', async (req : Request, res : Response) => {
    const body : CreateUserDto = req.body
    const result = await prisma.users.create({
        data: {
            name: body.name,
            birthday: new Date(body.birthday),
            email: body.email,
            number: body.number,
            password: body.password, 
            username: body.username
        } 
    })

    if (!result) {
        res.status(500).json({error: 'Failed to create user'})
    } else {
        res.status(201).json({message: 'User created successfully', data: result})
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

//update user by id
router.put('/users/:id', async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).json({error: 'User ID is required'})
        return
    }
        const { id } = req.params as { id: string }
        const body : CreateUserDto = req.body
        const result = await prisma.users.update({
            where: {user_id: id},
            data: {
                name: body.name,
                email: body.email,
                birthday: new Date(body.birthday),
                number: body.number,
                username: body.username,
                password: body.password,
            }
        })
    
        if (!result) {
            res.status(500).json({error: 'Failed to update user'})
        } else {
            res.status(200).json({message: 'User updated successfully', data: result})
        }
    })

//soft delete user by id
router.delete('/users/:id', async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).json({error: 'User ID is required'})
        return
    }
    const { id } = req.params as {id: string}
    const result = await prisma.users.update({
        where: { user_id: id },
        data: {
            is_deleted: true
        }
    })

    if (!result) {
        res.status(500).json({error: 'Failed to delete user'})
    } else {
        res.status(200).json({message: 'User deleted successfully', data: result})
    }
})

export default router