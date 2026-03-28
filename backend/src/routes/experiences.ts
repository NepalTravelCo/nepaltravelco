import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET ALL EXPERIENCES
router.get('/', async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET SINGLE EXPERIENCE BY SLUG
router.get('/:slug', async (req: Request, res: Response) => {
  const slug = req.params['slug'] as string;
  try {
    const experience = await prisma.experience.findUnique({
      where: { slug },
    });
    if (!experience) {
      res.status(404).json({ message: 'Experience not found' });
      return;
    }
    res.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
