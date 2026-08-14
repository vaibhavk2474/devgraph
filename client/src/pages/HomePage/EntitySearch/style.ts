import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const Results = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const EmptyText = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

export const ResultItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  cursor: "pointer",
  transition: "background-color 0.15s ease, border-color 0.15s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
  },
}));

export const ResultName = styled(Typography)(() => ({
  fontWeight: 600,
}));
