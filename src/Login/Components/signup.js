import React from 'react';
//Material UI
import {makeStyles,Button,Link,Grid,Typography} from "../../theme/muiComponents";

const styles = makeStyles(theme => ({
    divRoot:{
        width:"100%",
        marginTop: theme.spacing(1),
    },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      link:{
        color: theme.palette.common.main,
        cursor:"pointer"
      },
      title:{
          textAlign:"center"
      }

}));

const SignUpBuilder = (props) => {
  const classes = styles();

  //Getting props
  let Signup = null;
  if(props.isVisible)
  {
     Signup = (
        <div className={classes.divRoot}>
        <Typography className={classes.title} component="h1" variant="h5">
        Sign up
      </Typography>
      <form onSubmit={props.signupClick}>
     {props.form}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        disabled={props.disable}
        onClick={props.signupClick}
        className={classes.submit}
      >
        Sign Up
      </Button>
      </form>
      <Grid container justify="flex-end">
        <Grid item>
          <Link onClick={props.alreadyClick} className={classes.link}  variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
    </Grid>  
    </div> 
    );
    
  }
  return (Signup);
}

export default SignUpBuilder;