import { Router } from "express";
import { getCustomerVolumeUsages, createCustomerVolumeUsage } from "../controllers/customerVolumeUsageController";

const router = Router();

router.get("/get-customer-usage", getCustomerVolumeUsages);
router.post("/create-customer-usage", createCustomerVolumeUsage);

export default router;