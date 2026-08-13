import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#2563EB",
        },

        secondary: {
            main: "#7C3AED",
        },

        background: {
            default: "#F8FAFC",
            paper: "#FFFFFF",
        },

        text: {
            primary: "#0F172A",
            secondary: "#64748B",
        },
    },

    typography: {
        fontFamily: [
            "Inter",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            "Arial",
            "sans-serif",
        ].join(","),

        h1: {
            fontWeight: 700,
        },

        h2: {
            fontWeight: 700,
        },

        h3: {
            fontWeight: 700,
        },

        h4: {
            fontWeight: 700,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 10,
    },

    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    border: "1px solid #E2E8F0",
                    boxShadow: "none",
                },
            },
        },
    },
});