import React from "react";
import PropTypes from "prop-types";
//Material UI
import {withStyles, Typography, Card, CardHeader, IconButton, LinearProgress, Avatar, Icon} from "../theme/muiComponents";
//Icons Material UI
import {EditIcon,DeleteIcon} from "../theme/muiIcons";

const styles = theme => ({
  card:{
    marginBottom:"10px",
    borderLeft: `2px solid #5c5ca2`,
    // background: "linear-gradient(150deg, #fff, #f1efef)",
  },
  cardHeader:{
    textAlign:"left",
    paddingTop:"8px",
    paddingBottom:"8px"
  },
  title:{
    color:"#0202ea",
    cursor:"pointer",
    fontSize: "0.99rem",
    display:"flex"
  },
  subheader:{
    marginTop:"5px",
  },
  subheader1:{
    color:"#7f7f7f",
    display:"flex",
  },
  subheader2:{
    color:"#464545",
    display:"flex",
  },
  rootProgress:{
    backgroundColor: '#5c5ca2',
    height: '2px'
  },
  avatar:{
    backgroundColor:"#5c5ca2"
  },
  icon:{
    color:"#05def9",
  },
  actionIcon:{
    color:"#5c5ca2",
  }
});

class ModelCardBuilder extends React.Component {

  render() {
    const { classes } = this.props;
    const { modelName, createdby, onEdit, processing, ICON } = this.props;
    const Loader =  (processing && <LinearProgress classes={{root : classes.rootProgress}} color="secondary" />);

    return (
      <Card className={classes.card}> 
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <Icon className={classes.icon} component={ICON} />
         </Avatar>
        }
        action={
            <div>
            <IconButton disabled={processing} className={classes.actionIcon} onClick={(event) => this.props.onDelete(event)} aria-label="Add to favorites">
               <DeleteIcon />
            </IconButton>
            <IconButton disabled={processing}  className={classes.actionIcon} onClick={(event) => onEdit(event)} aria-label="Share">
               <EditIcon  />
            </IconButton>
            </div>
          }
          title={
          <Typography onClick={(event) => onEdit(event)} className={classes.title} >
           {modelName}
          </Typography>
                }
        subheader={<div className={classes.subheader}>
          <Typography variant="caption" className={classes.subheader1}>
            {`CREATED BY : `}<span className={classes.subheader2}>{`\u00A0\u00A0${createdby}`}</span>
          </Typography>
          {/* <Typography variant="body2" className={classes.subheader2}>
          <span>{createdby}</span>
          </Typography> */}
        </div>}
      />
     {Loader}
    </Card>
 
    );
  }
}

ModelCardBuilder.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ModelCardBuilder);
