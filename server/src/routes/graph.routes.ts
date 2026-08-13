import { Router } from "express";
import { findGraphPath, getFocusedGraph, getGraph, searchGraph } from "../services/graph.service.js";

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

router.get("/search", async (req, res, next) => {
    try {
        const query =
            typeof req.query.q === "string"
                ? req.query.q.trim()
                : "";

        if (!query) {
            return res.status(400).json({
                message: "Search query is required",
            });
        }

        const results = await searchGraph(query);

        return res.json({
            results,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/path", async (req, res, next) => {
    try {
        const from =
            typeof req.query.from === "string"
                ? req.query.from.trim()
                : "";

        const to =
            typeof req.query.to === "string"
                ? req.query.to.trim()
                : "";

        if (!from || !to) {
            return res.status(400).json({
                message:
                    "Both from and to are required",
            });
        }

        if (from === to) {
            return res.status(400).json({
                message:
                    "Source and target must be different",
            });
        }

        const result = await findGraphPath(
            from,
            to,
        );

        return res.json(result);
    } catch (error) {
        next(error);
    }
});


router.get("/:nodeId", async (req, res, next) => {
    try {
        const { nodeId } = req.params;

        const graph = await getFocusedGraph(nodeId);

        return res.json(graph);
    } catch (error) {
        next(error);
    }
});


export default router;