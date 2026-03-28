import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// POST NEW CONTACT INQUIRY
router.post('/', async (req: Request, res: Response) => {
  const { 
    name, email, phone, nationality, 
    destination, duration, groupSize, 
    budget, accommodation, tripType, 
    subject, message 
  } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ message: 'Name, email, and message are required' });
    return;
  }

  try {
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name,
        email,
        phone,
        nationality,
        destination,
        duration,
        groupSize,
        budget,
        accommodation,
        tripType,
        subject,
        message,
      },
    });
    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET ALL INQUIRIES (Admin only - for future use)
router.get('/', async (req: Request, res: Response) => {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
