import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET ALL ACTIVITIES
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET SINGLE ACTIVITY BY SLUG OR ID
router.get('/:idOrSlug', async (req: Request, res: Response) => {
  const idOrSlug = req.params['idOrSlug'] as string;
  try {
    const activity = await prisma.activity.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug }
        ]
      },
    });
    if (!activity) {
      res.status(404).json({ message: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// CREATE ACTIVITY
router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = await prisma.activity.create({
      data: req.body,
    });
    res.status(201).json(activity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// UPDATE ACTIVITY
router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    const activity = await prisma.activity.update({
      where: { id },
      data: req.body,
    });
    res.json(activity);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// DELETE ACTIVITY
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    await prisma.activity.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
