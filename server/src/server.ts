import "dotenv/config";
import { driver } from "./config/database.js";

try {
    await driver.verifyConnectivity();
    console.log("✅ CognoDB connected successfully");
} catch (error) {
    console.error("❌ CognoDB connection failed:", error);
}