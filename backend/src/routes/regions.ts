import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET ALL REGIONS
router.get('/', async (req: Request, res: Response) => {
  try {
    const regions = await prisma.region.findMany({
      include: { treks: true },
      orderBy: { name: 'asc' },
    });
    res.json(regions);
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET SINGLE REGION BY SLUG
router.get('/:slug', async (req: Request, res: Response) => {
  const slug = req.params['slug'] as string;
  try {
    const region = await prisma.region.findUnique({
      where: { slug },
      include: { treks: true },
    });
    if (!region) {
      res.status(404).json({ message: 'Region not found' });
      return;
    }
    res.json(region);
  } catch (error) {
    console.error('Error fetching region:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
