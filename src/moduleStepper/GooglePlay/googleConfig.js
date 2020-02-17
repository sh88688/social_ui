import React from 'react';

//Material UI
import { Button,CardActions, withStyles, Typography, Grid, CircularProgress,Card, CardHeader, Avatar, CardContent} from "../../theme/muiComponents";
import {ShopIcon, ArrowBackIcon} from '../../theme/muiIcons';

const styles = theme => ({
    card: {
      maxWidth: 1000,
    },
    root: {
      width: '100%',
      padding: theme.spacing(1, 7, 7, 7),
    },
    fabProgress: {
      color: "#921aff",
      zIndex: 1,
      margin: "16.5px",
    },
    button :{
      backgroundColor : "#4267b2",
      '&:hover':{
        backgroundColor : "#1345ab",
      }
    }
  });

class GoogleConfig extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading : false,
          EDIT_FLAG: false,
          userPageId: "",
          name: ""
        }
    }
    componentDidMount() {

    }
    handleFormState = (updatedFormState,index) =>{
      //console.log(`onChangeform page `);
    }
    render(){
        const {classes} = this.props;
        return (
            <span className={classes.root}>
          {!this.props.info ? <CircularProgress  size={30} thickness={4} className={classes.fabProgress} />
            :
            <Grid container
            direction="row"
            justify="center"
            alignItems="center" 
            spacing={4}>
              <Grid item xs={12}>
                  {<Card className={classes.card}>
                  <CardActions style={{borderBottom: "1px solid lightgray"}}>
                    <Button color="secondary" onClick={this.props.handler} startIcon={<ArrowBackIcon />}> BACK </Button>
                  </CardActions>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" />
                    }
                    title={`App Name : ${this.props.info.app_name}`}
                    subheader={`Google Play`}
                  />
                  <CardContent>
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center" 
                    spacing={2}>
                    <Grid item xs={12}>
                    <Typography style={{display: "flex"}} variant="h6">
                    <ShopIcon style={{ color: "#4ec306",alignSelf: "center", marginRight: "5px"}} /> {` Configuration Details :`}
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary" component="h5">
                    {`Package Name : ${this.props.info.package_name}`}
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary" component="h5">
                    {`Configured on : ${new Date(this.props.info.action_on * 1000).toLocaleString()}`}
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary" component="h5">
                    {`Status : ACTIVE`}
                    </Typography>
                    </Grid>
                  </Grid>
                  </CardContent> 
                </Card>}
               </Grid>
            </Grid>}
          </span>
      );
    }
}

export default withStyles(styles)(GoogleConfig);