"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = void 0;
const database_1 = __importDefault(require("./database"));
const migrate = async () => {
    try {
        const query = `
      CREATE TABLE IF NOT EXISTS public.customer_volume_usage (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        remaining_volume BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        await database_1.default.query(query);
        console.log('Table customer_volume_usage is ready.');
    }
    catch (err) {
        console.error('Migration failed:', err);
    }
};
exports.migrate = migrate;
