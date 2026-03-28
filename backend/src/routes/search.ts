import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query || query.length < 2) {
    res.json([]);
    return;
  }

  try {
    const [treks, experiences, destinations] = await Promise.all([
      prisma.trek.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: { name: true, slug: true },
        take: 5,
      }),
      prisma.experience.findMany({
        where: {

        },
        select: { name: true, slug: true },
        take: 5,
      }),
      prisma.destination.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: { name: true, slug: true },
        take: 5,
      }),
    ]);

    const results = [
      ...treks.map((t) => ({
        name: t.name,
        type: 'Trek',
        href: `/treks/${t.slug}`,
        icon: 'Mountain',
      })),
      ...experiences.map((e) => ({
        name: e.name,
        type: 'Experience',
        href: `/experiences/${e.slug}`,
        icon: 'Compass',
      })),
      ...destinations.map((d) => ({
        name: d.name,
        type: 'Destination',
        href: `/places-to-go/${d.slug}`,
        icon: 'MapPin',
      })),
    ];

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
