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

// GET SINGLE FAQ BY ID OR SLUG
router.get('/:idOrSlug', async (req: Request, res: Response) => {
  const idOrSlug = req.params['idOrSlug'] as string;
  try {
    const faq = await prisma.faq.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug }
        ]
      },
    });
    if (!faq) {
      res.status(404).json({ message: 'FAQ not found' });
      return;
    }
    res.json(faq);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// CREATE FAQ
router.post('/', async (req: Request, res: Response) => {
  try {
    const faq = await prisma.faq.create({
      data: req.body,
    });
    res.status(201).json(faq);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// UPDATE FAQ
router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    const faq = await prisma.faq.update({
      where: { id },
      data: req.body,
    });
    res.json(faq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

// DELETE FAQ
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  try {
    await prisma.faq.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ message: 'Internal server error', details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
