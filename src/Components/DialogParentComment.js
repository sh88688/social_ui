import React from "react";
//Material UI
import {withStyles,List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography,Button,Dialog,DialogActions,DialogContent} from "../theme/muiComponents";

const styles = theme => ({
  rootList: {
        display: "flex",
        padding: "unset"
      },
    inline:{
      marginBottom : "5px"
    },
    paper:{
      minWidth: "400px"
    }
});

const DialogBuilder = props => {
  const { classes } = props;
  const createdDate = (props.type === "comment") ? props.dialogContent.created_time * 1000 : props.dialogContent.created_time;
  return (
      <div>
      <Dialog
      open={props.isopen}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.paper }}
     >
      <DialogContent style={{padding : "unset"}}>
      <List className={classes.rootList}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {props.dialogContent.from && <Avatar alt="Remy Sharp" src={`https://graph.facebook.com/v5.0/${props.dialogContent.from.id}/picture?access_token=${props.pageToken}`} />}
        </ListItemAvatar>
        <ListItemText
          primary={<React.Fragment>
            {props.dialogContent.from ? props.dialogContent.from.name : ''}
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
             {` - ${props.dialogContent.message}`}
            </Typography>
          </React.Fragment>}
          secondary={`Created at ${new Date(createdDate).toLocaleString()}`}
        />
      </ListItem>
      </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.ok} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    </ div>
  );
};

export default withStyles(styles)(DialogBuilder);
