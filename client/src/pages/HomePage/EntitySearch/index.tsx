import { Box, CircularProgress, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import type { SelectedEntity } from "..";
import { useSearchGraphQuery } from "../../../features/graph/api/graphApi";
import { Results, EmptyText, ResultItem, ResultName } from "./style";

type EntitySearchProps = {
	placeholder: string;
	onSelect: (entity: SelectedEntity) => void;
};

function EntitySearch({ placeholder, onSelect }: EntitySearchProps) {
	const [query, setQuery] = useState("");
	const trimmedQuery = query.trim();
	const { data, isLoading, isFetching } = useSearchGraphQuery(trimmedQuery, { skip: trimmedQuery.length < 2 });

	const handleSelect = (entity: SelectedEntity) => {
		onSelect(entity);
		setQuery("");
	};

	return (
		<Box>
			<TextField
				fullWidth
				value={query}
				onChange={(event) => setQuery(event.target.value)}
				placeholder={placeholder}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
						endAdornment: isLoading || isFetching ? (
							<InputAdornment position="end">
								<CircularProgress size={20} />
							</InputAdornment>
						) : null,
					},
				}}
			/>

			{trimmedQuery.length >= 2 && (
				<Results>
					{!isLoading && !isFetching && data?.results.length === 0 && (
						<EmptyText variant="body2" color="text.secondary">No matching entities found.</EmptyText>
					)}
					<Stack spacing={1}>
						{data?.results.map((result) => (
							<ResultItem key={result.id} onClick={() => handleSelect(result)}>
								<ResultName>{result.name}</ResultName>
								<Typography variant="body2" color="text.secondary">{result.type}</Typography>
							</ResultItem>
						))}
					</Stack>
				</Results>
			)}
		</Box>
	);
}

export default EntitySearch;
