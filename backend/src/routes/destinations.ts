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

// GET SINGLE DESTINATION BY SLUG OR ID
router.get('/:idOrSlug', async (req: Request, res: Response) => {
  const idOrSlug = req.params['idOrSlug'] as string;
  try {
    const destination = await prisma.destination.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug }
        ]
      },
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

// CREATE DESTINATION
router.post('/', async (req: Request, res: Response) => {
  try {
    const destination = await prisma.destination.create({
      data: req.body,
    });
    res.status(201).json(destination);
  } catch (error) {
    console.error('Error creating destination:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// UPDATE DESTINATION
router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    const destination = await prisma.destination.update({
      where: { id },
      data: req.body,
    });
    res.json(destination);
  } catch (error) {
    console.error('Error updating destination:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// DELETE DESTINATION
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    await prisma.destination.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting destination:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
