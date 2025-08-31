import customerVolumeUsage from "../models/customerVolumeUsage";
import { QueryTypes } from "sequelize";
import oracleSequelize from "../config/database/oracleSequelize";

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



/* for pg */
// export const createUsage = async ({
//     user_name,
//     remaining_volume,
// }: {
//     user_name: string;
//     remaining_volume: number;
// }) => {
//     const newUsage = await customerVolumeUsage.create({
//         user_name,
//         remaining_volume,
//         created_at: new Date(),
//         updated_at: new Date(),
//     });
//     return newUsage.toJSON();
// };

export const getAllUsage = async () => {
    const usages = await customerVolumeUsage.findAll({
        order: [["id", "DESC"]],
    });
    return usages.map((usage) => usage.toJSON());
};