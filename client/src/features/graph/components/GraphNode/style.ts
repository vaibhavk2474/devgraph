import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Node = styled(Box)(() => ({
  width: 180, minHeight: 64, padding: "10px 14px", border: "1px solid", borderRadius: 10, backgroundColor: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", gap: 4, boxSizing: "border-box", overflow: "hidden",
}));

export const Type = styled(Box)(() => ({ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }));
export const Label = styled(Box)(() => ({ fontSize: 14, fontWeight: 600, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }));
export const DeveloperNode = styled(Node)(() => ({ borderColor: "#60a5fa", backgroundColor: "#eff6ff", "& .graph-node-type": { color: "#2563eb" } }));
export const ProjectNode = styled(Node)(() => ({ borderColor: "#a78bfa", backgroundColor: "#f5f3ff", "& .graph-node-type": { color: "#7c3aed" } }));
export const CompanyNode = styled(Node)(() => ({ borderColor: "#4ade80", backgroundColor: "#f0fdf4", "& .graph-node-type": { color: "#16a34a" } }));
export const TechnologyNode = styled(Node)(() => ({ borderColor: "#fb923c", backgroundColor: "#fff7ed", "& .graph-node-type": { color: "#ea580c" } }));
export const ConnectionNode = styled(Node)(() => ({ border: "2px dotted #22c55e", backgroundColor: "rgba(34, 197, 94, 0.06)" }));
