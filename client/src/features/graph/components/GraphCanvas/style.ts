import { styled } from "@mui/material/styles";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";

export const Canvas = styled(Box)(() => ({ width: "100%", height: "100%" }));
export const StateContainer = styled(Box)(({ theme }) => ({ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: theme.spacing(1), boxSizing: "border-box" }));
export const ErrorContainer = styled(StateContainer)(({ theme }) => ({ padding: theme.spacing(3) }));
export const LoadingSpinner = styled(CircularProgress)(() => ({}));
export const StateText = styled(Typography)(() => ({}));
export const GraphError = styled(Alert)(() => ({}));
