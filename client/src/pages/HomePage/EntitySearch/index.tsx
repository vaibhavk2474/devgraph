import { Box, CircularProgress, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

import type { SelectedEntity } from "..";
import { useSearchGraphQuery } from "../../../features/graph/api/graphApi";

type EntitySearchProps = {
	placeholder: string;
	onSelect: (entity: SelectedEntity) => void;
};

function EntitySearch({ placeholder, onSelect }: EntitySearchProps) {
	const [query, setQuery] = useState("");

	const trimmedQuery = query.trim();

	const { data, isLoading, isFetching } = useSearchGraphQuery(trimmedQuery, {
		skip: trimmedQuery.length < 2,
	});

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
						endAdornment:
							isLoading || isFetching ? (
								<InputAdornment position="end">
									<CircularProgress size={20} />
								</InputAdornment>
							) : null,
					},
				}}
			/>

			{trimmedQuery.length >= 2 && (
				<Box sx={{ mt: 1 }}>
					{!isLoading && !isFetching && data?.results.length === 0 && (
						<Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
							No matching entities found.
						</Typography>
					)}

					<Stack spacing={1}>
						{data?.results.map((result) => (
							<Box
								key={result.id}
								onClick={() => handleSelect(result)}
								sx={{
									p: 1.5,
									border: "1px solid",
									borderColor: "divider",
									borderRadius: 2,
									cursor: "pointer",
									transition: "background-color 0.15s ease, border-color 0.15s ease",
									"&:hover": {
										backgroundColor: "action.hover",
										borderColor: "primary.main",
									},
								}}
							>
								<Typography sx={{ fontWeight: 600 }}>{result.name}</Typography>

								<Typography variant="body2" color="text.secondary">
									{result.type}
								</Typography>
							</Box>
						))}
					</Stack>
				</Box>
			)}
		</Box>
	);
}

export default EntitySearch;
