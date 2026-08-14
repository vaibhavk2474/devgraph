import { useState } from "react";
import { Box, Button, Typography, CircularProgress, Alert } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

import EntitySearch from "../EntitySearch";
import {
	Title,
	Description,
	Fields,
	Field,
	Label,
	Arrow,
	ResponsiveDivider,
	ErrorAlert,
	Result,
	ResultTitle,
	ResultDescription,
	Path,
	PathNode,
	PathNodeContent,
	PathNodeName,
	PathArrow,
	SelectedEntity,
	SelectedEntityContent,
	SelectedEntityName,
	ChangeButton,
} from "./style";
import { useLazyFindGraphPathQuery } from "../../../features/graph/api/graphApi";
import type { SelectedEntity as SelectedEntityType } from "..";

function ConnectionMode() {
	const [fromEntity, setFromEntity] = useState<SelectedEntityType | null>(null);
	const [toEntity, setToEntity] = useState<SelectedEntityType | null>(null);

	const [findGraphPath, { data: pathResult, isFetching, isError, reset }] = useLazyFindGraphPathQuery();
	const navigate = useNavigate();

	const canFindConnection = Boolean(fromEntity) && Boolean(toEntity) && fromEntity?.id !== toEntity?.id;

	const handleFromSelect = (entity: SelectedEntityType) => {
		setFromEntity(entity);
		reset();
	};

	const handleToSelect = (entity: SelectedEntityType) => {
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
			<Title variant="h5">Find a connection</Title>
			<Description variant="body2" color="text.secondary">
				Choose two entities and discover the shortest connection between them.
			</Description>

			<Fields>
				<Field>
					<Label variant="caption" color="text.secondary">First entity</Label>
					{fromEntity ? <SelectedEntityCard entity={fromEntity} onClear={() => setFromEntity(null)} /> : <EntitySearch placeholder="Search first entity..." onSelect={handleFromSelect} />}
				</Field>

				<Arrow><ArrowForwardIcon /></Arrow>

				<Field>
					<Label variant="caption" color="text.secondary">Second entity</Label>
					{toEntity ? <SelectedEntityCard entity={toEntity} onClear={() => setToEntity(null)} /> : <EntitySearch placeholder="Search second entity..." onSelect={handleToSelect} />}
				</Field>
			</Fields>

			<ResponsiveDivider />

			<Button fullWidth variant="contained" size="large" disabled={!canFindConnection || isFetching} endIcon={isFetching ? <CircularProgress size={18} color="inherit" /> : <ArrowForwardIcon />} onClick={handleFindConnection}>
				{isFetching ? "Finding connection..." : "Find connection"}
			</Button>

			{isError && <ErrorAlert><Alert severity="error">Unable to find a connection. Please try again.</Alert></ErrorAlert>}

			{pathResult && (
				<Result>
					{pathResult.connected ? (
						<>
							<ResultTitle variant="subtitle1">Connection found</ResultTitle>
							<ResultDescription variant="body2" color="text.secondary">
								These entities are connected through {pathResult.relationships.length} relationship{pathResult.relationships.length !== 1 ? "s" : ""}.
							</ResultDescription>
							<Path spacing={1}>
								{pathResult.nodes.map((node, index) => (
									<PathNode key={node.id}>
										<PathNodeContent>
											<PathNodeName>{node.name}</PathNodeName>
											<Typography variant="caption" color="text.secondary">{node.type}</Typography>
										</PathNodeContent>
										{index < pathResult.nodes.length - 1 && <PathArrow><ArrowForwardIcon /></PathArrow>}
									</PathNode>
								))}
							</Path>
						</>
					) : (
						<>
							<ResultTitle variant="subtitle1">No connection found</ResultTitle>
							<ResultDescription variant="body2" color="text.secondary">
								No path was found between these two entities within the current search depth.
							</ResultDescription>
						</>
					)}
				</Result>
			)}
		</Box>
	);

}

type SelectedEntityCardProps = {
	entity: SelectedEntityType;
	onClear: () => void;
};

function SelectedEntityCard({ entity, onClear }: SelectedEntityCardProps) {
	return (
		<SelectedEntity>
			<SelectedEntityContent>
				<SelectedEntityName>{entity.name}</SelectedEntityName>
				<Typography variant="body2" color="text.secondary">{entity.type}</Typography>
			</SelectedEntityContent>
			<ChangeButton size="small" onClick={onClear}>Change</ChangeButton>
		</SelectedEntity>
	);
}

export default ConnectionMode;
