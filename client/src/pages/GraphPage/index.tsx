import { Box, Typography } from "@mui/material";

import styles from "./style.module.css";
import GraphCanvas from "../../features/graph/components/GraphCanvas";

function GraphPage() {
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

					<Box sx={{ mt: 3 }}>
						<Typography variant="body2" sx={{ fontWeight: 600 }}>
							Node Types
						</Typography>

						<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
							Developer
						</Typography>

						<Typography variant="body2" color="text.secondary">
							Project
						</Typography>

						<Typography variant="body2" color="text.secondary">
							Company
						</Typography>

						<Typography variant="body2" color="text.secondary">
							Technology
						</Typography>
					</Box>
				</aside>

				<main className={styles.canvas}>
					<Box
						sx={{
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<GraphCanvas />
					</Box>
				</main>

				<aside className={styles.details}>
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						Node Details
					</Typography>

					<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
						Select a node to view its details.
					</Typography>
				</aside>
			</div>
		</div>
	);
}

export default GraphPage;
