import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
//Components
import FirstForm from './firstForm';
import SecondForm from './secondForm';
import isFormValid from '../../Components/FormValidSetter';
import fetchCall from '../../Components/FetchCaller';
//FORM SCHEMA
import formJson1 from '../../FormSchema/googlePlayForm1.json';
import formJson2 from '../../FormSchema/facebookForm2.json';

//Material UI
import {makeStyles, withStyles, Button} from "../../theme/muiComponents";
import {FlagIcon, FacebookIcon, DoneIcon} from "../../theme/muiIcons";
import {SERVER_IP, PROTOCOL, ROUTE_FOLDER} from '../../Configs/apiConf';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 136deg, #f997b8 0%, #d86fce 50%, rgb(151, 32, 252) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 136deg, #f997b8 0%, #d86fce 50%, rgb(151, 32, 252) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, #f997b8 0%, #d86fce 50%, rgb(151, 32, 252) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, #f997b8 0%, #d86fce 50%, rgb(151, 32, 252) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <FacebookIcon />,
    2: <FlagIcon />,
    3: <DoneIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(3, 2),
  },
  stepRoot:{
    paddingTop: "0px"
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    padding: theme.spacing(1, 7, 3, 7),
    textAlign: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

function getSteps() {
  return ['Account Login', 'Select Your Facebook Page', 'All Done'];
}



class InstaStepper extends React.Component {
  DEFAULT_JSON1 = JSON.stringify(formJson1);
  DEFAULT_JSON2 = JSON.stringify(formJson2);
    constructor(props){
        super(props);
        this.state = {
            activeStep : 0,
            userToken: "",
            userId: "",
            userPageId: "",
            userPageName: "",
            userPageToken: "",
            isLoggedIn: false,
            Uploading: false,
            firstForm: formJson1,
            secondForm: formJson2
        }
    }

    componentWillUnmount(){
      //console.log("===STEPPER== WUM ",this.state.firstForm[0].config);
      this.setState({firstForm : JSON.parse(this.DEFAULT_JSON1)});
    }
    componentWillReceiveProps(nextProps) {
      if(this.props.info !== nextProps.info)
      {
        //console.log("===== [googleStepper.js] componentWillReceiveProps =====",nextProps.info);
        if(nextProps.info.statusCode === "2001" && nextProps.info.moduleInfo.subModule === 'facebook')
        {
          this.setState((prevState, props) => {
            return {activeStep: prevState.activeStep + 1, secondForm : JSON.parse(this.DEFAULT_JSON2)};
          });
        }
      }
    }
//<==== HANDLERS ====>

getStepContent = (step) => {
  switch (step) {
    case 0:
      return <FirstForm COMPONENT={this} isLoggedIn={this.state.isLoggedIn} />;
    case 1:
      return <SecondForm loading={this.state.Uploading} COMPONENT={this} pageName={this.state.userPageName} pageId={this.state.userPageId} userId={this.state.userId} userToken={this.state.userToken} handler={this.handleFormState} Form={this.state.secondForm} />;
    case 2:
      return <Typography >Your Facebook Page is Successfully Integrated with CZ Social.</Typography>;
    default:
      return 'Unknown step';
  }
}

handleFormState = (updatedFormState,index) =>{
	//console.log(`onChangeform`);
}
handlePageAccessToken = (page_id, token) =>{
  let promise = new Promise((resolve, reject) => {

          const fetchCallOptions = {
            method: 'GET',
          };
          const url = new URL(`https://graph.facebook.com/v5.0/${page_id}?fields=access_token&access_token=${token}`);  
          fetchCall(url,fetchCallOptions,"json").then((result) => {
              if(result.access_token){
                //console.log('PAGE ACCESS TOKEN ',result);
                  if(result.access_token) {
                    resolve(result.access_token);
                  }
              }         
            },
            (error) => {
              //console.log(error);
            });

  });
  return promise;
}
handlePageSubscribe = (page_id, token) => {
  let promise = new Promise((resolve, reject) => {
    const data = {};
    data.access_token = token;
    //console.log('subscribe token ',data);
    const fetchCallOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    //console.log(`https://graph.facebook.com/v5.0/${page_id}/subscribed_apps?subscribed_fields=messages,message_deliveries,message_reads,messaging_postbacks,message_echoes`);
    const url = new URL(`https://graph.facebook.com/v5.0/${page_id}/subscribed_apps?subscribed_fields=messages,message_deliveries,message_reads,messaging_postbacks,message_echoes`);

    fetchCall(url,fetchCallOptions,"json").then((result) => {
        if(result.success){
          resolve(result.success);
        }         
      },
      (error) => {
        //console.log(error);
      });
   });
  return promise;
}
handlePostData = () => {

  if(this.state.userToken !== "" && this.state.secondForm[0].config.value !== ""){
      this.handlePageAccessToken(this.state.secondForm[0].config.value, this.state.userToken).then( page_access_token => {

        this.handlePageSubscribe(this.state.secondForm[0].config.value, page_access_token).then(res => {
          //console.log('handlePageSubscribe',res);  
          if(res === true) {                       
                const Data = {};
                Data.event = "facebookConfiguration";
                Data.action="create";
                Data.client_id= this.props.clientId;
                Data.event_by="Admin";
                Data.moduleInfo = {};
                Data.moduleInfo.module = `${ROUTE_FOLDER}/integration`;
                Data.moduleInfo.subModule = "facebook";
                Data.moduleInfo.action="1";
                Data.moduleInfo.moduleRoute={name: `${ROUTE_FOLDER}/facebook`, value: true};
                Data.data = {};
                Data.data.user_id = this.state.userId;
                Data.data.user_access_token = this.state.userToken;
                Data.data.page_id = this.state.secondForm[0].config.value;
                Data.data.page_name = this.state.secondForm[0].config.displaytext;
                Data.data.page_access_token = page_access_token;
                const queryParam = JSON.stringify(Data);           
                const fetchCallOptions = {
                  method: 'GET',
                };
                const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/api/save_request.php?reqPacket=${queryParam}`);
                //console.log(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/api/save_request.php?reqPacket=${queryParam}`);
                fetchCall(url,fetchCallOptions,"text").then((result) => {
                      //console.log(result);
                      this.props.tokenCallback(result);
                  },
                  (error) => {
                    //console.log(error);
                  });   
          }
      });}); 
  }
  else {
    //console.warn("TOKEN EMPTY");
  }

}
 handleNext = () => {    
      if(this.state.activeStep === 0)
      {
        if (this.state.userId !== "" && this.state.userToken !=="") {  
          this.setState((prevState, props) => {
            return { activeStep: prevState.activeStep + 1 ,Uploading : true };
          });
        }
      }
      else if(this.state.activeStep === 1)
      {
        let didFormValid = isFormValid(this.state.secondForm);
        this.setState({ secondForm : didFormValid.validatedForm }); 
        if (didFormValid.formValidity) { 
          this.handlePostData();
          this.setState({Uploading : true});
          }
      }
  };
 handleBack = () => {

    if(this.state.activeStep === 2)
    {
      this.setState((prevState, props) => {
        return {activeStep: prevState.activeStep - 1, secondForm : JSON.parse(this.DEFAULT_JSON2)};
      });
    }
    else
    {
      this.setState((prevState, props) => {
        return {activeStep: prevState.activeStep - 1};
      });
    }

    };

 handleReset = () => {
     this.setState({activeStep: 0});
    };

 render(){
        const {classes} = this.props;
        const steps = getSteps();

        return (
          <Paper className={classes.root}>
              <Stepper className={classes.stepRoot} alternativeLabel activeStep={this.state.activeStep} connector={<ColorlibConnector />}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            <div key="stepcontent">
                  <React.Fragment>
                  <div className={classes.instructions}>
                    {this.getStepContent(this.state.activeStep)}
                  </div>
                  <Button onClick={this.state.activeStep === 0 ? this.props.handler : this.handleBack}  variant="outlined" className={classes.button}>
                  {this.state.activeStep === 0 ? 'Cancel' : 'Back'}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={!this.state.isLoggedIn}
                    onClick={this.state.activeStep === steps.length - 1 ? this.props.handler : this.handleNext}
                    className={classes.button}
                  >
                    {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                  </React.Fragment>
            </div>
          </Paper>
          );
    }
}

export default withStyles(styles)(InstaStepper);