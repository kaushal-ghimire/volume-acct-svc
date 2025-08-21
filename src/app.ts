import express from "express";
import customerVolumeUsageRoutes from "./routes/customerVolumeUsageRoutes";

const app = express();

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Volume Accounting Service is running!');
});

// API routes
app.use('/api', customerVolumeUsageRoutes);

// Catch-all 404
app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;