// import pool from "./database";

// export const migrate = async () => {
//   try {
//     const query = `
//       CREATE TABLE IF NOT EXISTS public.customer_volume_usage (
//         id SERIAL PRIMARY KEY,
//         user_name VARCHAR(255) NOT NULL,
//         remaining_volume BIGINT NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `;
//     await pool.query(query);
//     console.log('Table customer_volume_usage is ready.');
//   } catch (err) {
//     console.error('Migration failed:', err);
//   }
// };