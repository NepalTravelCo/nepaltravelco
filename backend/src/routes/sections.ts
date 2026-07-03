import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/sections - Fetch multiple sections with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, tag, isFeatured, slug } = req.query;

    const sections = await prisma.infoSection.findMany({
      where: {
        ...(category && { category: String(category) }),
        ...(tag && { tag: String(tag) }),
        ...(slug && { slug: String(slug) }),
        ...(isFeatured !== undefined && { isFeatured: isFeatured === 'true' }),
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json(sections);
  } catch (error) {
    console.error('Error fetching sections details:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// GET /api/sections/:slugOrId - Fetch a single section by slug or ID
router.get('/:slugOrId', async (req: Request, res: Response) => {
  try {
    const slugOrId = req.params['slugOrId'] as string;

    const section = await prisma.infoSection.findFirst({
      where: {
        OR: [
          { id: slugOrId },
          { slug: slugOrId }
        ]
      },
    });

    if (!section) {
      res.status(404).json({ error: 'Section not found' });
      return;
    }

    res.json(section);
  } catch (error) {
    console.error('Error fetching section details:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// CREATE SECTION
router.post('/', async (req: Request, res: Response) => {
  try {
    const section = await prisma.infoSection.create({
      data: req.body,
    });
    res.status(201).json(section);
  } catch (error) {
    console.error('Error creating section:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// UPDATE SECTION
router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    const section = await prisma.infoSection.update({
      where: { id },
      data: req.body,
    });
    res.json(section);
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// DELETE SECTION
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    await prisma.infoSection.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
