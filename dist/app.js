"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerVolumeUsageRoutes_1 = __importDefault(require("./routes/customerVolumeUsageRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('Volume Accounting Service is running!');
});
app.use('/api', customerVolumeUsageRoutes_1.default);
// Catch-all route for handling 404 errors
app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
exports.default = app;
