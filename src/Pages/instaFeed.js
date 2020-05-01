import React from 'react';
//Material UI
import { withStyles, CircularProgress, Icon, Grid, Button} from "../theme/muiComponents";
import {InstagramIcon, ConfirmationNumberIcon} from '../theme/muiIcons';
import TimelineIcon from '@material-ui/icons/Timeline';
import TheatersIcon from '@material-ui/icons/Theaters';
import fetchCall from '../Components/FetchCaller';
import AppBarBuilder from '../Components/AppBarBuilder';
import InstaPostCard from '../Components/InstaPostCard';
import TicketInstagram from '../Components/TicketInstagram';
import InstagramReply from '../Components/InstagramReply';
import DialogBuilder from '../Components/DialogBuilder';
import InsightCard from '../Components/InsightCard';
import InstaTable from '../Components/InstaTable';

const styles = theme => ({
  rootDiv: {
    width: "100%",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  fabProgress: {
    textAlign: 'center',
    marginTop: "16.5px",
  },
  cmtAction:{
    padding: "8px",
    marginLeft: "5px"
  },
  ticketIcn :{
    color: "#ffb200",
    padding: "5px",
    transform: 'rotate(135deg)'
  },
  cardBlock : {
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 0,
    display: 'flex',
    position: 'relative',
    fontSize: '.875rem',
    minWidth: 0,
    wordWrap: 'break-word',
    background: '#FFF',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    marginTop: '20px',
    marginBottom: '20px',
    minHeight: '90px',
    borderRadius: '6px',
    flexDirection: 'column',
  },
  cardIcon:{
    float: 'left',
    padding: '15px 20px',
    color: "#fff",
    marginTop: '-20px',
    marginRight: '15px',
    borderRadius: '3px',
    backgroundColor: '#999',
    background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
    boxShadow: '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(255, 152, 0,.4)'
  },
  cardP:{
    color: '#999',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    paddingTop: '10px',
    marginBottom: '0',
  },
  cardH3:{
    color: '#3C4858',
    fontSize: '1.55em',
    fontWeight: 300,
    margin: '0 !important'
  },
  cardBottom:{
    margin: '0 15px 10px',
    display: 'flex',
    paddingTop: '10px',
    borderTop: '1px solid#eee',
    marginTop: '20px'
  },
  bottomInfo:{
    color: '#999',
    display: 'inline-flex',
    fontSize: '12px',
    lineHeight: '22px',
  }
  });

const System_Constants={};
System_Constants.MODULE_PAGE="/instagram";
System_Constants.MODULE_NAME="Instagram";

function createData(id, field, text) {
  return { id, field, text };
}

class INSTA extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading : true,
          EDIT_FLAG: false,
          activity: [],
          CONFIG: props.CONFIG,
          audience: null,
          insta: [],
          feeds: [],
          dashboardData: [],
          isMediaView: true,
          insightPeriod: "Last 24 Hours",
          isTicketCreate: false,
          isTicketHistory : false,
          userPageId: "",
          tempName: "",
          dialogOpen : false,
          dialogTitle : "Ticket Response",
          dialogContent: ""
        }
    }
    componentDidMount(){
      setTimeout(() => {
        this.handleDashboard().then( data => {
          this.setState({activity : data.data,loading : false});
        });
      },1000);
    }
    UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.INSTA !== this.props.INSTA && nextProps.INSTA.length > this.props.INSTA.length){
        this.setState({insta : nextProps.INSTA});
      }
      if(nextProps.CONFIG !== this.props.CONFIG) {
        this.setState({CONFIG : nextProps.CONFIG});
      }
      
    }
    handleFormState = (updatedFormState,index) =>{
      //console.log(`onChangeform page `);
    }
    handleInstaComment = (msg, mode) => {
      const data = {};
      console.log('msg',msg);
      data.access_token = this.state.CONFIG.user_access_token;
      const fetchCallOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const url = new URL(`https://graph.facebook.com/v6.0/${this.state.commentId}/replies?message=${msg}`);
      fetchCall(url,fetchCallOptions,"json").then( result => {
          console.log('Comment Insta =>', result);
          const dialog = {};
          dialog.dialogOpen = true;
          if(mode === "ticket"){
            dialog.dialogTitle = "Ticket Request";
            dialog.dialogContent = msg;
          }
          else{
            dialog.dialogTitle = "Successfuly replied on comment !";
            dialog.dialogContent = msg;
          }
          this.setState(dialog);
        },
        (error) => {
          //console.log(error);
        }); 
    }
    handleDashboard = () =>{
      if(this.state.CONFIG){
        const {instagram_id , user_access_token} = this.state.CONFIG;
        const promiseArray = [];
        const fetchCallOptions = {
          method: 'GET',
        };    
        let activity = new Promise((resolve, reject) => {
          const metric = `impressions, reach, follower_count, profile_views&period=day`;    
          const media_url = new URL(`https://graph.facebook.com/v6.0/${instagram_id}/insights?metric=${metric}&access_token=${user_access_token}`);
          console.log(media_url); 
          fetchCall(media_url,fetchCallOptions,"json").then( res => {
              resolve(res);
            },
            (error) => {
              //console.log(error);
              reject(error);
            })
        });
              return activity;
      }
    } 
    toggleTicketCreate = comment_id => {
      this.setState({commentId : comment_id, isTicketCreate: !this.state.isTicketCreate});
    }
    toggleReply = comment_id => {
      this.setState({commentId : comment_id, isReply: !this.state.isReply});
    }
    handleMediaToggle = () =>{  
      if(this.state.isMediaView){
        setTimeout(() => {
          let dashboard = this.handleDashboard();
          dashboard.activity.then( data => {
            this.setState({activity : data.data,loading : false});
          });
          dashboard.audience.then( data => {
            this.setState({audience : data.data[0].values[0].value});
          });
        },1000);
      }
      this.setState({isMediaView : !this.state.isMediaView});
    }
    handleInsightPeriod = (event) =>{
      this.setState({insightPeriod : event.target.value})
    }
    render(){
        const {classes} = this.props;
        const data = this.props.INSTA.map((item) => {
          return createData(item.value.id, item.field, item.value.text);
        });
        return (
            <div className={classes.rootDiv}>
            <AppBarBuilder 
              IS_LOADING={this.state.IS_LOADING}
              PARENT={this.props.PARENT}
              headerTitle={System_Constants.MODULE_NAME}
              headerIcon={InstagramIcon} />
            
            <main className={classes.content}>
              <div className={classes.toolbar} />
              
              <DialogBuilder type="" isopen={this.state.dialogOpen} dialogTitle={this.state.dialogTitle} dialogContent={this.state.dialogContent} ok={() => this.setState({dialogOpen : false})} />
              <Grid 
                  container 
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={1}>
                    
                    {!this.state.activity.length ? 
                      <CircularProgress  size={30} thickness={4} color="secondary" className={classes.fabProgress} />
                      :
                      <>
                      <Grid item xs={12}>
                      <InsightCard data={this.state.activity} />
                      </Grid>
                      <Grid item xs={12}>
                       <InstaTable rows={data} ticketClick={this.toggleTicketCreate} replyClick={this.toggleReply} />
                      </Grid>
                      </>
                      } 
                    

                  </Grid>

              {this.state.isTicketCreate && <TicketInstagram 
                commentId={this.state.commentId}
                open={this.state.isTicketCreate}
                clientId={this.props.clientId}
                clientEmail={this.props.clientEmail}
                COMPONENT={this}
                reply={this.handleInstaComment}
                toggle={this.toggleTicketCreate}
                />}
              {this.state.isReply && <InstagramReply 
                open={this.state.isReply}
                COMPONENT={this}
                reply={this.handleInstaComment}
                toggle={() => this.setState({isReply: !this.state.isReply})}
                />}
            </main>
            </ div>
      );
    }
}

export default withStyles(styles)(INSTA);