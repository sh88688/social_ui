import React from "react";
import PropTypes from "prop-types";

//Material UI
import {withStyles,Grid} from "../theme/muiComponents";

//Icons Material UI
import {RateReviewIcon} from "../theme/muiIcons";


//Components
import ReviewCard from '../Components/ReviewCardBuilder';
import SortSearchBuilder from '../Components/SortSearchBuilder';
import AppBarBuilder from '../Components/AppBarBuilder';
import NoDataBuilder from '../Components/NoDataBuilder';

//Modular Functions
import {GET_DATA, SET_DATA} from '../ModularFunctions/Functions';
//import Json Schema
import formJson from '../FormSchema/profileForm.json';
//import Search Json Schema
import formSearchJson from '../SearchSchema/googlePlaySearch.json';

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
Intial_NODATA.title = "No Reviews yet.";
Intial_NODATA.description = "Intents are objects your app or device takes action on.";
Intial_NODATA.type = "intial";

const Search_NODATA = {};
Search_NODATA.title = "No Records Found !";
Search_NODATA.description = "";
Search_NODATA.type = "search";

const System_Constants={};
System_Constants.API_PAGE="intents";
System_Constants.MODULE_PAGE="/intents";
System_Constants.ID_FIELD="intent_id";
System_Constants.FIELD_NAME='intent_name'
System_Constants.MODULE_NAME="Reviews";

class GoogleReview extends React.Component {

  DEFAULT_JSON = JSON.stringify(formJson);
  
  constructor(props)
  {
          super(props);
          this.state = {
            ADD_FLAG:false,
            EDIT_FLAG: false,
            EDIT_SELECTED: null,
            IS_LOADING:false,
            DATA_ARRAY:["test","best"],
            DATA_COUNT: "",
            NO_DATA_CONTENT: Intial_NODATA,
            dataForm: formJson,
            searchForm : formSearchJson,
          };      
  }

componentDidMount(){

  //console.log("====> DID MOUNT GR");
  // let filter = {};
  // GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Intial_NODATA, this);

  // GET_RESPONSE("intentLabel", 0, 10, this).then((result)=>{

  //   const keyChain = {
  //     fieldKey: "intent_label_id",
  //     displayApiKey:"intent_label",
  //     valueApiKey:"intent_label_id"
  //   };
  //   SELECT_OPTION_SETTER(this, result, keyChain);
  //   this.setState({dataForm : this.DEFAULT_JSON});
  //   this.DEFAULT_JSON = JSON.stringify(this.DEFAULT_JSON);
  // });
}

UNSAFE_componentWillReceiveProps(nextProps){
  //console.table("===== [Intent.js] componentWillReceiveProps =====",nextProps.info);
  if(this.props.info !== nextProps.info)
  {
    SET_DATA(nextProps,"DATA_ARRAY",System_Constants.ID_FIELD,this); 
  }
}
// getReviews = (module) => {

//   const reqObj = {};
//   reqObj.filter = {};
//   reqObj.limit_info = {};
//   reqObj.limit_info.limit_start = 0;
//   reqObj.limit_info.limit_end = 10;
//   reqObj.filter.client_id = "560";
//   reqObj.filter.param = "Google";
//   reqObj.filter.reviewId = "";
//   reqObj.filter.filter_source = "all_post";
//   reqObj.filter.assigned_to_user_id = "";
//   reqObj.filter.assigned_to_dept_id = "";
//   reqObj.filter.create_time_s = "11/06/2019";
//   reqObj.filter.create_time_e = "12/06/2019";
//   reqObj.filter.status_id = "";
//   reqObj.filter.name = "";

//   const queryParam = `?module=${module}&cl_key=1&req_data=${JSON.stringify(reqObj)}`;
//   const url = new URL(`${PROTOCOL}${SERVER_IP}/CZ_SOCIAL/getDataAjax.php${queryParam}`);
//   const fetchCallOptions = {
//      method: "GET",
//      credentials: 'include' 
//    };
//     try {
//     const result = fetchCall(url, fetchCallOptions, "json");
//     return result;
//     }
//     catch (error) {
//       //console.log(error);
//     }
// }
handleFormState = (updatedFormState,index) =>{
// //console.log("intent ====> ",this.state.dataForm);
}
handleSearch = (filter) => {
  //console.log(System_Constants.FIELD_NAME,filter, System_Constants.API_PAGE, 0, 10, Search_NODATA);
  GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Search_NODATA, this);
}
handleClear = () => {
  let filter = {};
  filter.agent_name = "";
  GET_DATA(filter, System_Constants.API_PAGE, 0, 10, Search_NODATA, this);
}


render(){
  const { classes } = this.props;
  const colorDynamo = ["#E53935","#D81B60","#8E24AA","#1E88E5","#00ACC1","#00897B","#43A047","#FFB300","#F4511E"];
  //Intent cards
  const allData =  this.state.DATA_ARRAY.map((element,keyIndex) => (
    <Grid key={keyIndex} item xs={12}>
    <ReviewCard 
    key={keyIndex}
    author={"Shivam"}
    starRating={3}
    userComment={"Very useful and Nice App."}
    colorDynamo={colorDynamo[Math.floor(Math.random() * 10)]}
    lastModify={"1575371586"}
    developerComment= {"Thanks for your valuable feedback."}
    />
    </Grid>
    ));

   
  return (
    <div className={classes.rootDiv}>
    <AppBarBuilder 
      IS_LOADING={this.state.IS_LOADING}
      headerTitle={System_Constants.MODULE_NAME}
      PARENT={this.props.PARENT}
      headerIcon={RateReviewIcon} />
    
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid 
            container 
            direction="row"
            justify="center"
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

            {allData}  
        {/* Start NoDataBuilder here*/}
        <NoDataBuilder
          isRendor={(this.state.DATA_ARRAY.length === 0 && this.state.ADD_FLAG === false)}
          title={this.state.NO_DATA_CONTENT.title}
          description={this.state.NO_DATA_CONTENT.description}
          type={this.state.NO_DATA_CONTENT.type}
         />
      </Grid>
    </main>

    </ div>
  );
}

};
GoogleReview.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(GoogleReview);
