/*
Component Name : NoDataBuilder
Created By : Shivam @ 10-07-2019
RequiredProps : 
    1. isRendor : (Boolean) 
        e.g true (for render this component or not)
    2. title : (String) 
        e.g "No models yet."
    3. description : (String)  
        e.g "Models are objects."
*/
import React from 'react';
//Material UI
import {makeStyles, Typography, Grid} from "../theme/muiComponents";
//Icons Material UI
import {InfoIcon,SearchIcon} from "../theme/muiIcons";



const styles = makeStyles(theme => ({
    InfoIcon:{
        color : "#00bcd4"
      },
      content:{
        textAlign: "center"
      }
}));

const NoDataBuilder = (props) => {
  const classes = styles();
  //Getting props
  const icon = (props.type === "search") ? <SearchIcon className={classes.InfoIcon} fontSize="large" /> : <InfoIcon className={classes.InfoIcon} fontSize="large" />;
  let render = null;
  if(props.isRendor)
  {
     render = (<span className={classes.content} >
          <Grid item xs={12}>
            {icon}
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              {props.description}
            </Typography>
          </Grid>
      </span>);
  }
 
  return (
      render
  );
}

export default NoDataBuilder;