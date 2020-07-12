import { createMuiTheme } from "@material-ui/core/styles";

// Picked colors from:
// https://material.io/resources/color/#!/?view.left=0&view.right=0&secondary.color=455A64&primary.color=006064

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#006064",
      light: "#428e92",
      dark: "#00363a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#455a64",
      light: "#718792",
      dark: "#1c313a",
      contrastText: "#fff",
    },
  },
});

export default theme;
