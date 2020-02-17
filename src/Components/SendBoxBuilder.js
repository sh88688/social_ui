import React from 'react';
//Material UI
import {withStyles,Divider,Paper,InputBase,IconButton} from "../theme/muiComponents";
//Icons Material UI
import { SendIcon, ClearIcon, SentimentVerySatisfiedIcon, EmojiEmotionsIcon} from "../theme/muiIcons";
const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    border: "1px solid #fdabbe",
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
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
});



class SendBox extends React.Component {

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
      <form onSubmit={(event) => this.handleKeyField(event)}>
      <Paper className={classes.root}>
      <IconButton onClick={this.props.emojiToggle} className={classes.iconButton} aria-label="search">
        {this.props.isPicker ? <EmojiEmotionsIcon color="secondary" size="small" /> : <SentimentVerySatisfiedIcon color="secondary" size="small" />}
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={"Type a message..."}
        value={this.props.replyText}
        onChange={this.handleChange}
        inputProps={{ 'aria-label': `${this.props.placeholder}` }}
      />
      {this.props.replyText && <IconButton onClick={this.handleClear} className={classes.iconButton} aria-label="search">
        <ClearIcon size="small" />
      </IconButton>}
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="secondary"
        onClick={this.props.sendHandler}
        aria-label="expandclick">
        <SendIcon />
      </IconButton>
    </Paper>
    </form>
    </React.Fragment>
    );
  }

}

export default withStyles(styles)(SendBox);