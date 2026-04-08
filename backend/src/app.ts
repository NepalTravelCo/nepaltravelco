import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import destinationRoutes from './routes/destinations';
import experienceRoutes from './routes/experiences';
import trekRoutes from './routes/treks';
import regionRoutes from './routes/regions';
import searchRouter from './routes/search';
import activitiesRouter from './routes/activities';
import packagesRouter from './routes/packages';
import seasonsRouter from './routes/seasons';
import faqsRouter from './routes/faqs';
import contactsRouter from './routes/contacts';
import sectionsRouter from './routes/sections';

const app = express();
const normalizeOrigin = (value: string) => value.trim().replace(/\/$/, '');

const allowedOrigins = [
  ...(process.env.FRONTEND_URL || '').split(','),
  ...(process.env.CORS_ORIGIN || '').split(','),
]
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean);

const allowVercelPreviews =
  (process.env.ALLOW_VERCEL_PREVIEWS || 'false').toLowerCase() === 'true';

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server requests and health checks without an Origin header.
    if (!origin) {
      callback(null, true);
      return;
    }

    const normalizedOrigin = normalizeOrigin(origin);
    const isExplicitlyAllowed = allowedOrigins.includes(normalizedOrigin);
    let isVercelPreview = false;

    if (allowVercelPreviews) {
      try {
        isVercelPreview = /\.vercel\.app$/i.test(new URL(normalizedOrigin).hostname);
      } catch {
        isVercelPreview = false;
      }
    }

    if (isExplicitlyAllowed || isVercelPreview) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/treks', trekRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/search', searchRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/packages', packagesRouter);
app.use('/api/seasons', seasonsRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/sections', sectionsRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Nepal Travel Co Backend API is running' });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default app;
