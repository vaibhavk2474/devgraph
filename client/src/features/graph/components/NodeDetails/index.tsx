import { Typography } from "@mui/material";
import type { GraphNode, GraphRelationship } from "../../api/graphApi";
import { getRelationshipLabel } from "../../utils/relationshipLabel";
import { Empty, Container, Header, HeaderContent, HeaderTitle, CloseButton, ExploreButton, Content, Field, Relationships, RelationshipTitle, RelationshipGroup, RelationshipType, ConnectedNode, ConnectedNodeName, ConnectedNodeType } from "./style";

type NodeDetailsProps = { node: GraphNode | undefined; nodes: GraphNode[]; relationships: GraphRelationship[]; onClose: () => void; onNodeSelect: (nodeId: string) => void; onExploreNode: (nodeId: string) => void; exploredNodeIds: Set<string> };

function NodeDetails({ node, nodes, relationships, onClose, onNodeSelect, onExploreNode, exploredNodeIds }: NodeDetailsProps) {
	if (!node) return <Empty><Typography variant="body2" color="text.secondary">Select a node to view its details.</Typography></Empty>;

	const nodeRelationships = relationships.filter((relationship) => relationship.source === node.id || relationship.target === node.id);
	const groupedRelationships = nodeRelationships.reduce<Record<string, GraphNode[]>>((groups, relationship) => {
		const otherNodeId = relationship.source === node.id ? relationship.target : relationship.source;
		const otherNode = nodes.find((item) => item.id === otherNodeId);
		if (!otherNode) return groups;
		if (!groups[relationship.type]) groups[relationship.type] = [];
		groups[relationship.type].push(otherNode);
		return groups;
	}, {});

	return (
		<Container>
			<Header>
				<HeaderContent>
					<HeaderTitle variant="h6">{node.name}</HeaderTitle>
					<Typography variant="body2" color="text.secondary">{node.type}</Typography>
				</HeaderContent>
				<CloseButton type="button" onClick={onClose} aria-label="Close details">×</CloseButton>
			</Header>

			<ExploreButton variant="outlined" fullWidth disabled={exploredNodeIds.has(node.id)} onClick={() => onExploreNode(node.id)}>
				{exploredNodeIds.has(node.id) ? "Connections explored" : "Explore connections"}
			</ExploreButton>

			<Content>
				{node.role && <Field><Typography variant="caption" color="text.secondary">Role</Typography><Typography variant="body2">{node.role}</Typography></Field>}
				{node.description && <Field><Typography variant="caption" color="text.secondary">Description</Typography><Typography variant="body2">{node.description}</Typography></Field>}

				<Relationships>
					<RelationshipTitle variant="subtitle2">Connections</RelationshipTitle>
					{Object.entries(groupedRelationships).map(([relationshipType, connectedNodes]) => (
						<RelationshipGroup key={relationshipType}>
							<RelationshipType variant="caption" color="text.secondary">{getRelationshipLabel(relationshipType)}</RelationshipType>
							{connectedNodes.map((connectedNode) => (
								<ConnectedNode key={connectedNode.id} role="button" tabIndex={0} onClick={() => onNodeSelect(connectedNode.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onNodeSelect(connectedNode.id); } }}>
									<ConnectedNodeName variant="body2">{connectedNode.name}</ConnectedNodeName>
									<ConnectedNodeType as="span" variant="caption" color="text.secondary">{connectedNode.type}</ConnectedNodeType>
								</ConnectedNode>
							))}
						</RelationshipGroup>
					))}
					{nodeRelationships.length === 0 && <Typography variant="body2" color="text.secondary">No connections found.</Typography>}
				</Relationships>
			</Content>
		</Container>
	);
}

export default NodeDetails;
