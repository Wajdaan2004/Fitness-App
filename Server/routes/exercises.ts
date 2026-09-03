import Router, { type Request, type Response} from 'express'
import { prisma } from '../lib/prisma.ts';
import { Prisma } from '@prisma/client';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const router = Router();

//create an exercise
router.post('/exercises', authMiddleware,  async (req: Request, res: Response) => {
    const { name, primary_muscle, secondary_muscle } = req.body;
    try {
    const result = await prisma.exercises.create({
      data: {
        name: String(name),
        primary_muscle: String(primary_muscle),
        secondary_muscle: secondary_muscle,
      }
    })
    return res.status(201).json({message: 'Exercise created', data: result})
  } catch (error) {
    console.error(error)
    return res.status(500).json({error: 'Failed to create exercise', details: error})
  }
});

//get an exercise by id
router.get('/exercises/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
    const result = await prisma.exercises.findFirst({
      where: {
        id: String(id),
      },
    });
    return res.json({message: 'Exercise found', data: result});
  } catch (error) {
    console.error(error)
    return res.status(500).json({error: 'Failed to get exercise', details: error})
  }
});

//update an exercise by id
router.put('/exercises/:id', authMiddleware, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, primary_muscle, secondary_muscle } = req.body;
    try {
        const result = await prisma.exercises.update({
            where: {
                id: String(id),
      },
      data: {
        name: String(name),
        primary_muscle: String(primary_muscle),
        secondary_muscle: secondary_muscle,
        },
    });
    return res.json({message: 'Exercise updated', data: result});
  } catch (error) {
    console.error(error)
    return res.status(500).json({error: 'Failed to update exercise', details: error})
  }
});

export default router