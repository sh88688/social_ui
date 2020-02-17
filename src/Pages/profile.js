import React from "react";
import PropTypes from "prop-types";

//Material UI
import {withStyles, Grid} from "../theme/muiComponents";
//Icons Material UI
import {ProfileIcon} from "../theme/muiIcons";

//Components
import FormRender from '../Components/FormRender';
import AppBarBuilder from '../Components/AppBarBuilder';
import FormBlockBuilder from '../Components/FormBlockBuilder';

//Modular Functions
// import {GET_DATA, SET_DATA, ACTION_HANDLER} from '../ModularFunctions/Functions';

//import Json Schema
import formJson from '../FormSchema/profileForm.json';
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
System_Constants.MODULE_NAME="Profile";

class Profile extends React.Component {

  DEFAULT_JSON = JSON.stringify(formJson);
  constructor(props)
  {
          super(props);
          this.state = {
            ADD_FLAG:true,
            EDIT_FLAG: false,
            EDIT_SELECTED: null,
            IS_LOADING: false,
            DATA_ARRAY:[],
            DATA_COUNT: "",
            NO_DATA_CONTENT: Intial_NODATA,
            dataForm: formJson,
          };      
  }
//REACT 
componentDidMount()
{
  this.getProfileInfo(this.props.clientId);
}

//<==== HANDLERS ====>
handleFormState = (updatedFormState,index) =>{
	//console.log(`onChange ${System_Constants.MODULE_NAME} form`);
}
getProfileInfo = (key) => {
  this.setState({IS_LOADING : true});
  const fetchCallOptions = {
    method : "GET"
  };
  const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/api/getProfile.php?cl_key=${key}`);
  fetchCall(url,fetchCallOptions,"json").then((RESPONSE) => {   
    const formCopy = [...this.state.dataForm];
    for(let key in RESPONSE){
      let formIndex = formCopy.findIndex( elem => elem.id === key);
      formCopy[formIndex].config.value = RESPONSE[key];
    }
    this.setState({ dataForm : formCopy, IS_LOADING : false});
  },
  (error) => {
    //console.log(error);
  });
}
render(){
  const { classes } = this.props;
  const uiForm = (
      <form>
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
      headerIcon={ProfileIcon} />
    
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {!this.state.IS_LOADING &&
      <Grid 
            container 
            direction="row"
            justify="flex-start"
            spacing={2}
       >
               {/* Model FormBlock */}
               <FormBlockBuilder 
                title="Your Profile"
                formState={this.state.ADD_FLAG}
                Form={uiForm}
                />
             {/* End FormBlock here*/}
      </Grid>}
    </main>

    </ div>
  );
}

};
Profile.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Profile);
