import React from "react";
import PropTypes from "prop-types";

//Material UI
import {withStyles, Button, Tooltip, CircularProgress, fade, Badge,InputBase, Grid,List, ListItem,Divider, ListItemText, ListItemAvatar,Card, CardHeader, Avatar, CardContent, CardActions, IconButton, Typography } from "../theme/muiComponents";
import {animateScroll as scroll} from 'react-scroll';
 
//Icons Material UI
import {FacebookIcon, ForumIcon, FlagIcon, ConfirmationNumberIcon, HistoryIcon, AssignmentIcon, SearchIcon, DeleteIcon} from "../theme/muiIcons";


//Components
import AppBarBuilder from '../Components/AppBarBuilder';
import FacebookPage from './fbPage';
import NoDataBuilder from '../Components/NoDataBuilder';
import BubbleMessage from  '../Components/bubbleMessageBuilder';
//Modular Functions
import {GET_DATA} from '../ModularFunctions/Functions';
//import Json Schema
import formJson from '../FormSchema/profileForm.json';
//import Search Json Schema
import formSearchJson from '../SearchSchema/googlePlaySearch.json';
import fetchCall from '../Components/FetchCaller';
import SendBox from '../Components/SendBoxBuilder';
import DialogBuilder from '../Components/DialogBuilder';
import TicketDialog from '../Components/TicketDialog';
import TicketHistoryDialog from '../Components/TicketHistoryDialog';
import TemplateDialog from '../Components/TemplateDialog';
import {SERVER_IP, PROTOCOL} from '../Configs/apiConf';
import Picker from 'emoji-picker-react';


//CSS Styles
const styles = theme => ({
      rootDiv: {
        width: "100%",
      },
      cardRoot:{
        boxShadow: "unset",
      },
      primaryRoot:{
        display: "flex"
      },
      badgeRoot: {
        flexGrow: 1,
        marginRight: "5px",
        alignSelf: "flex-end"
      },
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      },
      cardContentRoot:{
        padding:"unset",
      },
      listRoot:{
        padding:"unset",
      },
      gridContainerTop:{
        maxWidth: "1050px",

      },
      gridContainer:{
        maxWidth: "1050px",
        backgroundColor : "white",
        border: "1px solid lightgrey",
        minHeight: "470.835px"
      },
      borderRight:{
        borderRight: "1px solid lightgrey"
      },
      borderBottom:{
        borderBottom: "1px solid lightgrey",
      },
      chatListHeader:{
        borderBottom: "1px solid lightgrey",
      },
      selectTemp:{
        width :"130px",
        margin: "5px 0px",
      },
      selectInput:{
        padding : "2px 0px 2px 10px",
        fontSize: "13px",
        color: "grey"
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(90deg)',
      },
      toggle: {
        marginLeft: '5px',
        marginRight: "8px"
      },
      inlineMsg:{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          display: "inline-block",
          width: "240px"
      },
      selectedHeader:{
        color: "#f32958",
        padding: "12px 16px"
      },
      customAvatar:{
        backgroundColor : "#fff",
        color : "black"
      },
      sendCardFooter:{
        borderTop: "1px solid lightgrey",
        padding: "2px 8px"
      },
      send: {
        position: 'relative',
        borderRadius: "16px",
        color: "#f32958",
        backgroundColor: fade('#c1c1c1', 0.15),
        '&:hover': {
          backgroundColor: fade('#c1c1c1', 0.20),
        },       
        marginLeft: 0,
        width: '100%',
     
      },
      sendIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      sendRoot: {
        color: 'inherit',
      },
      sendInput: {
        padding: theme.spacing(2, 7, 2, 2),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
      search: {
        position: 'relative',
        borderRadius: "16px",
        color: "#f32958",
        backgroundColor: fade('#c1c1c1', 0.15),
        '&:hover': {
          backgroundColor: fade('#c1c1c1', 0.25),
        },
        
        marginLeft: 0,
        width: '100%',
     
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
      sliderCustom: {
        overflowY: "auto",
        padding:"16px 0px 40px 20px",
        borderTop:"1px solid lightgrey",
        height:"300px",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: "5px",
          backgroundColor: "#F5F5F5"
        },
        "&::-webkit-scrollbar-track": {
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
          borderRadius: "5px",
          backgroundColor: "#F5F5F5"
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "5px",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
          backgroundColor: "#7d7d7d"
        }
      } 

});
//
const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const Intial_NODATA = {};
Intial_NODATA.title = "No Chats Yet !";
Intial_NODATA.description = "Chats are facebook page's conversations.";
Intial_NODATA.type = "intial";

const Search_NODATA = {};
Search_NODATA.title = "No Records Found !";
Search_NODATA.description = "";
Search_NODATA.type = "search";

const System_Constants={};
System_Constants.API_PAGE="intents";
System_Constants.MODULE_PAGE="/intents";
System_Constants.ID_FIELD="intent_id";
System_Constants.FIELD_NAME='intent_name'
System_Constants.MODULE_NAME="Facebook Page";


class FBCHAT extends React.Component {
  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props) {
          super(props);
          this.state = {
            ADD_FLAG:false,
            isPicker : false,
            isPageView : false,
            isTemplateLoaded : false,
            pagePicture: null,
            CONFIG: props.CONFIG,
            EDIT_FLAG: false,
            lastActiveSender : null,
            EDIT_SELECTED: null,
            IS_LOADING:false,
            replyText: "",
            searchText: "",
            isTemplateDialog: false,
            isTicketHistoryDialog: false,
            isTicketProcess: false,
            isTicketDialog: false,
            selectedExpanded: false,
            sending: false,
            DATA_ARRAY: props.CHAT,
            DATA_COUNT: "",
            selectedChat: null,
            NO_DATA_CONTENT: Intial_NODATA,
            dataForm: formJson,
            searchForm : formSearchJson,
            dialogOpen : false,
            dialogTitle : "",
            dialogContent: ""
          };      
  }

handleFormState = (updatedFormState,index) =>{
 //console.log("intent ====> ",this.state.dataForm);
}

UNSAFE_componentWillReceiveProps(nextProps){

  if(nextProps.CHAT !== this.props.CHAT && nextProps.CHAT.length > this.props.CHAT.length){
    this.handleChatState(nextProps);
  }
  if(nextProps.CONFIG !== this.props.CONFIG) {
    this.setState({CONFIG : nextProps.CONFIG});
  }
  
}
handleManagePageToggle = () =>{
  this.setState({ isPageView : !this.state.isPageView});
}
handleChatState = (nextProps) =>{
  let promise = new Promise((resolve, reject) =>{

    if(nextProps.CHAT !== null && this.props.CHAT !== nextProps.CHAT) {
      const copyCHAT = [...nextProps.CHAT];
  
      if(nextProps.newChat !== null){
            const CHAT_INDEX = copyCHAT.findIndex(e => e.sender === nextProps.newChat.sender);
  
              if(this.state.selectedChat !== null){
                this.scrollToBottom();
                    if(this.state.selectedChat.sender !== nextProps.newChat.sender){      
                      copyCHAT[CHAT_INDEX].unread = copyCHAT[CHAT_INDEX].unread + 1;
                      this.setState({DATA_ARRAY : copyCHAT});
                      resolve();
                    }
                
              }
              else {
                copyCHAT[CHAT_INDEX].unread = copyCHAT[CHAT_INDEX].unread + 1;
                this.setState({DATA_ARRAY : copyCHAT});
                resolve();
              }
      }
      else{
        this.setState({DATA_ARRAY : nextProps.CHAT});
        resolve();
      }
       
    }
  })
  return promise;
}
toggleTemplate = () => {
    this.setState({ isTemplateDialog : !this.state.isTemplateDialog});
    this.toggleTempNode.blur();
}
emojiToggle = (event) =>{
  this.setState({ isPicker : !this.state.isPicker},()=>{
    if(this.state.isPicker){
      this.Chatter.style.height = '130px';
    }
    else {
      this.Chatter.style.height = '300px';
    }
  });
}
onEmojiClick = (event, emojiObject) =>{
  this.setState({replyText : `${this.state.replyText} ${emojiObject.emoji}`})
}
toggleTicket = () =>{
  this.setState({ isTicketDialog : !this.state.isTicketDialog});
    this.toggleTicketNode.blur();
}
toggleTicketHistory = () => {
  this.setState({ isTicketHistoryDialog : !this.state.isTicketHistoryDialog});
  this.toggleTempHistoryNode.blur();
}
getTemplateText = (value) => {
   this.setState({ replyText : value, isTemplateDialog : !this.state.isTemplateDialog});
}
handleChange = (value) =>{
  this.setState({replyText : value});
}
handleSearchInput = (event) => {
  this.setState({searchText: event.target.value});
}
handleSelected = (selected) =>{
  //console.log("handle selected",selected);
  const copyCHAT = [...this.state.DATA_ARRAY];
  const CHAT_INDEX = copyCHAT.findIndex(e => e.sender === selected.sender);
  copyCHAT[CHAT_INDEX].unread = 0;
  this.setState({selectedChat: selected,DATA_ARRAY: copyCHAT, replyText : ""},this.scrollToBottom);
}
handleSearch = (filter) => {
  GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Search_NODATA, this);
}
handleClear = () => {
  let filter = {};
  filter.agent_name = "";
  GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Search_NODATA, this);
}
sendMongoHandler = (postData) => {
  
  const fetchCallOptions = {
    method: 'POST',
    body: JSON.stringify(postData)
  };
    const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/notification/outgoingMongo.php`);
    fetchCall(url,fetchCallOptions,"json").then( res => {
    },
    (error) => {
      //console.log(error);
    });
}
removeMongoHandler = () => {
  const postData = {};
  postData.sender = this.state.selectedChat.sender;
  postData.recipient = this.props.CONFIG.page_id;

  const fetchCallOptions = {
    method: 'POST',
    body: JSON.stringify(postData)
  };
    const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/notification/removeMongo.php`);
    fetchCall(url,fetchCallOptions,"json").then( res => {
      this.handleChatDelete();
    },
    (error) => {
      //console.log(error);
    });
}
handleSendReply = (recipient, text) => {
  if(text !== ""){
    this.setState({replyText : ""});
    const postData = {};
    postData.recipient = {};
    postData.message = {};
    postData.recipient.id = recipient;
    postData.message.text = text;

    const fetchCallOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    };
    const url = new URL(`https://graph.facebook.com/v5.0/me/messages?access_token=${this.props.CONFIG.page_access_token}`);
    fetchCall(url,fetchCallOptions,"json").then((RESPONSE) => {
      
      if(RESPONSE.message_id) {
        const mongoPacket = {};
        mongoPacket.sender = {};
        mongoPacket.sender.id = recipient;
        mongoPacket.recipient = {};
        mongoPacket.recipient.id = this.props.CONFIG.page_id;
        
        const messagePacket = {};
        messagePacket.timestamp = Date.now();
        messagePacket.flow = "OUT";    
        messagePacket.mid = RESPONSE.message_id;
        messagePacket.text = text;   
        //setting mongoPacket
        mongoPacket.message = messagePacket;
        this.sendMongoHandler(mongoPacket);
        const CHAT_INDEX = this.state.DATA_ARRAY.findIndex(e => e.sender === recipient);
        const DATA_ARRAY_COPY = [...this.state.DATA_ARRAY];
        DATA_ARRAY_COPY[CHAT_INDEX].messages.push(messagePacket);
        this.setState({DATA_ARRAY : DATA_ARRAY_COPY},this.scrollToBottom);
      }
      else if(RESPONSE.error){
          this.setState({dialogTitle: `Error :`,dialogContent: RESPONSE.error.message,dialogOpen: true});
      }
 
      },
      (error) => {
        //console.log(error);
      });
  }
  
}
handleChatDelete = () => {
      let copy_DATA_ARRAY = [...this.state.DATA_ARRAY];
      const copy_DATA_ARRAY_Index = copy_DATA_ARRAY.findIndex(e => e.sender === this.state.selectedChat.sender);
      copy_DATA_ARRAY.splice(copy_DATA_ARRAY_Index, 1);
      this.setState({DATA_ARRAY : copy_DATA_ARRAY, selectedChat : null});
      this.props.PARENT.setState({CHAT_STACK : copy_DATA_ARRAY});
}
scrollToBottom = () => {
    scroll.scrollToBottom({
      delay: 100,
      offset : 50,
      isDynamic: true,
      smooth: true,
      containerId: 'Chatter'});
}

render(){
  const { classes } = this.props;
  const filteredData = this.state.DATA_ARRAY.filter(item =>{
  const serachBase = `${item.user.first_name} ${item.user.last_name}`; // for make serach on which basis
      return serachBase.toLowerCase().includes(this.state.searchText.toLowerCase());
  });
    const listData = filteredData.map((chatObj, index) => {
        let {[chatObj.messages.length-1] : lastMessage } = chatObj.messages;
        let AvatarData = <Avatar alt={chatObj.user.first_name} src={chatObj.user.picture.data.url} />;

        return (<React.Fragment key={index}>
          <ListItem alignItems="flex-start" onClick={() => this.handleSelected(chatObj)} button>
          <ListItemAvatar>
            {AvatarData}
          </ListItemAvatar>
          <ListItemText
          
          primary={
            <div className={classes.primaryRoot}>
            <Typography >
            {`${chatObj.user.first_name} ${chatObj.user.last_name}`}
            </Typography>
            {(chatObj.unread !== 0) && <Badge color="secondary" className={classes.badgeRoot} badgeContent={chatObj.unread} />}
            </div>
            }
          secondary={
          <React.Fragment>
          <Typography
          component="span"
          variant="caption"
          color="textSecondary"
          className={classes.inlineMsg}
          >
          {lastMessage.attachments ? "Attachment" : lastMessage.text}
          </Typography>
          </React.Fragment>
          }
          />
          </ListItem>
          <Divider variant="fullWidth" component="li"/>
      </React.Fragment>)
  });
  const HeaderButton = (this.props.processing ? null : <Button 
    color="primary"
    onClick={this.handleManagePageToggle}
    startIcon={this.state.isPageView ? <ForumIcon /> : <FlagIcon />}
    variant="outlined" >{this.state.isPageView ? "View Chats" :"Manage Your Page"}
    </Button>);

  return (
    <div className={classes.rootDiv}>
    <AppBarBuilder 
      IS_LOADING={this.props.processing}
      PARENT={this.props.PARENT}
      headerButton={HeaderButton} 
      headerTitle={System_Constants.MODULE_NAME} 
      headerIcon={FacebookIcon} />
    
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <DialogBuilder type="code" isopen={this.state.dialogOpen} dialogTitle={this.state.dialogTitle} dialogContent={this.state.dialogContent} ok={() => this.setState({dialogOpen : false})} />

        {this.state.isPageView && <FacebookPage handler={this.handleManagePageToggle} clientEmail={this.props.clientEmail} clientId={this.props.clientId} info={this.props.CONFIG} />}

        {(this.state.DATA_ARRAY.length !== 0 && !this.state.isPageView) &&
        <Grid 
              container 
              direction="row"
              justify="center"
              spacing={0}
              className={classes.gridContainer}
        >
          <Grid item xs={4} className={classes.borderRight}> 
          <Card className={classes.cardRoot}>
              <CardHeader
                className={classes.chatListHeader}
              /*  action={
                  <IconButton color="secondary" size="small" style={{margin: "10px 0px 0px 10px"}} aria-label="edit">
                    <MoreVertIcon />
                  </IconButton>
                }*/
                title={
                  <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    value={this.state.searchText}
                    onChange={this.handleSearchInput}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                }
              />
              <CardContent classes={{root: classes.cardContentRoot}}>
                  <List classes={{root: classes.listRoot}}>
                  {listData}
                  </List>
                  <NoDataBuilder
                  isRendor={(filteredData.length === 0)}
                  title={"No Results Found"}
                  description={""}
                  type={"search"}
                  />
              </CardContent>
          </Card>
          </Grid>

         <Grid item xs={8}>        
             {this.state.selectedChat && 
             <Card className={classes.cardRoot}>
              <CardHeader
                className={classes.selectedHeader}
                avatar={
                  <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar alt={this.state.selectedChat.user.first_name} src={this.state.selectedChat.user.picture.data.url} />
                  </StyledBadge>
                }
                action={
                  <React.Fragment>
                  <Tooltip title="TICKET HISTORY">
                    <IconButton ref={node => this.toggleTempHistoryNode = node} color="default" onClick={this.toggleTicketHistory} aria-label="edit">
                    <HistoryIcon />
                  </IconButton>
                  </Tooltip>
                  <Tooltip title="DELETE CHAT">
                  <IconButton onClick={this.removeMongoHandler} color="secondary" aria-label="edit">
                    <DeleteIcon />
                  </IconButton>
                  </Tooltip>
                  </React.Fragment>
                  }
                title={<Typography variant="h6">{`${this.state.selectedChat.user.first_name} ${this.state.selectedChat.user.last_name}`}</Typography>}
        
              />
              <CardContent ref={node => this.Chatter = node} id="Chatter" className={classes.sliderCustom} >
              {this.state.selectedChat.messages.map((message, index) =>(
                <BubbleMessage key={index} sender={this.state.selectedChat.sender} senderImg={this.state.selectedChat.user.picture.data.url} messageData={message} timestamp={`${new Date(message.timestamp).toLocaleString()}`} />
              ))}
              </CardContent>
              <CardActions className={classes.sendCardFooter}>
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
                >
                <Grid item xs={12} style={{display: "flex"}}>
                    {this.state.isTemplateLoaded ? <React.Fragment>
                    <Tooltip title="PRE-DEFINED TEMPLATES">
                    <IconButton size="small" 
                      className={classes.toggle} 
                       ref={node => this.toggleTempNode = node} 
                       onClick={this.toggleTemplate}
                       color="secondary" aria-label="">
                       <AssignmentIcon />
                    </IconButton>
                    </Tooltip>
                   {!this.state.isTicketProcess ? <Tooltip title="CREATE TICKET">
                    <IconButton size="small" 
                        className={classes.toggle} 
                        ref={node => this.toggleTicketNode = node} 
                        onClick={this.toggleTicket}
                        style={{color: "brown"}}
                        aria-label="">
                        <ConfirmationNumberIcon />
                    </IconButton>
                    </Tooltip> : <CircularProgress style={{padding: "2px"}} size={23} color="secondary" />}
                    </React.Fragment>
                     : <CircularProgress style={{padding: "2px"}} size={23} color="secondary" />}

                    </Grid>
                    <Grid item xs={12} >
                    <SendBox isPicker={this.state.isPicker} emojiToggle={this.emojiToggle} replyText={this.state.replyText} sendHandler={() => this.handleSendReply(this.state.selectedChat.sender,this.state.replyText)} handler={this.handleChange} />
                    </Grid>
                    {this.state.isPicker && <Grid style={{padding: "0px"}} ref={ node => this.emojiPicker = node } item xs={12}>
                       <Picker  onEmojiClick={this.onEmojiClick}/>
                    </Grid>}
                  </Grid>
              </CardActions>
              </Card>}
              <NoDataBuilder
              isRendor={(this.state.selectedChat === null)}
              title={"No Page Conversation Selected."}
              description={""}
              type={"chat"}
              />
           </Grid>

      </Grid>}
      <NoDataBuilder
          isRendor={(this.state.DATA_ARRAY.length === 0 && !this.props.processing && !this.state.isPageView)}
          title={this.state.NO_DATA_CONTENT.title}
          description={this.state.NO_DATA_CONTENT.description}
          type={this.state.NO_DATA_CONTENT.type}
         />
         {this.state.selectedChat && <React.Fragment>
            <TicketDialog 
                userVariables={{"sender":this.state.selectedChat.sender,"page_name":this.state.CONFIG.page_name,"first_name" : this.state.selectedChat.user.first_name,"last_name":this.state.selectedChat.user.last_name}}
                open={this.state.isTicketDialog}
                clientId={this.props.clientId}
                clientEmail={this.props.clientEmail}
                COMPONENT={this}
                toggle={() => this.setState({isTicketDialog: !this.state.isTicketDialog})}
                />
            {this.state.isTicketHistoryDialog && <TicketHistoryDialog 
                userVariables={{"sender":this.state.selectedChat.sender,"page_name":this.state.CONFIG.page_name,"first_name" : this.state.selectedChat.user.first_name,"last_name":this.state.selectedChat.user.last_name}}
                open={this.state.isTicketHistoryDialog}
                COMPONENT={this}
                clientId={this.props.clientId}
                clientEmail={this.props.clientEmail}
                sendReply={this.handleSendReply}
                toggle={() => this.setState({isTicketHistoryDialog: !this.state.isTicketHistoryDialog})}
                />}
            <TemplateDialog 
                userVariables={{"page_name":this.state.CONFIG.page_name,"first_name" : this.state.selectedChat.user.first_name,"last_name":this.state.selectedChat.user.last_name}}
                open={this.state.isTemplateDialog}
                module={"facebook"}
                clientId={this.props.clientId}
                loadedHandler={() => this.setState({isTemplateLoaded : true})}
                toggle={this.getTemplateText} />
                </React.Fragment>}
      </main>

    </ div>
  );
}

};
FBCHAT.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(FBCHAT);
