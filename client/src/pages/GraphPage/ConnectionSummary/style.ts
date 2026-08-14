import { styled } from "@mui/material/styles";
import { Box, Chip, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2.5),
  backgroundColor: theme.palette.background.paper,
  boxSizing: "border-box",
  padding: theme.spacing(1.5),
  [theme.breakpoints.up("sm")]: { padding: theme.spacing(2.5) },
}));

export const Header = styled(Box)(() => ({ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }));
export const VerticalHeader = styled(Header)(() => ({ flexDirection: "column" }));
export const Title = styled(Typography)(() => ({ fontWeight: 700 }));
export const ChipStyled = styled(Chip)(() => ({
  borderColor: "#22c55e", color: "#15803d", backgroundColor: "rgba(34, 197, 94, 0.06)", flexShrink: 0,
}));
export const VerticalChip = styled(ChipStyled)(() => ({ alignSelf: "flex-start" }));
export const Path = styled(Box)(({ theme }) => ({ display: "flex", alignItems: "center", flexWrap: "wrap", gap: theme.spacing(1), marginTop: theme.spacing(2) }));
export const VerticalPath = styled(Path)(() => ({ flexDirection: "column", alignItems: "stretch", gap: 0 }));
export const PathItem = styled(Box)(({ theme }) => ({ display: "flex", alignItems: "center", gap: theme.spacing(1), minWidth: 0 }));
export const VerticalPathItem = styled(PathItem)(() => ({ flexDirection: "column", alignItems: "stretch", gap: 0 }));
export const Node = styled(Box)(({ theme }) => ({ padding: theme.spacing(1), border: "1px dotted #22c55e", borderRadius: theme.spacing(2), backgroundColor: "rgba(34, 197, 94, 0.06)", minWidth: 0, maxWidth: "100%" }));
export const VerticalNode = styled(Node)(() => ({ width: "100%", boxSizing: "border-box" }));
export const NodeName = styled(Typography)(() => ({ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }));
export const Arrow = styled(Box)(() => ({ display: "flex", alignItems: "center", justifyContent: "center", color: "#22c55e", flexShrink: 0 }));
export const VerticalArrow = styled(Arrow)(() => ({ height: 28, "& svg": { transform: "rotate(90deg)" } }));
export const Hint = styled(Typography)(({ theme }) => ({ display: "block", marginTop: theme.spacing(2) }));
