import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ReplyIcon from '@material-ui/icons/Reply';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  card: {
    maxWidth: 900,
  },
  contentroot:{
    padding: "10px 8px 2px 24px",
    color: "grey",
  },
  cardheaderroot:{
    paddingBottom: "2px",
  },
  button:{
      marginTop: "15px"
  },
  textField:{
      width:"100%"
  },
  textFieldRoot:{
    fontSize: "small"
  }

});

class ReviewCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        replyState : false,
        replyText: ""
    };
  }
handleSend = () =>{
    this.setState({replyState : !this.state.replyState, replyText: ""});
}
handleToggle = () =>{
    this.setState({replyState : !this.state.replyState});
}
handleChange = (event) =>{
    this.setState({replyText : event.target.value});
}
render(){
  const {classes, author, starRating, userComment, colorDynamo, developerComment, lastModify} = this.props;
  const devBlock = (<React.Fragment><Divider style={{margin : "15px  0px 5px  0px"}} variant="middle" /><div style={{background: "#efefef",padding: "5px"}}><Typography variant="body2" style={{color: "black"}}>⭐Upwards-Quick Personal Loan For Salaried Employee :</Typography><Typography variant="caption" style={{marginLeft : "19px"}}> {developerComment}</Typography></div></React.Fragment>);
  const modified = new Date(lastModify * 1000).toLocaleString();

  return (
      <Card className={classes.card}>
        <CardHeader
          classes={{root: classes.cardheaderroot}}
          avatar={
            <Avatar aria-label="recipe" style={{backgroundColor : `${colorDynamo}`}}>
              {author.toString().charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton disabled={this.state.replyState} onClick={this.handleToggle} aria-label="settings">
              <ReplyIcon />
            </IconButton>
          }
          title={author}
          subheader={
          <Rating name="read-only" value={starRating} size="small" readOnly />}
        />
        <CardContent classes={{root: classes.contentroot}}>
          <Typography variant="body2" style={{marginBottom: "10px"}} noWrap>
            {userComment}
          </Typography>
          <Typography variant="caption">
            {modified}
            </Typography>
          {developerComment !== "" && devBlock}
           { this.state.replyState && <React.Fragment><TextField
            id="outlined-textarea"
            placeholder="Write Your Reply..."
            multiline
            rows="2"
            autoFocus={true}
            color="secondary"
            value={this.state.replyText}
            onChange={this.handleChange}
            rowsMax="3"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            />
            <Button
            color="secondary"
            size="medium" 
            className={classes.button}
            classes={{root: classes.textFieldRoot}}
            endIcon={<SendIcon />}
            onClick={this.handleSend}
            >
            Send
            </Button>
            </React.Fragment>
            }
        </CardContent>
      </Card>
  );

}
  
}
export default withStyles(styles)(ReviewCard);