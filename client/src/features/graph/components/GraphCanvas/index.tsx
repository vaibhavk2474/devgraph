import { useMemo } from "react";
import { ReactFlow, Background, Controls, MarkerType, Position, type Node, type Edge } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import dagre from "@dagrejs/dagre";
import GraphNode from "../GraphNode";
import { Canvas, StateContainer, ErrorContainer, StateText, GraphError, LoadingSpinner } from "./style";

import type { GraphData, GraphPathResponse } from "../../api/graphApi";

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
	connectionPath?: GraphPathResponse;
	isLoading: boolean;
	isError: boolean;
	selectedNodeId: string | null;
	onNodeSelect: (nodeId: string | null) => void;
};

function GraphCanvas({ selectedNodeId, onNodeSelect, data, isLoading, isError, connectionPath }: GraphCanvasProps) {
	const connectionNodeIds = useMemo(() => new Set(connectionPath?.connected ? connectionPath.nodes.map((node) => node.id) : []), [connectionPath]);
	const connectionRelationshipIds = useMemo(() => new Set(connectionPath?.connected ? connectionPath.relationships.map((relationship) => relationship.id) : []), [connectionPath]);

	const graph = useMemo(() => {
		if (!data) {
			return {
				nodes: [],
				edges: [],
			};
		}

		const nodes: Node[] = data.nodes.map((node) => {
			// const isConnectionNode = connectionNodeIds.has(node.id);

			return {
				id: node.id,
				type: "graphNode",
				data: {
					label: node.name,
					type: node.type,
					isConnectionPath: connectionNodeIds.has(node.id),
				},
				position: {
					x: 0,
					y: 0,
				},
				sourcePosition: Position.Right,
				targetPosition: Position.Left,
				style: {
					opacity: selectedNodeId && selectedNodeId !== node.id ? 0.5 : 1,
				},
			};
		});

		const edges: Edge[] = data.relationships.map((relationship) => {
			const isConnectionRelationship = connectionRelationshipIds.has(relationship.id);
			return {
				id: relationship.id,
				source: relationship.source,
				target: relationship.target,
				label: relationship.type,
				markerEnd: {
					type: MarkerType.ArrowClosed,
					color: isConnectionRelationship ? "#22c55e" : undefined,
				},
				style: {
					stroke: isConnectionRelationship ? "#22c55e" : undefined,
					strokeWidth: isConnectionRelationship ? 2 : 1,
					strokeDasharray: isConnectionRelationship ? "0px, 4px" : undefined,
					strokeLinecap: isConnectionRelationship ? "round" : undefined,
				},
			};
		});

		return getLayoutedElements(nodes, edges);
	}, [data, connectionNodeIds, connectionRelationshipIds, selectedNodeId]);

	if (isLoading) {
		return (
			<StateContainer>
				<LoadingSpinner size={28} />
				<StateText color="text.secondary">{connectionPath ? "Finding connection..." : "Loading graph..."}</StateText>
			</StateContainer>
		);
	}

	if (isError) {
		return (
			<ErrorContainer>
				<GraphError severity="error">Unable to load graph data.</GraphError>
			</ErrorContainer>
		);
	}

	if (!data || data.nodes.length === 0) {
		return (
			<StateContainer>
				<StateText color="text.secondary">No graph data available.</StateText>
			</StateContainer>
		);
	}

	return (
		<Canvas>
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
			</ReactFlow>
		</Canvas>
	);
}

export default GraphCanvas;
