import { Box, Chip, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import styles from "./style.module.css";
import type { GraphPathResponse } from "../../../features/graph/api/graphApi";

type ConnectionSummaryProps = {
	connectionPath?: GraphPathResponse;
	layout?: "horizontal" | "vertical";
};

function ConnectionSummary({ connectionPath, layout = "horizontal" }: ConnectionSummaryProps) {
	if (!connectionPath?.connected || connectionPath.nodes.length === 0) {
		return null;
	}

	const { nodes, relationships } = connectionPath;

	const isVertical = layout === "vertical";

	return (
		<Box className={`${styles.container} ${isVertical ? styles.vertical : styles.horizontal}`}>
			<Box className={styles.header}>
				<Box>
					<Typography variant="subtitle1" className={styles.title}>
						Connection found
					</Typography>

					<Typography variant="body2" color="text.secondary">
						{isVertical ? "Connection path" : "Shortest path between the selected entities"}
					</Typography>
				</Box>

				<Chip label={`${relationships.length} ${relationships.length === 1 ? "relationship" : "relationships"}`} size="small" className={styles.chip} />
			</Box>

			<Box className={styles.path}>
				{nodes.map((node, index) => (
					<Box key={node.id} className={styles.pathItem}>
						<Box className={styles.node}>
							<Typography variant="body2" className={styles.nodeName}>
								{node.name}
							</Typography>

							<Typography variant="caption" color="text.secondary">
								{node.type}
							</Typography>
						</Box>

						{index < nodes.length - 1 && (
							<Box className={styles.arrow}>
								<ArrowForwardIcon fontSize="small" />
							</Box>
						)}
					</Box>
				))}
			</Box>

			<Box className={styles.hint}>
				<Typography variant="caption" color="text.secondary" className={styles.hint}>
					The green path shows how these entities are connected.
				</Typography>
			</Box>
		</Box>
	);
}

export default ConnectionSummary;
