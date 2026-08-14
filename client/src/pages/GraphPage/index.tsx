import { useEffect, useState } from "react";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { ArrowBack as ArrowBackIcon, AccountTreeOutlined as AccountTreeOutlinedIcon, InfoOutlined as InfoOutlinedIcon, Close as CloseIcon } from "@mui/icons-material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { type GraphData, useGetFocusedGraphQuery, useLazyGetFocusedGraphQuery, useLazyFindGraphPathQuery } from "../../features/graph/api/graphApi";
import GraphCanvas from "../../features/graph/components/GraphCanvas";
import NodeDetails from "../../features/graph/components/NodeDetails";

import {
	Page,
	Header,
	HeaderLeft,
	BackButton,
	HeaderTitle,
	HeaderSubtitle,
	HeaderActions,
	HeaderActionButton,
	Content,
	Sidebar,
	Canvas,
	Details,
	DrawerContent,
	DrawerCloseRow,
	DrawerCloseButton,
	HeaderRight,
} from "./style";
import ConnectionSummary from "./ConnectionSummary";

function GraphPage() {
	const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
	const [exploredGraph, setExploredGraph] = useState<GraphData | null>(null);
	const [exploredNodeIds, setExploredNodeIds] = useState<Set<string>>(new Set());
	const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
	const [connectionDrawerOpen, setConnectionDrawerOpen] = useState(false);

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const theme = useTheme();
	const isCompact = useMediaQuery(theme.breakpoints.down("lg"));

	const fromId = searchParams.get("from");
	const toId = searchParams.get("to");
	const isConnectionMode = Boolean(fromId && toId);

	const { nodeId } = useParams<{ nodeId: string }>();

	const { data, isLoading, isError } = useGetFocusedGraphQuery(nodeId!, {
		skip: !nodeId,
	});

	const [triggerFocusedGraph] = useLazyGetFocusedGraphQuery();
	const [findGraphPath, { data: connectionPath, isFetching: isConnectionLoading, isError: isConnectionError }] = useLazyFindGraphPathQuery();

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

	const handleNodeSelect = (nextNodeId: string | null) => {
		setSelectedNodeId(nextNodeId);

		if (isCompact) {
			setDetailsDrawerOpen(Boolean(nextNodeId));
		}
	};

	const handleDetailsClose = () => {
		setSelectedNodeId(null);
		setDetailsDrawerOpen(false);
	};

	const handleExploreNode = async (nextNodeId: string) => {
		try {
			const newGraph = await triggerFocusedGraph(nextNodeId).unwrap();

			setExploredNodeIds((previous) => {
				const next = new Set(previous);
				next.add(nextNodeId);
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
		<Page>
			<Header>
				<HeaderLeft>
					<BackButton variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
						Back
					</BackButton>
					<HeaderTitle as="h1">Developer Network Explorer</HeaderTitle>
				</HeaderLeft>

				<HeaderRight>
					<HeaderSubtitle as="span">{isConnectionMode ? "Connection Explorer" : "Graph Explorer"}</HeaderSubtitle>
					{isCompact && (
						<HeaderActions>
							{isConnectionMode && (
								<HeaderActionButton size="small" variant="outlined" startIcon={<AccountTreeOutlinedIcon />} onClick={() => setConnectionDrawerOpen(true)}>
									Connection found
								</HeaderActionButton>
							)}
							{selectedNode && (
								<HeaderActionButton size="small" variant="outlined" startIcon={<InfoOutlinedIcon />} onClick={() => setDetailsDrawerOpen(true)}>
									Details
								</HeaderActionButton>
							)}
						</HeaderActions>
					)}
				</HeaderRight>
			</Header>

			<Content connection={isConnectionMode} compact={isCompact}>
				{isConnectionMode && !isCompact && (
					<Sidebar>
						<ConnectionSummary connectionPath={connectionPath} layout="vertical" />
					</Sidebar>
				)}

				<Canvas>
					<GraphCanvas
						selectedNodeId={selectedNodeId}
						onNodeSelect={handleNodeSelect}
						data={currentGraph}
						connectionPath={connectionPath}
						isLoading={isLoading || isConnectionLoading}
						isError={isError || isConnectionError}
					/>
				</Canvas>

				{!isCompact && (
					<Details>
						<NodeDetails
							node={selectedNode}
							nodes={currentGraph?.nodes ?? []}
							relationships={currentGraph?.relationships ?? []}
							onClose={handleDetailsClose}
							onNodeSelect={handleNodeSelect}
							onExploreNode={handleExploreNode}
							exploredNodeIds={exploredNodeIds}
						/>
					</Details>
				)}
			</Content>

			{isCompact && (
				<>
					<Drawer anchor="right" open={detailsDrawerOpen} onClose={handleDetailsClose} slotProps={{ paper: { component: DrawerContent } }}>
						{/* <DrawerCloseRow>
							<DrawerCloseButton onClick={handleDetailsClose} aria-label="Close details">
								<CloseIcon />
							</DrawerCloseButton>
						</DrawerCloseRow> */}
						<NodeDetails
							node={selectedNode}
							nodes={currentGraph?.nodes ?? []}
							relationships={currentGraph?.relationships ?? []}
							onClose={handleDetailsClose}
							onNodeSelect={handleNodeSelect}
							onExploreNode={handleExploreNode}
							exploredNodeIds={exploredNodeIds}
						/>
					</Drawer>

					{isConnectionMode && (
						<Drawer anchor="left" open={connectionDrawerOpen} onClose={() => setConnectionDrawerOpen(false)} slotProps={{ paper: { component: DrawerContent } }}>
							<DrawerCloseRow>
								<DrawerCloseButton onClick={() => setConnectionDrawerOpen(false)} aria-label="Close connection summary">
									<CloseIcon />
								</DrawerCloseButton>
							</DrawerCloseRow>
							<ConnectionSummary connectionPath={connectionPath} layout="vertical" />
						</Drawer>
					)}
				</>
			)}
		</Page>
	);
}

export default GraphPage;
