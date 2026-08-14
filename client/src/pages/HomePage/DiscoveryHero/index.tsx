import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import { Hero, Badge, BadgeText, Title, Description } from "./style";

function DiscoveryHero() {
	return (
		<Hero>
			<Badge>
				<HubOutlinedIcon fontSize="small" />
				<BadgeText variant="body2">Developer Network</BadgeText>
			</Badge>

			<Title variant="h2">
				Discover how your
				<br />
				engineering network connects.
			</Title>

			<Description color="text.secondary">
				Explore developers, projects, companies and technologies, or find the connection between any two entities.
			</Description>
		</Hero>
	);
}

export default DiscoveryHero;
