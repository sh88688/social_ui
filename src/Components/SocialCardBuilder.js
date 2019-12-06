import React from "react";

//Material UI
import {makeStyles, clsx, LinearProgress, Divider, Icon, Button, CardActions,  Grid, Typography, CardContent, Card, CardHeader, IconButton} from "../theme/muiComponents";

//Icons Material UI
import {MoreVertIcon, DeleteIcon, SettingIcon} from "../theme/muiIcons";

//CSS Styles
const styles = makeStyles(theme => ({
      card: {
        width: "150px",
        borderRadius: "8px",
      },
      cardProgress: {
        marginTop : "-4px"
      },
      cardHeader:{
        padding: "10px 10px 5px 10px",
        textAlign: "center"
      },
      cardContent:{
        textAlign: "center",
        padding: "5px 0px 0px 0px"
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(90deg)',
      },
      action:{
          textAlign: "center",
          display: "block",
          padding: "7px 10px 10px 10px"
      },
      actionTop:{
          marginTop: "0px"
      },
      cardBtn:{
          width: "100%"
      },
      svgIcon:{
          width: "55px",
          height: "55px"
      },
      icnBtn:{
        padding: "5.5px"
      },
      disableBtn:{
        color:"#6ede1b !important"
      }
}));


const SocialCard = (props) => {
  const  classes = styles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
            <Grid item xs={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
                <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    classes={{action: classes.actionTop}}
                    action={
                      <IconButton className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded && props.disableBtn,
                      })} 
                      onClick={handleExpandClick} 
                      aria-expanded={expanded} 
                      disabled={!props.disableBtn} 
                      size="small"
                      color="secondary"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    subheader={<Typography style={{color: props.titleColor}}> {props.title}</Typography>}
                />
                <CardContent className={classes.cardContent}>
                <img src={props.icon} alt="Not Found" className={classes.svgIcon} />
                </CardContent>
                <CardActions className={classes.action}>
                { expanded && props.disableBtn ?
                <React.Fragment>
                <IconButton aria-label="delete" disabled={props.Loader} className={classes.icnBtn}>
                <SettingIcon fontSize="inherit"  />
                </IconButton>
                <IconButton aria-label="delete" disabled={props.Loader} color="secondary" onClick={props.uninstallHandler} className={classes.icnBtn}>
                <DeleteIcon fontSize="inherit" />
                </IconButton>
                </React.Fragment> : 
                <Button 
                startIcon={props.btnIcon}
                size="medium"
                disabled={props.disableBtn}
                onClick={props.installHandler}
                className={classes.cardBtn}
                classes={{disabled: classes.disableBtn}}
                color="secondary">
               {props.btnText}
               </Button>
                }
                </CardActions>
                { props.Loader && <LinearProgress thickness={1.7} className={classes.cardProgress} variant="query" color="secondary" />}
                </Card>
            </Grid>
  );

};

export default SocialCard;
