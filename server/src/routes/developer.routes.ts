
import { Router } from "express";
import { getDevelopers, getDeveloperById, getDeveloperProjects, getDeveloperTechnologies, getDeveloperCompanies, getConnectedDevelopers, getProjectConnections, getDeveloperNetwork, } from "../services/developer.service.js";

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

router.get("/:id/projects", async (req, res) => {
    try {
        const projects = await getDeveloperProjects(req.params.id);

        res.json(projects);
    } catch (error) {
        console.error("Failed to fetch developer projects:", error);

        res.status(500).json({
            message: "Failed to fetch developer projects",
        });
    }
});
router.get("/:id/technologies", async (req, res) => {
    try {
        const technologies = await getDeveloperTechnologies(req.params.id);

        res.json(technologies);
    } catch (error) {
        console.error("Failed to fetch developer technologies:", error);

        res.status(500).json({
            message: "Failed to fetch developer technologies",
        });
    }
});

router.get("/:id/companies", async (req, res) => {
    try {
        const companies = await getDeveloperCompanies(req.params.id);

        res.json(companies);
    } catch (error) {
        console.error("Failed to fetch developer companies:", error);

        res.status(500).json({
            message: "Failed to fetch developer companies",
        });
    }
});
router.get("/:id/connections", async (req, res) => {
    try {
        const developers = await getConnectedDevelopers(req.params.id);
        res.json(developers);
    } catch (error) {
        console.error("Failed to fetch connected developers:", error);
        res.status(500).json({
            message: "Failed to fetch connected developers",
        });
    }
});
router.get("/:id/project-connections", async (req, res) => {
    try {
        const developers = await getProjectConnections(req.params.id);

        res.json(developers);
    } catch (error) {
        console.error("Failed to fetch project connections:", error);

        res.status(500).json({
            message: "Failed to fetch project connections",
        });
    }
});
router.get("/:id/network", async (req, res) => {
    try {
        const network = await getDeveloperNetwork(req.params.id);

        res.json(network);
    } catch (error) {
        console.error("Failed to fetch developer network:", error);

        res.status(500).json({
            message: "Failed to fetch developer network",
        });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const developer = await getDeveloperById(req.params.id);

        if (!developer) {
            return res.status(404).json({
                message: "Developer not found",
            });
        }

        res.json(developer);
    } catch (error) {
        console.error("Failed to fetch developer:", error);

        res.status(500).json({
            message: "Failed to fetch developer",
        });
    }
});


export default router;