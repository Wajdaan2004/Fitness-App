import Router, { type Request, type Response} from 'express'
import { prisma } from '../lib/prisma.ts';
import { Prisma } from '@prisma/client';

const router = Router();

//create an exercise
router.post('/exercises', async (req: Request, res: Response) => {
  try {
    const { name, primary_muscle, secondary_muscle } = req.body;
    const result = await prisma.exercises.create({
      data: {
        name: String(name),
        primary_muscle: String(primary_muscle),
        secondary_muscle: secondary_muscle,
      },
    });

    res.status(201).json({
      message: 'Exercise created',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create exercise',
    });
  }
});

//get an exercise by id
router.get('/exercises/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await prisma.exercises.findFirst({
      where: {
        id: String(id),
      },
    });
    if (!result) {
      return res.status(404).json({
        error: 'Exercise not found',
      });
    }
    res.json({
      data: result,
    });
});

//update an exercise by id
router.put('/exercises/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, primary_muscle, secondary_muscle } = req.body;
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
    if (!result) {
      return res.status(404).json({
        error: 'Exercise not found',
      });
    }
    res.json({
      data: result,
    });
});

export default router