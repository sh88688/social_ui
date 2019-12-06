import React from "react";
//Material UI
import {withStyles,Button,DialogContentText,Dialog,DialogTitle,DialogActions,DialogContent} from "../theme/muiComponents";

const styles = theme => ({
    root: {
        display: "flex"
      },
});

const DialogBuilder = props => {
  const { classes } = props;

  return (
      <div>
      <Dialog
      open={props.isopen}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.paper }}
    >
      <DialogTitle id="alert-dialog-title">
          {props.dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <code>{props.dialogContent}</code>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.ok} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
    </ div>
  );
};

export default withStyles(styles)(DialogBuilder);
