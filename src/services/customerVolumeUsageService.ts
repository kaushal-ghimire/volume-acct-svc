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

export const getAllUsage = async (username?: string) => {
    const where: any = {};

    if (username) {
        where.user_name = username;
    }

    const usages = await customerVolumeUsage.findAll({
        where,
        order: [["id", "DESC"]],
    });

    return usages.map((usage) => usage.toJSON());
};

export const getAllUsageOrder = async (orderBy?: string, order?: "asc" | "desc") => {
    const where: any = {};

    const usages = await customerVolumeUsage.findAll({
        where,
        order: orderBy ? [[orderBy, order?.toUpperCase() || "ASC"]] : [["id", "DESC"]],
    });

    return usages.map((usage) => usage.toJSON());
};