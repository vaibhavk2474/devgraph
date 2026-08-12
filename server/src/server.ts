import "dotenv/config";
import express from "express";
import cors from "cors";

import developerRoutes from "./routes/developer.routes.js";
import graphRoutes from "./routes/graph.routes.js";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import env from "./config/env.js";
import { driver } from "./config/database.js";

const PORT = env.port || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/developers", developerRoutes);
app.use("/api/v1/graph", graphRoutes);
app.use("/api/v1/health", healthRoutes);

app.use(errorHandler);

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down...`);
    try {
        await driver.close();
        console.log("✅ CognoDB connection closed");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error while closing CognoDB:", error);
        process.exit(1);
    }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
// Catch unexpected code crashes
process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    shutdown("UncaughtException");
});

process.on("unhandledRejection", (reason) => {
    console.error("💥 Unhandled Rejection:", reason);
    shutdown("UnhandledRejection");
});

async function startServer() {
    try {
        await driver.verifyConnectivity();

        console.log("✅ CognoDB connected successfully");

        app.listen(env.port, () => {
            console.log(`🚀 Server running on http://localhost:${env.port}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to CognoDB:", error);

        await driver.close();

        process.exit(1);
    }
}

startServer();