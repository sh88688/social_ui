import React from 'react';
//Material UI
import {withStyles,Divider,Paper,InputBase,IconButton} from "../theme/muiComponents";
//Icons Material UI
import { SendIcon, ClearIcon, SentimentVerySatisfiedIcon, EmojiEmotionsIcon} from "../theme/muiIcons";
const styles = theme => ({
  root: {
    padding: '1px 4px',
    display: 'flex',
    borderRadius: "25px",
    alignItems: 'center',
    border: "1px solid lightgrey",
    boxShadow: "unset"
    
  },
  datacount: {
    margin:"auto"
  },
  card :{
    marginTop: "5px",
    textAlign:"left",
  },
  collapse:{
    width: 'calc(100% - 588px)',
    position:"absolute",
    zIndex: "1",
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    margin: "0px 10px",
    padding: "unset"
  },
  divider: {
    height: 20,
    margin: 4,
  },
});



class CommentBox extends React.Component {

    handleChange = (event) =>{
        this.props.handler(event.target.value);
    }
    handleClear = () =>{
        this.props.handler("");
    }
    handleKeyField = (event) =>{
      event.preventDefault();
      this.props.sendHandler();
    }


  render(){
   const { classes } = this.props;
    return (
      <React.Fragment>
      <form style={{width : "100%", marginLeft: "10px"}} onSubmit={(event) => this.handleKeyField(event)}>
      <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={"Comment as Fitness Official: Shivam sharma"}
        value=""
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} aria-label="search">
        {this.props.isPicker ? <EmojiEmotionsIcon color="secondary" size="small" /> : <SentimentVerySatisfiedIcon color="secondary" size="small" />}
      </IconButton>
    </Paper>
    </form>
    </React.Fragment>
    );
  }

}

export default withStyles(styles)(CommentBox);