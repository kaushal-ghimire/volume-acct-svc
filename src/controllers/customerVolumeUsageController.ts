import { Request, Response } from "express";
import { getAllUsage, createUsage, getCustomerVolumeUsagesPaginated } from "../services/customerVolumeUsageService";
import { updateDurMinLeft } from "../services/updateDurationLeftService";
import customerVolumeUsage from "../models/customerVolumeUsage";
import oracleSequelize from "../config/database/oracleSequelize";
import { QueryTypes } from "sequelize";


/* using api/volume-usages?username=kaushal_home and also with orderBy validation */
export const getCustomerVolumeUsages = async (req: Request, res: Response) => {
    try {
        const { username, orderBy, order } = req.query;

        const usages = await getAllUsage(
            username as string | undefined,
            orderBy as string | undefined,
            order as "asc" | "desc" | undefined
        );

        res.json(usages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/* all-volume-usage API without orderBy validation */
// export const getCustomerVolumeUsages = async (req: Request, res: Response) => {
//     try {
//         const { username } = req.query;

//         const usages = await getAllUsage(username as string | undefined);

//         res.json(usages);
//     } catch (error: any) {
//         console.error("Error fetching customer volume usage:", error.message, error.stack);
//         res.status(500).json({ message: 'Error fetching customer volume usage', error: error.message });
//     }
// };

export const getPaginatedCustomerVolumeUsages = async (req: Request, res: Response) => {
    try {
        const start = parseInt(req.query.start as string) || 0;
        const limit = parseInt(req.query.limit as string) || 10;

        // getCustomerVolumeUsagesPaginated returns { data, total }
        const { data, total } = await getCustomerVolumeUsagesPaginated(start, limit);

        res.status(200).json({
            success: true,
            data,
            start,
            limit,
            total, // ✅ correct total row count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};


export const createCustomerVolumeUsage = async (req: Request, res: Response) => {
    try {
        const { user_name, remaining_volume } = req.body;
        if (!user_name || remaining_volume === undefined) {
            return res.status(400).json({ message: 'user_name and remaining_volume are required' });
        }

        const usage = await createUsage({ user_name, remaining_volume });
        res.status(201).json(usage);
    } catch (error: any) {
        console.error("Error creating customer volume usage:", error);
        console.error("Stack trace:", error.stack);

        res.status(500).json({
            message: 'Error creating customer volume usage',
            error: error.message,
            stack: error.stack
        });
    }
};

export const updateDurMin = async (req: Request, res: Response) => {
    try {
        const username = req.query.username as string | undefined; // get from query string
        const { newDurMinLeft } = req.body;

        if (!username || newDurMinLeft === undefined) {
            return res.status(400).json({
                error: "username (query param) and newDurMinLeft (body) are required"
            });
        }

        const result = await updateDurMinLeft(username, Number(newDurMinLeft));

        res.json(result);
    } catch (error: any) {
        console.error("Error in updateDurMin:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// export const updateDurMin = async (req: Request, res: Response) => {
//     try {
//         const { userName, newDurMinLeft } = req.body;

//         if (!userName || newDurMinLeft === undefined) {
//             return res.status(400).json({ error: "userName and newDurMinLeft are required" });
//         }

//         const result = await updateDurMinLeft(userName, Number(newDurMinLeft));
//         res.json({ message: "Update successful", result });
//     } catch (error: any) {
//         console.error("Error in updateDurMin:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// };