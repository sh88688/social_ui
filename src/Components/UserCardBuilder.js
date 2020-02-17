import React from "react";
import PropTypes from "prop-types";
//Material UI
import {withStyles, clsx, CardContent, Typography, Card, CardHeader, IconButton, LinearProgress, Avatar} from "../theme/muiComponents";
//Icons Material UI
import {EditIcon, EmailIcon, PhoneIcon, PersonOutlineIcon, DeleteIcon, MoreVertIcon} from "../theme/muiIcons";

const styles = theme => ({
   card: {
    maxWidth: 345,
    borderRadius: "5px"
  },
  cardContent : {
    padding : theme.spacing(1, 0.5, 1, 2),
    paddingBottom: "8px !important",
    marginLeft: "10px"
  },
  headAction : {
    marginTop : "0px"
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
  title:{
    color:"#0202ea",
    cursor:"pointer",
    fontSize: "0.99rem",
    display:"flex",
    textTransform : "capitalize"
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
  flex :{
      display: "flex",
      marginTop: "5px"
  },
  detailIcon:{
    marginRight: "10px"
  },
  actionIcon:{
    color:"#5c5ca2",
  }
});

class UserCardBuilder extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
        expanded : false
        }
    }
  handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
  };
  render() {
    const { classes, data } = this.props;
    const { onEdit, processing } = this.props;
    const Loader =  (processing && <LinearProgress classes={{root : classes.rootProgress}} color="secondary" />);
    const Details = [
        {icon : PhoneIcon, text: data.user_phone},
        {icon : EmailIcon, text: data.email},
        {icon : PersonOutlineIcon, text: data.status}
    ]

    return (
     <Card className={classes.card}>
      <CardHeader
        classes={{action : classes.headAction}}
        avatar={
          <Avatar aria-label="recipe" style={{backgroundColor : `${data.color}`}} className={classes.avatar}>
            {data.first_name.toString().charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
        <React.Fragment>
            { this.state.expanded && <React.Fragment>
                <IconButton 
                size="small" 
                disabled={processing}  
                className={classes.actionIcon} 
                onClick={(event) => onEdit(event)} 
                aria-label="add to favorites">
                <EditIcon />
                </IconButton>
                <IconButton 
                size="small"
                disabled={processing}  
                className={classes.actionIcon} 
                onClick={(event) => this.props.onDelete(event)} 
                aria-label="share">
                <DeleteIcon />
                </IconButton>
            </React.Fragment>}
          <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: this.state.expanded,
          })}
          size="small"
          color="secondary"
          onClick={this.handleExpandClick}
          aria-label="show more">
            <MoreVertIcon />
          </IconButton>
        </React.Fragment>
        }
        title={<Typography className={classes.title} variant="body2">{`${data.first_name} ${data.last_name}`}</Typography>}
        subheader={`${data.user_name}`}
      />
      <CardContent className={classes.cardContent}>
          {Details.map((detail, index) => {
             let DetailIcon = detail.icon;
            return (
            <Typography key={index} className={classes.flex} variant="body2" color="textSecondary" component="h5">
                        <DetailIcon className={classes.detailIcon} fontSize="small" />   {detail.text}
                </Typography>
            )
          })}

      </CardContent>
      {Loader}
    </Card>
 
    );
  }
}

UserCardBuilder.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UserCardBuilder);
