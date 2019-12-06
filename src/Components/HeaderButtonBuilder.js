/*
Component Name : HeaderButtonBuilder
Created By : Shivam @ 10-07-2019
RequiredProps : 
    1. buttonText : (String) 
        e.g "Create New Model" 
    2. formState : (Boolean) 
        e.g true (for conditional rendering Save or Create new buttons)
    3. btnDisable : (Boolean)  
        e.g true (for disable or enable Save Button)
*/
import React from 'react';
//Material ui
import { makeStyles, Button} from '../theme/muiComponents';
//Icons Material UI
import {SaveIcon,CancelIcon} from "../theme/muiIcons";



const styles = makeStyles(theme => ({   
    button:{
        marginRight:"5px",
      },
      buttonIcon:{
        paddingRight:"5px",
      },    
}));

const HeaderButtonBuilder = (props) => {
  const classes = styles();
  //Getting props
  const createButton = (<Button 
    color="primary"
    variant="outlined"
    className={classes.button}
    onClick={props.clickToggle}
    >
    {props.buttonText}
    </Button>);

let  saveButton = null;
const formState = (props.isFormCreate || props.isFormEdit);
  if(formState){
    saveButton = (
      <span>
            <Button 
            color="primary"
            className={classes.button}
            onClick={props.isFormCreate ? props.clickSaveCreate : props.clickSaveEdit}>
            <SaveIcon className={classes.buttonIcon} />
            Save 
            </Button>
          <Button 
            color="primary"
            className={classes.button}
            onClick={props.clickToggle}>
            <CancelIcon className={classes.buttonIcon}/>
            Cancel 
          </Button>
    </span>); 
  }
  
//Header Button Selection
const HeaderButton = formState ? saveButton : createButton;


  return (
    HeaderButton
  );
}

export default HeaderButtonBuilder;