import React from 'react';
//Components
import fetchCall from '../../Components/FetchCaller';

//Material UI
import {Button, withStyles, Grid, CircularProgress} from "../../theme/muiComponents";
import {FacebookIcon, CheckCircleIcon} from '../../theme/muiIcons';

const styles = theme => ({
    root: {
      width: '100%',
      padding: theme.spacing(1, 7, 7, 7),
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
    }
  });

class FirstForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading : false,
          name: ""
        }
    }
    componentDidMount() {
      
      if(window.FB)
      {
        this.FB = window.FB;
        //console.log('FB EVENT didMount',this.FB);
      }

    }
    setLoggedIn = () => {
      let promise = new Promise((resolve, reject) => {
        this.FB.api('/me', function(response) {
             resolve(response.name);
            //console.log('me RESPONE => ',response);
        });
      });
      return promise;

    }
    statusChangeCallback = (response) => {   
      if (response.status === 'connected') { 

        const userId = response.authResponse.userID;
        this.setLoggedIn().then(name =>{
            this.setState({name : name});
        });


        this.fetchLongLivedToken(response.authResponse.accessToken).then(res => {
          const userToken = res.access_token;
          this.props.COMPONENT.setState({userToken: userToken, userId : userId, isLoggedIn : true});
          this.setState({loading : false});
        });
    
      } 
      else {                                 
        this.FB.login( response => {
          this.statusChangeCallback(response);
        },{scope : "pages_show_list,public_profile,instagram_basic"}); 
      }
    }
    fetchLongLivedToken = (token) =>{

      let promise = new Promise((resolve, reject) =>{
        const fetchCallOptions = {
          method: 'GET',
        };
        const url = new URL(`https://graph.facebook.com/v5.0/oauth/access_token?grant_type=fb_exchange_token&client_id=276812103194298&client_secret=9dfee467a94596ad85acf913e716cddf&fb_exchange_token=${token}`);
        fetchCall(url,fetchCallOptions,"json").then((result) => {
              //console.log('Long Live ',result);
              resolve(result);
          },
          (error) => {
            //console.log(error);
          });
      });
      return promise;
    }
    handleFacebookLogin = () => {
      this.FB.getLoginStatus( response => {
        this.statusChangeCallback(response);
      },{scope : "pages_show_list,public_profile,instagram_basic"});
      this.setState({loading : true});
    }
    render(){
        const {classes} = this.props;

        return (
            <span className={classes.root}>
          {this.state.loading ? <CircularProgress  size={30} thickness={4} className={classes.fabProgress} />
            :
            <Grid container
            direction="row"
            justify="center"
            alignItems="center" 
            spacing={4}>
              <Grid item>
                  {this.props.isLoggedIn ? <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled
                  style={{textTransform : "none", color: "#fff", backgroundColor: "#4267b2"}}
                  onClick={this.handleFacebookLogin}
                  classes={{containedSecondary : classes.button}}
                  startIcon={<CheckCircleIcon />}
                  >
                    LoggedIn as {this.state.name}
                  </Button>
                  : 
                  <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleFacebookLogin}
                  classes={{containedSecondary : classes.button}}
                  startIcon={<FacebookIcon />}
                  >
                    Instagram with Facebook
                  </Button>}
              </Grid>
            </Grid>}
          </span>
      );
    }
}

export default withStyles(styles)(FirstForm);