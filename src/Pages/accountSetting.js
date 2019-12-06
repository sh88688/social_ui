import React from "react";
import PropTypes from "prop-types";

//Material UI
import {withStyles, Grid, Typography, Button} from "../theme/muiComponents";
//Icons Material UI
import {SettingIcon, EmailIcon, InfoIcon} from "../theme/muiIcons";

//Components
import FormRender from '../Components/FormRender';
import AppBarBuilder from '../Components/AppBarBuilder';
import SnippetCard from '../Components/SnippetCardBuilder';

//import Json Schema
import formJson from '../FormSchema/emailSetting.json';

//CSS Styles
const styles = theme => ({
      rootDiv: {
        width: "100%",
      },
      card: {
        width: "100%"
      },
      cardHeader:{
        padding: "12px",
        color: "#3148a0",
      },
      button:{
        float: "left",
        margin: "20px 10px 20px 0px",
      },
      delBtn:{
        float: "right",
        margin: "20px 10px 20px 0px",
        color: "#ef4a47",
      },
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
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
System_Constants.MODULE_NAME="Account Setting";

class AccountSetting extends React.Component {

  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props)
  {
          super(props);
          this.state = {
            ADD_FLAG:true,
            EDIT_FLAG: false,
            EDIT_SELECTED: null,
            IS_LOADING:false,
            DATA_ARRAY:[],
            DATA_COUNT: "",
            NO_DATA_CONTENT: Intial_NODATA,
            dataForm: formJson,
          };      
  }
//REACT 
componentDidMount()
{
    //   let filter = {};
    //   GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Intial_NODATA, this);
}

//<==== HANDLERS ====>
handleFormState = (updatedFormState,index) =>{
	console.log(`onChange ${System_Constants.MODULE_NAME} form =>`,this.state.dataForm);
}
handleUpdateClick = (event) => {
    console.log('update');
}

render(){
  const { classes } = this.props;
  const email_form = (
      <form>
        <Grid container spacing={1}>
        {this.state.dataForm.map((element,index) =>(
        <FormRender 
        key={index}
        json={element}
        index={index}
        clickHandler= {(event) => this.handleUpdateClick(event)}
        stateChanger={(updatedFormState, index) => this.handleFormState(updatedFormState,index)}
        />
        ))} 
        </Grid>
        <input type="submit" style={{display:"none"}}/>
      </form>
  );

  const danger_form = (
    <Grid 
    container 
    direction="row"
    justify="flex-start"
    spacing={2}>
        <Grid item xs={8}>
            <Typography style={{marginBottom: "5px"}} color="error" variant="h6">Delete Account</Typography>
            <Typography variant="body2">Are you sure you want to delete account sh88688@gmail.com? This will destroy the account with all corresponding data and cannot be undone!</Typography>
        </Grid>
        <Grid item xs={4}>
            <Button variant="outlined" className={classes.delBtn}>
            Delete this account
            </Button>
        </Grid>
    </Grid>

  );
   
  return (
    <div className={classes.rootDiv}>
    <AppBarBuilder 
      IS_LOADING={this.state.IS_LOADING}
      headerTitle={System_Constants.MODULE_NAME}
      headerIcon={SettingIcon} />
    
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid 
            container 
            direction="row"
            justify="flex-start"
            spacing={2}
       >
           {/* Email Snippet here*/}
               <SnippetCard 
                title="EMAIL PREFERENCES"
                titleColor = "#3148a0"
                subtitle="Stay up-to-date with occasional emails from our team"
                form={email_form}
                icon={EmailIcon}
               />
          {/* Email Snippet here*/}
          {/* Delete Snippet here*/}
                <SnippetCard 
                title="DANGER ZONE"
                subtitle=""
                form={danger_form}
                titleColor = "red"
                icon={InfoIcon}
               />
          {/* Delete Snippet here*/}
      </Grid>
    </main>

    </ div>
  );
}

};
AccountSetting.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(AccountSetting);
