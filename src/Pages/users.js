import React from "react";
import PropTypes from "prop-types";

//Material UI
import {withStyles,Grid} from "../theme/muiComponents";

//Icons Material UI
import {PeopleIcon} from "../theme/muiIcons";


//Components
import UserCardBuilder from '../Components/UserCardBuilder';
import SortSearchBuilder from '../Components/SortSearchBuilder';
import AppBarBuilder from '../Components/AppBarBuilder';
import NoDataBuilder from '../Components/NoDataBuilder';
import FormRender from '../Components/FormRender';
import HeaderButtonBuilder from '../Components/HeaderButtonBuilder';
import FormBlockBuilder from '../Components/FormBlockBuilder';


//Modular Functions
//import {GET_DATA, SET_DATA} from '../ModularFunctions/Functions';
import {GET_DATA, SET_DATA, FILL_VALUES, HEADER_TOGGLE,  ACTION_HANDLER} from '../ModularFunctions/Functions';

//import Json Schema
import formJson from '../FormSchema/usersForm.json';
//import Search Json Schema
import formSearchJson from '../SearchSchema/userSearch.json';


//CSS Styles
const styles = theme => ({
      rootDiv: {
        width: "100%",
      },
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      }
});

const Intial_NODATA = {};
Intial_NODATA.title = "No Users yet.";
Intial_NODATA.description = "Users Description here";
Intial_NODATA.type = "intial";

const Search_NODATA = {};
Search_NODATA.title = "No Records Found !";
Search_NODATA.description = "";
Search_NODATA.type = "search";

const System_Constants={};
System_Constants.API_PAGE="users";
System_Constants.MODULE_PAGE="/users";
System_Constants.ID_FIELD="user_id";
System_Constants.FIELD_NAME='user_name'
System_Constants.MODULE_NAME="Agents";

class Users extends React.Component {

  DEFAULT_JSON = JSON.stringify(formJson);
  
  constructor(props){
          super(props);
          this.state = {
            ADD_FLAG:false,
            EDIT_FLAG: false,
            EDIT_SELECTED: null,
            IS_LOADING:false,
            DATA_ARRAY:[],
            DATA_COUNT: "",
            NO_DATA_CONTENT: Intial_NODATA,
            dataForm: formJson,
            searchForm : formSearchJson,
          };      
  }

componentDidMount(){
  let filter = {};
   GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Intial_NODATA, this);
   
  //  GET_RESPONSE("users", 0, 10, this).then((result)=>{

  //    const keyChain = {
  //      fieldKey: "user_id",
  //      displayApiKey:"user_id",
  //      valueApiKey:"user_id"
  //    };
  //    SELECT_OPTION_SETTER(this, result, keyChain);
  //    this.setState({dataForm : this.DEFAULT_JSON});
  //    this.DEFAULT_JSON = JSON.stringify(this.DEFAULT_JSON);
  //  });
   
}
UNSAFE_componentWillReceiveProps(nextProps){
  if(this.props.info !== nextProps.info)
  {
    SET_DATA(nextProps,"DATA_ARRAY",System_Constants.ID_FIELD,this); 
  }
}
handleFormState = (updatedFormState,index) =>{
  // //console.log("intent ====> ",this.state.dataForm);
}
handleSearch = (filter) => {
 GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Search_NODATA, this);
}
handleClear = () => {
  let filter = {};
  filter.agent_name = "";
  GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Search_NODATA, this);
}


render(){
  const { classes } = this.props;
  const allData =  this.state.DATA_ARRAY.map((element,keyIndex) => (
    <Grid key={keyIndex} item xs={4}>
    <UserCardBuilder 
    key={keyIndex}  
    ICON={PeopleIcon}
    info={this.props.info} 
    processing={element.processing} 
    data={element} 
    onDelete={(event) => ACTION_HANDLER(event,System_Constants.API_PAGE,"delete",{id:System_Constants.ID_FIELD,index: keyIndex},System_Constants.MODULE_PAGE,"dataForm",this)}
    onEdit={() => FILL_VALUES(keyIndex,this)} createdby={element.action_by} />
    </Grid>
    ));
    
  const HeaderButton = <HeaderButtonBuilder 
	  buttonText={`Create ${System_Constants.MODULE_NAME}`}
	  isFormCreate={this.state.ADD_FLAG}
	  isFormEdit={this.state.EDIT_FLAG}
	  clickToggle={(event) => HEADER_TOGGLE("dataForm", this)}
	  clickSaveCreate={(event) => ACTION_HANDLER(event,System_Constants.API_PAGE,"create",{},System_Constants.MODULE_PAGE,"dataForm",this)}
	  clickSaveEdit={(event) => ACTION_HANDLER(event,System_Constants.API_PAGE,"modify",{id:System_Constants.ID_FIELD,index: this.state.EDIT_SELECTED},System_Constants.MODULE_PAGE,"dataForm",this)}
	   />;
	   
  const uiForm = (
      <form onSubmit={(event) => ACTION_HANDLER(event,System_Constants.API_PAGE,"create",{},System_Constants.MODULE_PAGE,"dataForm",this)}>
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
  const uiEditForm = (
    <form onSubmit={(event) => ACTION_HANDLER(event,System_Constants.API_PAGE,"modify",{id:System_Constants.ID_FIELD,index: this.state.EDIT_SELECTED},System_Constants.MODULE_PAGE,"dataForm",this)}>
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
      headerButton={HeaderButton} 
      PARENT={this.props.PARENT}
      headerTitle={System_Constants.MODULE_NAME} 
      headerIcon={PeopleIcon} />
    
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid 
            container 
            direction="row"
            justify="flex-start"
            spacing={1}
            >
                {/* Search Grid */}
                <SortSearchBuilder 
                  isVisible={!(this.state.ADD_FLAG || this.state.EDIT_FLAG)}
                  defaultSearchKey={System_Constants.FIELD_NAME}
                  search={(value) => this.handleSearch(value)}
                  clear={() => this.handleClear()}
                  json={this.state.searchForm}
                  dataCount={this.state.DATA_COUNT}
                  placeholder={`Search ${System_Constants.MODULE_NAME}...`} />
              
                {/* Model FormBlock */}
               <FormBlockBuilder 
                formState={this.state.ADD_FLAG}
                title={`Add New ${System_Constants.MODULE_NAME}`} 
                Form={uiForm} />

                <FormBlockBuilder 
                formState={this.state.EDIT_FLAG}
                title={`Edit ${System_Constants.MODULE_NAME}`}
                Form={uiEditForm} />
			        	{/* End FormBlock here*/} 
             {!(this.state.ADD_FLAG || this.state.EDIT_FLAG) && allData}  
        {/* Start NoDataBuilder here*/}
      </Grid>
      <NoDataBuilder
          isRendor={(this.state.DATA_ARRAY.length === 0 && this.state.ADD_FLAG === false)}
          title={this.state.NO_DATA_CONTENT.title}
          description={this.state.NO_DATA_CONTENT.description}
          type={this.state.NO_DATA_CONTENT.type}
         />
    </main>

    </ div>
  );
}

};
Users.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Users);
