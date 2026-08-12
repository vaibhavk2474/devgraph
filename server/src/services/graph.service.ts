import { driver } from "../config/database.js";

export async function getGraph() {
    const result = await driver.executeQuery(`
    MATCH (source)-[relationship]->(target)
    RETURN source, relationship, target
  `);

    const nodes = new Map<string, object>();
    const relationships: object[] = [];

    for (const record of result.records) {
        const source = record.get("source");
        const relationship = record.get("relationship");
        const target = record.get("target");

        nodes.set(source.properties.id, {
            id: source.properties.id,
            type: source.labels[0],
            ...source.properties,
        });

        nodes.set(target.properties.id, {
            id: target.properties.id,
            type: target.labels[0],
            ...target.properties,
        });

        relationships.push({
            id: relationship.elementId,
            type: relationship.type,
            source: source.properties.id,
            target: target.properties.id,
        });
    }

    return {
        nodes: Array.from(nodes.values()),
        relationships,
    };
}