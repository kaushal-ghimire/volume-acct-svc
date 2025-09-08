import { Router } from "express";
import { getCustomerVolumeUsages, createCustomerVolumeUsage, updateDurMin } from "../controllers/customerVolumeUsageController";

const router = Router();

/* using api/volume-usages/rohit_home */
// router.get("/volume-usages/:username", getCustomerVolumeUsages);

/* for api/volume-usages?username=rohit_home */
router.get("/volume-usages", getCustomerVolumeUsages);
router.post("/volume-usages", createCustomerVolumeUsage);
router.patch("/volume-duration-remaining", updateDurMin);

export default router;