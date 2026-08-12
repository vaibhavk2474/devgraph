
import { Router } from "express";
import { getDevelopers } from "../services/developer.service.js";

const router = Router();

router.get("/", async (_req, res) => {
    try {
        const developers = await getDevelopers();
        res.json(developers);
    } catch (error) {
        console.error("Failed to fetch developers:", error);

        res.status(500).json({
            message: "Failed to fetch developers",
        });
    }
});

export default router;