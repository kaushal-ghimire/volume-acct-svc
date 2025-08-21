"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const updateRemainingVolume_1 = require("./services/updateRemainingVolume");
const migrate_1 = require("./config/migrate");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const startServer = async () => {
    await (0, migrate_1.migrate)(); // run migrations first
    // Start the background volume reduction
    (0, updateRemainingVolume_1.updateRemainingVolume)(); // first immediate run
    // Then start the server
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};
startServer();
