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
    console.error('Error fetching sections:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/sections/:slug - Fetch a single section by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const section = await prisma.infoSection.findUnique({
      where: { slug: String(slug) },
    });

    if (!section) {
      res.status(404).json({ error: 'Section not found' });
      return;
    }

    res.json(section);
  } catch (error) {
    console.error('Error fetching section by slug:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
