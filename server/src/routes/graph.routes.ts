import { Router } from "express";
import { getGraph } from "../services/graph.service.js";

const router = Router();

router.get("/", async (_req, res) => {
    try {
        const graph = await getGraph();

        res.json(graph);
    } catch (error) {
        console.error("Failed to fetch graph:", error);

        res.status(500).json({
            message: "Failed to fetch graph",
        });
    }
});

export default router;