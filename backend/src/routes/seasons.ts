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
    console.error('Error fetching seasons:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET SINGLE SEASON BY SLUG
router.get('/:slug', async (req: Request, res: Response) => {
  const slug = req.params['slug'] as string;
  try {
    const season = await prisma.season.findUnique({
      where: { slug },
    });
    if (!season) {
      res.status(404).json({ message: 'Season not found' });
      return;
    }
    res.json(season);
  } catch (error) {
    console.error('Error fetching season:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
