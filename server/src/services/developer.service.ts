
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

export async function getDeveloperById(id: string) {
    const result = await driver.executeQuery(
        `
        MATCH (d:Developer {id: $id})
        RETURN d
        `,
        { id }
    );

    if (result.records.length === 0) {
        return null;
    }

    return result.records[0]?.get("d")?.properties;
}

export async function getDeveloperProjects(id: string) {
    const result = await driver.executeQuery(
        `
        MATCH (d:Developer {id: $id})
            -[:WORKED_ON]->(p:Project)
        RETURN p
        ORDER BY p.name
    `,
        { id }
    );

    return result.records.map((record) => {
        return record.get("p").properties;
    });
}

export async function getDeveloperTechnologies(id: string) {
    const result = await driver.executeQuery(
        `
    MATCH (d:Developer {id: $id})
          -[:WORKED_ON]->(p:Project)
          -[:USES]->(t:Technology)
    RETURN DISTINCT t
    ORDER BY t.name
    `,
        { id }
    );

    return result.records.map((record) => {
        return record.get("t").properties;
    });
}

export async function getDeveloperCompanies(id: string) {
    const result = await driver.executeQuery(
        `
    MATCH (d:Developer {id: $id})
          -[:WORKED_AT]->(c:Company)
    RETURN c
    ORDER BY c.name
    `,
        { id }
    );

    return result.records.map((record) => {
        return record.get("c").properties;
    });
}

export async function getConnectedDevelopers(id: string) {
    const result = await driver.executeQuery(
        `
    MATCH (d:Developer {id: $id})
          -[:WORKED_AT]->(c:Company)
          <-[:WORKED_AT]-(other:Developer)
    WHERE other.id <> d.id
    RETURN DISTINCT other
    ORDER BY other.name
    `,
        { id }
    );

    return result.records.map((record) => {
        return record.get("other").properties;
    });
}

export async function getProjectConnections(id: string) {
    const result = await driver.executeQuery(
        `
    MATCH (d:Developer {id: $id})
          -[:WORKED_ON]->(p:Project)
          <-[:WORKED_ON]-(other:Developer)
    WHERE other.id <> d.id
    RETURN DISTINCT other
    ORDER BY other.name
    `,
        { id }
    );

    return result.records.map((record) => {
        return record.get("other").properties;
    });
}

// this only gives one hop.
export async function getDeveloperNetwork(id: string) {
    const result = await driver.executeQuery(
        `
    MATCH (d:Developer {id: $id})
    OPTIONAL MATCH (d)-[r1]-(connected)
    RETURN d, r1, connected
    `,
        { id }
    );

    const nodes = new Map<string, object>();
    const relationships = new Map<string, object>();

    for (const record of result.records) {
        const developer = record.get("d");
        const connected = record.get("connected");
        const relationship = record.get("r1");

        nodes.set(developer.properties.id, {
            id: developer.properties.id,
            type: developer.labels[0],
            ...developer.properties,
        });

        if (connected) {
            nodes.set(connected.properties.id, {
                id: connected.properties.id,
                type: connected.labels[0],
                ...connected.properties,
            });

            relationships.set(relationship.elementId, {
                id: relationship.elementId,
                type: relationship.type,
                source: relationship.startNodeElementId,
                target: relationship.endNodeElementId,
            });
        }
    }

    return {
        nodes: Array.from(nodes.values()),
        relationships: Array.from(relationships.values()),
    };
}