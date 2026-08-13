import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

import styles from "./style.module.css";

type GraphNodeData = {
	label: string;
	type: string;
	isConnectionPath?: boolean;
};

type GraphNodeType = Node<GraphNodeData>;

function GraphNode({ data }: NodeProps<GraphNodeType>) {
	const nodeType = data.type.toLowerCase();

	return (
		<div className={`${styles.node} ${styles[nodeType]} ${data.isConnectionPath ? styles.connectionPath : ""}`}>
			<Handle type="target" position={Position.Left} />

			<div className={styles.type}>{data.type}</div>

			<div className={styles.label}>{data.label}</div>

			<Handle type="source" position={Position.Right} />
		</div>
	);
}

export default GraphNode;
