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
    console.error('Error fetching packages details:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// GET SINGLE PACKAGE BY ID OR SLUG
router.get('/:idOrSlug', async (req: Request, res: Response) => {
  const idOrSlug = req.params['idOrSlug'] as string;
  try {
    const pkg = await prisma.package.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug }
        ]
      },
    });
    if (!pkg) {
      res.status(404).json({ message: 'Package not found' });
      return;
    }
    res.json(pkg);
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// CREATE PACKAGE
router.post('/', async (req: Request, res: Response) => {
  try {
    const pkg = await prisma.package.create({
      data: req.body,
    });
    res.status(201).json(pkg);
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// UPDATE PACKAGE
router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    const pkg = await prisma.package.update({
      where: { id },
      data: req.body,
    });
    res.json(pkg);
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// DELETE PACKAGE
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    await prisma.package.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
