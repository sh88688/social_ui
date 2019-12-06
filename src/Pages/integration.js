import React from "react";
import PropTypes from "prop-types";

//Material UI
import {withStyles, Grid} from "../theme/muiComponents";
//Icons Material UI
import {SettingIcon, GetAppIcon, CheckCircleIcon} from "../theme/muiIcons";

//Components
import AppBarBuilder from '../Components/AppBarBuilder';
import SocialCard from '../Components/SocialCardBuilder';
import fetchCall from '../Components/FetchCaller';
import GooglePlayStepper from '../moduleStepper/GooglePlay/googleStepper';
//Social Images
import playStore from '../assets/Social/playstore.svg';
import twitterIcon from '../assets/Social/twitter.svg';
import facebookIcon from '../assets/Social/facebook.svg';
import instagramIcon from '../assets/Social/instagram.svg';
//import Json Schema
import formJson from '../FormSchema/emailSetting.json';

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

const Intial_NODATA = {};
Intial_NODATA.title = "No intent Labels yet.";
Intial_NODATA.description = "Intent Label Description";
Intial_NODATA.type = "intial";

const Search_NODATA = {};
Search_NODATA.title = "No Records Found !";
Search_NODATA.description = "";
Search_NODATA.type = "search";

const System_Constants={};
System_Constants.API_PAGE="intentLabel";
System_Constants.MODULE_PAGE="/intentLabel";
System_Constants.ID_FIELD="intent_label_id";
System_Constants.FIELD_NAME='intent_label'
System_Constants.MODULE_NAME="Integration";

class Integration extends React.Component {

  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props)
  {
          super(props);
          this.state = {
            INSTALLING : false,
            IS_LOADING:false,
            SOCIAL_LOADER: {
              google_play: false,
              twitter: false,
              facebook: false,
              instagram: false
            },
            DATA_ARRAY:[],
            INSTALL_FLAG: props.install,
            DATA_COUNT: "",
            NO_DATA_CONTENT: Intial_NODATA,
          };      
  }
//REACT 
componentDidMount()
{
    //   let filter = {};
    //   GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Intial_NODATA, this);
}
UNSAFE_componentWillReceiveProps(nextProps)
{
  if(this.props.install !== nextProps.install)
  {
      this.setState({INSTALL_FLAG : nextProps.install});
  }
  else if(this.props.info !== nextProps.info) {
    console.log('===> Recive props INFO : integration ',nextProps.info);
    let copy_INSTALL_FLAG = {...this.state.INSTALL_FLAG};
    let flag = (nextProps.info.moduleInfo.action === "create") ? "1" : "0";
    if((nextProps.info.moduleInfo.action !== "create")){
       //Loader Stop
        let copy_SOCIAL_LOADER = {...this.state.SOCIAL_LOADER};
        copy_SOCIAL_LOADER['google_play'] = false;
        this.setState({SOCIAL_LOADER : copy_SOCIAL_LOADER});
        this.props.handler(false);   
    }
    copy_INSTALL_FLAG[nextProps.info.moduleInfo.subModule] = flag;
    console.log(flag,'===> Recive props INFO : FLAG ',copy_INSTALL_FLAG);
    this.setState({INSTALL_FLAG : copy_INSTALL_FLAG});
  }
}
//<==== HANDLERS ====>
handleInstall = (module) =>{
  this.setState({INSTALLING : true});
  switch (module) {
    case "googleplay":
      break;
  
    default:
      console.log(module);
      break;
  }
}

handleUninstall = (module = "playStoreConfiguration") => {
  //Loader Start
  let copy_SOCIAL_LOADER = {...this.state.SOCIAL_LOADER};
  copy_SOCIAL_LOADER['google_play'] = true;
  this.setState({SOCIAL_LOADER : copy_SOCIAL_LOADER});

  const Data = {};
  Data.event = module;
  Data.action="uninstall";
  Data.client_id="1";
  Data.event_by="Admin";
  Data.moduleInfo = {};
  Data.moduleInfo.module = "/integration";
  Data.moduleInfo.subModule = "google_play";
  Data.moduleInfo.action="uninstall";
  Data.data = {};
  Data.data.id = "1";
  console.log(Data);
  const queryParam = JSON.stringify(Data);

  const fetchCallOptions = {
    method: 'GET'
  };
  const url = new URL(`http://172.16.3.46/CZ_SOCIAL/api/save_request.php?reqPacket=${queryParam}`);
  console.log("%c URL UNINSTALL : ","font-weight:600;color:skyblue;",`http://172.16.3.46/CZ_SOCIAL/api/save_request.php?reqPacket=${queryParam}`)
  fetchCall(url,fetchCallOptions,"text").then((result) => {
        console.log(result);
        this.props.tokenCallback(result);
    },
    (error) => {
      console.log(error);
    });

}

googleplayHandler = () => {
this.setState({INSTALLING : false});
this.props.handler(true);
}

render(){
  const { classes } = this.props;
  console.log("==>render==> ",this.state.INSTALL_FLAG);
  const SocialModules = [
    {title: "Google Play",color: "#689f38",icon : playStore, module: "google_play"},
    {title: "Twitter",color: "#03a9f4",icon : twitterIcon, module: "twitter"},
    {title: "Facebook",color: "#1976d2",icon : facebookIcon, module: "facebook"},
    {title: "Instagram",color: "#ff6140",icon : instagramIcon, module: "instagram"},
  ];
  return (
    <div className={classes.rootDiv}>
    <AppBarBuilder 
      IS_LOADING={this.state.IS_LOADING}
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
         {!this.state.INSTALLING && SocialModules.map((item, index) => (
            <SocialCard 
            key={index}
            title={item.title}
            titleColor = {item.color}
            Loader={this.state.SOCIAL_LOADER[item.module]}
            disableBtn={this.state.INSTALL_FLAG[item.module] == 1}
            btnText={this.state.INSTALL_FLAG[item.module] == 1 ? "Installed" : "Install"}
            btnIcon={this.state.INSTALL_FLAG[item.module] == 1 ? <CheckCircleIcon /> : <GetAppIcon className={classes.btnIcon} />}
            icon={item.icon}
            uninstallHandler ={() => this.handleUninstall()}
            installHandler = {() => this.handleInstall(item.module)}
            />
         ))
         }
         {this.state.INSTALLING && <GooglePlayStepper handler={this.googleplayHandler} info={this.props.info} tokenCallback={this.props.tokenCallback} />}
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
