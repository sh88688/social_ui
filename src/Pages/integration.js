import React from "react";
import PropTypes from "prop-types";

//Material UI
import {withStyles, Grid} from "../theme/muiComponents";
//Icons Material UI
import {SettingIcon, ShopIcon,TwitterIcon, FacebookIcon, InstagramIcon, GetAppIcon, CheckCircleIcon} from "../theme/muiIcons";

//Components
import AppBarBuilder from '../Components/AppBarBuilder';
import SocialCard from '../Components/SocialCardBuilder';
import fetchCall from '../Components/FetchCaller';
import GooglePlayStepper from '../moduleStepper/GooglePlay/googleStepper';
import InstaStepper from '../moduleStepper/Instagram/instaStepper';
import TwitterStepper from '../moduleStepper/Twitter/twitterStepper';
import FacebookStepper from '../moduleStepper/Facebook/facebookStepper';
import FacebookConfig from '../moduleStepper/Facebook/facebookConfig';
import GoogleConfig from '../moduleStepper/GooglePlay/googleConfig';

//import Json Schema
import formJson from '../FormSchema/emailSetting.json';
import {SERVER_IP, PROTOCOL, ROUTE_FOLDER} from '../Configs/apiConf';

//CSS Styles
const styles = theme => ({
      rootDiv: {
        width: "100%",
      },
      card: {
        width: "100%"
      },
      cardHeader:{
        padding: "12px",
        color: "#3148a0",
      },
      button:{
        float: "left",
        margin: "20px 10px 20px 0px",
      },
      delBtn:{
        float: "right",
        margin: "20px 10px 20px 0px",
        color: "#ef4a47",
      },
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      }
});


const System_Constants={};
System_Constants.MODULE_NAME="Integration";

const STEPPER = (props) => {
  const { module, COMPONENT } = props;
  switch (module) {
    case "google_play":
        return <GooglePlayStepper clientId={COMPONENT.props.clientId} handler={() => COMPONENT.setState({INSTALLING : false})} info={COMPONENT.props.info} tokenCallback={COMPONENT.props.tokenCallback} />;
    case "twitter":
        return <TwitterStepper clientId={COMPONENT.props.clientId} handler={() => COMPONENT.setState({INSTALLING : false})} info={COMPONENT.props.info} tokenCallback={COMPONENT.props.tokenCallback} />;
    case "facebook":
        return <FacebookStepper clientId={COMPONENT.props.clientId} handler={() => COMPONENT.setState({INSTALLING : false})} info={COMPONENT.props.info} tokenCallback={COMPONENT.props.tokenCallback} />;
    case "instagram":
        return <InstaStepper clientId={COMPONENT.props.clientId} handler={() => COMPONENT.setState({INSTALLING : false})} info={COMPONENT.props.info} tokenCallback={COMPONENT.props.tokenCallback} />;   
    default:
    //console.log(module);
    break;
  }
}

const CONFIGER = (props) => {
  const { module } = props;
  switch (module) {
    case "facebook":
        return <FacebookConfig  info={props.info} handler={props.handler} />;
    case "google_play":
        return <GoogleConfig  info={props.info} handler={props.handler} />;
    default:
    //console.log(module);
    break;
  }
}

class Integration extends React.Component {

  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props){
          super(props);
          this.state = {
            INSTALLING : false,
            EDITCONFIG: false,
            IS_LOADING:false,
            SOCIAL_LOADER: {
              google_play: false,
              twitter: false,
              facebook: false,
              instagram: false
            },
            STEPPER : null,
            INSTALL_FLAG: props.install
          };      
  }
//REACT 
componentDidMount(){
    //   let filter = {};
    //   GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Intial_NODATA, this);
}
UNSAFE_componentWillReceiveProps(nextProps){
  if(this.props.install !== nextProps.install)
  {
      this.setState({INSTALL_FLAG : nextProps.install});
  }
  else if(this.props.info !== nextProps.info) {

    if((nextProps.info.moduleInfo.action === "0")){
       //Loader Stop
        let copy_SOCIAL_LOADER = {...this.state.SOCIAL_LOADER};
        copy_SOCIAL_LOADER[nextProps.info.moduleInfo.subModule] = false;
        this.setState({SOCIAL_LOADER : copy_SOCIAL_LOADER});  
    }
    
    // this.props.handler((nextProps.info.moduleInfo.action === "create")); 
  }
}
//<==== HANDLERS ====>
handleInstall = (module) =>{
  this.setState({INSTALLING : true, STEPPER : module});
}
handleConfig = (module) =>{
  this.setState({EDITCONFIG : true, CONFIGER : module});
}
handleUninstall = (module) => {
  const Func = {google_play:"playStoreConfiguration",facebook:"facebookConfiguration",twitter:"",instagram:""};
  //Loader Start
  let copy_SOCIAL_LOADER = {...this.state.SOCIAL_LOADER};
  copy_SOCIAL_LOADER[module] = true;
  this.setState({SOCIAL_LOADER : copy_SOCIAL_LOADER});

  const Data = {};
  Data.event = Func[module];
  Data.action="uninstall";
  Data.client_id= this.props.clientId;
  Data.event_by="Admin";
  Data.moduleInfo = {};
  Data.moduleInfo.module = `${ROUTE_FOLDER}/integration`;
  Data.moduleInfo.subModule = module;
  Data.moduleInfo.action="0";
  Data.moduleInfo.moduleRoute={name: `${ROUTE_FOLDER}/${module}`, value: false};
  Data.data = {};
  Data.data.id = this.props.CONFIG[module].id;
 
  const queryParam = JSON.stringify(Data);

  const fetchCallOptions = {
    method: 'GET'
  };
  const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/api/save_request.php?reqPacket=${queryParam}`);
  //console.log(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/api/save_request.php?reqPacket=${queryParam}`);
  fetchCall(url,fetchCallOptions,"text").then((result) => {
        //console.log(result);
        if(module === 'facebook'){
          localStorage.setItem('CHAT_STACK',[]);
        }
        this.props.tokenCallback(result);
    },
    (error) => {
      //console.log(error);
    });

}

render(){
  const { classes } = this.props;

  const SocialModules = [
    {title: "Google Play",color: "#78bf22",icon : ShopIcon, module: "google_play"},
    {title: "Twitter",color: "#03a9f4",icon : TwitterIcon, module: "twitter"},
    {title: "Facebook",color: "#1976d2",icon : FacebookIcon, module: "facebook"},
    {title: "Instagram",color: "#ff6140",icon : InstagramIcon, module: "instagram"},
  ];
  return (
    <div className={classes.rootDiv}>
    <AppBarBuilder 
      IS_LOADING={this.state.IS_LOADING}
      PARENT={this.props.PARENT}
      headerTitle={System_Constants.MODULE_NAME}
      headerIcon={SettingIcon} />
    
    <main className={classes.content}>
      <div className={classes.toolbar} />
     {this.state.INSTALL_FLAG && <Grid 
            container 
            direction="row"
            justify="center"
            spacing={2}
           >
         {!(this.state.INSTALLING || this.state.EDITCONFIG) && SocialModules.map((item, index) => (
            <SocialCard 
            key={index}
            title={item.title}
            titleColor = {item.color}
            Loader={this.state.SOCIAL_LOADER[item.module]}
            disableBtn={parseInt(this.state.INSTALL_FLAG[item.module]) === 1}
            btnText={parseInt(this.state.INSTALL_FLAG[item.module]) === 1 ? "Installed" : "Install"}
            btnIcon={parseInt(this.state.INSTALL_FLAG[item.module]) === 1 ? <CheckCircleIcon /> : <GetAppIcon className={classes.btnIcon} />}
            icon={item.icon}
            editHandler={()=> this.handleConfig(item.module)}
            uninstallHandler ={() => this.handleUninstall(item.module)}
            installHandler = {() => this.handleInstall(item.module)}
            />
         ))
         }
         {this.state.EDITCONFIG && <CONFIGER module={this.state.CONFIGER} handler={() => this.setState({EDITCONFIG : false})} info={this.props.CONFIG[this.state.CONFIGER]}/>}
         {this.state.INSTALLING && <STEPPER module={this.state.STEPPER} COMPONENT={this} />}
      </Grid>}
    </main>

    </ div>
  );
}

};
Integration.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Integration);
