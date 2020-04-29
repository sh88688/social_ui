import React from 'react';
import { blue } from '@material-ui/core/colors';
import { CircularProgress, Grid, DialogContent, withStyles,DialogActions, Button, DialogTitle, Dialog  } from "../theme/muiComponents";

//Components
import FormRender from './FormRender';
import isFormValid from './FormValidSetter';
import fetchCall from './FetchCaller';
import formJson from '../FormSchema/ticketDialogForm.json';
import formJsonResetter from './JsonResetter';
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

 class PostDialog extends React.Component {
  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props){
      super(props);
      this.state = {
        ticketType:"",
        dataForm: formJson,
        Processing: false,
        created : false,
        dialogContent: "",
        NO_DATA_CONTENT: Intial_NODATA,
      }
  }
  //<==== HANDLERS ====>
    handleFormState = (updatedFormState,index) =>{
        //console.log(`onChange form`);
    }
    postComment = msg => {
      let promise = new Promise((resolve, reject) =>{
        const fetchCallOptions = {
          method: 'POST',
        };
        const url = new URL(`https://graph.facebook.com/${this.props.postId}/comments?access_token=${this.props.pageToken}&message=${msg}`);
        fetchCall(url,fetchCallOptions,"json").then( res => {
          resolve(res);
        },
        (error) => {
          reject(error);
          //console.log(error);
        });
      });
      return promise;
    }
    handleGenerateTicket = () => {
        this.setState({Processing : true});
        const Data = {};
        Data.action="create";
        Data.client_id= this.props.clientId;
        Data.event_by= this.props.clientEmail;
        Data.data = {};
        Data.data.sender_id = this.props.postId;
        Data.data.first_name = this.props.fromName;
        Data.data.last_name = this.props.fromName;
        Data.data.priority  = "SEVERITY 3";
        Data.data.module  = "POST";
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
              if(result.statusCode === "2001"){
                console.log(result);
                const {docket_no, ticket_type} = result.dataInfo;
                const contentMsg = `Your Post Request ID ${docket_no} has been registered with us for ${ticket_type} and Request Status is OPEN`;
                this.postComment(contentMsg).then(res =>{
                  this.setState({dataForm : JSON.parse(this.DEFAULT_JSON),created : true, dialogContent : contentMsg, Processing : false}); 
                });   
              }      
          },
          (error) => {
            //console.log(error);
            this.setState({dataForm : JSON.parse(this.DEFAULT_JSON),created : true, dialogContent : error, Processing : false});
          }); 
        }, 2000);
    }
    handleCreate = () =>{
        let didFormValid = isFormValid(this.state.dataForm);
        this.setState({ secondForm : didFormValid.validatedForm }); 
        if (didFormValid.formValidity) { 
          this.handleGenerateTicket();
        }
    }
    handleClose = () => {      
        formJsonResetter(this.state.dataForm);
        this.props.toggle();
    }
render(){
    const { classes } = this.props;
    const Content = this.state.dataForm.map((element,index) =>(
      <Grid key={index} item xs={12}>
          <FormRender 
          key={index}
          json={element}
          index={index}
          stateChanger={(updatedFormState, index) => this.handleFormState(updatedFormState,index)}
          />
      </Grid>));

      return (
        <Dialog  fullWidth open={this.props.open} onClose={this.handleClose} className={classes.root} aria-labelledby="form-dialog-title">
        <DialogTitle classes={{root : classes.title}} id="form-dialog-title">Create Ticket Request</DialogTitle>
       { !this.state.created ? 
       <React.Fragment>
        <DialogContent>
          <Grid 
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}>
                      {Content}
            </Grid>
          </DialogContent>
          <DialogActions classes={{root : classes.bottom}}> 
            <Button disabled={this.state.Processing} className={classes.btnClose} onClick={this.handleCreate} color="secondary">
              {this.state.Processing ? <CircularProgress style={{padding: "2px"}} size={23} color="secondary" /> : "Create Ticket"}
            </Button>
            <Button className={classes.btnClose} onClick={this.handleClose} color="default">
              Cancel
            </Button>
          </DialogActions>
        </React.Fragment>
           :
        <React.Fragment>
          <DialogContent>
            {this.state.dialogContent}
          </DialogContent>
          <DialogActions classes={{root : classes.bottom}}> 
              <Button className={classes.btnClose} onClick={this.handleClose} color="default">
              Close
            </Button>
          </DialogActions>
        </React.Fragment>
        }
      </Dialog>
      );
    }


}
export default withStyles(style)(PostDialog);
