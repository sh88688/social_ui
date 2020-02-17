import React from "react";
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import PropTypes from "prop-types";
import base64  from 'base-64';
import { withSnackbar } from 'notistack';

//Material UI
import {withStyles, clsx, Typography, Drawer,CssBaseline,List,Avatar,IconButton,Badge,LinearProgress} from "./theme/muiComponents";
//Icons Material UI
import { NotificationsIcon, WhatshotIcon } from "./theme/muiIcons";

//Center Pages
import GoogleReview from './Pages/googlePlay';
import FBCHAT from './Pages/fbChat';
import Support from './Pages/support';
import Profile from './Pages/profile';
import Integration from './Pages/integration';
import Users from './Pages/users';
import Tickets from './Pages/tickets';
import Templates from './Pages/templates';
import NotFound from './errorPage';
import AccountSetting from './Pages/accountSetting';
//Components
import fetchCall from './Components/FetchCaller';
import MenuListBuilder from './Components/menuListBuilder';
import NotificationTray from './Components/NotificationTray';

//other
import {SERVER_IP, PROTOCOL, API_URL, ROUTE_FOLDER} from './Configs/apiConf';
import {drawerWidthRight,drawerWidthLeft } from './theme/drawerConfig';
import { MODULE_HANDLER } from './ModularFunctions/Functions';
import ModuleList from './moduleLister/moduleList';


const styles = theme => ({
  root: {
    display: "flex"
  },
  ingrid: {
    display : "inline-grid"
  },
  csupport:{
    marginLeft : "10px",
    color: "#808080",
  },
  notificationBell:{
    marginLeft: "25px",
    color : theme.palette.common.main,
  },
  rootProgress:{
    backgroundColor: '#5c5ca2',
    height: '2px'
  },
  logoTitle:{
    paddingLeft:"10px",
    fontSize:"16px",
    color: theme.palette.secondary.main,
  },
  purpleAvatar:{
    background: "linear-gradient(150deg, #ff134a, #921aff)",
    width: "43px",
    height: "43px",
    
  },
  drawer: {
    width: drawerWidthLeft,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    borderRight: " solid 1px #0000001f",
    width: drawerWidthLeft,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    borderRight: " solid 1px #0000001f",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  drawerLeft: {
    width: drawerWidthLeft,
    flexShrink: 0
  },
  drawerRight: {
    width: drawerWidthRight,
    flexShrink: 0
  },
  drawerPaperRight: {
    width: drawerWidthRight
  },
  sliderCustom: {
    overflowY: "auto",
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
  },
  logobar: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "15px",
    borderBottom: " solid 1px #0000001f"
  },
  toolbar: theme.mixins.toolbar,
});

class App extends React.Component {

  //Notification Channel URL
  serverURL = `${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/notification/notification.php`;
  chatServerURL = `${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/notification/fbchat.php`;
  sseSource = null;
  sseChatSource = null;

  //Routes
  routes = [
    {
      path: `${ROUTE_FOLDER}/facebook`,
      exact: true,
      main: () => <FBCHAT PARENT={this} clientId={this.props.client.client_id} processing={this.state.isLoading} CHAT={this.state.CHAT_STACK} newChat={this.state.newChat} CONFIG={this.state.MODULE_CONFIG['facebook']} tokenCallback={this.getToken} />
    },
    {
      path: `${ROUTE_FOLDER}/google_play`,
      exact: true,
      main: () => <GoogleReview  PARENT={this} info={this.state.MODULE_PACKET["/intents"]} tokenCallback={this.getToken} />
    },
    {
      path: `${ROUTE_FOLDER}/integration`,
      exact: true,
      main: () => <Integration PARENT={this} clientId={this.props.client.client_id} install={this.state.INSTALL_FLAG} CONFIG={this.state.MODULE_CONFIG} info={this.state.MODULE_PACKET[`${ROUTE_FOLDER}/integration`]} tokenCallback={this.getToken} />  
    },
    {
      path: `${ROUTE_FOLDER}/agents`,
      exact: true,
      main: () => <Users PARENT={this} clientId={this.props.client.client_id} info={this.state.MODULE_PACKET["/users"]} tokenCallback={this.getToken} />    
    },
    {
      path: `${ROUTE_FOLDER}/tickets`,
      exact: true,
      main: () => <Tickets PARENT={this} client={this.props.client} />    
    },
    {
      path: `${ROUTE_FOLDER}/templates`,
      exact: true,
      main: () => <Templates PARENT={this} clientId={this.props.client.client_id} info={this.state.MODULE_PACKET["/templates"]} tokenCallback={this.getToken} />    
    },
    {
      path: `${ROUTE_FOLDER}/support`,
      exact: true,
      main: () => <Support PARENT={this} client={this.props.client} />    
    },
    {
      path: `${ROUTE_FOLDER}/profile`,
      exact: true,
      main: () => <Profile PARENT={this} clientId={this.props.client.client_id} />    
    },
    {
      path: `${ROUTE_FOLDER}/accountSetting`,
      exact: true,
      main: () => <AccountSetting  PARENT={this} />    
    }
  ];

  constructor(props){
    super(props);
    this.state = {
      selectedMenu: this.props.history.location.pathname,
      isLoggedIn: true,
      tokenArray:[],
      notiStack:[],
      CHAT_STACK : [],
      newChat : null,
      drawerOpen : true,
      notiBadge:0,
      notiOpen: false,
      anchorEl : null,
      MODULE_PACKET:{
        [`${ROUTE_FOLDER}/intentLabel`]:null,
        [`${ROUTE_FOLDER}/integration`]:null,
        [`${ROUTE_FOLDER}/users`]:null,
        [`${ROUTE_FOLDER}/templates`]:null
      },
      MODULE_STATUS:{
        [`${ROUTE_FOLDER}/`]: true,
        [`${ROUTE_FOLDER}/google_play`]: false,
        [`${ROUTE_FOLDER}/twitter`]: false,
        [`${ROUTE_FOLDER}/facebook`]: true,
        [`${ROUTE_FOLDER}/instagram`]: false,
        [`${ROUTE_FOLDER}/integration`]: true,
        [`${ROUTE_FOLDER}/tickets`]: true,
        [`${ROUTE_FOLDER}/support`]: true,
        [`${ROUTE_FOLDER}/profile`]: true,
        [`${ROUTE_FOLDER}/accountSetting`]: true,
        [`${ROUTE_FOLDER}/logout`]: true,
        [`${ROUTE_FOLDER}/agents`]: true,
        [`${ROUTE_FOLDER}/templates`]: true
      },
      MODULE_CONFIG:{
        "google_play": null,
        "twitter":   null,
        "facebook":  null,
        "instagram": null
      },
      INSTALL_FLAG: false,
      isLoading: false,
      Modules: ModuleList,
    }; 

  }
  UNSAFE_componentWillMount(){
    this.handleModuleStatus();
  }
  //REACT Notification SSE : Connection Intialize 
  componentDidMount(){
    //LOAD TOKEN DATA
    if(localStorage.getItem('tokenArray')){
      this.setState({tokenArray : JSON.parse(localStorage.getItem('tokenArray'))});
    }
    //console.log("%c!! FUNC-INFO => [App.js] componentDidMount  !!","color : green; font-weight: 900;");
    if (window.EventSource) {
      //Initiating
      try {
        this.sseSource = new EventSource(this.serverURL);
        this.sseChatSource = new EventSource(this.chatServerURL);
        //console.log ("%c Initiating SSE.","color : orange; font-weight: 800;");
      }catch (e) {
        //console.error ("Unable to initiate SSE.");
      }
      //Fbchat
      this.sseChatSource.addEventListener("fbChat", (e) => {
        //console.log ("%c fbChat received from SSE.","color : orange; font-weight: 800;");
        this.handleChatSSE(e.data,"chat"); 
      });
      //Callback
      this.sseSource.addEventListener("callback", (e) => {
        //console.log ("%c callback received from SSE.","color : orange; font-weight: 800;");
        this.handleSSE(e.data,"success"); 
      });

    }
    else {
      //console.error ("SSE is not supported!");
    }

  }
  //
  handleModuleStatus = () => {
    this.setState({isLoading : true});
    const fetchCallOptions = {
      method: 'GET',
    };
    const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/checkSocialConfiguration.php?cl_key=${this.props.client.client_id}`);
    fetchCall(url,fetchCallOptions,"json").then((RESPONSE) => {
        let copy_MODULE_STATUS = {...this.state.MODULE_STATUS};
        for(const module in RESPONSE){
            if(RESPONSE[module] === "1")
            {
              copy_MODULE_STATUS[`${ROUTE_FOLDER}/${module}`] =  true;
              this.handleConfigs(module);
            }
            else {
              copy_MODULE_STATUS[`${ROUTE_FOLDER}/${module}`] =  false;
            }
        }
        this.setState({MODULE_STATUS: copy_MODULE_STATUS, INSTALL_FLAG: RESPONSE});
      },
      (error) => {
        //console.log(error);
      });
  }
  //handleFacebook
  handleConfigs = (module) => {
    const configModule = {google_play : "playStoreConfiguration",facebook:"facebookConfiguration",twitter:"",instagram:""};
    const fetchCallOptions = {
      method: 'GET',
    };
    const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/getDataAjax.php?module=${configModule[module]}&cl_key=${this.props.client.client_id}&req_data={%22filter%22:{},%22limit_info%22:{%22limit_start%22:0,%22limit_end%22:1}}`);
    fetchCall(url,fetchCallOptions,"json").then((RES) => {
        let copy_MODULE_CONFIG = {...this.state.MODULE_CONFIG};
        copy_MODULE_CONFIG[module] = RES.dataInfo;
        this.setState({MODULE_CONFIG : copy_MODULE_CONFIG},() => {
          if(module === 'facebook'){
            this.getFBChatHistory();
          }
        });
      },
      (error) => {
        //console.log(error);
      });
  }

  //REACT SSE Connection : Close 
  componentWillUnmount(){
    //console.log("%c!! FUNC-INFO => [App.js] componentWillUnmount  !!","color: brown;font-weight:800;");
    this.sseSource.close();
  }

  notiClickToggle = (event) =>{
    this.setState({notiOpen : !this.state.notiOpen, anchorEl : event.currentTarget, notiBadge : 0});  
  }
  // Menu Selection : Active
  setMenuItem = (selection) =>{
    this.setState({selectedMenu: selection});
  }
  // SSE Notification : Handler
  handleSSE = (msg,variant) => {

        //PARSING Notification
        const packet = JSON.parse(msg);
        const COPIED_MODULE_PACKET = {...this.state.MODULE_PACKET};
        //Push Data in NotiTray
        let notiStackCopy = [...this.state.notiStack];
        notiStackCopy.unshift(packet);

        if(this.state.tokenArray.some(e => e === packet.token)) {
            //REMOVING TOKEN 
            let tokenCopy = [...this.state.tokenArray];
            tokenCopy = tokenCopy.filter(item => item !== packet.token);

             //UPDATE tokenArray
            localStorage.setItem('tokenArray', JSON.stringify(tokenCopy));

            //Copying Packet Into module
            COPIED_MODULE_PACKET[packet.moduleInfo.module] = packet;

            //UPDATE CONFIG
            let copy_MODULE_CONFIG = {...this.state.MODULE_CONFIG};
            copy_MODULE_CONFIG[packet.moduleInfo.subModule] = packet.dataInfo;
             //UPDATING STATE
            this.setState({
              notiBadge : this.state.notiBadge + 1,
              tokenArray: tokenCopy,
              MODULE_PACKET: COPIED_MODULE_PACKET,
              MODULE_CONFIG : copy_MODULE_CONFIG,
              isLoading : false,
              notiStack : notiStackCopy
              });

            //SNACKBAR
                this.props.enqueueSnackbar(packet.statusMsg, { 
                persist: false,
                variant: variant,
              });

            if(packet.statusCode === "2001"){
              //GENERIC HANDLER
              MODULE_HANDLER(packet.moduleInfo, this);
            }
          
        }
        else if (this.props.location.pathname === packet.moduleInfo.module)
        {
            this.props.enqueueSnackbar(packet.statusMsg, { 
                persist: false,
                variant: variant,
            });
            //Copying Packet Into module
            COPIED_MODULE_PACKET[packet.moduleInfo.module] = packet;
            this.setState({MODULE_PACKET: COPIED_MODULE_PACKET});
        }
  }
  // SSE CHAT
  handleChatSSE = (msg, variant) =>{
      //PARSING Notification
    let promise = new Promise((resolve, reject) =>{

        if(this.state.MODULE_STATUS[`${ROUTE_FOLDER}/facebook`] === true) {
          const BASE64MSG = base64.decode(msg);
          const PACKET = JSON.parse(BASE64MSG);
          if(PACKET.message){
              const messagePacket = {...PACKET.message};
              messagePacket.timestamp = PACKET.timestamp;
              messagePacket.text = messagePacket.attachments ? "Attachment" : messagePacket.text;
                if(PACKET.sender.id !== this.state.MODULE_CONFIG['facebook'].page_id && PACKET.recipient.id === this.state.MODULE_CONFIG['facebook'].page_id){
                    messagePacket.flow = "IN";
                    //For Badge Count handle
                    this.setState({newChat : {sender: PACKET.sender.id, mid: PACKET.message.text}});
  
                      if(this.state.CHAT_STACK.some(e => e.sender === PACKET.sender.id)){
                        const CHAT_INDEX = this.state.CHAT_STACK.findIndex(e => e.sender === PACKET.sender.id);
                        const CHAT_STACK_COPY = [...this.state.CHAT_STACK];
                        CHAT_STACK_COPY[CHAT_INDEX].messages.push(messagePacket);
                        
                        //SNACKBAR
                        const notifyMsg = `${CHAT_STACK_COPY[CHAT_INDEX].user.first_name} : ${messagePacket.text}`;
                        this.props.enqueueSnackbar(notifyMsg, { 
                          persist: false,
                          variant: variant,
                          });
                        this.setState({CHAT_STACK : CHAT_STACK_COPY});
                        resolve(200);
                      }
                      else{
                        this.handleUserFetch(PACKET.sender.id, "first_name,last_name,picture").then(user => { 
                          const CHAT_STACK_COPY = [...this.state.CHAT_STACK];
                          const newSenderObj = {};
                          newSenderObj.sender = PACKET.sender.id;
                          newSenderObj.user = user;
                          newSenderObj.unread = 0;
                          newSenderObj.messages = [];
                          newSenderObj.messages.push(messagePacket);
                          CHAT_STACK_COPY.push(newSenderObj);
                          //SNACKBAR
                          const notifyMsg = `${user.first_name} : ${PACKET.message.text}`;
                          this.props.enqueueSnackbar(notifyMsg, { 
                            persist: false,
                            variant: variant,
                            });
                          this.setState({CHAT_STACK : CHAT_STACK_COPY});
                          resolve(200);
                        })
                      }
                }
          }
        }
        else {
          resolve(400);
        }

        });
        
    return promise;
 
  }
  //USER FETCH
  handleUserFetch = (userId, fields) => {

    const url = new URL(`https://graph.facebook.com/v5.0/${userId}?fields=${fields}&access_token=${this.state.MODULE_CONFIG.facebook.page_access_token}`);
    let promise = new Promise((resolve, reject) => {
        fetchCall(url,{},"json").then((result) => {
            resolve(result);
        },
        (error) => {
          //console.log(error);
        });
    });
    return promise;
  }
  //Token Queue
  getToken = (token) =>{
    let tokenCopy = [...this.state.tokenArray];
    tokenCopy.push(token);
    //SET TOKEN DATA
    localStorage.setItem('tokenArray', JSON.stringify(tokenCopy));
    this.setState({tokenArray: tokenCopy, isLoading : true});
  }
  handleLogout = () => {
    const url = new URL(`${PROTOCOL}${SERVER_IP}${API_URL}?mode=logout`);
		const fetchCallOptions = {
			method: "GET",
			credentials: "include"
		};
    fetchCall(url, fetchCallOptions, "json").then((res) => {
      if(res.appCode === 403)
      {
        this.props.loggedOutHandler().then(logoutStatus => {
          if(logoutStatus === 403) { 
            this.props.history.push(`/`);
          }
        });  
      }
    });

  }
  getFBChatHistory = () => {
    if(this.state.MODULE_CONFIG['facebook'] !== null){
      const pageId = this.state.MODULE_CONFIG['facebook'].page_id;
      const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/GetData/getChatHistory.php?pageId=${pageId}`);
      const fetchCallOptions = {
        method : "GET",
      };
        fetchCall(url,fetchCallOptions,"json").then(RES => {
           if(RES.result.length){
             const CHAT_STACK_COPY = [];
             const promises = RES.result.map(packet => {
              const message = {};
              message.sender = packet.sender;
              message.unread = 0;
              message.messages = packet.messages;
              CHAT_STACK_COPY.push(message);
              return  this.handleUserFetch(packet.sender, "first_name,last_name,picture");
             });

              Promise.all(promises).then(users => {
                users.forEach((user, index)=> {
                  CHAT_STACK_COPY[index].user = user;
                });
                this.setState({CHAT_STACK : CHAT_STACK_COPY,isLoading : false});
              })
              
            
           }
           else {
            this.setState({CHAT_STACK : [],isLoading : false});
           }

        },
        (error) => {
          console.log(error);
        });
    }
   
  }
  handleModulesToggle = (index) => {
    let moduleCopy = [...this.state.Modules];
    moduleCopy[index].open = !moduleCopy[index].open;
    this.setState({Modules : moduleCopy});
  }
  handleDrawerToggle = () => {
    this.setState({drawerOpen : !this.state.drawerOpen});
  }

render(){

  const { classes } = this.props;
    //Notification Loader : Circle
  const Loader = this.state.tokenArray.length ? <LinearProgress classes={{root : classes.rootProgress}} color="secondary" /> : null;
  const loadingContent = this.state.isLoading ? <NotificationsIcon /> : <WhatshotIcon /> ;
  const NotiBadge =  
    <IconButton size="small" onClick = {this.notiClickToggle} className={classes.notificationBell}>
      <Badge color="error" badgeContent={this.state.notiBadge} invisible={(this.state.notiBadge === 0)}>
        <NotificationsIcon />
        </Badge>
      </IconButton>;
  //Menu Modules

  const drawerModules = this.state.Modules.map((module, index) => {
    let clicker = null;

    if(module.onClickSet){
      clicker = this.handleLogout;
    }
    return (
      <MenuListBuilder 
        key={index}
        type={module.type}
        MiniDrawer={this.state.drawerOpen}
        selected={this.state.selectedMenu === "/" ? "/integration" : this.state.selectedMenu}
        Expand={() => this.handleModulesToggle(index)}
        onActive={(value) => this.setMenuItem(value)}
        name={module.name}
        path={module.path} 
        clickHandler = {clicker}
        subModule={module.subModule}
        icon={module.icon}
        status={this.state.MODULE_STATUS}
        open={module.open} /> 
      )
  });

  return (
      <div className={classes.root}>
      <CssBaseline />
      <Drawer
        style={{ overflowY: "unset" }}
       
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: this.state.drawerOpen,
          [classes.drawerClose]: !this.state.drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: this.state.drawerOpen,
            [classes.drawerClose]: !this.state.drawerOpen,
          }),
        }}
        anchor="left"
      >
        <div  className={`${classes.toolbar} ${classes.logobar}`} >
        <Avatar className={classes.purpleAvatar}>{loadingContent}</Avatar>
        <div className={classes.ingrid}><span className={classes.logoTitle}> CZ Social</span>
        <Typography className={classes.csupport} variant="caption">Customer Support</Typography></div>
        {NotiBadge}
        <NotificationTray anchorEl={this.state.anchorEl} data={this.state.notiStack} close={() => this.setState({anchorEl : null})} open={Boolean(this.state.anchorEl)} />
        </div>
        {Loader}
        <div className={classes.sliderCustom}>
        <List>
          {drawerModules}
        </List>
        </div> 
      </Drawer> 
      {/*Center Module */}
      <Switch>
      {this.props.AUTH && this.routes.map((route, index) => {
        let routeComponent = null;
        if(this.state.MODULE_STATUS[route.path]){  
          routeComponent = <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />;
        }
        return routeComponent;
      })}
      <Redirect to="/integration" from ="/" exact />
      <Route path="*" component={NotFound} />
      </Switch> 
    </div>
    );

 }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withSnackbar(withRouter(App)));
