import customerVolumeUsage from "../models/customerVolumeUsage";

export const createUsage = async ({
    user_name,
    remaining_volume,
}: {
    user_name: string;
    remaining_volume: number;
}) => {
    const newUsage = await customerVolumeUsage.create({
        user_name,
        remaining_volume,
        created_at: new Date(),
        updated_at: new Date(),
    });
    return newUsage.toJSON();
};

export const getAllUsage = async () => {
    const usages = await customerVolumeUsage.findAll({
        order: [["id", "DESC"]],
    });
    return usages.map((usage) => usage.toJSON());
};