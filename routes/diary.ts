import { Router, type Request, type Response } from 'express'
import {supabase } from '../db.ts'

const router = Router()

//make a diary entry
router.post('/diary', async (req: Request, res: Response) => {
    const { user_id, diary_id, date } = req.body
})
