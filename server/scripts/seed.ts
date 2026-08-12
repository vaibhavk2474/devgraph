
import "dotenv/config";
import { driver } from "../src/config/database.js";

const developers = [
    {
        id: "dev-1",
        name: "Vaibhav Kumar",
        role: "Frontend Engineer",
    },
    {
        id: "dev-2",
        name: "Rahul Sharma",
        role: "Backend Engineer",
    },
    {
        id: "dev-3",
        name: "Priya Singh",
        role: "Full Stack Engineer",
    },
];

async function seed() {
    try {
        for (const developer of developers) {
            await driver.executeQuery(
                `
        MERGE (d:Developer {id: $id})
        SET d.name = $name,
            d.role = $role
        `,
                developer
            );
        }

        console.log("✅ Developer seed completed");
    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exitCode = 1;
    } finally {
        await driver.close();
    }
}

seed();