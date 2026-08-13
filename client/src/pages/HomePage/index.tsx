import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
	const navigate = useNavigate();

	return (
		<Container maxWidth="md">
			<Box
				sx={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
					gap: 2,
				}}
			>
				<Typography variant="h2" fontWeight={700}>
					Developer Network Explorer
				</Typography>

				<Typography variant="h6" color="text.secondary">
					Explore connections between developers, projects, companies, and technologies.
				</Typography>

				<Button variant="contained" size="large" onClick={() => navigate("/graph")}>
					Explore Graph
				</Button>
			</Box>
		</Container>
	);
}

export default HomePage;
