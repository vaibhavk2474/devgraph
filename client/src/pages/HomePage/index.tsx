import { useState } from "react";
import { Box, CircularProgress, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useSearchGraphQuery } from "../../features/graph/api/graphApi";
import { useNavigate } from "react-router-dom";

function HomePage() {
	const [query, setQuery] = useState("");

	const trimmedQuery = query.trim();
	const navigate = useNavigate();

	const { data, isLoading, isFetching } = useSearchGraphQuery(trimmedQuery, {
		skip: trimmedQuery.length < 2,
	});

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "flex-start",
				pt: 12,
				px: 3,
			}}
		>
			<Box sx={{ width: "100%", maxWidth: 700 }}>
				<Typography
					variant="h3"
					sx={{
						fontWeight: 700,
						textAlign: "center",
					}}
				>
					Developer Network Explorer
				</Typography>

				<Typography
					color="text.secondary"
					sx={{
						mt: 2,
						textAlign: "center",
					}}
				>
					Explore developers, projects, companies and technologies.
				</Typography>

				<TextField
					fullWidth
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder="Search developers, projects, companies, technologies..."
					sx={{ mt: 5 }}
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
					<Box sx={{ mt: 2 }}>
						{/* {!isLoading && !isFetching && (
							<Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
								<CircularProgress size={24} />
							</Box>
						)} */}

						{!isLoading && !isFetching && data?.results.length === 0 && <Typography color="text.secondary">No matching entities found.</Typography>}

						{data?.results.map((result) => (
							<Box
								key={result.id}
								onClick={() => navigate(`/graph/${result.id}`)}
								sx={{
									p: 2,
									border: "1px solid",
									borderColor: "divider",
									borderRadius: 2,
									mb: 1,
									cursor: "pointer",
									"&:hover": {
										backgroundColor: "action.hover",
									},
								}}
							>
								<Typography sx={{ fontWeight: 600 }}>{result.name}</Typography>

								<Typography variant="body2" color="text.secondary">
									{result.type}
								</Typography>
							</Box>
						))}
					</Box>
				)}
			</Box>
		</Box>
	);
}

export default HomePage;
