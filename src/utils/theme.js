import { createMuiTheme } from "@material-ui/core/styles";

// Picked colors from:
// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=7986CB&secondary.color=546E7A

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#546e7a",
      light: "#819ca9",
      dark: "#29434e",
      contrastText: "#fff",
    },
    secondary: {
      main: "#7986cb",
      light: "#aab6fe",
      dark: "#49599a",
      contrastText: "#000",
    },
  },
});

export default theme;
