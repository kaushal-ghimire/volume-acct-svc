// import oracleSequelize from "../config/database/oracleSequelize";

// export async function updateRemainingVolume() {
//     const transaction = await oracleSequelize.transaction();
//     try {
//         const sql = `
//       UPDATE customer_volume_usage cu
//       SET cu.remaining_volume = cu.remaining_volume - (
//         SELECT SUM(r.acctinputoctets + r.acctoutputoctets)
//         FROM radacct r
//         WHERE r.username = cu.user_name
//           AND r.acctstoptime IS NOT NULL
//       )
//       WHERE EXISTS (
//         SELECT 1 FROM radacct r2
//         WHERE r2.username = cu.user_name
//           AND r2.acctstoptime IS NOT NULL
//       )
//     `;
//         const results = await oracleSequelize.query(sql, { transaction });

//         console.log("Rows affected:", results);
//         await transaction.commit();
//     } catch (err) {
//         await transaction.rollback();
//         console.error("Error reducing remaining volume:", err);
//     }
// }


// import oracleSequelize from "../config/database/oracleSequelize";
// import pgSequelize from "../config/database/pgSequelize";

// export async function updateRemainingVolume() {
//     const transaction = await oracleSequelize.transaction();

//     try {
//         const [results] = await oracleSequelize.query(
// `UPDATE customer_volume_usage cu
// SET remaining_volume = cu.remaining_volume - usage.total_bytes
// FROM (
//     SELECT username, SUM(acctinputoctets + acctoutputoctets) AS total_bytes
//     FROM radacct
//     WHERE acctstoptime IS NOT NULL
//     GROUP BY username
// ) usage
// WHERE cu.user_name = usage.username
// RETURNING cu.user_name, cu.remaining_volume;`,
//             { transaction }
//         );

//         console.log("Updated remaining volumes:", results);

//         await transaction.commit();
//     } catch (err) {
//         await transaction.rollback();
//         console.error("Error reducing remaining volume:", err);
//     }
// }