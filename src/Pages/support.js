import React from "react";
import PropTypes from "prop-types";

//Material UI
import {withStyles, IconButton, CircularProgress, Grid,Button} from "../theme/muiComponents";
//Icons Material UI
import {SupportIcon, HistoryIcon} from "../theme/muiIcons";


//Components
import FormRender from '../Components/FormRender';
import AppBarBuilder from '../Components/AppBarBuilder';
import FormBlockBuilder from '../Components/FormBlockBuilder';

//Modular Functions
// import {GET_DATA, SET_DATA, ACTION_HANDLER} from '../ModularFunctions/Functions';

//import Json Schema
import formJson from '../FormSchema/supportForm.json';
import DialogBuilder from '../Components/DialogBuilder';
import SupportHistoryDialog from '../Components/SupportHistoryDialog';
import {SERVER_IP, PROTOCOL} from '../Configs/apiConf';
import fetchCall from '../Components/FetchCaller';
import isFormValid from '../Components/FormValidSetter';
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
System_Constants.MODULE_NAME="Support";

class Support extends React.Component {

  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props)
  {
          super(props);
          this.state = {
            ADD_FLAG:true,
            EDIT_FLAG: false,
            isTicketProcess: false,
            EDIT_SELECTED: null,
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
  //GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Intial_NODATA, this);
}
handleReset = () =>{
 const form = [...this.state.dataForm];
  form.forEach(element =>{  
    if(element.config.elementType === "multiple-add")
    {
          element.config.fields.forEach(elem => {
              elem.forEach(field => {
              field.config.value = "";
              field.config.touched = 0;
              })
           });

    }
    else
    {
      element.config.value = "";
      element.config.touched = 0;
    }});
  this.setState({dataForm : form}); 
}

handleGenerateTicket = () => {
  let didFormValid = isFormValid(this.state.dataForm);
  this.setState({dataForm : didFormValid.validatedForm }); 
  if (didFormValid.formValidity) { 
    this.setState({isTicketProcess : true});
    const Data = {};
    Data.action="create";
    Data.client_id= this.props.client.client_id;
    Data.sender = 
    Data.event_by="Admin";
    Data.data = {};
    Data.data.sender_id = this.props.client.USERNAME;
    Data.data.first_name = this.props.client.first_name;
    Data.data.last_name = this.props.client.last_name;
    Data.data.ticket_type = this.state.dataForm[0].config.value;
    Data.data.priority = this.state.dataForm[1].config.value;
    Data.data.module = this.state.dataForm[2].config.value; 
    Data.data.problem_reported = this.state.dataForm[3].config.value;
    const queryParam = JSON.stringify(Data);           
    const fetchCallOptions = {
      method: 'POST',
      body: queryParam
    };
    const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/api/createChatTicket.php`);
    setTimeout(() => {
    fetchCall(url,fetchCallOptions,"json").then((result) => {
          if(result.statusCode === "2001"){
            //console.log('TICKET RESPONSE ',result);   
            const { problem_reported, ticket_type, docket_no} = result.dataInfo;
            const Ticket  = `🔖 ${docket_no} is your reference number for ${ticket_type} reported : ${problem_reported}.`;
            this.setState({isTicketProcess: false,dialogOpen: true,dialogTitle: "Ticket Request",dialogContent: Ticket});
            this.handleReset();
          }
      },
      (error) => {
        //console.log(error);
      }); 
    }, 2000);
  
  }
}
//<==== HANDLERS ====>
handleFormState = (updatedFormState,index) =>{
  //console.log(`onChange  form`,updatedFormState);
}

render(){
  const { classes } = this.props;
 

  const uiForm = (
      <form >
        <Grid container spacing={1}>
        {this.state.dataForm.map((element,index) =>(
        <FormRender 
        key={index}
        json={element}
        index={index}
        stateChanger={(updatedFormState, index) => this.handleFormState(updatedFormState,index)}
        />
        ))} 
        </Grid>
        <input type="submit" style={{display:"none"}}/>
      </form>
  );
   
  return (
    <div className={classes.rootDiv}>
    <AppBarBuilder 
      IS_LOADING={this.state.IS_LOADING}
      PARENT={this.props.PARENT}
      headerTitle={System_Constants.MODULE_NAME}
      headerIcon={SupportIcon} />
    
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <DialogBuilder isopen={this.state.dialogOpen} dialogTitle={this.state.dialogTitle} dialogContent={this.state.dialogContent} ok={() => this.setState({dialogOpen : false})} />
      <SupportHistoryDialog 
                userVariables={{"sender":"shivam@c-zentrix.com"}}
                open={this.state.isTicketHistoryDialog}
                clientId={this.props.client.client_id}
                COMPONENT={this}
                toggle={() => this.setState({isTicketHistoryDialog: !this.state.isTicketHistoryDialog})}
                />
      <Grid 
            container 
            direction="row"
            justify="center"
            spacing={1}
       >
               {/* Model FormBlock */}
               <FormBlockBuilder 
                title="Support Request"
                formState={this.state.ADD_FLAG}
                Form={uiForm}
                headerMoreBtn={ <IconButton onClick={() => this.setState({isTicketHistoryDialog: !this.state.isTicketHistoryDialog})} size="small"  color="secondary" aria-label="edit">
                <HistoryIcon />
                 </IconButton>}
                bottomBtn={ 
                    <React.Fragment>
                    <Button onClick={this.handleReset} variant="contained" className={classes.button} color="default">
                    Reset
                    </Button>
                    <Button disabled={this.state.isTicketProcess} variant="contained" onClick={this.handleGenerateTicket} className={classes.button} color="secondary">
                    {this.state.isTicketProcess ? <CircularProgress style={{padding: "2px"}} size={23} color="secondary" /> : "Send" }
                    </Button>
                    </React.Fragment>
                    }
               />
             {/* End FormBlock here*/}
      </Grid>
    </main>

    </ div>
  );
}

};
Support.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Support);
