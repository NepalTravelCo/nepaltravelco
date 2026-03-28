import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET ALL PACKAGES
router.get('/', async (req: Request, res: Response) => {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET SINGLE PACKAGE BY SLUG
router.get('/:slug', async (req: Request, res: Response) => {
  const slug = req.params['slug'] as string;
  try {
    const pkg = await prisma.package.findUnique({
      where: { slug },
    });
    if (!pkg) {
      res.status(404).json({ message: 'Package not found' });
      return;
    }
    res.json(pkg);
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
