import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import destinationRoutes from './routes/destinations';
import experienceRoutes from './routes/experiences';
import trekRoutes from './routes/treks';
import regionRoutes from './routes/regions';
import searchRouter from "./routes/search";
import activitiesRouter from "./routes/activities";
import packagesRouter from "./routes/packages";
import seasonsRouter from "./routes/seasons";
import faqsRouter from "./routes/faqs";
import contactsRouter from "./routes/contacts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/treks', trekRoutes);
app.use('/api/regions', regionRoutes);
app.use("/api/search", searchRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/packages", packagesRouter);
app.use("/api/seasons", seasonsRouter);
app.use("/api/faqs", faqsRouter);
app.use("/api/contacts", contactsRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Nepal Travel Co Backend API is running' });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
