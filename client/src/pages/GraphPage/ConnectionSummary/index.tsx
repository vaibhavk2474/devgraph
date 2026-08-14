import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { GraphPathResponse } from "../../../features/graph/api/graphApi";
import {
	Container,
	Header,
	VerticalHeader,
	Title,
	ChipStyled,
	VerticalChip,
	Path,
	VerticalPath,
	PathItem,
	VerticalPathItem,
	Node,
	VerticalNode,
	NodeName,
	Arrow,
	VerticalArrow,
	Hint,
} from "./style";
import { Typography } from "@mui/material";

type ConnectionSummaryProps = {
	connectionPath?: GraphPathResponse;
	layout?: "horizontal" | "vertical";
};

function ConnectionSummary({ connectionPath, layout = "horizontal" }: ConnectionSummaryProps) {
	if (!connectionPath?.connected || connectionPath.nodes.length === 0) return null;

	const { nodes, relationships } = connectionPath;
	const isVertical = layout === "vertical";
	const HeaderComponent = isVertical ? VerticalHeader : Header;
	const ChipComponent = isVertical ? VerticalChip : ChipStyled;
	const PathComponent = isVertical ? VerticalPath : Path;
	const PathItemComponent = isVertical ? VerticalPathItem : PathItem;
	const NodeComponent = isVertical ? VerticalNode : Node;
	const ArrowComponent = isVertical ? VerticalArrow : Arrow;

	return (
		<Container>
			<HeaderComponent>
				<div>
					<Title variant="subtitle1">Connection found</Title>
					<Typography variant="body2" color="text.secondary">
						{isVertical ? "Connection path" : "Shortest path between the selected entities"}
					</Typography>
				</div>
				<ChipComponent label={`${relationships.length} ${relationships.length === 1 ? "relationship" : "relationships"}`} size="small" />
			</HeaderComponent>

			<PathComponent>
				{nodes.map((node, index) => (
					<PathItemComponent key={node.id}>
						<NodeComponent>
							<NodeName variant="body2">{node.name}</NodeName>
							<Typography variant="caption" color="text.secondary">{node.type}</Typography>
						</NodeComponent>
						{index < nodes.length - 1 && <ArrowComponent><ArrowForwardIcon fontSize="small" /></ArrowComponent>}
					</PathItemComponent>
				))}
			</PathComponent>

			<Hint variant="caption" color="text.secondary">The green path shows how these entities are connected.</Hint>
		</Container>
	);
}

export default ConnectionSummary;
