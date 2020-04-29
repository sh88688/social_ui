import React from 'react';
//Components
import FormRender from '../../Components/FormRender';
import fetchCall from '../../Components/FetchCaller';

//Material UI
import { withStyles, Grid, CircularProgress} from "../../theme/muiComponents";

const styles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(1, 7, 7, 7),
      },
      fabProgress: {
        color: "#921aff",
        zIndex: 1,
        margin: theme.spacing(1, 7, 5.86, 7),
      },
      selectPage :{
          width: "100%"
      }
  });
  
class SecondForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            PageList : [],
            checked : 0,
            loading : true,
        }
    }
    componentDidMount(){
        this.handleFetchPages(this.props.userId, this.props.userToken);
    }
    handleFormState = (updatedFormState,index) =>{
        //console.log(`onChangeform`);
    }
    handleChange = (event) =>{
        this.props.COMPONENT.setState({userPageId : event.target.value});
    }
    handleFetchPages = (userID, token) => {
        const fetchCallOptions = {
          method: 'GET',
        };

          const url = new URL(`https://graph.facebook.com/v6.0/${userID}/accounts?access_token=${token}`);
          fetchCall(url,fetchCallOptions,"json").then((result) => {
                //console.log(result);
                if(result.data)
                {
                  const object = [...JSON.parse(this.props.COMPONENT.DEFAULT_JSON2)];
                  let dataIndex = object.findIndex(e => e.id === 'pageId');
                  let dataField = object[dataIndex];
                  const updatedOptions = result.data.map((e)=> { return { displayValue : e['name'], value : e['id'] }});
                  dataField.config.options = updatedOptions;
                  object[dataIndex] = dataField;
                  //console.log('datafield ==> ',dataField);
                  this.props.COMPONENT.setState({secondForm : object, Uploading : false});
                }
                
            },
            (error) => {
              //console.log(error);
            }); 
      }

    render(){
        const {classes} = this.props;

        return (
            <span className={classes.root}>
           {this.props.loading ? <CircularProgress  size={30} thickness={4} className={classes.fabProgress} />
            :
            <Grid container justify="center" spacing={1}>
            {this.props.Form.map((element,index) =>(
            <FormRender 
            key={index}
            json={element}
            index={index}
            stateChanger={(updatedFormState, index) => this.props.handler(updatedFormState,index)}
            />
            ))} 
            </Grid>} 
            </span>
          );
    }
}

export default withStyles(styles)(SecondForm);