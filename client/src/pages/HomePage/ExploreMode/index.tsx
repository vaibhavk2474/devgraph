import { useNavigate } from "react-router-dom";
import EntitySearch from "../EntitySearch";
import type { SelectedEntity } from "..";
import { Title, Description, Search } from "./style";

function ExploreMode() {
	const navigate = useNavigate();

	const handleSelect = (entity: SelectedEntity) => {
		navigate(`/graph/${entity.id}`);
	};

	return (
		<>
			<Title variant="h5">Explore an entity</Title>
			<Description variant="body2" color="text.secondary">
				Search for a developer, project, company or technology to explore its network and discover connections one hop at a time.
			</Description>
			<Search>
				<EntitySearch placeholder="Search developers, projects, companies, technologies..." onSelect={handleSelect} />
			</Search>
		</>
	);
}

export default ExploreMode;
