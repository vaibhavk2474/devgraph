import { Stack, Button } from "@mui/material";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import type { DiscoveryMode } from "..";

type DiscoveryModeSwitchProps = {
	mode: DiscoveryMode;
	onChange: (mode: DiscoveryMode) => void;
};

function DiscoveryModeSwitch({ mode, onChange }: DiscoveryModeSwitchProps) {
	return (
		<Stack
			className="home-mode-switch"
			sx={{
				mt: 5,
				flexDirection: { xs: "column", sm: "row" },
				justifyContent: "center",
				gap: 1,
			}}
		>
			<Button
				variant={mode === "explore" ? "contained" : "outlined"}
				startIcon={<HubOutlinedIcon />}
				onClick={() => onChange("explore")}
				sx={{
					px: 3,
					py: 1.2,
					borderRadius: 2,
				}}
			>
				Explore network
			</Button>

			<Button
				variant={mode === "connection" ? "contained" : "outlined"}
				startIcon={<CompareArrowsOutlinedIcon />}
				onClick={() => onChange("connection")}
				sx={{
					px: 3,
					py: 1.2,
					borderRadius: 2,
				}}
			>
				Find connection
			</Button>
		</Stack>
	);
}

export default DiscoveryModeSwitch;
