import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET ALL DESTINATIONS
router.get('/', async (req: Request, res: Response) => {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET SINGLE DESTINATION BY SLUG
router.get('/:slug', async (req: Request, res: Response) => {
  const slug = req.params['slug'] as string;
  try {
    const destination = await prisma.destination.findUnique({
      where: { slug },
    });
    if (!destination) {
      res.status(404).json({ message: 'Destination not found' });
      return;
    }
    res.json(destination);
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
