import { createMuiTheme } from "@material-ui/core/styles";

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
