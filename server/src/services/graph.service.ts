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

export async function searchGraph(query: string) {
    const result = await driver.executeQuery(
        `
    MATCH (n)
    WHERE
      n.name IS NOT NULL
      AND toLower(n.name) CONTAINS toLower($query)

    RETURN n
    ORDER BY n.name
    LIMIT 20
    `,
        {
            query,
        },
    );

    return result.records.map((record) => {
        const node = record.get("n");

        return {
            id: node.properties.id,
            type: node.labels[0],
            ...node.properties,
        };
    });
}

export async function getFocusedGraph(nodeId: string) {
    const result = await driver.executeQuery(
        `
    MATCH (center {id: $nodeId})

    OPTIONAL MATCH (center)-[r]-(connected)

    RETURN
        center,
        r,
        connected,
        startNode(r) AS sourceNode,
        endNode(r) AS targetNode
    `,
        {
            nodeId,
        },
    );

    const nodes = new Map<string, Record<string, unknown>>();
    const relationships = new Map<
        string,
        Record<string, unknown>
    >();

    for (const record of result.records) {
        const center = record.get("center");
        const relationship = record.get("r");
        const connected = record.get("connected");

        const sourceNode = record.get("sourceNode");
        const targetNode = record.get("targetNode");

        if (center) {
            nodes.set(center.properties.id, {
                id: center.properties.id,
                type: center.labels[0],
                ...center.properties,
            });
        }

        if (connected) {
            nodes.set(connected.properties.id, {
                id: connected.properties.id,
                type: connected.labels[0],
                ...connected.properties,
            });
        }

        if (relationship && sourceNode && targetNode) {
            relationships.set(relationship.elementId, {
                id: relationship.elementId,
                type: relationship.type,
                source: sourceNode.properties.id,
                target: targetNode.properties.id,
            });
        }
    }
    return {
        nodes: Array.from(nodes.values()),
        relationships: Array.from(relationships.values()),
    };
}

export async function findGraphPath(
    fromId: string,
    toId: string,
) {
    const result = await driver.executeQuery(
        `
		MATCH (from {id: $fromId}), (to {id: $toId})

		OPTIONAL MATCH path =
			shortestPath((from)-[*..5]-(to))

		RETURN path
		`,
        {
            fromId,
            toId,
        },
    );

    const record = result.records[0];
    const path = record?.get("path");

    if (!path) {
        return {
            connected: false,
            nodes: [],
            relationships: [],
        };
    }

    const nodesMap = new Map<
        string,
        Record<string, unknown>
    >();

    const relationshipsMap = new Map<
        string,
        Record<string, unknown>
    >();

    for (const node of path.segments.flatMap((segment: any) => [
        segment.start,
        segment.end,
    ])) {
        nodesMap.set(node.properties.id, {
            id: node.properties.id,
            type: node.labels[0],
            ...node.properties,
        });
    }

    for (const segment of path.segments) {
        const relationship = segment.relationship;

        relationshipsMap.set(
            relationship.elementId,
            {
                id: relationship.elementId,
                type: relationship.type,
                source: segment.start.properties.id,
                target: segment.end.properties.id,
            },
        );
    }

    return {
        connected: true,
        nodes: Array.from(nodesMap.values()),
        relationships: Array.from(
            relationshipsMap.values(),
        ),
    };
}