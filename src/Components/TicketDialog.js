import React from 'react';
import { blue } from '@material-ui/core/colors';
import { CircularProgress, Grid, DialogContent, withStyles,DialogActions, Button, DialogTitle, Dialog  } from "../theme/muiComponents";

//Components
import FormRender from './FormRender';
import isFormValid from './FormValidSetter';
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

 class TicketDalog extends React.Component {
  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props){
      super(props);
      this.state = {
        ticketType:"",
        dataForm: formJson,
        Processing: false,
        NO_DATA_CONTENT: Intial_NODATA,
      }
  }
  //<==== HANDLERS ====>
    handleFormState = (updatedFormState,index) =>{
        //console.log(`onChange form`);
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
        this.setState({dataForm : JSON.parse(this.DEFAULT_JSON)})
        this.props.toggle();
    };
render(){
    const { classes } = this.props;

      return (
        <Dialog  fullWidth open={this.props.open} onClose={this.handleClose} className={classes.root} aria-labelledby="form-dialog-title">
        <DialogTitle classes={{root : classes.title}} id="form-dialog-title">Create Ticket Request</DialogTitle>
        <DialogContent>
        <Grid 
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}>
        {this.state.dataForm.map((element,index) =>(
         <Grid key={index} item xs={12}>
            <FormRender 
            key={index}
            json={element}
            index={index}
            stateChanger={(updatedFormState, index) => this.handleFormState(updatedFormState,index)}
            />
        </Grid>
        ))}
        </Grid>
        </DialogContent>
        <DialogActions classes={{root : classes.bottom}}> 
          <Button disabled={this.state.Processing} className={classes.btnClose} onClick={this.handleCreate} color="secondary">
            { this.state.Processing ? <CircularProgress style={{padding: "2px"}} size={23} color="secondary" /> : "Create Ticket"}
          </Button>
          <Button className={classes.btnClose} onClick={this.handleClose} color="default">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      );
    }


}
export default withStyles(style)(TicketDalog);
