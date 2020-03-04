import React from 'react';
import { blue } from '@material-ui/core/colors';
import { InputAdornment,Typography, CircularProgress, IconButton, TextField, Grid, DialogContent, withStyles,DialogActions, Button, Dialog  } from "../theme/muiComponents";
import {EmojiEmotionsIcon, CloseIcon, SentimentVerySatisfiedIcon} from '../theme/muiIcons';
import Picker from 'emoji-picker-react';

//Components
import isFormValid from './FormValidSetter';
import fetchCall from '../Components/FetchCaller';
import formJson from '../FormSchema/ticketDialogForm.json';
import {SERVER_IP, PROTOCOL} from '../Configs/apiConf';

const style = theme =>({
  root:{
      position: "absolute"  
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  textPost : {
    margin : "2px 10px"
  },
  title: {
    borderBottom: "1px solid lightgray",
    padding: theme.spacing(1,3)
  },
  btnClose: {
    fontWeight: 600,
    width: "100%",
    boxShadow: "none",
    fontSize: "0.85rem"
  }
});

const Intial_NODATA = {};
Intial_NODATA.title = "No Chats Yet !";
Intial_NODATA.description = "Chats are facebook page's conversations.";
Intial_NODATA.type = "intial";

 class CreatePost extends React.Component {
  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props){
      super(props);
      this.state = {
        dataForm: formJson,
        Processing: false,
        isPicker : false,
        replyText : "",
        NO_DATA_CONTENT: Intial_NODATA,
      }
  }
  //<==== HANDLERS ====>
    handleReplyChange = (event) => { 
        this.setState({ replyText : event.target.value});
    }
    handleGenerateTicket = ({ sender, first_name, last_name}) => {
        const { COMPONENT } = this.props;
        const sendTo = JSON.stringify(sender);
        const Data = {};
        Data.action="create";
        Data.client_id= this.props.clientId;
        Data.event_by="Admin";
        Data.data = {};
        Data.data.sender_id = sender;
        Data.data.first_name = first_name;
        Data.data.last_name = last_name;
        Data.data.priority  = "SEVERITY 3";
        Data.data.ticket_type = this.state.dataForm[0].config.value;
        Data.data.problem_reported = this.state.dataForm[1].config.value;
        const queryParam = JSON.stringify(Data);           
        const fetchCallOptions = {
          method: 'POST',
          body: queryParam
        };
        const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/api/createChatTicket.php`);
        setTimeout(() => {
        fetchCall(url,fetchCallOptions,"json").then((result) => {
          const {statusMsg, statusCode} = result;
              if(statusCode === "2001"){
                //console.log('TICKET RESPONSE ',result);   
                COMPONENT.setState({isTicketProcess: false,dialogOpen: true,dialogTitle: "Ticket Request",dialogContent: statusMsg});
                this.setState({dataForm : JSON.parse(this.DEFAULT_JSON)});
                COMPONENT.handleSendReply(JSON.parse(sendTo),statusMsg);
              }
          },
          (error) => {
            //console.log(error);
          }); 
        }, 2000);
    }
    handleCreate = () =>{
        let didFormValid = isFormValid(this.state.dataForm);
        this.setState({ secondForm : didFormValid.validatedForm }); 
        if (didFormValid.formValidity) { 
          this.props.COMPONENT.setState({isTicketProcess : true},this.handleGenerateTicket(this.props.userVariables));
          this.props.toggle();
        }
    }
    handleClose = () => {
        this.setState({isPicker : false},this.props.toggle)
    };
    handlePicker = () =>{
        this.setState({isPicker : !this.state.isPicker},()=>{
          if(this.state.isPicker){
            this.emojiPicker.children[0].children[1].remove();
            this.emojiPicker.children[0].style.width = '100%';
            this.emojiPicker.children[0].style.boxShadow = 'none';
            this.emojiPicker.children[0].style.height = '170px';
          }
        });
    }
    onEmojiClick = (event, emojiObject) =>{
      this.setState({replyText : `${this.state.replyText} ${emojiObject.emoji}`})
    }
render(){
    const { classes, avatar } = this.props;
    const endAdornment = (<InputAdornment position="end">
            <IconButton onClick={this.handlePicker} size="small">{this.state.isPicker ? <EmojiEmotionsIcon color="secondary" size="small" /> : <SentimentVerySatisfiedIcon color="secondary" size="small" />}</IconButton>
        </InputAdornment>);
      return (
        <Dialog  fullWidth open={this.props.open} onClose={this.handleClose} className={classes.root} aria-labelledby="form-dialog-title">
        <div className={classes.title}> <Typography variant="h6">Create post</Typography>
                <IconButton aria-label="close" size="small" className={classes.closeButton} onClick={this.handleClose}>
                <CloseIcon />
                </IconButton>
      </div>
        <DialogContent>
        <Grid 
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={0}>
                <Grid item xs={12} style={{ marginTop: "10px",display : "flex"}}>
                    {avatar} 
                    <TextField
                        id="textPost"
                        multiline
                        fullWidth
                        value={this.state.replyText}
                        onChange={this.handleReplyChange}
                        InputProps={{ disableUnderline: true, endAdornment: endAdornment }}
                        className={classes.textPost}
                        rowsMax="4"
                        rows="3"
                        placeholder={`Write something here... \nयहाँ कुछ लिखिए...`}

                        />
                </Grid>
                <Grid item xs={12} ref={ node => this.emojiPicker = node }>
                {(this.state.isPicker && this.props.open) && <Picker  onEmojiClick={this.onEmojiClick}/>}
                </Grid>
        </Grid>
        </DialogContent>
        <DialogActions classes={{root : classes.bottom}}> 
          <Button variant="contained" disabled={this.state.Processing} className={classes.btnClose}  color="secondary">
            { (this.state.Processing) ? <CircularProgress style={{padding: "2px"}} size={23} color="secondary" /> : "Share Post"}
          </Button>
        </DialogActions>
      </Dialog>
      );
    }


}
export default withStyles(style)(CreatePost);
