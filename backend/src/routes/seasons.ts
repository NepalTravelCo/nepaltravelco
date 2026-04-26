import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET ALL SEASONS
router.get('/', async (req: Request, res: Response) => {
  try {
    const seasons = await prisma.season.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(seasons);
  } catch (error) {
    console.error('Error fetching seasons details:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// GET SINGLE SEASON BY SLUG OR ID
router.get('/:idOrSlug', async (req: Request, res: Response) => {
  const idOrSlug = req.params['idOrSlug'] as string;
  try {
    const season = await prisma.season.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug }
        ]
      },
    });
    if (!season) {
      res.status(404).json({ message: 'Season not found' });
      return;
    }
    res.json(season);
  } catch (error) {
    console.error('Error fetching season details:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// CREATE SEASON
router.post('/', async (req: Request, res: Response) => {
  try {
    const season = await prisma.season.create({
      data: req.body,
    });
    res.status(201).json(season);
  } catch (error) {
    console.error('Error creating season details:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// UPDATE SEASON
router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    const season = await prisma.season.update({
      where: { id },
      data: req.body,
    });
    res.json(season);
  } catch (error) {
    console.error('Error updating season details:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// DELETE SEASON
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    await prisma.season.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting season details:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
