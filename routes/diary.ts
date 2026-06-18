import { Router, type Request, type Response } from 'express'
import { prisma } from '../lib/prisma.ts';

const router = Router()

//make a diary entry
router.post('/diary', async (req: Request, res: Response) => {
    const { user_id, diary_id, date } = req.body
    const result = await prisma.diary.create({
        data: {
            user_id: user_id,
            date: new Date(date)
        }
    })
    if (!result) {
        res.status(500).json({error: 'Failed to create diary entry'})
    } else {
        res.status(201).json({message: 'Diary entry created successfully', data: result})
    }
})

//get diary entry by date
router.get('/diary', async (req: Request, res: Response) => {
    const {user_id, date} = req.query
    const result  = await prisma.diary.findFirst({
        where: {
            user_id: String(user_id),
            date: new Date(String(date))
        }
    })  
    if (!result) {
        res.status(404).json({error: 'Diary entry not found'})
    } else {
        res.status(200).json({message: 'Diary entry found', data: result})
    }

})

