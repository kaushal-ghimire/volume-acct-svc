"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerVolumeUsage = exports.getCustomerVolumeUsages = void 0;
const customerVolumeUsage_1 = require("../models/customerVolumeUsage");
const getCustomerVolumeUsages = async (req, res) => {
    try {
        const usages = await (0, customerVolumeUsage_1.getAllUsage)();
        res.json(usages);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching customer volume usage' });
    }
};
exports.getCustomerVolumeUsages = getCustomerVolumeUsages;
const createCustomerVolumeUsage = async (req, res) => {
    try {
        const { user_name, remaining_volume } = req.body;
        if (!user_name || remaining_volume === undefined) {
            return res.status(400).json({ message: 'user_name and remaining_volume are required' });
        }
        const usage = await (0, customerVolumeUsage_1.createUsage)({ user_name, remaining_volume });
        res.status(201).json(usage);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating customer volume usage' });
    }
};
exports.createCustomerVolumeUsage = createCustomerVolumeUsage;
