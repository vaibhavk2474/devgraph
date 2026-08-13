import { useState } from "react";
import { Alert, Box, Button, Divider, Stack, Typography, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

import EntitySearch from "../EntitySearch";

import styles from "./style.module.css";
import { useLazyFindGraphPathQuery } from "../../../features/graph/api/graphApi";
import type { SelectedEntity } from "..";

function ConnectionMode() {
	const [fromEntity, setFromEntity] = useState<SelectedEntity | null>(null);

	const [toEntity, setToEntity] = useState<SelectedEntity | null>(null);

	const [findGraphPath, { data: pathResult, isFetching, isError, reset }] = useLazyFindGraphPathQuery();

	const navigate = useNavigate();

	const canFindConnection = Boolean(fromEntity) && Boolean(toEntity) && fromEntity?.id !== toEntity?.id;

	const handleFromSelect = (entity: SelectedEntity) => {
		setFromEntity(entity);
		reset();
	};

	const handleToSelect = (entity: SelectedEntity) => {
		setToEntity(entity);
		reset();
	};

	const handleFindConnection = async () => {
		if (!fromEntity || !toEntity) {
			return;
		}

		const result = await findGraphPath({
			from: fromEntity.id,
			to: toEntity.id,
		}).unwrap();

		if (!result.connected) {
			return;
		}

		navigate(`/graph?from=${encodeURIComponent(fromEntity.id)}&to=${encodeURIComponent(toEntity.id)}`);
	};

	return (
		<Box>
			<Typography variant="h5" className={styles.title}>
				Find a connection
			</Typography>

			<Typography variant="body2" color="text.secondary" className={styles.description}>
				Choose two entities and discover the shortest connection between them.
			</Typography>

			<Stack
				className={styles.fields}
				sx={{
					flexDirection: { xs: "column", md: "row" },
					gap: 2,
					alignItems: "stretch",
				}}
			>
				<Box className={styles.field}>
					<Typography variant="caption" color="text.secondary" className={styles.label}>
						First entity
					</Typography>

					{fromEntity ? <SelectedEntityCard entity={fromEntity} onClear={() => setFromEntity(null)} /> : <EntitySearch placeholder="Search first entity..." onSelect={handleFromSelect} />}
				</Box>

				<Box className={styles.arrow}>
					<ArrowForwardIcon />
				</Box>

				<Box className={styles.field}>
					<Typography variant="caption" color="text.secondary" className={styles.label}>
						Second entity
					</Typography>

					{toEntity ? <SelectedEntityCard entity={toEntity} onClear={() => setToEntity(null)} /> : <EntitySearch placeholder="Search second entity..." onSelect={handleToSelect} />}
				</Box>
			</Stack>

			<Divider sx={{ my: 3 }} />

			<Button
				fullWidth
				variant="contained"
				size="large"
				disabled={!canFindConnection || isFetching}
				endIcon={isFetching ? <CircularProgress size={18} color="inherit" /> : <ArrowForwardIcon />}
				onClick={handleFindConnection}
			>
				{isFetching ? "Finding connection..." : "Find connection"}
			</Button>

			{isError && (
				<Alert severity="error" sx={{ mt: 2 }}>
					Unable to find a connection. Please try again.
				</Alert>
			)}

			{pathResult && (
				<Box className={styles.result}>
					{pathResult.connected ? (
						<>
							<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
								Connection found
							</Typography>

							<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
								These entities are connected through {pathResult.relationships.length} relationship
								{pathResult.relationships.length !== 1 ? "s" : ""}.
							</Typography>

							<Stack spacing={1} sx={{ mt: 2 }}>
								{pathResult.nodes.map((node, index) => (
									<Box key={node.id} className={styles.pathNode}>
										<Box>
											<Typography
												sx={{
													fontWeight: 600,
												}}
											>
												{node.name}
											</Typography>

											<Typography variant="caption" color="text.secondary">
												{node.type}
											</Typography>
										</Box>

										{index < pathResult.nodes.length - 1 && <ArrowForwardIcon className={styles.pathArrow} />}
									</Box>
								))}
							</Stack>
						</>
					) : (
						<>
							<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
								No connection found
							</Typography>

							<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
								No path was found between these two entities within the current search depth.
							</Typography>
						</>
					)}
				</Box>
			)}
		</Box>
	);
}

type SelectedEntityCardProps = {
	entity: SelectedEntity;
	onClear: () => void;
};

function SelectedEntityCard({ entity, onClear }: SelectedEntityCardProps) {
	return (
		<Box className={styles.selectedEntity}>
			<Box>
				<Typography sx={{ fontWeight: 600 }}>{entity.name}</Typography>

				<Typography variant="body2" color="text.secondary">
					{entity.type}
				</Typography>
			</Box>

			<Button size="small" onClick={onClear}>
				Change
			</Button>
		</Box>
	);
}

export default ConnectionMode;
