import React from 'react';
import {makeStyles } from '@material-ui/core/styles';


//Material UI
import {Typography, Tooltip, Grid, Divider, Card, CardContent} from "../theme/muiComponents";


const styles = makeStyles(theme => ({
    headerLeft:{
        textAlign:"left",
        flexGrow: 1,
        color: theme.palette.secondary.main
    },
    root:{
      borderTop: "2px solid #05def9"
    },
    dividerMargin:{
      marginBottom:"20px",
      marginTop:"5px"
    }
}));

const FormBlockBuilder = (props) => {
  const classes = styles();
  //Getting props
 
    let FormBlock = null;
    if(props.formState)
    {
        FormBlock = (
        <Grid item xs={12}>
       <Card className={classes.root}>
         <CardContent>
           <Grid
           container
           direction="row"
           justify="center"
           alignItems="center"
           spacing={2}
           >
           <Grid style={{display: "flex"}} item xs>
             <Typography className={classes.headerLeft} variant="h6">
             {props.title}
             </Typography>
             {props.headerMoreBtn && <Tooltip title="{{ Variables }}" >{props.headerMoreBtn}</Tooltip>}
           </Grid>
           </Grid>
        <Divider className={classes.dividerMargin} />
           {props.Form}
           {props.bottomBtn && props.bottomBtn}
         </CardContent>
       </Card>
  </Grid>
        );
    }
  return (FormBlock);
}

export default FormBlockBuilder;