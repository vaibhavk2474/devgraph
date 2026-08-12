
import { driver } from "../config/database.js";

export async function getDevelopers() {
    const result = await driver.executeQuery(`
        MATCH (d:Developer)
        RETURN d
        ORDER BY d.name
    `);

    return result.records.map((record) => {
        const developer = record.get("d");
        return developer.properties;
    });
}