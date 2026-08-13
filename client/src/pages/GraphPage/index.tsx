import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import { type GraphData, useGetFocusedGraphQuery, useLazyGetFocusedGraphQuery, useLazyFindGraphPathQuery } from "../../features/graph/api/graphApi";

import GraphCanvas from "../../features/graph/components/GraphCanvas";
import NodeDetails from "../../features/graph/components/NodeDetails";

import styles from "./style.module.css";
import ConnectionSummary from "./ConnectionSummary";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

function GraphPage() {
	const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

	const [exploredGraph, setExploredGraph] = useState<GraphData | null>(null);

	const [exploredNodeIds, setExploredNodeIds] = useState<Set<string>>(new Set());

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const fromId = searchParams.get("from");
	const toId = searchParams.get("to");

	const isConnectionMode = Boolean(fromId && toId);

	const { nodeId } = useParams<{ nodeId: string }>();

	const { data, isLoading, isError } = useGetFocusedGraphQuery(nodeId!, {
		skip: !nodeId,
	});

	const [triggerFocusedGraph] = useLazyGetFocusedGraphQuery();

	const [findGraphPath, { data: connectionPath, isFetching: isConnectionLoading, isError: isConnectionError }] = useLazyFindGraphPathQuery();

	/*
	 * Normal graph:
	 *
	 * data -> exploredGraph -> currentGraph
	 *
	 * Connection graph:
	 *
	 * connectionPath -> currentGraph
	 */
	const currentGraph =
		exploredGraph ??
		data ??
		(connectionPath?.connected
			? {
					nodes: connectionPath.nodes,
					relationships: connectionPath.relationships,
				}
			: undefined);

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
				const baseGraph = previousGraph ?? currentGraph;

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

	useEffect(() => {
		if (!isConnectionMode || !fromId || !toId) {
			return;
		}

		findGraphPath({
			from: fromId,
			to: toId,
		});
	}, [fromId, toId, findGraphPath, isConnectionMode]);

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
						Back
					</Button>
					<Typography variant="h6" sx={{ fontWeight: 700 }}>
						Developer Network Explorer
					</Typography>
				</Box>

				<Typography variant="body2" color="text.secondary">
					{isConnectionMode ? "Connection Explorer" : "Graph Explorer"}
				</Typography>
			</header>

			<div className={styles.content + (isConnectionMode ? ` ${styles.connectionMode}` : "")}>
				{isConnectionMode && <aside className={styles.sidebar}>{isConnectionMode && <ConnectionSummary connectionPath={connectionPath} layout="vertical" />}</aside>}

				<main className={styles.canvas}>
					<GraphCanvas
						selectedNodeId={selectedNodeId}
						onNodeSelect={setSelectedNodeId}
						data={currentGraph}
						connectionPath={connectionPath}
						isLoading={isLoading || isConnectionLoading}
						isError={isError || isConnectionError}
					/>
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
