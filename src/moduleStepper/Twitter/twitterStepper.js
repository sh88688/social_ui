import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import PublishIcon from '@material-ui/icons/Publish';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
//Components
import SecondForm from './secondForm';
import isFormValid from '../../Components/FormValidSetter';
import fetchCall from '../../Components/FetchCaller';
//FORM SCHEMA
import formJson1 from '../../FormSchema/googlePlayForm1.json';
import formJson2 from '../../FormSchema/googlePlayForm2.json';

//Material UI
import {makeStyles, withStyles, Button} from "../../theme/muiComponents";


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
    1: <SettingsIcon />,
    2: <PublishIcon />,
    3: <VideoLabelIcon />,
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
  return ['Fill App Details', 'Upload JSON Credentials', 'All Done'];
}



class TwitterStepper extends React.Component {
  DEFAULT_JSON1 = JSON.stringify(formJson1);
  DEFAULT_JSON2 = JSON.stringify(formJson2);
    constructor(props){
        super(props);
        this.state = {
            activeStep : 0,
            Uploading: false,
            firstForm: formJson1,
            secondForm: formJson2
        }
    }

    componentWillUnmount(){
      console.log("===STEPPER== WUM ",this.state.firstForm[0].config);
      this.setState({firstForm : JSON.parse(this.DEFAULT_JSON1)});
    }
    componentWillReceiveProps(nextProps) {
      if(this.props.info !== nextProps.info)
      {
        console.log("===== [googleStepper.js] componentWillReceiveProps =====",nextProps.info);
        if(nextProps.info.statusCode === "2001")
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
      // return <FirstForm handler={this.handleFormState} Form={this.state.firstForm} />;
      return "Twitter is under development.";
    case 1:
      return <SecondForm loading={this.state.Uploading} handler={this.handleFormState} Form={this.state.secondForm} />;
    case 2:
      return <Typography >Your Google Play Account is Successfully Integrated.</Typography>;
    default:
      return 'Unknown step';
  }
}

handleFormState = (updatedFormState,index) =>{
	console.log(`onChangeform`);
}
handlePostData = () => {
  
  const Data = {};
  Data.event = "playStoreConfiguration";
  Data.action="create";
  Data.client_id="1";
  Data.event_by="Admin";
  Data.moduleInfo = {};
  Data.moduleInfo.module = "/integration";
  Data.moduleInfo.subModule = "google_play";
  Data.moduleInfo.action="1";
  Data.moduleInfo.moduleRoute={name: "/googleReviews", value: true};
  Data.data = {};
  Data.data.app_name = this.state.firstForm[0].config.value;
  Data.data.package_name = this.state.firstForm[1].config.value;
  Data.data.multipart = [];
  const multipartObj = {};
  multipartObj.upload_type = "single";
  multipartObj.field_name = "playstore_file";
  multipartObj.file_prefix = "playStoreCredentials_";
  Data.data.multipart.push(multipartObj);
  
  console.log(Data);
  const queryParam = JSON.stringify(Data);
  const postData = new FormData();
        postData.append('playstore_file',this.state.secondForm[0].config.file);

  const fetchCallOptions = {
    method: 'POST',
    body: postData
  };
  const url = new URL(`http://172.16.3.46/CZ_SOCIAL/api/save_request.php?reqPacket=${queryParam}`);
  fetchCall(url,fetchCallOptions,"text").then((result) => {
        console.log(result);
        this.props.tokenCallback(result);
    },
    (error) => {
      console.log(error);
    });

}
 handleNext = () => {
 
      const formIndex = ['firstForm','secondForm'];
      let Form = formIndex[this.state.activeStep];
      let didFormValid = isFormValid(this.state[Form]);
      this.setState({ [Form] : didFormValid.validatedForm }); 

      if(this.state.activeStep === 0)
      {
        if (didFormValid.formValidity) {  
          this.setState((prevState, props) => {
            return {activeStep: prevState.activeStep + 1, secondForm : JSON.parse(this.DEFAULT_JSON2)};
          });
        }
      }
      else if(this.state.activeStep === 1)
      {
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
                    disabled={true}
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

export default withStyles(styles)(TwitterStepper);