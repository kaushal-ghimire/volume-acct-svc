import { Request, Response } from "express";
import { getAllUsage, createUsage } from "../services/customerVolumeUsageService";
import { updateDurMinLeft } from "../services/updateDurationLeftService";


/* without filter */
// export const getCustomerVolumeUsages = async (req: Request, res: Response) => {
//     try {
//         const usages = await getAllUsage();
//         res.json(usages);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching customer volume usage' });
//     }
// };


/* using api/volume-usages/rohit_home */
// export const getCustomerVolumeUsages = async (req: Request, res: Response) => {
//     try {
//         const { username } = req.params;

//         const usages = await getAllUsage(username);

//         res.json(usages);
//     } catch (error: any) {
//         console.error("Error fetching customer volume usage:", error.message);
//         res.status(500).json({ message: 'Error fetching customer volume usage', error: error.message });
//     }
// };


/* using api/volume-usages?username=kaushal_home */
export const getCustomerVolumeUsages = async (req: Request, res: Response) => {
    try {
        const { username } = req.query;

        const usages = await getAllUsage(username as string | undefined);

        res.json(usages);
    } catch (error: any) {
        console.error("Error fetching customer volume usage:", error.message, error.stack);
        res.status(500).json({ message: 'Error fetching customer volume usage', error: error.message });
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