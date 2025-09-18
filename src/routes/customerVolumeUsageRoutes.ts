import { Router, Request, Response, NextFunction } from "express";
import { getCustomerVolumeUsages, createCustomerVolumeUsage, updateDurMin, getPaginatedCustomerVolumeUsages } from "../controllers/customerVolumeUsageController";
import { body, query, validationResult, ValidationError } from "express-validator";
import customerVolumeUsage from "../models/customerVolumeUsage";

const router = Router();

/* for api/volume-usages?username=rohit_home */
router.get(
    "/volume-usages",
    [
        query("username")
            .notEmpty().withMessage("username is required")
            .isLength({ min: 1, max: 22 }).withMessage("username must be between 1–22 characters"),
        (req: Request, res: Response, next: NextFunction) => {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }

            const errors = validationResult(req).array({ onlyFirstError: true });
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    errors: errors.map(err => ({
                        field: (err as any).param ?? (err as any).path ?? "unknown",
                        message: err.msg
                    }))
                });
            }
            next();
        },
    ],

    getCustomerVolumeUsages
);

// router.post("/volume-usages", createCustomerVolumeUsage);
router.post(
    "/volume-usages",
    [
        // user_name validation
        body("user_name")
            .notEmpty().withMessage("user_name is required")
            .isLength({ min: 1, max: 22 }).withMessage("user_name must be between 1–22 characters")
            .custom(async (value) => {
                const existingUser = await customerVolumeUsage.findOne({
                    where: { user_name: value },
                });
                if (existingUser) throw new Error("user_name already exists");
                return true;
            }),

        // remaining_volume validation
        body("remaining_volume")
            .notEmpty().withMessage("remaining_volume is required")
            .isNumeric().withMessage("remaining_volume must be a number")
            .custom((value) => {
                if (value < 0) throw new Error("remaining_volume must be >= 0");
                return true;
            }),

        // validation error handler
        // (req: Request, res: Response, next: NextFunction) => {
        //     const errors = validationResult(req);
        //     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        //     next();
        // },
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req).array({ onlyFirstError: true }); // optional, to simplify

            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    errors: errors.map(err => ({
                        field: (err as any).param ?? (err as any).path ?? "unknown",
                        message: err.msg
                    }))
                });
            }
            next();
        }
    ],
    createCustomerVolumeUsage
);

router.patch("/volume-duration-remaining",
    query("username")
        .notEmpty().withMessage("username param is required")
        .isLength({ min: 2 }).withMessage("username must be at least 2 characters long"),

    body("newDurMinLeft")
        .notEmpty().withMessage("newDurMinLeft is required")
        .isNumeric().withMessage("newDurMinLeft must be a number"),

    // Check validation results
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).array({ onlyFirstError: true }); // optional, to simplify

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                errors: errors.map(err => ({
                    field: (err as any).param ?? (err as any).path ?? "unknown",
                    message: err.msg
                }))
            });
        }
        next();
    }
    , updateDurMin);

export default router;