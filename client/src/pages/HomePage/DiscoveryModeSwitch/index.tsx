import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import type { DiscoveryMode } from "..";
import { Switch, ModeButton } from "./style";

type DiscoveryModeSwitchProps = {
	mode: DiscoveryMode;
	onChange: (mode: DiscoveryMode) => void;
};

function DiscoveryModeSwitch({ mode, onChange }: DiscoveryModeSwitchProps) {
	return (
		<Switch>
			<ModeButton variant={mode === "explore" ? "contained" : "outlined"} startIcon={<HubOutlinedIcon />} onClick={() => onChange("explore")}>
				Explore network
			</ModeButton>
			<ModeButton variant={mode === "connection" ? "contained" : "outlined"} startIcon={<CompareArrowsOutlinedIcon />} onClick={() => onChange("connection")}>
				Find connection
			</ModeButton>
		</Switch>
	);
}

export default DiscoveryModeSwitch;
