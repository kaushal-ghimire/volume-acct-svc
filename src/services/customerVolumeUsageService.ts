import customerVolumeUsage from "../models/customerVolumeUsage";
import { QueryTypes } from "sequelize";
import oracleSequelize from "../config/database/oracleSequelize";
import pgSequelize from "../config/database/pgSequelize";

export const createUsage = async ({
    user_name,
    remaining_volume,
}: {
    user_name: string;
    remaining_volume: number;
}) => {
    // Fetch next sequence value
    const result = await oracleSequelize.query(
        "SELECT CUSTOMER_VOLUME_USAGE_SEQ.NEXTVAL as id FROM dual",
        { type: QueryTypes.SELECT }
    );

    const nextId = (result[0] as any).ID;

    // Create a new usage with sequence ID
    const newUsage = await customerVolumeUsage.create({
        id: nextId,
        user_name,
        remaining_volume,
        created_at: new Date(),
        updated_at: new Date(),
    });

    return newUsage.toJSON();
};

export const getAllUsage = async (username?: string, orderBy?: string, order?: "asc" | "desc") => {
    const where: any = {};

    if (username) {
        where.user_name = username;
    }

    const usages = await customerVolumeUsage.findAll({
        where,
        order: orderBy ? [[orderBy, order?.toUpperCase() || "ASC"]] : [["id", "DESC"]],
    });

    return usages.map((usage) => usage.toJSON());
};


// export const getAllUsage = async (username?: string) => {
//     const where: any = {};

//     if (username) {
//         where.user_name = username;
//     }

//     const usages = await customerVolumeUsage.findAll({
//         where,
//         order: [["id", "DESC"]],
//     });

//     return usages.map((usage) => usage.toJSON());
// };

export const getCustomerVolumeUsagesPaginated = async (
    offset: number = 0,
    limit: number = 10,
    dialect: "oracle" | "postgres" = "oracle"
) => {
    let sql: string;
    let countSql: string;

    if (dialect === "oracle") {
        // Oracle pagination
        sql = `
      SELECT *
      FROM (
        SELECT cvu.*, ROWNUM AS rn
        FROM (
          SELECT *
          FROM CUSTOMER_VOLUME_USAGE
          ORDER BY id
        ) cvu
        WHERE ROWNUM <= :endRow
      )
      WHERE rn > :offset
    `;

        countSql = `SELECT COUNT(*) AS total FROM CUSTOMER_VOLUME_USAGE`;
    } else {
        // Postgres pagination
        sql = `
      SELECT *
      FROM CUSTOMER_VOLUME_USAGE
      ORDER BY id
      OFFSET :offset
      LIMIT :limit
    `;

        countSql = `SELECT COUNT(*) AS total FROM CUSTOMER_VOLUME_USAGE`;
    }

    const sequelize = dialect === "oracle" ? oracleSequelize : pgSequelize;

    // Main paginated query
    const data = await sequelize.query(sql, {
        type: QueryTypes.SELECT,
        replacements: {
            offset,
            limit,
            endRow: offset + limit, // Oracle needs this
        },
    });

    // Total count query
    const countResult = await sequelize.query(countSql, {
        type: QueryTypes.SELECT,
    });
    const total =
        dialect === "oracle"
            ? (countResult[0] as any).TOTAL
            : (countResult[0] as any).total;

    return {
        data,
        total,
    };
};