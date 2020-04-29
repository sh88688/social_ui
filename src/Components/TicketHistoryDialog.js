import React from 'react';
import { blue } from '@material-ui/core/colors';
import { Typography, CircularProgress, AppBar, Slide, Toolbar, withStyles, IconButton, Button, Dialog  } from "../theme/muiComponents";
import { CloseIcon } from "../theme/muiIcons";

//Components
import isFormValid from './FormValidSetter';
import CustomTable from './CustomTableBuilder';
import DialogBuilder from '../Components/DialogBuilder';
import NoDataBuilder from '../Components/NoDataBuilder';
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

 class TicketHistoryDialog extends React.Component {
  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props){
      super(props);
      this.state = {
        ticketType:"",
        tickets: null,
        dialogOpen : false,
        dialogTitle : "",
        dialogContent : "",
        dataForm: formJson,
        NO_DATA_CONTENT: Intial_NODATA,
        Processing: true
      }
  }
  //<==== HANDLERS ====>
    handleFormState = (updatedFormState,index) =>{
        ////console.log(`onChange form`);
    }
    componentDidMount(){
      this.handleFetchTickets();
    }
    handleStatusChange = (status, docket) => {
      const { sender } = this.props.userVariables;
      const Data = {};
      Data.action    = "modify";
      Data.client_id = this.props.clientId;
      Data.event_by  = this.props.clientEmail;
      Data.data = {};
      Data.data.docket_no = docket;
      Data.data.status    = status;
      const queryParam = JSON.stringify(Data);           
      const fetchCallOptions = {
        method: 'POST',
        body: queryParam
      };
      const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/api/createChatTicket.php`);
      fetchCall(url,fetchCallOptions,"json").then((result) => {
        const {statusMsg, statusCode, dataInfo} = result;
          if(statusCode === "2001"){
            let docketCopy = [...this.state.tickets];
            let docketIndex = docketCopy.findIndex(e => e.docket_no === docket);
            docketCopy[docketIndex].status = status;
            docketCopy[docketIndex].action_on = dataInfo.action_on;
            this.props.sendReply(sender,statusMsg);
            this.setState({dialogOpen:true,dialogTitle: "Ticket Status",dialogContent : statusMsg,tickets : docketCopy});
          }
        },
        (error) => {
          //console.log(error);
        }); 
    }
    handleFetchTickets = () => {
        const { sender } = this.props.userVariables;
        const Data = {};
        Data.action="history";
        Data.client_id= this.props.clientId;
        Data.sender_id = sender;
        const queryParam = JSON.stringify(Data);           
        const fetchCallOptions = {
          method: 'POST',
          body: queryParam
        };
        const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/api/getTicketHistory.php`);
        fetchCall(url,fetchCallOptions,"json").then((result) => {
            // console.log('HISTORY RESPONSE ',result);  
            this.setState({tickets: result.tickets,Processing : false });
          },
          (error) => {
            //console.log(error);
          }); 
    }
    handleCreate = () =>{
        let didFormValid = isFormValid(this.state.dataForm);
        this.setState({ secondForm : didFormValid.validatedForm }); 
        if (didFormValid.formValidity) { 
          this.props.COMPONENT.setState({isTicketProcess : true});
          this.props.toggle();
          setTimeout(()=>{
              this.handleGenerateTicket();
            },5000);
        }
    }
    handleClose = () => {
        this.setState({dataForm : JSON.parse(this.DEFAULT_JSON)})
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
              Tickets History
            </Typography>
            <Button autoFocus color="inherit" onClick={this.handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogBuilder isopen={this.state.dialogOpen} dialogTitle={this.state.dialogTitle} dialogContent={this.state.dialogContent} ok={() => this.setState({dialogOpen : false})} />
        {this.state.Processing && <div style={{ alignSelf: "center", marginTop: "120px"}}><CircularProgress color="secondary" /> </div>}
        {this.state.tickets && <CustomTable clickHandler={this.handleStatusChange} rows={this.state.tickets}/>}
          <NoDataBuilder
          isRendor={!this.state.tickets}
          title={this.state.NO_DATA_CONTENT.title}
          description={this.state.NO_DATA_CONTENT.description}
          type={this.state.NO_DATA_CONTENT.type}
         />
      </Dialog>
      );
    }


}
export default withStyles(style)(TicketHistoryDialog);