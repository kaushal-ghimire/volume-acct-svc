import express, { type Request, type Response } from "express";
import customerVolumeUsageRoutes from "./routes/customerVolumeUsageRoutes";
import rootRoutes from "./routes/rootRoutes";


const app = express();

// Middleware
app.use(express.json());

// Root route
app.use('/', rootRoutes);

// API routes
app.use('/api', customerVolumeUsageRoutes);

// Catch-all route for handling 404 errors
app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;