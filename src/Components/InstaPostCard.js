import React from 'react';
import { red } from '@material-ui/core/colors';
import { makeStyles,List, Divider, ListItem,ListItemText,ListItemSecondaryAction, Card, CardHeader, IconButton, CardMedia, CardContent, CardActions, Avatar, Typography} from '../theme/muiComponents';
import {CommentIcon, ReplyIcon, ConfirmationNumberIcon, ArrowBackIcon, FavoriteIcon} from '../theme/muiIcons';
import Emojify from 'react-emojione';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    minHeight: 400,
  },
  rootList: {
    width: '100%',
    paddingTop: "0px",
    backgroundColor: theme.palette.background.paper,
  },
  postBody:{
    height: "auto",
    overflow: "hidden"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cmntIcon:{
    margin:"10px"
  },
  cmnt:{
    cursor: "pointer",
    color: "deepskyblue"
  },
  cmtAction:{
    padding: "8px",
    marginLeft: "5px"
  },
  likeIcon:{
    margin:"5px",
    color: "red"
  },
  backBtn:{
    color: "white",
    marginRight: "5px"
  },
  titleCmnt:{
    fontSize: "1rem",
    marginTop: "10px",
    color: "white"
  },
  timestamp:{
    marginTop: "5px",
    display: "block",
    color: "grey"
  },    
  ticketIcn :{
    color: "#ffb200",
    padding: "5px",
    transform: 'rotate(135deg)'
  },
  countBlock:{
    alignItems: "center",
    flexGrow: "0.9",
    display: "flex"
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function InstaPostCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {media_url, caption, username, comments, like_count} = props.Data;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>  
      {!expanded && 
      <>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            S
          </Avatar>
        }
        title={username}
      />
      <CardMedia
        className={classes.media}
        image={media_url}
        title={username}
      />
      <CardActions disableSpacing>
          <span className={classes.countBlock}>
          <FavoriteIcon className={classes.likeIcon} /> {like_count}
          {comments && <>
          <CommentIcon className={classes.cmntIcon} /> {comments.data.length}</>}
          </span>
          {comments  && <span>
            <span className={classes.cmnt} onClick={handleExpandClick}>
            View comments
            </span>
        </span>}
      </CardActions>
      <CardContent className={classes.postBody}>
        <Typography variant="body2" color="textPrimary" component="p">
        <Emojify style={{height: 20, width: 20}}>{caption}</Emojify>
        </Typography>
      </CardContent>
      </>}
      {expanded && 
          <>
          <CardHeader
            style={{backgroundColor: "#ff7c7c", padding: "8px"}}
            title={
            <span style={{display: "flex"}}>
            <IconButton className={classes.backBtn}  onClick={handleExpandClick}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography className={classes.titleCmnt} variant="h5">All Comments</Typography>
            </span>
            }

          />
         <CardContent style={{padding: "unset", overflowY: "auto"}}>
          <List className={classes.rootList}>
          {comments && comments.data.map((comment, index) => (
            <span key={index} >
              <ListItem  button>
                  <ListItemText id={"d"} secondary={
                    <Typography className={classes.timestamp} variant="caption"> {new Date(comment.timestamp).toLocaleString()}</Typography>
                  } 
                  primary={
                  <Emojify style={{height: 20, width: 20}}>{comment.text}</Emojify>
                  } 
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => props.toggleReply(comment.id)} className={classes.cmtAction} aria-label="comments">
                      <ReplyIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => props.toggleTicket(comment.id)} className={classes.cmtAction} classes={{root: classes.ticketIcn}}  aria-label="comments">
                      <ConfirmationNumberIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                 <Divider component="li" />
              </span>
            ))}
        </List>
        </CardContent>
        </>}
    </Card>
  );
}
