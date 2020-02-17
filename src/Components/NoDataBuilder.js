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
import {makeStyles, clsx, Typography, Grid} from "../theme/muiComponents";
//Icons Material UI
import {InfoIcon,SearchIcon, ForumIcon} from "../theme/muiIcons";
import Icon from '@material-ui/core/Icon';


const styles = makeStyles(theme => ({
    InfoIcon:{
        color : "#00bcd4"
      },
      content:{
        textAlign: "center",
        marginTop: "50px"
      },
      marginUP: {
        marginTop: "150px"
      }
}));

const NoDataBuilder = (props) => {
  const classes = styles();
  const iconList = (type) =>{
    switch (type){
      case "chat":
        return ForumIcon;
      case "search":
        return SearchIcon;
      case "chatinfo":
        return InfoIcon;
      case "info":
        return InfoIcon;
      default : 
        return InfoIcon;
    }
  }
  //Getting props
  const icon = <Icon component={iconList(props.type)} className={classes.InfoIcon} fontSize="large" />;
  let render = null;
  if(props.isRendor)
  {
     render = (<div
      className={clsx(classes.content, {
        [classes.marginUP]: (props.type === "chat" || props.type === "chatinfo" ),
      })} 
       >
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
      </div>);
  }
 
  return (
      render
  );
}

export default NoDataBuilder;