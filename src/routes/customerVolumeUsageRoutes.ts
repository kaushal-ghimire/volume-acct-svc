import { Router } from "express";
import { getCustomerVolumeUsages, createCustomerVolumeUsage, updateDurMin } from "../controllers/customerVolumeUsageController";

const router = Router();

/* using api/volume-usages/rohit_home */
// router.get("/volume-usages/:username", getCustomerVolumeUsages);

/* for api/volume-usages?username=rohit_home */
router.get("/volume-usages", getCustomerVolumeUsages);

router.post("/volume-usages", createCustomerVolumeUsage);
router.put("/update-customer-rem-dur", updateDurMin);

export default router;