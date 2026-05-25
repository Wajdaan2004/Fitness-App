import { type Express , type Request, type Response, Router} from 'express'
import { supabase } from '../db.ts'

const router = Router()

//get searched food
router.get('/food/search', async (req: Request, res: Response) => {
    const { searched } = req.query;
    // TODO: Implement search logic using 'searched' value
    res.json({ message: `Searched for: ${searched}` });
});