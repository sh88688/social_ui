import React from "react";
import PropTypes from "prop-types";

//Material UI
import {withStyles,Grid, IconButton} from "../theme/muiComponents";

//Icons Material UI
import {DescriptionIcon,SettingsEthernetIcon} from "../theme/muiIcons";


//Components
import TemplateCard from '../Components/TemplateCardBuilder';
import SortSearchBuilder from '../Components/SortSearchBuilder';
import AppBarBuilder from '../Components/AppBarBuilder';
import NoDataBuilder from '../Components/NoDataBuilder';
import DialogBuilder from '../Components/DialogBuilder';
import FormRender from '../Components/FormRender';
import HeaderButtonBuilder from '../Components/HeaderButtonBuilder';
import FormBlockBuilder from '../Components/FormBlockBuilder';


//Modular Functions
import {GET_DATA, SET_DATA, FILL_VALUES, HEADER_TOGGLE,  ACTION_HANDLER} from '../ModularFunctions/Functions';

//import Json Schema
import formJson from '../FormSchema/templatesForm.json';
//import Search Json Schema
import formSearchJson from '../SearchSchema/templateSearch.json';


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
Intial_NODATA.title = "No Templates yet.";
Intial_NODATA.description = "Templates Description here";
Intial_NODATA.type = "intial";

const Search_NODATA = {};
Search_NODATA.title = "No Records Found !";
Search_NODATA.description = "";
Search_NODATA.type = "search";

const System_Constants={};
System_Constants.API_PAGE="templates";
System_Constants.MODULE_PAGE="/templates";
System_Constants.ID_FIELD="id";
System_Constants.FIELD_NAME='tag';
System_Constants.MODULE_NAME="Templates";

class Templates extends React.Component {

  DEFAULT_JSON = JSON.stringify(formJson);
  
  constructor(props)
  {
          super(props);
          this.state = {
            ADD_FLAG:false,
            EDIT_FLAG: false,
            EDIT_SELECTED: null,
            IS_LOADING:false,
            DATA_ARRAY:[],
            dialogOpen : false,
            dialogTitle : "",
            dialogContent: "",
            DATA_COUNT: "",
            NO_DATA_CONTENT: Intial_NODATA,
            dataForm: formJson,
            searchForm : formSearchJson,
          };      
  }

componentDidMount()
{
  let filter = {};
   GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Intial_NODATA, this);  
}

UNSAFE_componentWillReceiveProps(nextProps)
{
  if(this.props.info !== nextProps.info)
  {
    SET_DATA(nextProps,"DATA_ARRAY",System_Constants.ID_FIELD,this); 
  }
}
handleFormState = (updatedFormState,index) =>{
// //console.log("intent ====> ",this.state.dataForm);
}
handleVariable = () => {
  this.setState({dialogOpen : true,dialogTitle : "{{ Variables }}",dialogContent: "< Module Facebook > : First Name {{first_name}}, Last Name {{last_name}}, Page Name {{page_name}}"});
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
    <TemplateCard 
    key={keyIndex}  
    ICON={DescriptionIcon}
    info={this.props.info} 
    data={element}
    processing={element.processing} 
    modelName={element.tag} 
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
      headerIcon={DescriptionIcon} />
    
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <DialogBuilder isopen={this.state.dialogOpen} dialogTitle={this.state.dialogTitle} dialogContent={this.state.dialogContent} ok={() => this.setState({dialogOpen : false})} />
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
                headerMoreBtn={<IconButton onClick={this.handleVariable} size="small"  color="secondary" aria-label="edit">
                <SettingsEthernetIcon />
                 </IconButton>}
                title={`Add New ${System_Constants.MODULE_NAME}`} 
                Form={uiForm} />

                <FormBlockBuilder 
                formState={this.state.EDIT_FLAG}
                headerMoreBtn={<IconButton onClick={this.handleVariable} size="small"  color="secondary" aria-label="edit">
                <SettingsEthernetIcon />
                 </IconButton>}
                title={`Edit ${System_Constants.MODULE_NAME}`}
                Form={uiEditForm} />
			       {/* End FormBlock here*/}
             {!(this.state.ADD_FLAG || this.state.EDIT_FLAG) && allData}  
      </Grid>
          {/* Start NoDataBuilder here*/}
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
Templates.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Templates);
