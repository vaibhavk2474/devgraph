import { styled } from "@mui/material/styles";
import { Box, Button, IconButton } from "@mui/material";

type ContentProps = {
	connection?: boolean;
	compact?: boolean;
};

export const Page = styled(Box)(({ theme }) => ({
	height: "100dvh",
	minHeight: "100vh",
	display: "flex",
	flexDirection: "column",
	overflow: "hidden",
	backgroundColor: theme.palette.background.default,
}));

export const Header = styled(Box)(({ theme }) => ({
	minHeight: 56,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: theme.spacing(1),
	padding: theme.spacing(1, 1.5),
	borderBottom: `1px solid ${theme.palette.divider}`,
	backgroundColor: theme.palette.background.paper,
	flexShrink: 0,
	[theme.breakpoints.up("sm")]: { minHeight: 64, padding: theme.spacing(1, 2) },
	[theme.breakpoints.up("md")]: { paddingLeft: theme.spacing(3), paddingRight: theme.spacing(3) },
}));

export const HeaderLeft = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(0.5),
	minWidth: 0,
	[theme.breakpoints.up("sm")]: { gap: theme.spacing(1.5) },
}));

export const HeaderRight = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(0.5),
	minWidth: 0,
	[theme.breakpoints.up("sm")]: { gap: theme.spacing(1.5) },
}));

export const BackButton = styled(Button)(({ theme }) => ({
	minWidth: 0,
	paddingLeft: theme.spacing(1),
	paddingRight: theme.spacing(1),
	[theme.breakpoints.up("sm")]: { minWidth: "auto", paddingLeft: theme.spacing(1.5), paddingRight: theme.spacing(1.5) },
}));

export const HeaderTitle = styled(Box)(({ theme }) => ({
	fontWeight: 700,
	whiteSpace: "nowrap",
	display: "none",
	fontSize: theme.typography.subtitle1.fontSize,
	[theme.breakpoints.up("sm")]: { display: "block" },
}));

export const HeaderSubtitle = styled(Box)(({ theme }) => ({
	whiteSpace: "nowrap",
	color: theme.palette.text.secondary,
	display: "none",
	[theme.breakpoints.up("sm")]: { display: "block" },
}));

export const HeaderActions = styled(Box)(({ theme }) => ({ display: "flex", alignItems: "center", gap: theme.spacing(0.75), flexShrink: 0 }));

export const HeaderActionButton = styled(Button)(({ theme }) => ({
	maxWidth: "42vw",
	minWidth: 0,
	[theme.breakpoints.up("sm")]: { maxWidth: "none" },
}));

export const Content = styled(Box, { shouldForwardProp: (prop) => prop !== "connection" && prop !== "compact" })<ContentProps>(({ theme, connection = false, compact = false }) => ({
	flex: 1,
	minHeight: 0,
	display: "grid",
	gridTemplateColumns: connection ? "250px minmax(0, 1fr) 300px" : "minmax(0, 1fr) 300px",
	...(compact ? { gridTemplateColumns: "minmax(0, 1fr)" } : {}),
	[theme.breakpoints.down("lg")]: { gridTemplateColumns: "minmax(0, 1fr)" },
}));

export const Sidebar = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2.5),
	borderRight: `1px solid ${theme.palette.divider}`,
	overflowY: "auto",
	backgroundColor: theme.palette.background.paper,
	minWidth: 0,
}));
export const Canvas = styled(Box)(() => ({ minWidth: 0, minHeight: 0, position: "relative", backgroundColor: "#f8fafc" }));
export const Details = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2.5),
	borderLeft: `1px solid ${theme.palette.divider}`,
	overflowY: "auto",
	backgroundColor: theme.palette.background.paper,
	minWidth: 0,
}));

export const DrawerContent = styled(Box)(() => ({ display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", padding: 16, overflowY: "auto" }));
export const DrawerCloseRow = styled(Box)(({ theme }) => ({ display: "flex", justifyContent: "flex-end", marginBottom: theme.spacing(1), flexShrink: 0 }));
export const DrawerCloseButton = styled(IconButton)(() => ({}));
