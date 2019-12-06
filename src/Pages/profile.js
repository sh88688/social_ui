import React from "react";
import PropTypes from "prop-types";

//Material UI
import {withStyles,Grid, Button} from "../theme/muiComponents";
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
	console.log(`onChange ${System_Constants.MODULE_NAME} form`);
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
      headerTitle={System_Constants.MODULE_NAME}
      headerIcon={ProfileIcon} />
    
    <main className={classes.content}>
      <div className={classes.toolbar} />
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
                bottomBtn={ <Button variant="contained" className={classes.button} color="secondary">
               Save
              </Button>}
                />
             {/* End FormBlock here*/}
      </Grid>
    </main>

    </ div>
  );
}

};
Profile.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Profile);
