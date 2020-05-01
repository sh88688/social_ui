import React from 'react';
//Material UI
import { withStyles, CircularProgress, Grid, Button} from "../theme/muiComponents";
import {InstagramIcon} from '../theme/muiIcons';
import TimelineIcon from '@material-ui/icons/Timeline';
import TheatersIcon from '@material-ui/icons/Theaters';
import fetchCall from '../Components/FetchCaller';
import AppBarBuilder from '../Components/AppBarBuilder';
import InstaPostCard from '../Components/InstaPostCard';
import TicketInstagram from '../Components/TicketInstagram';
import InstagramReply from '../Components/InstagramReply';
import DialogBuilder from '../Components/DialogBuilder';
import InsightCard from '../Components/InsightCard';
import AudienceList from '../Components/AudienceList';
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
  }
  });

const System_Constants={};
System_Constants.MODULE_PAGE="/instagram";
System_Constants.MODULE_NAME="Instagram";

class INSTA extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading : true,
          EDIT_FLAG: false,
          activity: [],
          audience: null,
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
      if(this.state.isMediaView){
        setTimeout(() => {
          this.handleFeeds();
        },1000);
      }
    }
    handleFeeds = () =>{
      if(this.props.CONFIG){
        const {instagram_id , user_access_token} = this.props.CONFIG;
        const promiseArray = [];
        const fetchCallOptions = {
          method: 'GET',
        };
          const url = new URL(`https://graph.facebook.com/v6.0/${instagram_id}/media?access_token=${user_access_token}`);
          fetchCall(url,fetchCallOptions,"json").then( res => {
            const fields = `media_url,owner,username,like_count,comments_count,comments,children,caption,is_comment_enabled,media_type`;    
            
              promiseArray.push(new Promise((resolve, reject) => {
                const media_url = new URL(`https://graph.facebook.com/v6.0/${res.data[0].id}?fields=${fields}&access_token=${user_access_token}`);
                console.log(media_url); 
                fetchCall(media_url,fetchCallOptions,"json").then( media => {
                    resolve(media);
                  },
                  (error) => {
                    //console.log(error);
                    reject(error);
                  })
              }));

              promiseArray.push(new Promise((resolve, reject) => {
                const media_url = new URL(`https://graph.facebook.com/v6.0/${res.data[1].id}?fields=${fields}&access_token=${user_access_token}`);
                  fetchCall(media_url,fetchCallOptions,"json").then( media => {
                    resolve(media);
                  },
                  (error) => {
                    //console.log(error);
                    reject(error);
                  })
              }));

              promiseArray.push(new Promise((resolve, reject) => {
                const media_url = new URL(`https://graph.facebook.com/v6.0/${res.data[4].id}?fields=${fields}&access_token=${user_access_token}`);
                  fetchCall(media_url,fetchCallOptions,"json").then( media => {
                    resolve(media);
                  },
                  (error) => {
                    //console.log(error);
                    reject(error);
                  })
              }));

            Promise.all(promiseArray).then(data => {
              this.setState({feeds : data});
            });
            

          },
          (error) => {
            //console.log(error);
        });
      }
    }
    handleDashboard = () =>{
      if(this.props.CONFIG){
        const {instagram_id , user_access_token} = this.props.CONFIG;
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
              let audience = new Promise((resolve, reject) => {
                const metric = `audience_city&period=lifetime`;    
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
              return {"activity": activity,"audience" : audience};
      }
    } 
    handleFormState = (updatedFormState,index) =>{
      //console.log(`onChangeform page `);
    }
    handleInstaComment = (msg, mode) => {
      const data = {};
      console.log('msg',msg);
      data.access_token = this.props.CONFIG.user_access_token;
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

        const HeaderButton = (<Button 
          color="primary"
          onClick={this.handleMediaToggle}
          startIcon={this.state.isMediaView ? <TimelineIcon /> : <TheatersIcon />}
          variant="outlined" >{this.state.isMediaView ? "View Insights" : " View Posts" }
          </Button>);

        return (
            <div className={classes.rootDiv}>
            <AppBarBuilder 
              IS_LOADING={this.state.IS_LOADING}
              PARENT={this.props.PARENT}
              headerButton={HeaderButton}
              headerTitle={System_Constants.MODULE_NAME}
              headerIcon={InstagramIcon} />
            
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <DialogBuilder type="" isopen={this.state.dialogOpen} dialogTitle={this.state.dialogTitle} dialogContent={this.state.dialogContent} ok={() => this.setState({dialogOpen : false})} />
              {/* Dashboard */} 
              {!this.state.isMediaView && <Grid 
                    container 
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
               >
                 {!this.state.activity.length ? <CircularProgress  size={30} thickness={4} color="secondary" className={classes.fabProgress} />
                  :
                  <Grid item xs={12}>
                  <InsightCard data={this.state.activity} />
                  </Grid>
                  }
                  {this.state.audience &&
                  <Grid item xs={12}>
                    <AudienceList data={this.state.audience}/>
                  </Grid>
                  }
                 
            </Grid>}
            {/* Dashboard */}
              {this.state.isMediaView &&
              <Grid 
                    container 
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
               >
                {!this.state.feeds.length ? <CircularProgress  size={30} thickness={4} color="secondary" className={classes.fabProgress} />
                :
                this.state.feeds.map((media, index) => (
                  <Grid key={index} item xs={7}>
                  <InstaPostCard Data={media} toggleReply={this.toggleReply} toggleTicket={this.toggleTicketCreate} />
                  </Grid>
                ))}
              </Grid>}
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