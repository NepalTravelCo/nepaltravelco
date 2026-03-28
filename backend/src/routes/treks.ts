import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET ALL TREKS
router.get('/', async (req: Request, res: Response) => {
  try {
    const treks = await prisma.trek.findMany({
      include: { region: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(treks);
  } catch (error) {
    console.error('Error fetching treks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET SINGLE TREK BY SLUG
router.get('/:slug', async (req: Request, res: Response) => {
  const slug = req.params['slug'] as string;
  try {
    const trek = await prisma.trek.findUnique({
      where: { slug },
      include: { region: true },
    });
    if (!trek) {
      res.status(404).json({ message: 'Trek not found' });
      return;
    }
    res.json(trek);
  } catch (error) {
    console.error('Error fetching trek:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
