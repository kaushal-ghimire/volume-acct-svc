import { Request, Response } from "express";
import { getAllUsage, createUsage } from "../services/customerVolumeUsageService";


export const getCustomerVolumeUsages = async (req: Request, res: Response) => {
    try {
        const usages = await getAllUsage();
        res.json(usages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching customer volume usage' });
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating customer volume usage' });
    }
};

// import { Request, Response } from "express";

// export const getCustomerVolumeUsages = (req: Request, res: Response) => {
//     res.json({ message: "GET customer volume usages" });
// };

// export const createCustomerVolumeUsage = (req: Request, res: Response) => {
//     res.json({ message: "POST create customer volume usage" });
// };