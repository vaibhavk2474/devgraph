import "dotenv/config";
import { driver } from "./config/database.js";

try {
    await driver.verifyConnectivity();
    console.log("✅ CognoDB connected successfully");

    const result = await driver.executeQuery(`
        MATCH (d:Developer)
        RETURN d
    `);

    for (const record of result.records) {
        console.log(record.get("d").properties);
    }
} catch (error) {
    console.error("❌ CognoDB connection failed:", error);
}

