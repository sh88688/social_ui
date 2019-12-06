import React, { Component } from "react";
//Components
import InputBuilder from "./InputBuilder";
import checkValidity from "./FieldValidator";
import formJsonResetter from "./JsonResetter";

//Material UI
import {Grid, withStyles, Typography, Button, IconButton} from "../theme/muiComponents";
//Icons Material UI
import {AddIcon,DeleteIcon} from "../theme/muiIcons";

const styles = theme => ({
 
  subHeading:{
    textAlign:"left",
    color:"#1f3a92",
    marginTop : "10px",
  },
  addBtn:{
    textAlign: "left",
    marginTop:"10px",
    marginLeft:"8px"
  },
  deleteBtn:{
    marginTop: "10px",
    color:"#5c5ca2",
  },
  deleteGrid : {
    padding:"0px !important"
  },
  multipleGrid:{
    margin:"8px",
    border: "1px dashed #b9b9b9"
  }
});

class FormRender extends Component {
  //constructor
  constructor(props) {
    super(props);

    this.state = {
      iForm: this.props.json,
      formIsValid: false,
    };
  }

  Default_JSON = JSON.stringify(this.props.json);

  GROUP_ADD = () =>{

    const  iFormCopy = {...this.state.iForm};
    let FieldCopy = [...iFormCopy.config.fields];
    let Default_Fields = JSON.parse(this.Default_JSON)
    FieldCopy = [...FieldCopy, formJsonResetter(Default_Fields.config.fields[0])];
    iFormCopy.config.fields = FieldCopy; 
    this.setState({iForm : iFormCopy});
    
  }
  GROUP_DELETE = (index) => {

    const  iFormCopy = {...this.state.iForm};
    let FieldCopy = [...iFormCopy.config.fields];
    FieldCopy.splice(index, 1);
    iFormCopy.config.fields = FieldCopy;
    this.setState({iForm : iFormCopy});

  }
  Group_Input_Changer = (event, OUTER_INDEX, INNER_INDEX) =>{
    
    //make a copy of iForm State
    const iFormCopy = {...this.state.iForm};
    const updatedFormElement = iFormCopy.config.fields[OUTER_INDEX][INNER_INDEX];
        //update changed value
        updatedFormElement.config.value =
        updatedFormElement.config.elementType === "checkbox"
          ? event.target.checked
          : event.target.value;
  
      //check validity
      let getValidity = checkValidity(
        updatedFormElement.config.value,
        updatedFormElement.config.validation
      );
  
      updatedFormElement.config.valid = getValidity.isValid;
      updatedFormElement.config.helperText = getValidity.errorText;
      //updated element's touched property
      updatedFormElement.config.touched = 1;
  
      //set iFormCopy's updatedElement
      iFormCopy.config.fields[OUTER_INDEX][INNER_INDEX] = updatedFormElement;
        //passing updated form state to parent class's funtion
        this.props.stateChanger(updatedFormElement, OUTER_INDEX);
        //setState to showing updated value
        this.setState({ iForm: iFormCopy });
  }

  Input_Changer = (event, inputIdentifier) => {
    //make a copy of iForm State
    const updatedFormElement = this.state.iForm;

    //update changed value
    if(updatedFormElement.config.type === "file")
    {
      updatedFormElement.config.value = event.target.value;
      updatedFormElement.config.file  = event.target.files[0];
    }
    else
    {
      updatedFormElement.config.value =
      updatedFormElement.config.elementType === "checkbox"
        ? event.target.checked
        : event.target.value;
    }


    //check validity
    let getValidity = checkValidity(
      updatedFormElement.config.value,
      updatedFormElement.config.validation
    );

    updatedFormElement.config.valid = getValidity.isValid;
    updatedFormElement.config.helperText = getValidity.errorText;
    //updated element's touched property
    updatedFormElement.config.touched = 1;

    //Checking The whole form Validity
    // let formIsValid = isFormValid(updatediForm);

      //setState to showing updated value
      this.setState({ iForm: updatedFormElement });

     //passing updated form state to parent class's funtion
     this.props.stateChanger(updatedFormElement, inputIdentifier);
  };

  render() {
    const { classes, ...other} = this.props;
    const { config } = this.state.iForm;
    let Form = null;

    switch (config.elementType){
      case "multiple-add":
          Form = (<React.Fragment>            
                  {config.fields.map((field, field_index) => {  
                      return (
                      <React.Fragment key={field_index}>
                      <Grid
                          key={field_index}
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                          className={classes.multipleGrid}
                          spacing={4}>
                              {field.map((elem, elem_index) => (

                              <InputBuilder
                              key={elem_index}
                              config={elem.config}
                              inputAdornment={elem.config.inputAdornment}
                              changed={event => this.Group_Input_Changer(event, field_index, elem_index)}
                              clicked={event => other.clickHandler(event)}
                              />
                              
                              ))}
                              {field_index > 0 &&  <Grid className={classes.deleteGrid} item xs={1} md={1} lg={1}>
                              <IconButton className={classes.deleteBtn} key={field_index} aria-label="delete" onClick={() => this.GROUP_DELETE(field_index)} >
                              <DeleteIcon fontSize="large" />
                              </IconButton>
                              </Grid>}
                        </Grid>
                      </React.Fragment>
                      );
                    
                  })}
                  <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                      className={classes.headerLeft}
                      spacing={2}>
                        <Grid className={classes.addBtn} item xs={12}>
                          <Button size="small" onClick={() => this.GROUP_ADD()} variant="outlined" color="secondary">
                          <AddIcon fontSize="small" style={{marginRight:"10px"}}/>
                          {config.title}
                          </Button>
                        </Grid>  
                   </Grid>
              </React.Fragment>
          );
        break;
      case "subheading":
        Form = (
        <Grid item xs={config.grid} md={config.grid} lg={config.grid}>
        <Typography className={classes.subHeading} variant="subtitle1">
        {config.title}
        </Typography>
        </Grid>
        );
      break;
        default:
            Form = (
            <InputBuilder
                key={this.state.iForm.id}
                config={config}
                inputAdornment={config.inputAdornment}
                changed={event => this.Input_Changer(event, this.props.index)}
                clicked={event => other.clickHandler(event)}
              />
           );
          break;

    }

    return Form;
  }
}

export default withStyles(styles)(FormRender);
