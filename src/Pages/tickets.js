import React from "react";
import PropTypes from "prop-types";

//Material UI
import {withStyles, Grid} from "../theme/muiComponents";
//Icons Material UI
import { ConfirmationNumberIcon} from "../theme/muiIcons";


//Components
import AppBarBuilder from '../Components/AppBarBuilder';
import TicketTable from '../Components/TicketTable';
//Modular Functions
// import {GET_DATA, SET_DATA, ACTION_HANDLER} from '../ModularFunctions/Functions';

//import Json Schema
import formJson from '../FormSchema/supportForm.json';
import DialogBuilder from '../Components/DialogBuilder';
import {SERVER_IP, PROTOCOL} from '../Configs/apiConf';
import fetchCall from '../Components/FetchCaller';
//CSS Styles
const styles = theme => ({
      rootDiv: {
        width: "100%",
      },
      button:{
        float: "left",
        margin: "20px 10px 20px 0px",
      },
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        textAlign:"center"
      }
});

const Intial_NODATA = {};
Intial_NODATA.title = "No intent Labels yet.";
Intial_NODATA.description = "Intent Label Description";
Intial_NODATA.type = "intial";

const Search_NODATA = {};
Search_NODATA.title = "No Records Found !";
Search_NODATA.description = "";
Search_NODATA.type = "search";

const System_Constants={};
System_Constants.API_PAGE="intentLabel";
System_Constants.MODULE_PAGE="/intentLabel";
System_Constants.ID_FIELD="intent_label_id";
System_Constants.FIELD_NAME='intent_label'
System_Constants.MODULE_NAME="Ticket Details";

class Tickets extends React.Component {

  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props)
  {
          super(props);
          this.state = {
            ADD_FLAG:true,
            EDIT_FLAG: false,
            isTicketProcess: false,
            EDIT_SELECTED: null,
            tickets: null,
            IS_LOADING:false,
            isTicketHistoryDialog: false,
            dialogOpen : false,
            dialogTitle : "",
            dialogContent: "",
            DATA_ARRAY:[],
            DATA_COUNT: "",
            NO_DATA_CONTENT: Intial_NODATA,
            dataForm: formJson,
          };      
  }
//REACT 
componentDidMount()
{
  //let filter = {};
  this.handleFetchTickets();
}
//<==== HANDLERS ====>
handleFormState = (updatedFormState,index) =>{
  //console.log(`onChange  form`,updatedFormState);
}
handleFetchTickets = () => {
    this.setState({IS_LOADING : true });
    const Data = {};
    Data.action="report";
    Data.client_id= this.props.client.client_id;
    Data.sender_id= this.props.client.USERNAME;
    const queryParam = JSON.stringify(Data);           
    const fetchCallOptions = {
      method: 'POST',
      body: queryParam
    };
    const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/api/getTicketHistory.php`);
    fetchCall(url,fetchCallOptions,"json").then((result) => {
        // console.log('HISTORY RESPONSE',result);  
        this.setState({tickets: result.tickets,IS_LOADING : false });
      },
      (error) => {
        //console.log(error);
      }); 
} 

render(){
  const { classes } = this.props;
   
  return (
    <div className={classes.rootDiv}>
    <AppBarBuilder 
      IS_LOADING={this.state.IS_LOADING}
      PARENT={this.props.PARENT}
      headerTitle={System_Constants.MODULE_NAME}
      headerIcon={ConfirmationNumberIcon} />
    
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <DialogBuilder isopen={this.state.dialogOpen} dialogTitle={this.state.dialogTitle} dialogContent={this.state.dialogContent} ok={() => this.setState({dialogOpen : false})} />
      <Grid 
            container 
            direction="row"
            justify="center"
            spacing={1}
       >
        { this.state.tickets && <TicketTable rows={this.state.tickets} />}
      </Grid>
    </main>

    </ div>
  );
}

};
Tickets.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Tickets);
