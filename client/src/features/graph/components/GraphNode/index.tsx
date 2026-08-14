import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { DeveloperNode, ProjectNode, CompanyNode, TechnologyNode, ConnectionNode, Type, Label } from "./style";

type GraphNodeData = { label: string; type: string; isConnectionPath?: boolean };
type GraphNodeType = Node<GraphNodeData>;

function GraphNode({ data }: NodeProps<GraphNodeType>) {
	const nodeType = data.type.toLowerCase();
	const BaseNode = data.isConnectionPath ? ConnectionNode : nodeType === "developer" ? DeveloperNode : nodeType === "project" ? ProjectNode : nodeType === "company" ? CompanyNode : TechnologyNode;

	return (
		<BaseNode>
			<Handle type="target" position={Position.Left} />
			<Type className="graph-node-type">{data.type}</Type>
			<Label>{data.label}</Label>
			<Handle type="source" position={Position.Right} />
		</BaseNode>
	);
}

export default GraphNode;
