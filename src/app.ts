import express from "express";
import customerVolumeUsageRoutes from "./routes/customerVolumeUsageRoutes";
import rootRoutes from "./routes/rootRoutes";


const app = express();

// Middleware
app.use(express.json());

// Root route
app.use('/', rootRoutes);

// API routes
app.use('/api', customerVolumeUsageRoutes);

// Catch-all 404
app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;