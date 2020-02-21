import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({

  typography: {
    htmlFontSize: 18,
    fontFamily: '"Open Sans", sans-serif'
    // fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    // fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      light: "#45c2fb",
      main: "#fff",
      dark: "#e00135",
      button: "#f32958",
      contrastText: "#fff"
    },
    secondary: {
      light: "#85eefb",
      main: "#f32958",
      dark: "#e00135",
      contrastText: "#fff"
    },
    common: {
      light: "#85eefb",
      main: "#921aff",
      dark: "#2196f3",
      contrastText: "#fff"
    },
    background: {
      default: "#e9ebee"
    }
  },
  shape: {
    borderRadius: 2
  },
  overrides: {
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "none"
      }
    },
    MuiListItemIcon:{
      root:{
        minWidth:"32px",
        color:"#0000005e"
      }
    }

  }
});

export default theme;
