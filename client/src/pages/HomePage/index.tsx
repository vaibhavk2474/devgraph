import { useState } from "react";
import DiscoveryHero from "./DiscoveryHero";
import DiscoveryModeSwitch from "./DiscoveryModeSwitch";
import ExploreMode from "./ExploreMode";
import ConnectionMode from "./ConnectionMode";
import { Page, Container, DiscoveryCard, CardContentResponsive, FooterText } from "./style";

export type DiscoveryMode = "explore" | "connection";

export type SelectedEntity = {
	id: string;
	name: string;
	type: string;
};

function HomePage() {
	const [mode, setMode] = useState<DiscoveryMode>("explore");

	return (
		<Page>
			<Container>
				<DiscoveryHero />

				<DiscoveryCard>
					<CardContentResponsive>
						{mode === "explore" ? <ExploreMode /> : <ConnectionMode />}
					</CardContentResponsive>
				</DiscoveryCard>

				<DiscoveryModeSwitch mode={mode} onChange={setMode} />

				<FooterText variant="body2" color="text.secondary">
					Explore the network one connection at a time, or directly investigate how two entities are related.
				</FooterText>
			</Container>
		</Page>
	);
}

export default HomePage;
