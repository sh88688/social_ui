import React from 'react';
//Material UI
import {withStyles,Divider,Grid, Paper,InputBase,IconButton} from "../theme/muiComponents";
//Icons Material UI
import {SentimentVerySatisfiedIcon, EmojiEmotionsIcon} from "../theme/muiIcons";
import Picker from 'emoji-picker-react';
import fetchCall from './FetchCaller';
import DialogBuilder from './DialogBuilder';

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
    constructor(props){
      super(props);
      this.state ={
        loading: false,
        replyText : "",
        isPicker : false,
        dialogOpen : false,
        dialogTitle  : "",
        dialogContent : ""
      }
    }
    handlePicker = () =>{
        this.setState({isPicker : !this.state.isPicker});
    }
    onEmojiClick = (event, emojiObject) =>{
      this.setState({replyText : `${this.state.replyText} ${emojiObject.emoji}`})
    }
    handleText = (event) =>{
      this.setState({replyText : event.target.value});
    }
    handleClear = () =>{
      this.setState({replyText : ""});
    }
    handleKeyField = (event) =>{
      event.preventDefault();
      if(this.state.replyText !== ''){
        this.sendHandler(this.state.replyText);
      }
    }
    sendHandler = (message) => {
      this.setState({loading : true,replyText : ""});
      const { feedId , pageToken } = this.props;
      const fetchCallOptions = {
        method: 'POST',
      };
        const url = new URL(`https://graph.facebook.com/${feedId}/comments?access_token=${pageToken}&message=${message}`);
        fetchCall(url,fetchCallOptions,"json").then( res => {
          console.log(res);
          if(res.id){
              this.setState({loading : false,dialogContent: "Successfully post your reply!", dialogTitle: "Comment", dialogOpen: true});
          }
        },
        (error) => {
          //console.log(error);
        });
    }

  render(){
   const { classes, placeholder } = this.props;
    return (
      <Grid 
          container 
          direction="row"
          justify="center"
          spacing={0}
          className={classes.gridContainer}
        >
      <DialogBuilder isopen={this.state.dialogOpen} dialogTitle={this.state.dialogTitle} dialogContent={this.state.dialogContent} ok={() => this.setState({dialogOpen : false})} />
      <Grid item xs={12} style={{display : "flex"}}>
      {this.props.avatar}
      <form style={{width : "100%", marginLeft: "10px"}} onSubmit={(event) => this.handleKeyField(event)}>
      <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        disabled={this.state.loading}
        value={this.state.replyText}
        onChange={this.handleText}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton onClick={this.handlePicker} className={classes.iconButton} aria-label="search">
        {this.state.isPicker ? <EmojiEmotionsIcon color="secondary" size="small" /> : <SentimentVerySatisfiedIcon color="secondary" size="small" />}
      </IconButton>
    </Paper>
    </form>
    </Grid>
    <Grid item xs={12} ref={ node => this.emojiPicker = node }>
    {this.state.isPicker && <Picker  onEmojiClick={this.onEmojiClick}/>}
    </Grid>
    </Grid>
    );
  }

}

export default withStyles(styles)(CommentBox);