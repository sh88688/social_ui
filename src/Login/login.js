import React from 'react';
import { Redirect } from 'react-router-dom';
// import base64  from 'base-64';

//Material UI
import {withStyles,Typography,Paper,Grid,Avatar,CssBaseline,Box} from "../theme/muiComponents";
//Icons Material UI
import {LockOutlinedIcon} from "../theme/muiIcons";

//Login Components
import SignIN from './Components/signin';
import SignUP from './Components/signup';
import OTP from './Components/otp';
//Schema
import SigninFormJson from '../FormSchema/signinForm';
import SignupFormJson from '../FormSchema/signupForm';
import OtpFormJson from '../FormSchema/otpForm';
//Components
import FormRender from '../Components/FormRender';
import isFormValid from '../Components/FormValidSetter';
import fetchCall from '../Components/FetchCaller';
import SnackbarBuilder from '../Components/SnackbarBuilder';
import formJsonResetter from '../Components/JsonResetter';
import CircularProgress from '@material-ui/core/CircularProgress';
//others
import cover from '../assets/preview.jpg';
import {SERVER_IP, PROTOCOL, API_URL} from '../Configs/apiConf';

let Client_IP = "";


const styles = theme => ({
  root: {
    height: '100vh',
  },
  success:{
    color:"green",
    marginTop:"15px"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  error:{
    color:"red",
    marginTop:"15px"
  },
  fabProgress: {
    color: "#0499dc",
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  link:{
    color: theme.palette.common.main
  },
  image: {
    backgroundImage: `url('https://assets.materialup.com/uploads/b9e3994c-0753-4287-bad3-14098d2539d6/preview.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(5, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowX:"hidden"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});




class Login extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      snackopen:false,
      SnackVariant:"success",
      SnackTitle:null,
      userRegisterID:null,
      registeredSubtitle:"",
      signInForm: SigninFormJson,
      signUpForm: SignupFormJson,
      otpForm: OtpFormJson,
      signInState:true,
      signUpState:false,
      otpState:false,
      isLoading:false,
      isLoggedIn:false
    };

    /*
    //Getting Server IP from PHP
    const url = new URL('http://172.16.3.46/CZ_SOCIAL/chatbot_ui/src/Login/server.php');
    fetchCall(url,"text").then((data) => {
      Client_IP = data;
    });
    */
    
  }

  handleSigninSubmit = (event) => {
    event.preventDefault();
    //Checking Validity
    let didFormValid = isFormValid(this.state.signInForm);
    this.setState({
      signInForm: didFormValid.validatedForm,
    }); 
   //Making data
   const formData = new FormData();
   formData.append('reqType','userAuthenticate');
   formData.append('username',this.state.signInForm[0].config.value);
   formData.append('password', this.state.signInForm[1].config.value);
   formData.append('removeSession','1');
   formData.append('login_type','crm');
   formData.append('clientIP',Client_IP);
  //  let postData = JSON.stringify(formData);
   //Encode into base64
    //~ postData = base64.encode(postData);
    //concat with parameters
   //~ let queryParam = `postData=${postData}`;
   
   if (didFormValid.formValidity) {  
    this.setState({
      isLoading:true
    });
    //~ const url = new URL(`${PROTOCOL}${SERVER_IP}${API_URL}${queryParam}`);
    const url = new URL(`${PROTOCOL}${SERVER_IP}${API_URL}`);
    console.log('apicall',`${PROTOCOL}${SERVER_IP}${API_URL}`);
    const fetchCallOptions = {
		method: "POST",
    body: formData,
    credentials: 'include' 
	};
    fetchCall(url, fetchCallOptions, "json").then((result) => {
      console.log (result);
      console.log(document.cookie);
          if(result.appCode === 200)
          {
              // localStorage.setItem('auth',JSON.stringify(result));
              formJsonResetter(SigninFormJson); 
              this.setState({
                isLoading: false,
                isLoggedIn: true
              });
              this.props.loggedInHangler();
          }
          else if(result.Error)
          {
              this.handleSnackOpen(result.Error,"error");
              this.setState({
                isLoading: false,
              });
          }
        
      },
      (error) => {
              this.setState({
                isLoading: false,
              });
      })
    
    }//if close
  };
  
  handleSignupSubmit = (event) =>{
    event.preventDefault();
    let didFormValid = isFormValid(this.state.signUpForm);
    this.setState({
      signUpForm: didFormValid.validatedForm,
    });
    //making data
    const formData = {};
    formData.skipAuth = "1";
    formData.reqType = "userRegister";
    formData.first_name = "";
    formData.last_name = "";
    this.state.signUpForm.forEach((element,index) =>{
      formData[element.id] = element.config.value;
    });
    // let postData = JSON.stringify(formData);
      // postData = base64.encode(postData);
    // let queryParam =`postData=${postData}&skipAuth=1`;
    
    if (didFormValid.formValidity) {  
      this.setState({
        isLoading: true,
      });
      // const url = new URL(`${PROTOCOL}${SERVER_IP}${API_URL}${queryParam}`);
      /*
      fetchCall(url,"json").then((result) => {
            if(result.userID)
            {
              this.handleSnackOpen(`User has been registered ${result.userID}`,"success");
              this.setState({
                userRegisterID:result.userID,
                signInState:false,
                signUpState:false,
                otpState:true,
                isLoading:false
              });
            }
            else
            {
              this.setState({
                isLoading:false
              });
              this.handleSnackOpen(result.Error,"error");
            }
        },
        // Note: it's important to handle errors here
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoading: false,
            errorMessage: error
          });
        }) 
        */

    }// end if

   
  };

  handleUserVerify = (event) => {
    event.preventDefault();
    
    let didFormValid = isFormValid(this.state.otpForm);
    this.setState({
      otpForm: didFormValid.validatedForm,
    });
    //making data
    const formData = {};
    formData.skipAuth = "1";
    formData.reqType = "userVerify";
    formData.mobile = this.state.signUpForm[1].config.value;
    formData.email = this.state.signUpForm[2].config.value;
    formData.otp = this.state.otpForm[0].config.value;
    formData.regenrateFlag = "";
    // let postData = JSON.stringify(formData);
    // postData = base64.encode(postData);
    // let queryParam =`postData=${postData}&skipAuth=1`;

    if(this.state.otpForm[1].config.value !== this.state.otpForm[2].config.value)
    {
      let formCopy = [...this.state.otpForm];
      formCopy[2].config.valid = false;
      formCopy[2].config.elementConfig.helperText = "Password did not match.";
      this.setState({
        otpForm: formCopy
      });
    }
    else if(didFormValid.formValidity) {  
      this.setState({
          isLoading: true,
        });

        // const url = new URL(`${PROTOCOL}${SERVER_IP}${API_URL}${queryParam}`);
        /*
        fetchCall(url,"json").then((result) => {

          if(result.Success)
          {
            
            this.setPasswordAPI();
          }
          else
          {
            this.setState({
              isLoading:false
            });
            this.handleSnackOpen(result.Error,"error");
          }
        },
        // Note: it's important to handle errors here
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoading: false,
            errorMessage: error
          });
        })
        */ 

    }// end if


  };

  setPasswordAPI = () => {
    //making data
    const formData = {};
    formData.skipAuth = "1";
    formData.reqType = "setPassword";
    formData.mobile = this.state.signUpForm[1].config.value;
    formData.email = this.state.signUpForm[2].config.value;
    formData.verify_using_otp = this.state.otpForm[0].config.value;
    formData.password = this.state.otpForm[1].config.value;
    formData.re_password = this.state.otpForm[2].config.value;
    formData.regenrateFlag = "";
    formData.first_name = "";
    formData.last_name = "";
    formData.registration_id = this.state.userRegisterID;
      // let postData = JSON.stringify(formData);
      // postData = base64.encode(postData);
      // let queryParam =`postData=${postData}&skipAuth=1`;
      // const url = new URL(`${PROTOCOL}${SERVER_IP}${API_URL}${queryParam}`);
      /*
      fetchCall(url,"json").then((result) => {
          if(result.client_key)
          {
            formJsonResetter(this.state.signInForm); 
            formJsonResetter(this.state.signUpForm); 
            formJsonResetter(this.state.otpForm); 
            this.handleSnackOpen("You've successfully registered.","success");
            this.setState({
              userRegisterID:null,
              signInState:true,
              signUpState:false,
              otpState:false,
              isLoading:false,
              registeredSubtitle:"Now you can sign in here."
            });    
          }
          else
          {
            this.handleSnackOpen(result.Error,"error");
            this.setState({isLoading:false});
          }
        },
        // Note: it's important to handle errors here
        // exceptions from actual bugs in components.
        (error) => {
          console.log('error',error);
          this.setState({isLoading:false});
        })
        */ 

  }

  handleCreateNewClick = () =>{
    formJsonResetter(SigninFormJson);
    this.setState({
      signInState: !this.state.signInState,
       signUpState: !this.state.signUpState
      });
  };

  handleAlreadyClick = () =>{
    formJsonResetter(SignupFormJson);
    this.setState({
      signInState: !this.state.signInState,
       signUpState: !this.state.signUpState
      });
  };

  handleSnackClose = () => {
    this.setState({ snackopen: false });
  };

  handleSnackOpen = (msg,variant) => {
    this.setState({
      snackopen:true,
      SnackTitle:msg,
      SnackVariant:variant
    });
  };

  handleSigninFormState = (updatedFormState,index) =>{
  // console.log('signin',updatedFormState,index);
  };
  handleSignupFormState = (updatedFormState,index) =>{
  // console.log('signup',updatedFormState,index);
  };
  handleOtpFormState = (updatedFormState,index) =>{
  // console.log('otp',updatedFormState,index);
  };

render(){
  const {classes} = this.props;

   //Loader 
   let Loader = this.state.isLoading ? (
    <CircularProgress size={56} thickness={2.6} className={classes.fabProgress} />
  ) : null;

  const SignInForm =  this.state.signInForm.map((element,index)=>(
    <FormRender
    key={index}
    json={element}
    index={index}
    stateChanger={(updatedFormState, index) => this.handleSigninFormState(updatedFormState,index)}
     />
  ));

  const SignUpForm =  this.state.signUpForm.map((element,index)=>(
    <FormRender
    key={index}
    json={element}
    index={index}
    submit={element.config.valid === false && element.config.touched !== false}
    stateChanger={(updatedFormState, index) => this.handleSignupFormState(updatedFormState,index)}
        />
  ));

  const OtpForm =  this.state.otpForm.map((element,index)=>(
    <FormRender
    key={index}
    json={element}
    index={index}
    submit={element.config.valid === false && element.config.touched !== false}
    stateChanger={(updatedFormState, index) => this.handleOtpFormState(updatedFormState,index)}
        />
  ));

  let Login;

  if(this.state.isLoggedIn) {
        Login = <Redirect to={{
          pathname: '/integration',
          auth: true
      }} />
    }
    else
    {
      Login = (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={7} md={8} className={classes.image} />
          <Grid item xs={12} sm={5} md={4} component={Paper} elevation={1} square>
            <div className={classes.paper}>
            <div className={classes.wrapper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
               {Loader}
              </div>
              
             <SignIN isVisible={this.state.signInState}
              signinClick={this.handleSigninSubmit}
              disable={this.state.isLoading}
              createClick={this.handleCreateNewClick}
              subtitle={this.state.registeredSubtitle}
              form={SignInForm} />

             <SignUP isVisible={this.state.signUpState}
              signupClick={this.handleSignupSubmit}
              alreadyClick={this.handleAlreadyClick}
              disable={this.state.isLoading}
              form={SignUpForm} />
             <OTP isVisible={this.state.otpState} 
             submitClick={this.handleUserVerify} 
             disable={this.state.isLoading}
             form={OtpForm} />
                <Box mt={5}>
                  <Typography variant="body2" color="textSecondary" align="center">
                  Copyright &copy; 2019 C-Zentrix Social Platform
                  </Typography>
                </Box>
            </div>
          </Grid>
          <SnackbarBuilder
          key="addModel"
          propOpen={this.state.snackopen}
          propClose={this.handleSnackClose}
          propTitle={this.state.SnackTitle}
          propVertical="bottom"
          variant={this.state.SnackVariant}
          propHorizontal="right"
           />
        </Grid>
      );
    }
  return Login;
}
 
}

export default withStyles(styles)(Login);


