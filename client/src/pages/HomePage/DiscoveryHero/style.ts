import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const Hero = styled(Box)(() => ({
  maxWidth: 720,
  margin: "0 auto",
  textAlign: "center",
}));

export const Badge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(0.75, 1.5),
  marginBottom: theme.spacing(1),
  borderRadius: 999,
  backgroundColor: theme.palette.action.hover,
}));

export const BadgeText = styled(Typography)(() => ({
  fontWeight: 600,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "2rem",
  lineHeight: 1.15,
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.5rem",
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  maxWidth: 650,
  margin: `${theme.spacing(2)} auto 0`,
  padding: theme.spacing(0, 1),
  fontSize: "0.95rem",
  lineHeight: 1.6,
  [theme.breakpoints.up("sm")]: {
    padding: 0,
    fontSize: "1rem",
  },
}));
