import React from 'react';
import { blue } from '@material-ui/core/colors';
import { Typography, CircularProgress, AppBar, Slide, Toolbar, withStyles, IconButton, Button, Dialog  } from "../theme/muiComponents";
import { CloseIcon } from "../theme/muiIcons";

//Components
import CommentList from './CommentTable';
import NoDataBuilder from '../Components/NoDataBuilder';
import fetchCall from '../Components/FetchCaller';
import formJson from '../FormSchema/ticketDialogForm.json';
// import {SERVER_IP, PROTOCOL} from '../Configs/apiConf';

const style = theme =>({
  root:{
      position: "absolute"  
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  appBar:{
    position: 'relative',
    background: "linear-gradient(150deg, #921aff, #ff9eb4)",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  btnClose: {
    fontWeight: 600,
    fontSize: "0.85rem"
  }
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Intial_NODATA = {};
Intial_NODATA.title = "No Records Found !";
Intial_NODATA.description = "";
Intial_NODATA.type = "intial";

 class CommentView extends React.Component {
  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props){
        super(props);
        this.state = {
          ticketType:"",
          comments: [],
          dialogOpen : false,
          dialogTitle : "",
          dialogContent : "",
          dataForm: formJson,
          NO_DATA_CONTENT: Intial_NODATA,
          Processing: true
        }
    }
    componentDidMount(){
      this.handleFetchComments(this.props.postId);
    }
     handleFetchComments = postId => { 
        const fetchCallOptions = {
          method: 'GET',
        };
        // const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/GetData/getPostDetails.php?postId=${postId}&type=comment`);
        const url = new URL(`https://graph.facebook.com/${postId}/comments?access_token=${this.props.pageToken}`);
        fetchCall(url,fetchCallOptions,"json").then( res => {

            if(res.data){
             const srt = (a, b) => (b.created_time - a.created_time);
             const data = res.data.map(item => {
                    item.created_time = Date.parse(item.created_time);
                    return item;
              });
                this.setState({comments: data.sort(srt),Processing : false });
            }
    
          },
          (error) => {
            //console.log(error);
          }); 
    }
    handleClose = () => {
        this.props.toggle();
    };
    render() {
        const { classes } = this.props;
          return (
          <Dialog  fullScreen TransitionComponent={Transition} open={this.props.open} onClose={this.handleClose} className={classes.root} aria-labelledby="form-dialog-title">
          <AppBar position="fixed" className={classes.appBar}>
              <Toolbar >
                <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6">
                  Comments
                </Typography>
                <Button autoFocus color="inherit" onClick={this.handleClose}>
                  Close
                </Button>
              </Toolbar>
            </AppBar>
            {this.state.Processing ? <div style={{ alignSelf: "center", marginTop: "120px"}}><CircularProgress color="secondary" /> </div> 
              : 
              (this.state.comments.length ? <CommentList rows={this.state.comments} pageToken={this.props.pageToken} /> 
                : <NoDataBuilder
                isRendor={!this.state.comments.length}
                title={"No Comments Found !!"}
                description={"Comments are facebook page post's comments."}
                type={"intial"}
                />
              )}
          </Dialog>
          );
        }
    }
export default withStyles(style)(CommentView);