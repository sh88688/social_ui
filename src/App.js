import React from "react";
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import base64  from 'base-64';
import { withSnackbar } from 'notistack';

//Material UI
import {withStyles,Drawer,CssBaseline,List,Avatar,IconButton,Badge,CircularProgress} from "./theme/muiComponents";
//Icons Material UI
import { NotificationsIcon, WhatshotIcon } from "./theme/muiIcons";

//Center Pages
import GoogleReview from './Pages/googleReviews';
import Support from './Pages/support';
import Profile from './Pages/profile';
import Integration from './Pages/integration';
import Users from './Pages/users';

import AccountSetting from './Pages/accountSetting';
//Components
import fetchCall from './Components/FetchCaller';
import MenuListBuilder from './Components/menuListBuilder';
import NotificationTray from './Components/NotificationTray';

//other
import {SERVER_IP, PROTOCOL, API_URL} from './Configs/apiConf';
import {drawerWidthRight,drawerWidthLeft } from './theme/drawerConfig';
import Modules from './moduleLister/moduleList';

const styles = theme => ({
  root: {
    display: "flex"
  },
  notificationBell:{
    marginLeft: "35px",
    color : theme.palette.common.main,
  },
  fabProgress: {
    color: "#921aff",
    position: 'absolute',
    top: 7,
    left: 22,
    zIndex: 1,
  },
  logoTitle:{
    paddingLeft:"10px",
    fontSize:"18px",
    color: theme.palette.secondary.main,
  },
  purpleAvatar:{
    background: "linear-gradient(150deg, #ff134a, #921aff)",
    width: "43px",
    height: "43px",
    
  },
  drawerLeft: {
    width: drawerWidthLeft,
    flexShrink: 0
  },
  drawerPaperLeft: {
    width: drawerWidthLeft,
    borderRight: " solid 1px #0000001f",
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
    paddingLeft: "25px",
    borderBottom: " solid 1px #0000001f"
  },
  toolbar: theme.mixins.toolbar,
});

class App extends React.Component {

  //Notification Channel URL
  serverURL = "http://172.16.3.45/czsocial_notification/notification.php";
  sseSource = null;

  //Routes
  routes = [
    {
      path: "/",
      exact: true,
      isActive: true,
      main: () => <Integration install={this.state.INSTALL_FLAG} handler={this.handleGoogleActive} info={this.state.MODULE_PACKET["/integration"]} tokenCallback={this.getToken}  />  
    },
    {
      path: "/googleReviews",
      exact: false,
      main: () => <GoogleReview  info={this.state.MODULE_PACKET["/intents"]} tokenCallback={this.getToken} />
    },
    {
      path: "/integration",
      exact: false,
      main: () => <Integration install={this.state.INSTALL_FLAG} handler={this.handleGoogleActive} info={this.state.MODULE_PACKET["/integration"]} tokenCallback={this.getToken} />  
    },
    {
      path: "/users",
      exact: false,
      main: () => <Users  />    
    },
    
    {
      path: "/support",
      exact: false,
      main: () => <Support  />    
    },
    {
      path: "/profile",
      exact: false,
      main: () => <Profile  />    
    },
    {
      path: "/accountSetting",
      exact: false,
      main: () => <AccountSetting  />    
    }

  ];

  constructor(props)
  {
    super(props);
    this.state = {
      selectedMenu: this.props.location.pathname,
      tokenArray:[],
      notiStack:[],
      notiBadge:0,
      notiOpen: false,
      anchorEl : null,
      MODULE_PACKET:{
        "/intentLabel":null,
        "/integration":null,
      },
      MODULE_STATUS:{
        "/": true,
        "/googleReviews": false,
        "/integration": true,
        "/support": true,
        "/profile": true,
        "/accountSetting": true,
        "/logout": true,
        "/users": true
      },
      INSTALL_FLAG:false,
      isLoading: false,
      Modules: Modules,
    }; 

  }
  UNSAFE_componentWillMount(){
    this.handleModuleStatus();
  }
  //REACT Notification SSE : Connection Intialize 
  componentDidMount(){
    //LOAD TOKEN DATA
    if(localStorage.getItem('tokenArray'))
    {
      this.setState({tokenArray : JSON.parse(localStorage.getItem('tokenArray'))});
    }
    console.log("%c!! FUNC-INFO => [App.js] componentDidMount  !!","color : green; font-weight: 900;");
    if (window.EventSource) {
      // var queryString = "?userId=1";
      //Initiating
      try {
        this.sseSource = new EventSource(this.serverURL);
        console.log ("%c Initiating SSE.","color : orange; font-weight: 800;");
      }catch (e) {
        console.error ("Unable to initiate SSE.");
      }
      //Open
      this.sseSource.addEventListener ("open", function (e) {
        console.log ("%c Opening SSE.","color : orange; font-weight: 800;");
      });
      //Message
      this.sseSource.addEventListener ("message", (e) => {
        console.log ("%c Message received from SSE.","color : orange; font-weight: 800;");
        // console.log ("%c Data: ","color : orange; font-weight: 800;", e.data);
        this.handleSSE(e.data,"success"); 
      });
      //Error
      this.sseSource.addEventListener ("error", (e) => {
        console.log ("%c Some error occured in SSE.","color : red;font-weight : 800;");
      });
    }
    else {
      console.error ("SSE is not supported!");
    }

  }

  handleModuleStatus = () => {
    const fetchCallOptions = {
      method: 'GET',
    };
    const url = new URL(`http://172.16.3.46/CZ_SOCIAL/checkSocialConfiguration.php?cl_key=1`);
    fetchCall(url,fetchCallOptions,"json").then((result) => {
          
          if(result.google_play === "1"){
            let copy_MODULE_STATUS = {...this.state.MODULE_STATUS};
            copy_MODULE_STATUS['/googleReviews'] = true;
            this.setState({MODULE_STATUS: copy_MODULE_STATUS, INSTALL_FLAG: result});
          }
          else
          {
            let copy_MODULE_STATUS = {...this.state.MODULE_STATUS};
            copy_MODULE_STATUS['/googleReviews'] = false;
            this.setState({MODULE_STATUS: copy_MODULE_STATUS, INSTALL_FLAG: result});
          }
      },
      (error) => {
        console.log(error);
      });
  }
  //handleGoogle
  handleGoogleActive = (state) => {
    let copy_MODULE_STATUS = {...this.state.MODULE_STATUS};
    copy_MODULE_STATUS['/googleReviews'] = state;
    this.setState({MODULE_STATUS: copy_MODULE_STATUS});
  }
  //REACT SSE Connection : Close 
  componentWillUnmount(){
    console.log("%c!! FUNC-INFO => [App.js] componentWillUnmount  !!","color: brown;font-weight:800;");
    this.sseSource.close();
  }

  notiClickToggle = (event) =>{
  this.setState({notiOpen : !this.state.notiOpen, anchorEl : event.currentTarget, notiBadge : 0});  
  }
  // Menu Selection : Active
  setMenuItem = (selection) =>{
    console.log("selection ",selection);
    this.setState({selectedMenu: selection});
  }

  // SSE Notification : Handler
  handleSSE = (msg,variant) =>{
      
      if(msg !== "false")
      { 
        const packet = JSON.parse(msg);
        console.table(packet);
        const COPIED_MODULE_PACKET = {...this.state.MODULE_PACKET};
        //Push Data in NotiTray
        let notiStackCopy = [...this.state.notiStack];
        notiStackCopy.unshift(packet);
        if(this.state.tokenArray.some(e => e === packet.token))
        {
            //REMOVING TOKEN 
            let tokenCopy = [...this.state.tokenArray]
            tokenCopy = tokenCopy.filter(item => item !== packet.token);
             //UPDATE tokenArray
            localStorage.setItem('tokenArray', JSON.stringify(tokenCopy));
            //Copying Packet Into module
            COPIED_MODULE_PACKET[packet.moduleInfo.module] = packet;
             //UPDATING STATE
            this.setState({
              notiBadge : this.state.notiBadge + 1,
              tokenArray: tokenCopy,
              MODULE_PACKET: COPIED_MODULE_PACKET,
              isLoading : false,
              notiStack : notiStackCopy
              });
              //SNACKBAR
              this.props.enqueueSnackbar(packet.statusMsg, { 
                persist: false,
                variant: variant,
            });
          
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
  }

  //Token Queue
  getToken = (token) =>{
    console.log(token);
    let tokenCopy = [...this.state.tokenArray];
    tokenCopy.push(token);
    //SET TOKEN DATA
    localStorage.setItem('tokenArray', JSON.stringify(tokenCopy));
    this.setState({tokenArray: tokenCopy, isLoading : true});
  }
  
  handleLogout = () => {

    //Making data
   const formData = {};
   formData.uuid = this.state.uuid;
   formData.reqType = "userLogout";
   formData.username = this.state.username
   let postData = JSON.stringify(formData);
   //Encode into base64
   console.log('apicall',postData);
    postData = base64.encode(postData);
    //concat with parameters
    let queryParam = `postData=${postData}`;
    const url = new URL(`${PROTOCOL}${SERVER_IP}${API_URL}${queryParam}`);
    console.log('apicall',`${PROTOCOL}${SERVER_IP}${API_URL}${queryParam}`);
    fetchCall(url,"json").then((result) => {
          console.log(result);
          if(result.Success)
          {
              localStorage.removeItem('auth');
              this.setState({isLoggedin: false});
          }
      },
      (error) => {
              this.setState({
                isLoading: false,
              });
      });

    // console.log(Auth.uuid);
  }

  handleModulesToggle = (index) => {
    let moduleCopy = [...this.state.Modules];
    moduleCopy[index].open = !moduleCopy[index].open;
    this.setState({Modules : moduleCopy});
  }

render(){
  const { classes } = this.props;
    //Notification Loader : Circle
  const Loader = this.state.isLoading ? (
      <CircularProgress  size={49} thickness={2.7} className={classes.fabProgress} />
    ) : null;
  const loadingContent = this.state.isLoading ? <NotificationsIcon /> : <WhatshotIcon /> ;
  const NotiBadge =  
    <IconButton onClick = {this.notiClickToggle} className={classes.notificationBell}>
      <Badge color="error" badgeContent={this.state.notiBadge} invisible={(this.state.notiBadge === 0)}>
        <NotificationsIcon />
        </Badge>
      </IconButton>;
  //Menu Modules

  const drawerModules = this.state.Modules.map((module, index) => (
  <MenuListBuilder 
    key={index}
    type={module.type}
    selected={this.state.selectedMenu}
    Expand={() => this.handleModulesToggle(index)}
    onActive={(value) => this.setMenuItem(value)}
    name={module.name}
    path={module.path} 
    subModule={module.subModule}
    icon={module.icon}
    status={this.state.MODULE_STATUS}
    open={module.open} /> 
  ));

  return (
    <div className={classes.root}>
    <CssBaseline />
    <Drawer
      style={{ overflowY: "unset" }}
      className={classes.drawerLeft}
      variant="permanent"
      classes={{
        paper: classes.drawerPaperLeft
      }}
      anchor="left"
    >
      <div  className={`${classes.toolbar} ${classes.logobar}`} >
      <Avatar className={classes.purpleAvatar}>{loadingContent}</Avatar>
      <span className={classes.logoTitle}> CZ Social</span>
      {NotiBadge}
      {Loader}
      <NotificationTray anchorEl={this.state.anchorEl} data={this.state.notiStack} close={() => this.setState({anchorEl : null})} open={Boolean(this.state.anchorEl)} />
      </div>
      <div className={classes.sliderCustom}>
      <List>
        {drawerModules}
      </List>
      </div> 
    </Drawer>

    
    {/*Center Module */}
    <Switch>
    {this.routes.map((route, index) => {
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
    </Switch>

    {/*Right Drawer */}
    <Drawer
      className={classes.drawerRight}
      variant="permanent"
      classes={{
        paper: classes.drawerPaperRight
      }}
      anchor="right"
    >
    <div className={classes.toolbar} />
   
    </Drawer>
  </div>
  );
 }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withSnackbar(withRouter(App)));
