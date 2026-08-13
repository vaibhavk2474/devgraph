import { useMemo } from "react";
import { ReactFlow, Background, Controls, MiniMap, MarkerType, Position, type Node, type Edge } from "@xyflow/react";

import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import "@xyflow/react/dist/style.css";

import dagre from "@dagrejs/dagre";
import GraphNode from "../GraphNode";

import type { GraphData } from "../../api/graphApi";

const NODE_WIDTH = 180;
const NODE_HEIGHT = 60;

function getLayoutedElements(
	nodes: Node[],
	edges: Edge[],
): {
	nodes: Node[];
	edges: Edge[];
} {
	const graph = new dagre.graphlib.Graph();

	graph.setDefaultEdgeLabel(() => ({}));

	graph.setGraph({
		rankdir: "LR",
		nodesep: 80,
		ranksep: 180,
		marginx: 40,
		marginy: 40,
	});

	nodes.forEach((node) => {
		graph.setNode(node.id, {
			width: NODE_WIDTH,
			height: NODE_HEIGHT,
		});
	});

	edges.forEach((edge) => {
		graph.setEdge(edge.source, edge.target);
	});

	dagre.layout(graph);

	const layoutedNodes = nodes.map((node) => {
		const position = graph.node(node.id);

		return {
			...node,

			position: {
				x: position.x - NODE_WIDTH / 2,
				y: position.y - NODE_HEIGHT / 2,
			},

			sourcePosition: Position.Right,
			targetPosition: Position.Left,
		};
	});

	return {
		nodes: layoutedNodes,
		edges,
	};
}

const nodeTypes = {
	graphNode: GraphNode,
};

type GraphCanvasProps = {
	data?: GraphData;
	isLoading: boolean;
	isError: boolean;
	selectedNodeId: string | null;
	onNodeSelect: (nodeId: string | null) => void;
};

function GraphCanvas({ selectedNodeId, onNodeSelect, data, isLoading, isError }: GraphCanvasProps) {
	const graph = useMemo(() => {
		if (!data) {
			return {
				nodes: [],
				edges: [],
			};
		}

		const nodes: Node[] = data.nodes.map((node) => ({
			id: node.id,
			type: "graphNode",
			data: {
				label: node.name,
				type: node.type,
			},
			position: {
				x: 0,
				y: 0,
			},
			sourcePosition: Position.Right,
			targetPosition: Position.Left,
			style: {
				opacity: selectedNodeId && selectedNodeId !== node.id ? 0.35 : 1,
			},
		}));

		const edges: Edge[] = data.relationships.map((relationship) => ({
			id: relationship.id,

			source: relationship.source,
			target: relationship.target,

			label: relationship.type,

			markerEnd: {
				type: MarkerType.ArrowClosed,
			},
		}));

		return getLayoutedElements(nodes, edges);
	}, [data, selectedNodeId]);

	if (isLoading) {
		return (
			<Box
				sx={{
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					gap: 1,
				}}
			>
				<CircularProgress size={28} />

				<Typography color="text.secondary">Loading graph...</Typography>
			</Box>
		);
	}

	if (isError) {
		return (
			<Box
				sx={{
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					p: 3,
				}}
			>
				<Alert severity="error">Unable to load graph data.</Alert>
			</Box>
		);
	}

	if (!data || data.nodes.length === 0) {
		return (
			<Box
				sx={{
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography color="text.secondary">No graph data available.</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<ReactFlow
				nodes={graph.nodes}
				edges={graph.edges}
				nodeTypes={nodeTypes}
				fitView
				fitViewOptions={{
					padding: 0.2,
				}}
				onNodeClick={(_, node) => {
					onNodeSelect(node.id);
				}}
				onPaneClick={() => {
					onNodeSelect(null);
				}}
			>
				<Background />
				<Controls />
				<MiniMap nodeStrokeWidth={3} pannable zoomable />
			</ReactFlow>
		</Box>
	);
}

export default GraphCanvas;
