import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = makeStyles({
    root: {
      flexGrow: 1,
      marginTop: "100px",
      textAlign: "center"
    },
    img: {
      width: "560px",
      height: "auto",
      maxWidth: "100%",
      maxHeight: "300px"
    }
  });

  
const NotFound = (props) => {
    const classes = styles();
    return(
        <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item style={{ textAlign: "center" }} xs={12}>
            <Typography variant="h4" gutterBottom>
              Oops! The page you are looking for isn’t here
            </Typography>
          </Grid>
          <Grid item style={{ textAlign: "center" }} xs={12}>
          <Typography variant="h1" color="secondary" gutterBottom> 404 </Typography>
            
          </Grid>
          <Grid item xs={12}>
          <Button onClick={() => props.history.push('/')} variant="outlined"> Back to Home </Button>
              </Grid>
        </Grid>
      </div>
    )
}
  


export default NotFound;