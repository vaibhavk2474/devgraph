import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const Container = styled(Box)(() => ({ height: "100%" }));
export const Empty = styled(Box)(({ theme }) => ({ paddingTop: theme.spacing(1) }));
export const Header = styled(Box)(({ theme }) => ({ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: theme.spacing(1.5) }));
export const HeaderContent = styled(Box)(() => ({ minWidth: 0 }));
export const HeaderTitle = styled(Typography)(() => ({ fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis" }));
export const CloseButton = styled("button")(() => ({ width: 32, height: 32, minWidth: 32, padding: 0, border: 0, borderRadius: 6, backgroundColor: "transparent", color: "#64748b", fontSize: 24, lineHeight: 1, cursor: "pointer", "&:hover": { backgroundColor: "#f1f5f9", color: "#0f172a" } }));
export const ExploreButton = styled(Button)(({ theme }) => ({ marginTop: theme.spacing(3) }));
export const Content = styled(Box)(({ theme }) => ({ marginTop: theme.spacing(1.5), display: "flex", flexDirection: "column", gap: theme.spacing(2) }));
export const Field = styled(Box)(() => ({ display: "flex", flexDirection: "column", gap: 4 }));
export const Relationships = styled(Box)(({ theme }) => ({ marginTop: theme.spacing(1), display: "flex", flexDirection: "column", gap: theme.spacing(2) }));
export const RelationshipTitle = styled(Typography)(() => ({ fontWeight: 700 }));
export const RelationshipGroup = styled(Box)(({ theme }) => ({ display: "flex", flexDirection: "column", gap: theme.spacing(0.75) }));
export const RelationshipType = styled(Typography)(() => ({ fontWeight: 600 }));
export const ConnectedNode = styled(Box)(({ theme }) => ({ display: "flex", alignItems: "center", justifyContent: "space-between", gap: theme.spacing(1), padding: "8px 10px", border: `1px solid ${theme.palette.divider}`, borderRadius: 6, backgroundColor: "#f8fafc", cursor: "pointer", transition: "background-color 0.15s ease, border-color 0.15s ease", "&:hover": { backgroundColor: "#eff6ff", borderColor: "#93c5fd" } }));
export const ConnectedNodeName = styled(Typography)(() => ({ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }));
export const ConnectedNodeType = styled(Typography)(() => ({ flexShrink: 0 }));
