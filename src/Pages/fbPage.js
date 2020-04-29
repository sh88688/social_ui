import React from 'react';
//Material UI
import {  LinearProgress,Tooltip, IconButton,CardMedia, CardActions, withStyles, Typography, Grid, CircularProgress,Card, CardHeader, Avatar, CardContent} from "../theme/muiComponents";
import {HistoryIcon, MoreVertIcon, CommentIcon, ThumbUpAltIcon, ConfirmationNumberIcon} from '../theme/muiIcons';
import fetchCall from '../Components/FetchCaller';
import DropButton from '../Components/dropButton';
import CommentView from '../Components/CommentView';
import CommentBox from '../Components/CommentBoxBuilder';
import TicketDialog from '../Components/PostTicketDialog';
import TicketHistoryDialog from '../Components/TicketHistoryDialog';
import ReactionView from '../Components/ReactionView';
import Skeleton from '@material-ui/lab/Skeleton';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
    card: {
      maxWidth: 832,
      boxShadow : 'none',
      border : '1px solid lightgrey'
    },
    media: {
      height: 0,
      paddingTop: '40.25%', // 16:9
    },
    cardHead:{
     padding : "10px 16px"
    },
    postPaper:{
     maxWidth :  '800px',
     padding : '10px'
    },
    postCard : {
      boxShadow : 'none',
      marginBottom: '12px',
      maxWidth : '832px',
      borderRadius : "5px",
      border : '1px solid lightgrey'
    },
    postCardContent:{
      padding : "0px 16px"
    },
    postActions :{
      display: "block",
      padding: '2px 16px',
      borderTop: '1px solid lightgray'
    },
    cmntText:{
      padding: '4px 16px',
      fontSize: 'initial',
      margin : 'unset',
      fontFamily: 'sans-serif'
    },
    root: {
      width: '100%',
      padding: theme.spacing(1, 7, 7, 7),
    },
    rootLastChild : {
      paddingBottom : "24px !important"
    },
    rootProgress:{
      backgroundColor: '#5c5ca2',
      height: '2px'
    },
    moreIcn:{
      marginTop: "5px",
      transform: 'rotate(90deg)'
    },
    commentIcn:{ 
      padding: "5px"
    },
    reactionIcn:{
      padding: "5px",
      color: "#1976d2"
    },
    ticketIcn :{
      color: "#ffb200",
      padding: "5px",
      transform: 'rotate(135deg)'
    },
    actionPage:{
      minWidth: "117px"
    },
    fabProgress: {
      color: "#921aff",
      zIndex: 1,
      margin: "16.5px",
    },
    button :{
      backgroundColor : "#4267b2",
      '&:hover':{
        backgroundColor : "#1345ab",
      }
    },
    postImg:{
      maxWidth : "700px",
      maxHeight: "300px",
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing(2),
      marginBottom: "16px",
      padding: "8px",
      border: "1px solid lightgrey",
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(5),
      height: '100%',
      color: "lightgrey",
      position: 'absolute',
      paddingBottom: "10px",
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      width: '100%',
      color: '#a7a4a4',
      cursor: 'text',
      marginLeft : "42px"
    },
    rootGridList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      overflowX : "auto",
      overflowY : "hidden",
      marginBottom : "4px !important",
      borderTop:"1px solid lightgrey",
      "&::-webkit-scrollbar": {
        height: "4px",
        backgroundColor: "#F5F5F5"
      },
      "&::-webkit-scrollbar-track": {
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
        borderRadius: "4px",
        backgroundColor: "#F5F5F5"
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "4px",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
        backgroundColor: "#7d7d7d"
      }
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    }
  });

class FacebookPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading : true,
          EDIT_FLAG: false,
          feeds: [],
          isCommentView: false,
          isReactionView: false,
          isTicketHistory : false,
          userPageId: "",
          tempName: "",
          dialogOpen : false,
          dialogTitle : "Ticket Response",
          dialogContent: ""
        }
    }
    componentDidMount(){
      this.pageFeeds('feed');
    }
    handleFormState = (updatedFormState,index) =>{
      //console.log(`onChangeform page `);
    }
    handleCommentView = (postId) =>{
      this.setState({postId : postId, isCommentView : !this.state.isCommentView});
    }
    handleReactionView = (postId) =>{
      this.setState({postId : postId, isReactionView : !this.state.isReactionView});
    }
    handleTicketView = (postId, name) =>{
      this.setState({postId : postId, tempName : name, isTicketView : !this.state.isTicketView});
    }
    handleTicketHistory = (postId, name) =>{
      this.setState({postId : postId, tempName : name, isTicketHistory : !this.state.isTicketHistory});
    }
    handlePostComment = (postId, msg) => {
      // console.log(postId,msg,'  ====> shiv');
    }
    pageFeeds = (postType) => {
      const fields = `from,full_picture,application,place,updated_time,icon,message_tags,attachments{subattachments,media_type,media,title,url},shares,message,id,story,created_time`;
      const { page_id , page_access_token } = this.props.info;
      const fetchCallOptions = {
        method: 'GET',
      };
        const url = new URL(`https://graph.facebook.com/${page_id}/${postType}?fields=${fields}&access_token=${page_access_token}`);
        fetchCall(url,fetchCallOptions,"json").then( res => {
          this.setState({feeds : res.data, loading : false});
        },
        (error) => {
          //console.log(error);
        });
    }
    openDialog = () =>{
      this.setState({dialogOpen : true, dialogTitle : "Test Write post ", dialogContent : "Test data Content for new"});
    }
    render(){
        const {classes} = this.props;
        const avater = <Avatar src={`https://graph.facebook.com/v5.0/${this.props.info.page_id}/picture`} aria-label="recipe" />;

        return (
            <span className={classes.root}>
             {!this.props.info.page_id ? <CircularProgress  size={30} thickness={4} className={classes.fabProgress} />
            :
            <Grid container
            direction="row"
            justify="center"
            alignItems="center" 
            spacing={2}>
              <Grid item xs={9}>
                  {this.props.info.page_id && <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardHead}
                    classes={{action : classes.actionPage}}
                    avatar={
                      this.state.loading ? <Skeleton variant="circle" width={40} height={40} animation="wave" /> : avater
                    }
                    action={
                      this.state.loading ? <Skeleton height={36} width="100%"  animation="wave" /> : <DropButton handler={this.pageFeeds} />
                    }
                    title={this.state.loading ? <Skeleton height={24} width="40%"  animation="wave" /> : <Typography style={{color :"#385898"}} variant="subtitle1">{this.props.info.page_name}</Typography>}
                    subheader={this.state.loading ? <Skeleton height={17} width="13%" animation="wave" /> : `Facebook`}
                  />

                  {this.state.loading && <LinearProgress classes={{root : classes.rootProgress}} color="secondary" />}
                </Card>}
               </Grid>
               <Grid item xs={9}>
                {this.state.feeds.map( (feed, index) => (
                  <Card key={index} className={classes.postCard}>
                  <CardHeader
                    className={classes.cardHead}
                    avatar={
                      <Avatar src={`https://graph.facebook.com/v5.0/${feed.from ? feed.from.id : feed.id}/picture?access_token=${this.props.info.page_access_token}`} aria-label="recipe" />
                    }
                    action={
                      <Tooltip title="More Settings">
                      <IconButton size="small" className={classes.moreIcn} aria-label="settings">
                       <MoreVertIcon />
                      </IconButton>
                      </Tooltip>
                    }
                    title={`${feed.from.name}`}
                    subheader={<div style={{display:"flex"}}> {new Date(feed.created_time).toLocaleString()}{feed.icon && <img style={{marginLeft: "10px"}} src={feed.icon} alt="media type" />}</div>}
                  />
                   <CardContent classes={{root : classes.rootLastChild}} className={classes.postCardContent}>
                      {feed.message && <p className={classes.cmntText}> {feed.message} </p>}
                      {(feed.attachments && feed.attachments.data[0].media_type === 'album') && <div className={classes.rootGridList}>
                          <GridList className={classes.gridList} cols={2.5}>
                            {feed.attachments.data[0].subattachments.data.map((tile, index) => (
                              <GridListTile key={index}>
                                <img src={tile.media.image.src} alt={tile.target.id} />
                              </GridListTile>
                            ))}
                          </GridList>
                        </div>}


                      <div style={{textAlign : "center"}}>{(feed.attachments && feed.attachments.data[0].media_type === 'video') && <video src={feed.attachments.data[0].media.source} controls></video>}</div>
                 </CardContent>
                  {(feed.attachments && feed.attachments.data[0].media_type === 'photo')&&
                   <CardMedia
                      className={classes.media}
                      image={feed.full_picture}
                      title="Contemplative Reptile"
                    />}
                    <CardActions className={classes.postActions} disableSpacing>   
                    <React.Fragment>
                      <Tooltip title="COMMENTS">
                      <IconButton onClick={() => this.handleCommentView(feed.id)} classes={{root:classes.commentIcn}} aria-label="comments">
                      <CommentIcon />
                      </IconButton>
                      </Tooltip>
                      <Tooltip title="REACTIONS">
                      <IconButton onClick={() => this.handleReactionView(feed.id)} classes={{root:classes.reactionIcn}} aria-label="reactions">
                       <ThumbUpAltIcon />
                      </IconButton>
                      </Tooltip>
                      <Tooltip title="CREATE TICKET">
                      <IconButton onClick={() => this.handleTicketView(feed.id, feed.from.name)} classes={{root: classes.ticketIcn}} aria-label="create-ticket">
                          <ConfirmationNumberIcon />
                      </IconButton>
                      </Tooltip>
                      <Tooltip title="TICKET HISTORY">
                      <IconButton onClick={() => this.handleTicketHistory(feed.id, feed.from.name)} classes={{root: classes.commentIcn}} aria-label="ticket-history">
                          <HistoryIcon />
                      </IconButton>
                      </Tooltip>
                      </React.Fragment>

                      <div style={{width:"100%", display:"block", margin: "10px 1px"}}>
                        <CommentBox pageToken={this.props.info.page_access_token} feedId={feed.id} avatar={<Avatar style={{width: 30, height : 30}} src={`https://graph.facebook.com/v5.0/${this.props.info.page_id}/picture?access_token=${this.props.info.page_access_token}`} aria-label="recipe" />} placeholder={`Comment as ${this.props.info.page_name}`}/>  
                      </div>
                     </CardActions>
                </Card>
                ))}
               </Grid>
              </Grid>}
           {this.state.isCommentView && <CommentView 
                 open={this.state.isCommentView}
                 postId={this.state.postId}
                 pageToken={this.props.info.page_access_token}
                 toggle={() => this.setState({isCommentView: !this.state.isCommentView})}
            />}
           {this.state.isReactionView && <ReactionView 
                 open={this.state.isReactionView}
                 postId={this.state.postId}
                 pageToken={this.props.info.page_access_token}
                 toggle={() => this.setState({isReactionView: !this.state.isReactionView})}
            />}
           {this.state.isTicketView && <TicketDialog 
                 open={this.state.isTicketView}
                 postId={this.state.postId}
                 clientId={this.props.clientId}
                 clientEmail={this.props.clientEmail}
                 fromName={this.state.tempName}
                 pageToken={this.props.info.page_access_token}
                 toggle={() => this.setState({isTicketView: !this.state.isTicketView})}
            />}
            {this.state.isTicketHistory &&  <TicketHistoryDialog 
                userVariables={{"sender": this.state.postId,"page_name":this.props.info.page_name,"first_name" : this.state.tempName,"last_name":this.state.tempName}}
                open={this.state.isTicketHistory}
                COMPONENT={this}
                clientId={this.props.clientId}
                clientEmail={this.props.clientEmail}
                sendReply={this.handlePostComment}
                toggle={() => this.setState({isTicketHistory: !this.state.isTicketHistory})}
                />
              }
          </span>
      );
    }
}

export default withStyles(styles)(FacebookPage);