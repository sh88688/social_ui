import React from 'react';
import ReplyIcon from '@material-ui/icons/Reply';
//Material UI
import {withStyles, clsx, Avatar, TextField, Button, Typography, Divider, CardContent, Checkbox, Card, CardHeader, IconButton} from "../theme/muiComponents";
import { HistoryIcon, InfoIcon, AccountBoxIcon, AccountTreeIcon, AssignmentIcon, AccessTimeIcon, CheckBoxOutlineBlankIcon, CheckBoxIcon, ExpandMore} from '../theme/muiIcons';
import Rating from '@material-ui/lab/Rating';


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
      marginTop: "15px",
      fontSize: "small"
  },
  textField:{
      width:"100%"
  },
  assignBtn:{
    marginRight: "15px"
  },
  expand: {
    transform: 'rotate(0deg)',
    padding: "5px",
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    padding: "5px"
  },
  duration:{
    color: "grey",
    marginRight: "5px",
  },
  selectTemp:{
    width :"210px",
    margin: "10px 0px"
  },
  selectStatus:{
    width :"150px",
    margin: "10px 0px"
  },
  icnBtn:{
    padding: "5px"
  },
  selectInput:{
    padding : "2px 0px 2px 10px",
    fontSize: "13px",
    color: "grey"
  },
  flexContain:{
    display : "flex",
    marginBottom: "10px"
  },
  flexDirection:{
    display : "flex",
  },
  bodyText:{
    color: theme.palette.common.main
  },
  flexSpace5:{
    flexGrow: "0.05"
  },
  flexSpace10:{
    flexGrow: "0.1",
    marginLeft: "10px"
  },
  userComment:{
    marginBottom: "6px"
  },
  colorReply:{
    color: "#921aff"
  },
  divider:{
    margin : "15px  0px 5px  0px"
  },
  checkRoot:{
    padding: "0px 5px 0px 0px"
  }
});

class ReviewCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        replyState : false,
        replyText: "",
        template: ""
    };
  }
handleSend = () =>{
    this.setState({replyState : !this.state.replyState, replyText: ""});
}
handleToggle = () =>{
    this.setState({replyState : !this.state.replyState});
}
handleChange = (event) =>{
    this.setState({[event.target.name] : event.target.value});
}
render(){
  const {classes, author, starRating, userComment, colorDynamo, developerComment, lastModify} = this.props;
  const modified = new Date(lastModify * 1000).toLocaleString();
  const devBlock = (<div style={{background: "#efefef",padding: "5px"}}><Typography variant="body2" style={{color: "black"}}><span aria-label="img" role="img">⭐</span>Upwards-Quick Personal Loan For Salaried Employee :</Typography>
  <div style={{display: "flex"}}>
  <Typography variant="caption" style={{marginLeft : "19px"}}> 
  {developerComment}
  </Typography>
  <Typography variant="caption">
  {modified}
  </Typography>
  </div>
  </div>);

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
            <React.Fragment>
              <Typography variant="caption" className={classes.duration}>Time Duration : 18:09:02</Typography>
            <IconButton aria-label="settings" className={classes.icnBtn}>
              <HistoryIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="settings" className={classes.icnBtn}>
            <AssignmentIcon />
            </IconButton>
            <IconButton color="secondary"
              classes={{colorSecondary : classes.colorReply}}
             className={clsx(classes.expand, {
                        [classes.expandOpen]: this.state.replyState,
                      })} 
              
              onClick={this.handleToggle}
              aria-label="settings">
              {this.state.replyState ? <ExpandMore /> : <ReplyIcon /> }
            </IconButton>
            <Checkbox
            classes={{root: classes.checkRoot}}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            value="checkedI"
            />
            </React.Fragment>
          }
          title={author}
          subheader={
                  <div className={classes.flexDirection}>
                    <Rating className={classes.flexSpace5} name="read-only" value={starRating} size="small" readOnly />
                    <Typography style={{display: "flex"}} variant="caption">
                    <AccessTimeIcon color="secondary" style={{fontSize: "1rem", marginRight: "5px"}} /> {modified}
                    </Typography>
                  </div>}
        />
        <CardContent classes={{root: classes.contentroot}}>
          <Typography variant="body2" className={classes.userComment} noWrap>
            {userComment}
          </Typography>
          <Divider className={classes.divider} variant="middle" />
          <div className={classes.flexContain}>


          <Typography className={classes.bodyText} variant="body2">
            <AccountBoxIcon />
          </Typography>
          <Typography className={classes.flexSpace10} variant="body2">
            JAIPREET
          </Typography>
          <Typography className={classes.bodyText} variant="body2">
          <AccountTreeIcon />
          </Typography>
          <Typography className={classes.flexSpace10} variant="body2">
            CRM
          </Typography>
          <Typography className={classes.bodyText} variant="body2">
            <InfoIcon />
          </Typography>
          <Typography className={classes.flexSpace10} variant="body2">
            INPROGRESS
          </Typography>
          </div>
          {developerComment !== "" && devBlock}
           { this.state.replyState && <React.Fragment> 
            <div style={{display: "flex", justifyContent: "space-between"}}>
            <TextField
            select
            value={this.state.template}
            name="template"
            variant="outlined"
            className={classes.selectTemp}
            onChange={this.handleChange}
            SelectProps={{
            native: true,
            classes:{root: classes.selectInput}
            }}
            InputLabelProps={{
              shrink: true,
            }}
            color="secondary"
            helperText=""
            >
            <option key={1} value={""}>
            PRE-DEFINED TEMPLATES
            </option>
            <option key={2} value={"template"}>
              Template
            </option>
            </TextField>
            <TextField
            select
            value={this.state.template}
            name="template"
            variant="outlined"
            className={classes.selectStatus}
            onChange={this.handleChange}
            SelectProps={{
            native: true,
            classes:{root: classes.selectInput}
            }}
            InputLabelProps={{
              shrink: true,
            }}
            color="secondary"
            helperText=""
            >
            <option key={1} value={""}>
            INPROGRESS
            </option>
            <option key={2} value={"closed"}>
             CLOSED
            </option>
            </TextField>
            </div>
            <TextField
            id="outlined-textarea"
            placeholder="Write Your Reply..."
            multiline
            rows="2"
            name="replyText"
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
            size="small" 
            variant="contained"
            classes={{root: classes.button}}
            endIcon={<ReplyIcon />}
            onClick={this.handleSend}
            >
            Reply
            </Button>
            </React.Fragment>
            }
        </CardContent>
      </Card>
  );

}
  
}
export default withStyles(styles)(ReviewCard);