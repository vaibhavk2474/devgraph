import { useState } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { type GraphData, useGetFocusedGraphQuery, useLazyGetFocusedGraphQuery } from "../../features/graph/api/graphApi";

import GraphCanvas from "../../features/graph/components/GraphCanvas";
import NodeDetails from "../../features/graph/components/NodeDetails";

import styles from "./style.module.css";

function GraphPage() {
	const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
	const [exploredGraph, setExploredGraph] = useState<GraphData | null>(null);
	const [exploredNodeIds, setExploredNodeIds] = useState<Set<string>>(new Set());

	const { nodeId } = useParams<{ nodeId: string }>();

	const { data, isLoading, isError } = useGetFocusedGraphQuery(nodeId!, {
		skip: !nodeId,
	});

	const [triggerFocusedGraph] = useLazyGetFocusedGraphQuery();

	/**
	 * Initial graph comes from RTK Query.
	 * Once the user explores another node,
	 * exploredGraph contains the merged graph.
	 */
	const currentGraph = exploredGraph ?? data;

	const selectedNode = currentGraph?.nodes.find((node) => node.id === selectedNodeId);

	const handleExploreNode = async (nodeId: string) => {
		try {
			const newGraph = await triggerFocusedGraph(nodeId).unwrap();

			setExploredNodeIds((previous) => {
				const next = new Set(previous);
				next.add(nodeId);
				return next;
			});

			setExploredGraph((previousGraph) => {
				const baseGraph = previousGraph ?? data;

				if (!baseGraph) {
					return newGraph;
				}

				const nodeMap = new Map(baseGraph.nodes.map((node) => [node.id, node]));

				for (const node of newGraph.nodes) {
					nodeMap.set(node.id, node);
				}

				const relationshipMap = new Map(baseGraph.relationships.map((relationship) => [relationship.id, relationship]));

				for (const relationship of newGraph.relationships) {
					relationshipMap.set(relationship.id, relationship);
				}

				return {
					nodes: Array.from(nodeMap.values()),
					relationships: Array.from(relationshipMap.values()),
				};
			});
		} catch (error) {
			console.error("Failed to explore node:", error);
		}
	};

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<Typography variant="h6" sx={{ fontWeight: 700 }}>
					Developer Network Explorer
				</Typography>

				<Typography variant="body2" color="text.secondary">
					Graph Explorer
				</Typography>
			</header>

			<div className={styles.content}>
				<aside className={styles.sidebar}>
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						Filters
					</Typography>

					<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
						Node filters will be added later.
					</Typography>
				</aside>

				<main className={styles.canvas}>
					<GraphCanvas selectedNodeId={selectedNodeId} onNodeSelect={setSelectedNodeId} data={currentGraph} isLoading={isLoading} isError={isError} />
				</main>

				<aside className={styles.details}>
					<NodeDetails
						node={selectedNode}
						nodes={currentGraph?.nodes ?? []}
						relationships={currentGraph?.relationships ?? []}
						onClose={() => setSelectedNodeId(null)}
						onNodeSelect={setSelectedNodeId}
						onExploreNode={handleExploreNode}
						exploredNodeIds={exploredNodeIds}
					/>
				</aside>
			</div>
		</div>
	);
}

export default GraphPage;
