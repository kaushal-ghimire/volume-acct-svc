"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsage = exports.createUsage = void 0;
const database_1 = __importDefault(require("../config/database"));
const createUsage = async ({ user_name, remaining_volume }) => {
    const query = `
    INSERT INTO customer_volume_usage (user_name, remaining_volume, created_at, updated_at)
    VALUES ($1, $2, NOW(), NOW())
    RETURNING *;
  `;
    const values = [user_name, remaining_volume];
    const result = await database_1.default.query(query, values);
    return result.rows[0];
};
exports.createUsage = createUsage;
const getAllUsage = async () => {
    const query = 'SELECT * FROM customer_volume_usage ORDER BY id DESC;';
    const result = await database_1.default.query(query);
    return result.rows;
};
exports.getAllUsage = getAllUsage;
