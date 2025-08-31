import { Router } from "express";
import { getCustomerVolumeUsages, createCustomerVolumeUsage, updateDurMin } from "../controllers/customerVolumeUsageController";

const router = Router();

router.get("/get-customer-usage", getCustomerVolumeUsages);
router.post("/create-customer-usage", createCustomerVolumeUsage);
router.put("/update-customer-rem-dur", updateDurMin);

export default router;