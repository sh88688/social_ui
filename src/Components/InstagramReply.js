import React from 'react';
import { blue } from '@material-ui/core/colors';
import { CircularProgress, TextField, Grid, DialogContent, withStyles,DialogActions, Button, DialogTitle, Dialog  } from "../theme/muiComponents";

//Components
import fetchCall from '../Components/FetchCaller';
import formJson from '../FormSchema/ticketDialogForm.json';
import {SERVER_IP, PROTOCOL} from '../Configs/apiConf';

const style = theme =>({
  root:{
      position: "absolute"  
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  title: {
    color: "#f32958",
    borderBottom: "1px solid lightgray",
    padding: theme.spacing(2,3)
  },
  btnClose: {
    fontWeight: 600,
    fontSize: "0.85rem"
  }
});

const Intial_NODATA = {};
Intial_NODATA.title = "No Chats Yet !";
Intial_NODATA.description = "Chats are facebook page's conversations.";
Intial_NODATA.type = "intial";

 class InstagramReply extends React.Component {
  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props){
      super(props);
      this.state = {
        ticketType:"",
        replyText: "",
        Processing: false,
        NO_DATA_CONTENT: Intial_NODATA,
      }
  }
  //<==== HANDLERS ====>
    handleFormState = (updatedFormState,index) =>{
        //console.log(`onChange form`);
    }
    handleChange = event =>{
      this.setState({replyText : event.target.value});
    }
    handleSend = () => {
      if(this.state.replyText !== ""){
        this.props.reply(this.state.replyText,"reply");
        this.props.toggle();
      }
    }
    handleClose = () => {
        this.setState({replyText : ""})
        this.props.toggle();
    };
render(){
    const { classes } = this.props;

      return (
        <Dialog  fullWidth open={this.props.open} onClose={this.handleClose} className={classes.root} aria-labelledby="form-dialog-title">
        <DialogContent>
        <Grid 
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}>

         <Grid item xs={12}>
         <TextField
          id="reply-input"
          color="secondary"
          variant="outlined"
          fullWidth
          autoFocus
          label="Reply on comment"
          value={this.state.replyText}
          onChange={this.handleChange}
          type="text"
        />
        </Grid>

        </Grid>
        </DialogContent>
        <DialogActions classes={{root : classes.bottom}}> 
          <Button disabled={this.state.Processing} className={classes.btnClose} onClick={this.handleSend} color="secondary">
            { this.state.Processing ? <CircularProgress style={{padding: "2px"}} size={23} color="secondary" /> : "Send Reply"}
          </Button>
        </DialogActions>
      </Dialog>
      );
    }


}
export default withStyles(style)(InstagramReply);
