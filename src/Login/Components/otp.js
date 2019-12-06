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

const OtpBuilder = (props) => {
  const classes = styles();
  //Getting props
  let OTP = null;
  if(props.isVisible)
  {
    OTP = (
        <div className={classes.divRoot}>
        <Typography className={classes.title} component="h1" variant="h5">
        Verification
      </Typography>
      <Typography className={classes.title} variant="body2">
        Enter the OTP from the email we just sent you.
      </Typography>
      <form onSubmit={props.submitClick}>
      {props.form}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={props.disable}
          onClick={props.submitClick}
          className={classes.submit}
        >
          Submit
        </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link href="#" className={classes.link} variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link className={classes.link} variant="body2">
              {"Resend OTP"}
            </Link>
          </Grid>
        </Grid>
        </div>
    );
  }
  return (OTP);
}

export default OtpBuilder;