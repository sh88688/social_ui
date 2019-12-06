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

const SignInBuilder = (props) => {
  const classes = styles();
  //Getting props
  let Signin = null;
  if(props.isVisible)
  {
    Signin = (
        <div className={classes.divRoot}>
        <Typography className={classes.title} component="h1" variant="h5">
        Sign in
      </Typography>
      <Typography className={classes.title} variant="body2">
        {props.subtitle}
      </Typography>
      <form onSubmit={props.signinClick}>
      {props.form}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={props.disable}
          onClick={props.signinClick}
          className={classes.submit}
        >
          Sign In
        </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link href="#" className={classes.link} variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={props.createClick} className={classes.link} variant="body2">
              {"Create a new account"}
            </Link>
          </Grid>
        </Grid>
        </div>
    );
  }
  return (Signin);
}

export default SignInBuilder;