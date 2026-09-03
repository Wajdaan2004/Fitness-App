import { Router, type Request, type Response } from 'express'
import { prisma } from '../lib/prisma.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const router = Router()

//make a diary entry
router.post('/diary', authMiddleware, async (req: Request, res: Response) => {
    const { user_id, date } = req.body
    try{
    const result = await prisma.diary.create({
        data: {
            user_id: user_id,
            date: new Date(date)
        }
    })
    return res.status(201).json({message: 'Diary entry created', data: result})
} catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to create diary entry', details: error})
    return
}
})

//get diary entry by date
router.get('/diary', authMiddleware, async (req: Request, res: Response) => {
    const {user_id, date} = req.query
    try{
    const result  = await prisma.diary.findFirst({
        where: {
            user_id: String(user_id),
            date: new Date(String(date))
        }
    })  
    return res.status(200).json({message: 'Diary entry found', data: result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to get diary entry', details: error})
        return
    }
})

export default router