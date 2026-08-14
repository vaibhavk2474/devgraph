import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const Title = styled(Typography)(() => ({
  fontWeight: 700,
}));

export const Description = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.75),
  lineHeight: 1.6,
}));

export const Search = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(3),
  },
}));
