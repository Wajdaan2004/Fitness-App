import { type Request, type Response } from 'express'
import { Router } from 'express'
import { prisma } from '../lib/prisma.ts';
import * as bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken.ts'
import { authMiddleware } from '../middlewares/authMiddleware.ts'


const router = Router()
import { supabase } from '../db.ts'
import type { extRequest } from '../../definitions.ts';
//import { randomUUID } from 'node:crypto'

//login
router.get('/users/login', async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {
        return res.status(404).json({error: 'User not found'})
    }
    const passwordMatch = await bcrypt.compare(password, user.password) 
    if (passwordMatch) {
        const token = generateToken(user.id, res)
        res.status(200).json({message: 'Login successful', data: user, token: token})
    } 
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to login', details: error})
    }
})

//Register 
router.post('/users/register', async (req : Request, res : Response) => {
    const { userId, email, password, name, username, number, birthday } = req.body
    const userExists = await prisma.users.findUnique({
        where: {email: email}
    })
    if (userExists){
        return res.status(400).json({error: 'User already exists'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try{
    const result = await prisma.users.create({
        data: {
            name: name,
            username: username,
            password: hashedPassword,
            email: email,
            number: number,
            birthday: new Date(birthday)
        }, 

    })
    const token = generateToken(userId, res)
    const { password: _, ...safeUser } = result
    return res.status(201).json({message: 'User created successfully', data: safeUser, token: token})
} catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to create user', details: error})
    return
}
})

//get user by id
router.get('/users/me', authMiddleware,  async (req: extRequest, res: Response) => {
    try{
    const result = await prisma.users.findUnique({
        where: {
            id:  String(req.user)
        }
    })
    return res.status(200).json({message: 'User found', data: result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to get user', details: error})
    }
})

//update user by id
router.put('/users/me', authMiddleware,  async (req: extRequest, res: Response) => {
    const body = req.body
    try{
        const result = await prisma.users.update({
            where: {id: req.user},
            data: {
                name: body.name,
                email: body.email,
                birthday: new Date(body.birthday),
                number: body.number,
                username: body.username,
                password: await bcrypt.hash(body.password, 10),
            }
        })
        return res.status(200).json({message: 'User updated successfully', data: result})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Failed to update user', details: error})
    }
})

//soft delete user by id
router.delete('/users/me', authMiddleware, async (req: extRequest, res: Response) => {
    try{
        await prisma.users.update({
            where: { id: req.user },
            data: {
                is_deleted: true
            }
        })
        return res.status(200).json({message: 'User deleted successfully'})
    } catch (error){
        console.error(error)
        return res.status(500).json({error: 'Failed to delete user'})
    }
})

//logout
router.post('/users/logout', authMiddleware, async (req: Request, res: Response) => {
    res.clearCookie('jwt')
    res.status(200).json({message: 'Logout successful'})
})

export default router