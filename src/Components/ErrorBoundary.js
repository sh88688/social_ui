import React from "react";
//Material UI
import {Typography, Grid, withStyles} from "../theme/muiComponents";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: "100px"
  },
  img: {
    width: "560px",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "300px"
  }
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
  }

  render() {
    const { classes } = this.props;

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="flex-end"
        >
          <Grid item style={{ textAlign: "center" }} xs={12}>
            <Typography variant="h5" gutterBottom>
              OOPS Something went wrong Please try again !
            </Typography>
          </Grid>
          <Grid item style={{ textAlign: "center" }} xs={12}>
            <img
              className={classes.img}
              src="https://react-material-kit.devias.io/images/undraw_server_down_s4lk.svg"
              alt=""
            />
          </Grid>
        </Grid>
      </div>
      );
    }

    return this.props.children;
  }
}
export default withStyles(styles)(ErrorBoundary);
