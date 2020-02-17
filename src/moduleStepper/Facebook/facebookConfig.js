import React from 'react';
//Material UI
import { Button,CardActions, withStyles, Typography, Grid, CircularProgress,Card, CardHeader, Avatar, CardContent} from "../../theme/muiComponents";
import {FacebookIcon, ArrowBackIcon} from '../../theme/muiIcons';

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

class FacebookConfig extends React.Component {
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
          {!this.props.info.page_id ? <CircularProgress  size={30} thickness={4} className={classes.fabProgress} />
            :
            <Grid container
            direction="row"
            justify="center"
            alignItems="center" 
            spacing={4}>
              <Grid item xs={12}>
                  {this.props.info.page_id && <Card className={classes.card}>
                  <CardActions style={{borderBottom: "1px solid lightgray"}}>
                    <Button color="secondary" onClick={this.props.handler} startIcon={<ArrowBackIcon />}> BACK </Button>
                  </CardActions>
                  <CardHeader
                    avatar={
                      <Avatar src={`https://graph.facebook.com/v5.0/${this.props.info.page_id}/picture`} aria-label="recipe" />
                    }
                    title={`Page Name : ${this.props.info.page_name}`}
                    subheader={`Facebook`}
                  />
                  <CardContent>
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center" 
                    spacing={2}>
                    <Grid item xs={12}>
                    <Typography style={{display: "flex"}} variant="h6">
                    <FacebookIcon style={{ color: "#770ee8",alignSelf: "center", marginRight: "5px"}} /> {` Configuration Details :`}
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary" component="h5">
                    {` Page ID : ${this.props.info.page_id}`}
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary" component="h5">
                    {`Page Name : ${this.props.info.page_name}`}
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

export default withStyles(styles)(FacebookConfig);