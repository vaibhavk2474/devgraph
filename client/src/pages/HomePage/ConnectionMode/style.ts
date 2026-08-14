import { styled } from "@mui/material/styles";
import { Box, Divider, Stack, Typography, Button } from "@mui/material";

export const Title = styled(Typography)(() => ({ fontWeight: 700 }));
export const Description = styled(Typography)(({ theme }) => ({ marginTop: theme.spacing(0.75), lineHeight: 1.6 }));
export const Fields = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  flexDirection: "column",
  gap: theme.spacing(2),
  alignItems: "stretch",
  [theme.breakpoints.up("md")]: { marginTop: theme.spacing(3), flexDirection: "row" },
}));
export const Field = styled(Box)(() => ({ flex: 1, width: "100%", minWidth: 0 }));
export const Label = styled(Typography)(({ theme }) => ({ display: "block", marginBottom: theme.spacing(0.75) }));
export const Arrow = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  flexShrink: 0,
  [theme.breakpoints.up("md")]: { display: "flex" },
}));
export const ResponsiveDivider = styled(Divider)(({ theme }) => ({ margin: theme.spacing(2, 0), [theme.breakpoints.up("sm")]: { margin: theme.spacing(3, 0) } }));
export const ErrorAlert = styled(Box)(({ theme }) => ({ marginTop: theme.spacing(2) }));
export const Result = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2.5),
  backgroundColor: theme.palette.action.hover,
  [theme.breakpoints.up("sm")]: { padding: theme.spacing(2.5) },
}));
export const ResultTitle = styled(Typography)(() => ({ fontWeight: 700 }));
export const ResultDescription = styled(Typography)(({ theme }) => ({ marginTop: theme.spacing(0.5) }));
export const Path = styled(Stack)(({ theme }) => ({ marginTop: theme.spacing(2) }));
export const PathNode = styled(Box)(({ theme }) => ({
  display: "flex", alignItems: "center", justifyContent: "space-between", gap: theme.spacing(1.5), padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`, borderRadius: theme.spacing(2), backgroundColor: theme.palette.background.paper, minWidth: 0,
}));
export const PathNodeContent = styled(Box)(() => ({ minWidth: 0 }));
export const PathNodeName = styled(Typography)(() => ({ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }));
export const PathArrow = styled(Box)(({ theme }) => ({ color: theme.palette.text.secondary, flexShrink: 0, display: "flex" }));
export const SelectedEntity = styled(Box)(({ theme }) => ({
  minHeight: 56, padding: theme.spacing(1), border: `1px solid ${theme.palette.divider}`, borderRadius: theme.spacing(2), display: "flex", alignItems: "center", justifyContent: "space-between", gap: theme.spacing(1.5), boxSizing: "border-box", backgroundColor: theme.palette.action.hover,
}));
export const SelectedEntityContent = styled(Box)(() => ({ minWidth: 0 }));
export const SelectedEntityName = styled(Typography)(() => ({ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }));
export const ChangeButton = styled(Button)(() => ({ flexShrink: 0 }));
