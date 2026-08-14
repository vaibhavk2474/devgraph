import { styled } from "@mui/material/styles";
import { Box, Card, CardContent, Typography } from "@mui/material";

export const Page = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(3, 2),
  boxSizing: "border-box",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 3),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(5, 4),
  },
}));

export const Container = styled(Box)(() => ({
  width: "100%",
  maxWidth: 900,
  margin: "0 auto",
}));

export const DiscoveryCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: theme.spacing(3),
  overflow: "visible",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(4),
  },
}));

export const CardContentResponsive = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  "&:last-child": {
    paddingBottom: theme.spacing(2),
  },
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
    "&:last-child": {
      paddingBottom: theme.spacing(3),
    },
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
    "&:last-child": {
      paddingBottom: theme.spacing(4),
    },
  },
}));

export const FooterText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(0, 1),
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(0, 2),
  },
}));
