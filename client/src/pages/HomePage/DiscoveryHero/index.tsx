import { Box, Typography } from "@mui/material";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";

import styles from "./style.module.css";

function DiscoveryHero() {
	return (
		<Box className={styles.hero}>
			<Box className={styles.badge}>
				<HubOutlinedIcon fontSize="small" />

				<Typography variant="body2" sx={{ fontWeight: 600 }}>
					Developer Network
				</Typography>
			</Box>

			<Typography
				variant="h2"
				sx={{
					fontWeight: 800,
					fontSize: "2.5rem",
				}}
			>
				Discover how your
				<br />
				engineering network connects.
			</Typography>

			<Typography
				color="text.secondary"
				sx={{
					maxWidth: "650px",
					margin: "16px auto 0",
					fontSize: "1rem",
					lineHeight: 1.6,
					marginTop: "16px",
				}}
			>
				Explore developers, projects, companies and technologies, or find the connection between any two entities.
			</Typography>
		</Box>
	);
}

export default DiscoveryHero;
