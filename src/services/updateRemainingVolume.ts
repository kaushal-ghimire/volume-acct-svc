import pgSequelize from "../config/database/pgSequelize";

export async function updateRemainingVolume() {
    const transaction = await pgSequelize.transaction();

    try {
        const [results] = await pgSequelize.query(
            `UPDATE customer_volume_usage cu
            SET remaining_volume = cu.remaining_volume - usage.total_bytes
            FROM (
                SELECT username, SUM(acctinputoctets + acctoutputoctets) AS total_bytes
                FROM radacct
                WHERE acctstoptime IS NOT NULL
                GROUP BY username
            ) usage
            WHERE cu.user_name = usage.username
            RETURNING cu.user_name, cu.remaining_volume;`,
            { transaction }
        );

        console.log("Updated remaining volumes:", results);

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        console.error("Error reducing remaining volume:", err);
    }
}