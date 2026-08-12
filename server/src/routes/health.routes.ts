import { Router } from "express";
import { driver } from "../config/database.js";
import { asyncHandler } from "../utils/asyncHandle.js";

const router = Router();

router.get("/", asyncHandler(async (_req, res) => {
    await driver.verifyConnectivity();
    res.status(200).json({
        status: "ok",
        database: "connected",
    });
}));

export default router;