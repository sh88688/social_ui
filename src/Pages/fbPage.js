import React from 'react';
//Material UI
import {  LinearProgress,Tooltip, IconButton,CardMedia, CardActions, withStyles, Typography, Grid, CircularProgress,Card, CardHeader, Avatar, CardContent} from "../theme/muiComponents";
import {MoreVertIcon,ConfirmationNumberIcon, CommentIcon, EditIcon, ThumbUpAltIcon} from '../theme/muiIcons';
import fetchCall from '../Components/FetchCaller';
import CreatePost from '../Components/CreatePostDialog';
import DropButton from '../Components/dropButton';
import CommentBox from '../Components/CommentBoxBuilder';
import CommentView from '../Components/CommentView';
import Skeleton from '@material-ui/lab/Skeleton';
//
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
      margin : '16px',
      maxWidth : '800px',
      borderRadius : "5px",
      border : '1px solid lightgrey'
    },
    postCardContent:{
      padding : "0px 16px"
    },
    postActions :{
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
      transform: 'rotate(90deg)',
      marginTop: "5px"
    },
    commentIcn:{ 
    },
    reactionIcn:{
      color: "#1976d2"
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
          userPageId: "",
          name: "",
          dialogOpen : false,
        }
    }
    componentDidMount() {
      this.pageFeeds('feed');
    }
    handleFormState = (updatedFormState,index) =>{
      //console.log(`onChangeform page `);
    }
    handleCommentView = (postId) =>{
      this.setState({postId : postId, isCommentView : !this.state.isCommentView});
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
            <CreatePost open={this.state.dialogOpen} avatar={avater}  toggle={() => this.setState({dialogOpen : false})} />
          {!this.props.info.page_id ? <CircularProgress  size={30} thickness={4} className={classes.fabProgress} />
            :
            <Grid container
            direction="row"
            justify="center"
            alignItems="center" 
            spacing={1}>
              <Grid item xs={9}>
              <Card className={classes.card}>
              <CardHeader
                    className={classes.cardHead}
                    subheader={this.state.loading ? <Skeleton style={{width : "80px"}} animation="wave" /> : `Create post`}
                  />
              </Card>
              </Grid>
              <Grid item xs={9}>
                  {this.props.info.page_id && <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardHead}
                    avatar={
                      this.state.loading ? <Skeleton variant="circle" width={40} height={40} animation="wave" /> : avater
                    }
                    action={
                      <IconButton size="small" className={classes.moreIcn}  aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={this.state.loading ? <Skeleton height={24} width="40%"  animation="wave" /> : <Typography style={{color :"#385898"}} variant="subtitle1">{this.props.info.page_name}</Typography>}
                    subheader={this.state.loading ? <Skeleton height={17} width="15%" animation="wave" /> : `Facebook`}
                  />
                  <CardContent style={{padding : "0px 16px"}}>
                        {this.state.loading ? <Skeleton height={43} width="90%" style={{marginBottom: "10px",marginLeft : "32px"}} animation="wave" /> : <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        <EditIcon />
                        </div>
                        <Typography
                        onClick={this.openDialog}
                        className={classes.inputRoot}
                        >
                        Write a post...
                        </Typography>
                        </div>}
                  </CardContent>
                  {this.state.loading && <LinearProgress classes={{root : classes.rootProgress}} color="secondary" />}
                </Card>}
               </Grid>
               <Grid item xs={9}>
                {this.state.loading ? <Typography style={{marginLeft : "12px"}} variant="subtitle2">Loading Post...</Typography> : <DropButton handler={this.pageFeeds} />}
                {this.state.feeds.map( (feed, index) => (
                  <Card key={index} className={classes.postCard}>
                  <CardHeader
                    className={classes.cardHead}
                    avatar={
                      <Avatar src={`https://graph.facebook.com/v5.0/${feed.from.id}/picture?access_token=${this.props.info.page_access_token}`} aria-label="recipe" />
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
                      <IconButton onClick={() => this.handleCommentView(feed.id)} className={classes.commentIcn} aria-label="settings">
                      <CommentIcon />
                      </IconButton>
                      </Tooltip>
                      <Tooltip title="REACTIONS">
                      <IconButton className={classes.reactionIcn} aria-label="settings">
                       <ThumbUpAltIcon />
                      </IconButton>
                      </Tooltip>
                      </React.Fragment>
                        {/* <CommentBox feedId={feed.id} avatar={<Avatar style={{width: 30, height : 30}} src={`https://graph.facebook.com/v5.0/${this.props.info.page_id}/picture?access_token=${this.props.info.page_access_token}`} aria-label="recipe" />} placeholder={`Comment as ${this.props.info.page_name}`}/>   */}
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
          </span>
      );
    }
}

export default withStyles(styles)(FacebookPage);