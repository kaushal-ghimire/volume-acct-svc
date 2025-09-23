import { Request, Response } from "express";
import { getAllUsage, createUsage, getAllUsageOrder } from "../services/customerVolumeUsageService";
import { updateDurMinLeft } from "../services/updateDurationLeftService";
import customerVolumeUsage from "../models/customerVolumeUsage";
import oracleSequelize from "../config/database/oracleSequelize";
import { QueryTypes } from "sequelize";


/* using api/volume-usages?username=kaushal_home API without orderBy validation */
export const getCustomerVolumeUsages = async (req: Request, res: Response) => {
    try {
        const { username } = req.query;

        const usages = await getAllUsage(
            username as string | undefined,
        );

        res.json(usages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/* http://localhost:3000/api/volume-usages-order?orderBy=id&order=desc -> orderBY & order validation API*/
export const VolumeUsagesInOrder = async (req: Request, res: Response) => {
    try {
        const { orderBy, order } = req.query;

        const usages = await getAllUsageOrder(
            orderBy as string | undefined,
            order as "asc" | "desc" | undefined
        );

        res.json(usages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
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
                error: "userName and newDurMinLeft are required"
            });
        }

        const result = await updateDurMinLeft(username, Number(newDurMinLeft));

        res.json(result);
    } catch (error: any) {
        console.error("Error in updateDurMin:", error.message);
        res.status(500).json({ error: error.message });
    }
};