"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRemainingVolume = updateRemainingVolume;
const database_1 = __importDefault(require("../config/database"));
async function updateRemainingVolume() {
    const client = await database_1.default.connect();
    try {
        await client.query('BEGIN');
        // Subtract total used bytes per user from initial remaining volume
        const res = await client.query(`
            UPDATE customer_volume_usage cu
            SET remaining_volume = cu.remaining_volume - usage.total_bytes
            FROM (
                SELECT username, SUM(acctinputoctets + acctoutputoctets) AS total_bytes
                FROM radacct
                WHERE acctstoptime IS NOT NULL
                GROUP BY username
            ) usage
            WHERE cu.user_name = usage.username
            RETURNING cu.user_name, cu.remaining_volume;
        `);
        console.log('Updated remaining volumes:', res.rows);
        await client.query('COMMIT');
    }
    catch (err) {
        await client.query('ROLLBACK');
        console.error('Error reducing remaining volume:', err);
    }
    finally {
        client.release();
    }
}
// Run every 10 seconds
// setInterval(() => updateRemainingVolume(), 10000);
