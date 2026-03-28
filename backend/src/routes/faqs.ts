import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET ALL FAQS
router.get('/', async (req: Request, res: Response) => {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { createdAt: 'asc' },
    });
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching faqs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
