//BUG : statuscode based ajax response should be handle
import fetchCall from '../Components/FetchCaller';
import isFormValid from '../Components/FormValidSetter';
//other
import {SERVER_IP, PROTOCOL, API_URL_2} from '../Configs/apiConf';

export const GET_DATA = (filter, module, limitStart, limitEnd, noData, COMPONENT) =>{
    
    COMPONENT.setState({
        IS_LOADING : true
    });
    const reqObj = {};
    reqObj.filter = filter;
    reqObj.limit_info = {};
    reqObj.limit_info.limit_start = limitStart;
    reqObj.limit_info.limit_end = limitEnd;
    const queryParam = `?module=${module}&cl_key=4&req_data=${JSON.stringify(reqObj)}`;
    const url = new URL(`${PROTOCOL}${SERVER_IP}/CHATBOT/getDataAjax.php${queryParam}`);
    console.log(`${PROTOCOL}${SERVER_IP}/CHATBOT/getDataAjax.php${queryParam}`);
    const fetchCallOptions = {
    method: "GET",
    credentials: 'include' 
  };
    fetchCall(url, fetchCallOptions, "json").then((result) => {
      console.log(result);
            if(result.allRows === "0")
            {         
                COMPONENT.setState({
                IS_LOADING : false,
                DATA_ARRAY : [],
                NO_DATA_CONTENT : noData,
                DATA_COUNT : ""
                });
            }
            else
            {
                COMPONENT.setState({
                    IS_LOADING : false,
                    SEARCH_FLAG : true,
                    DATA_COUNT : `${result.totalRows} of ${result.allRows}`,
                    DATA_ARRAY : result.dataInfo
                });
            }
      },
      (error) => {
        console.log(error);
        // CallbackFunc("ERROR",error); 
      })
  }
export const SET_DATA = (nextProps, STATE_KEY, ID_FIELD, COMPONENT) =>{
    
    const DataInfo = {...nextProps.info.dataInfo};
    const ModuleInfo = {...nextProps.info.moduleInfo};
    const index = COMPONENT.state[STATE_KEY].findIndex(elem => elem[ID_FIELD] === DataInfo[ID_FIELD]);
    let DATA_COPY = null;

    switch(ModuleInfo.event)
    {
        case `modify`:
                DATA_COPY = [...COMPONENT.state[STATE_KEY]];
                DATA_COPY.splice(index,1);
                DATA_COPY.unshift(DataInfo);
                COMPONENT.setState({[STATE_KEY] : DATA_COPY});
        break;
        case `delete`:
                DATA_COPY = [...COMPONENT.state[STATE_KEY]];
                DATA_COPY.splice(index,1);
                COMPONENT.setState({[STATE_KEY] : DATA_COPY});         
        break;
        case `create`:
                DATA_COPY = [...COMPONENT.state[STATE_KEY]];
                DATA_COPY.unshift(DataInfo);
                COMPONENT.setState({[STATE_KEY] : DATA_COPY});
        break;
        default:
            console.log("Default case : ModuleInfo EVENT");
        break;


    }
  }
export const HEADER_TOGGLE = (FORM_KEY, COMPONENT) =>{
    
    COMPONENT.setState({
        [FORM_KEY] : JSON.parse(COMPONENT.DEFAULT_JSON)
      });
      
      if(COMPONENT.state.EDIT_FLAG)
      {
        COMPONENT.setState({
          EDIT_FLAG: !COMPONENT.state.EDIT_FLAG,
          SEARCH_FLAG: !COMPONENT.state.SEARCH_FLAG,
        });
      }
      else{
        COMPONENT.setState({
            ADD_FLAG: !COMPONENT.state.ADD_FLAG,
            SEARCH_FLAG: !COMPONENT.state.SEARCH_FLAG,
          });   
      }
  }
export const ACTION_HANDLER = (EVENT, ACTION_EVENT, ACTION, ATTRIB, MODULE_PATH, FORM_KEY, COMPONENT) =>{
    
    EVENT.preventDefault();

    //Checking validity
    const didFormValid = isFormValid(COMPONENT.state[FORM_KEY]);

    COMPONENT.setState({
        [FORM_KEY]: didFormValid.validatedForm,
    });
   
   if (didFormValid.formValidity || ACTION === 'delete') {

        COMPONENT.setState({ 
            IS_LOADING: true
         });

         const POST_DATA = {};
         let  DATA_ARRAY_COPY = [...COMPONENT.state.DATA_ARRAY];
         POST_DATA.event= ACTION_EVENT;
         POST_DATA.action= ACTION;
         POST_DATA.client_id= 4;
         POST_DATA.data={};
         if(ACTION === 'modify' || ACTION === 'delete')
         { 
            const DATA_OBJ =  {...DATA_ARRAY_COPY[ATTRIB.index]};
            POST_DATA.data[ATTRIB.id] = DATA_OBJ[ATTRIB.id];
            DATA_OBJ.processing = true;
            DATA_ARRAY_COPY[ATTRIB.index] = DATA_OBJ;
         }
         COMPONENT.state[FORM_KEY].forEach( elem => {

            if(elem.config.elementType !== "subheading")
              {
                if(elem.config.elementType === "multiple-add")
                {
                  //Making multi-add elements array
                  POST_DATA.data[elem.id]=[];
                  //Process multi-field containing Arrays
                  elem.config.fields.forEach((field, field_index) =>{
                    let obj = {};
                    //Assign fields into Object
                    field.forEach((field_elem, field_elem_index) => {
                      obj[field_elem.id] = field_elem.config.value;
                      }); 
                      //Save Every Multi block obj into multi-add elements array
                      POST_DATA.data[elem.id].push(obj);
                  });

                }
                else
                {
                  POST_DATA.data[elem.id] = elem.config.value;
                } 
              }

         });
         POST_DATA.event_by="Admin";
         POST_DATA.moduleInfo = {};
         POST_DATA.moduleInfo.module = MODULE_PATH;
         POST_DATA.moduleInfo.event = ACTION;

        const QUERY_PARAM = `?reqPacket=${JSON.stringify(POST_DATA)}`;
        const url = new URL(`${PROTOCOL}${SERVER_IP}${API_URL_2}${QUERY_PARAM}`);
        console.log('GENERIC URL ',`${PROTOCOL}${SERVER_IP}${API_URL_2}${QUERY_PARAM}`);
        const fetchCallOptions = {
            method: "GET",
            credentials: 'include' 
        };
        fetchCall(url,fetchCallOptions,"text").then((result) => {
            console.log(result);
            COMPONENT.props.tokenCallback(result);
            COMPONENT.setState({
              IS_LOADING: false,
              ADD_FLAG: false,
              DATA_ARRAY: DATA_ARRAY_COPY,
              EDIT_FLAG: false,
            });
        },
        (error) => {
            COMPONENT.setState({
                  IS_LOADING: false,
                });
        });

    }

  }
export const GET_RESPONSE = (module, limitStart, limitEnd) =>{
    const reqObj = {};
    reqObj.filter = {};
    reqObj.limit_info = {};
    reqObj.limit_info.limit_start = limitStart;
    reqObj.limit_info.limit_end = limitEnd;
    const queryParam = `?module=${module}&cl_key=4&req_data=${JSON.stringify(reqObj)}`;
    const url = new URL(`${PROTOCOL}${SERVER_IP}/CHATBOT/getDataAjax.php${queryParam}`);
    const fetchCallOptions = {
       method: "GET",
       credentials: 'include' 
     };
      try {
      const result = fetchCall(url, fetchCallOptions, "json");
      return result;
      }
      catch (error) {
        console.log(error);
      }
  }
export const SELECT_OPTION_SETTER = ( SELECT_FIELD, DISPLAY_VALUE, VALUE, RESULT) => {
  const DATA_FIELD = {...SELECT_FIELD};
  const OPTIONS = RESULT.dataInfo.map((e)=> { return { displayValue : e[DISPLAY_VALUE], value : e[VALUE] }});
  DATA_FIELD.config.options = OPTIONS;
  return DATA_FIELD;
  }
export const FILL_VALUES = ( IDENTIFIER, COMPONENT ) =>{

  COMPONENT.setState({IS_LOADING: true});
  const SCHEMA = JSON.parse(COMPONENT.DEFAULT_JSON);
  SCHEMA.forEach(SCHEMA_ELEM => {
  if(SCHEMA_ELEM.config.elementType !== 'subheading')
  {   
      if(SCHEMA_ELEM.config.elementType === "multiple-add")
      {
          const TEMP_ARRAY = [];
          //Loop DA Current values
          COMPONENT.state.DATA_ARRAY[IDENTIFIER][SCHEMA_ELEM.id].forEach(DATA_ARRAY_ELEM => {

            //Loop Default JSON field values
            SCHEMA_ELEM.config.fields.forEach(SCHEMA_ELEM_ARRAY => {

              SCHEMA_ELEM_ARRAY.forEach( FIELD =>
                {
                  FIELD.config.value = DATA_ARRAY_ELEM[FIELD.id];
                })

                TEMP_ARRAY.push(JSON.parse(JSON.stringify(SCHEMA_ELEM_ARRAY)));        
            })
          })
          SCHEMA_ELEM.config.fields = TEMP_ARRAY;    
      }
      else
      {
          SCHEMA_ELEM.config.value = COMPONENT.state.DATA_ARRAY[IDENTIFIER][SCHEMA_ELEM.id];
      }
  }  
  });

  COMPONENT.setState({dataForm: SCHEMA, IS_LOADING: false, EDIT_FLAG: true, EDIT_SELECTED: IDENTIFIER});
}

 