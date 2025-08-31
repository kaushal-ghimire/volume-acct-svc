import { QueryTypes } from "sequelize";
import oracleSequelize from "../config/database/oracleSequelize";
import CustomerEbill from "../models/customerEbill";
import VolumeExhausted from "../models/volumeExhausted";

export const updateDurMinLeft = async (userName: string, newDurMinLeft: number) => {
    const t = await oracleSequelize.transaction();

    try {
        // 1. Fetch old value
        const customer = await CustomerEbill.findOne({
            where: { user_name: userName },
            transaction: t
        });

        if (!customer) {
            throw new Error(`User ${userName} not found`);
        }

        const oldDurMinLeft = customer.dur_min_left ?? 0;

        // 2. Update customer with new value
        customer.dur_min_left = newDurMinLeft;
        await customer.save({ transaction: t });

        // 3. Apply trigger-like logic
        if (oldDurMinLeft <= 0 && newDurMinLeft > 0) {
            // Delete from volume_exhausted
            await VolumeExhausted.destroy({
                where: { user_name: userName },
                transaction: t
            });
        } else if (oldDurMinLeft > 0 && newDurMinLeft <= 0) {

            const result = await oracleSequelize.query(
                "SELECT CUSTOMER_VOLUME_USAGE_SEQ.NEXTVAL as id FROM dual",
                { type: QueryTypes.SELECT }
            );

            const nextId = (result[0] as any).ID;

            // Insert into volume_exhausted
            await VolumeExhausted.create(
                {
                    id: nextId, // if Oracle sequence
                    user_name: userName,
                    insert_date: new Date()
                },
                { transaction: t }
            );
        }

        await t.commit();
        return { success: true, message: "dur_min_left updated successfully" };

    } catch (err) {
        await t.rollback();
        console.error("Error updating dur_min_left:", err);
        throw err;
    }
};