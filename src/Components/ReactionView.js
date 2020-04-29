import React from 'react';
import { blue } from '@material-ui/core/colors';
import { Typography, CircularProgress, AppBar, Slide, Toolbar, withStyles, IconButton, Button, Dialog  } from "../theme/muiComponents";
import { CloseIcon } from "../theme/muiIcons";

//Components
import ReactionList from './ReactionTable';
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

 class ReactionView extends React.Component {
  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props){
      super(props);
      this.state = {
        ticketType:"",
        reactions: [],
        dialogOpen : false,
        dialogTitle : "",
        dialogContent : "",
        dataForm: formJson,
        NO_DATA_CONTENT: Intial_NODATA,
        Processing: true
      }
  }
    componentDidMount(){
      this.handleFetchreactions(this.props.postId);
    }
    handleFetchreactions = (postId) => { 
        const fetchCallOptions = {
          method: 'GET',
        };
        // const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/GetData/getPostDetails.php?postId=${postId}&type=reaction`);
        const url = new URL(`https://graph.facebook.com/${postId}/reactions?access_token=${this.props.pageToken}`);
        fetchCall(url,fetchCallOptions,"json").then((res) => {
            console.log('CMT RESPONSE ',res.data);

            if(res.data){
              this.setState({reactions: res.data,Processing : false });
            }
            
          },
          (error) => {
            //console.log(error);
          }); 
    }
    handleClose = () => {
        this.props.toggle();
    };
render(){
    const { classes } = this.props;
      return (
      <Dialog  fullScreen TransitionComponent={Transition} open={this.props.open} onClose={this.handleClose} className={classes.root} aria-labelledby="form-dialog-title">
       <AppBar position="fixed" className={classes.appBar}>
          <Toolbar >
            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6">
              Reactions
            </Typography>
            <Button autoFocus color="inherit" onClick={this.handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        {this.state.Processing ? <div style={{ alignSelf: "center", marginTop: "120px"}}><CircularProgress color="secondary" /> </div> 
          : 
          (this.state.reactions.length ? <ReactionList rows={this.state.reactions} pageToken={this.props.pageToken} /> 
            : <NoDataBuilder
            isRendor={!this.state.reactions.length}
            title={"No Reactions Found !!"}
            description={"Reactions are facebook page post's reactions e.g like sad angry wow."}
            type={"intial"}
            />
          )}
      </Dialog>
      );
    }


}
export default withStyles(style)(ReactionView);