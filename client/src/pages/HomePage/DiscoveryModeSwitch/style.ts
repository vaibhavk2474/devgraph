import { styled } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";

export const Switch = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(5),
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

export const ModeButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.2, 3),
  borderRadius: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
