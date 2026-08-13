import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EntitySearch from "../EntitySearch";

import type { SelectedEntity } from "..";

import styles from "./style.module.css";

function ExploreMode() {
	const navigate = useNavigate();

	const handleSelect = (entity: SelectedEntity) => {
		navigate(`/graph/${entity.id}`);
	};

	return (
		<Box>
			<Typography variant="h5" className={styles.title}>
				Explore an entity
			</Typography>

			<Typography variant="body2" color="text.secondary" className={styles.description}>
				Search for a developer, project, company or technology to explore its network and discover connections one hop at a time.
			</Typography>

			<Box className={styles.search}>
				<EntitySearch placeholder="Search developers, projects, companies, technologies..." onSelect={handleSelect} />
			</Box>
		</Box>
	);
}

export default ExploreMode;
