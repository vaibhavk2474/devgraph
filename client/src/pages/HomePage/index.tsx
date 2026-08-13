import { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import DiscoveryHero from "./DiscoveryHero";
import DiscoveryModeSwitch from "./DiscoveryModeSwitch";
import ExploreMode from "./ExploreMode";
import ConnectionMode from "./ConnectionMode";

import styles from "./style.module.css";

export type DiscoveryMode = "explore" | "connection";

export type SelectedEntity = {
	id: string;
	name: string;
	type: string;
};

function HomePage() {
	const [mode, setMode] = useState<DiscoveryMode>("explore");

	return (
		<Box className={styles.page}>
			<Box className={styles.container}>
				<DiscoveryHero />

				<Card className={styles.discoveryCard}>
					<CardContent className={styles.cardContent}>{mode === "explore" ? <ExploreMode /> : <ConnectionMode />}</CardContent>
				</Card>

				<DiscoveryModeSwitch mode={mode} onChange={setMode} />

				<Typography variant="body2" color="text.secondary" className={styles.footerText} sx={{ mt: 2 }}>
					Explore the network one connection at a time, or directly investigate how two entities are related.
				</Typography>
			</Box>
		</Box>
	);
}

export default HomePage;
