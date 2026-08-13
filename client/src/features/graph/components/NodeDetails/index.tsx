import { Button, Typography } from "@mui/material";

import type { GraphNode, GraphRelationship } from "../../api/graphApi";
import { getRelationshipLabel } from "../../utils/relationshipLabel";
import styles from "./style.module.css";

type NodeDetailsProps = {
	node: GraphNode | undefined;
	nodes: GraphNode[];
	relationships: GraphRelationship[];
	onClose: () => void;
	onNodeSelect: (nodeId: string) => void;
	onExploreNode: (nodeId: string) => void;
	exploredNodeIds: Set<string>;
};
function NodeDetails({ node, nodes, relationships, onClose, onNodeSelect, onExploreNode, exploredNodeIds }: NodeDetailsProps) {
	if (!node) {
		return (
			<div className={styles.empty}>
				<Typography variant="body2" color="text.secondary">
					Select a node to view its details.
				</Typography>
			</div>
		);
	}

	const nodeRelationships = relationships.filter((relationship) => relationship.source === node.id || relationship.target === node.id);

	const groupedRelationships = nodeRelationships.reduce<Record<string, GraphNode[]>>((groups, relationship) => {
		const otherNodeId = relationship.source === node.id ? relationship.target : relationship.source;
		const otherNode = nodes.find((item) => item.id === otherNodeId);

		if (!otherNode) {
			return groups;
		}

		if (!groups[relationship.type]) {
			groups[relationship.type] = [];
		}

		groups[relationship.type].push(otherNode);

		return groups;
	}, {});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>
					<Typography variant="h6" sx={{ fontWeight: 700 }}>
						{node.name}
					</Typography>

					<Typography variant="body2" color="text.secondary">
						{node.type}
					</Typography>
				</div>

				<button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close details">
					×
				</button>
			</div>

			<Button variant="outlined" sx={{ mt: 3 }} fullWidth disabled={exploredNodeIds.has(node.id)} onClick={() => onExploreNode(node.id)}>
				{exploredNodeIds.has(node.id) ? "Connections explored" : "Explore connections"}
			</Button>

			<div className={styles.content}>
				{node.role && (
					<div className={styles.field}>
						<Typography variant="caption" color="text.secondary">
							Role
						</Typography>

						<Typography variant="body2">{node.role}</Typography>
					</div>
				)}

				{node.description && (
					<div className={styles.field}>
						<Typography variant="caption" color="text.secondary">
							Description
						</Typography>

						<Typography variant="body2">{node.description}</Typography>
					</div>
				)}

				<div className={styles.relationships}>
					<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
						Connections
					</Typography>

					{Object.entries(groupedRelationships).map(([relationshipType, connectedNodes]) => (
						<div key={relationshipType} className={styles.relationshipGroup}>
							<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
								{getRelationshipLabel(relationshipType)}
							</Typography>

							{connectedNodes.map((connectedNode) => (
								<div key={connectedNode.id} className={styles.connectedNode} role="button" tabIndex={0} onClick={() => onNodeSelect(connectedNode.id)}>
									{connectedNode.name}

									<Typography component="span" variant="caption" color="text.secondary">
										{connectedNode.type}
									</Typography>
								</div>
							))}
						</div>
					))}

					{nodeRelationships.length === 0 && (
						<Typography variant="body2" color="text.secondary">
							No connections found.
						</Typography>
					)}
				</div>
			</div>
		</div>
	);
}

export default NodeDetails;
