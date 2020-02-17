import React from "react";
import PropTypes from "prop-types";
//Material UI
import {withStyles,Collapse, clsx, CardContent, Typography, Card, CardHeader, IconButton, LinearProgress, Icon} from "../theme/muiComponents";
//Icons Material UI
import {EditIcon, ExpandMore, LocalOfferIcon, CategoryIcon, DescriptionIcon, DeleteIcon} from "../theme/muiIcons";

const styles = theme => ({
   card: {
    maxWidth: 345,
    borderTopRightRadius: "20px"
  },
  headBottom : {
    paddingBottom : "4px",
    borderBottom: "1px solid #e7e8e8"
  },
  cardContent : {
    padding : theme.spacing(1.5, 0.5, 1.5, 2),
    paddingBottom: "12px !important",
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
    transform: 'rotate(180deg)',
  },
  title:{
    color:"grey",
    fontSize: "0.89rem",
    display:"flex",
    textTransform : "capitalize"
  },
  tempBody:{
    color: "grey"
  },
  fieldset:{
    width: "100%",
    border: "1px solid #f32958",
    borderTopRightRadius: "10px"
  },
  subheader:{
    marginTop:"5px",
  },
  headAvatar:{
    marginRight :"8px"
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

class TemplateCard extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
        expanded : false
        }
    }
  formatDate = (timeStamp) => {
      const monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
      ];
      const date = new Date(timeStamp*1000);
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const time = date.toLocaleTimeString().substr(0,5);
      return `${day} ${monthNames[monthIndex]} ${year} at ${time}`;
    }

  handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
  };
  render() {
    const { classes, data } = this.props;
    const { onEdit, processing,  } = this.props;
    const Loader =  (processing && <LinearProgress classes={{root : classes.rootProgress}} color="secondary" />);

    return (
     <Card className={classes.card} >
      <CardHeader
        classes={{root : classes.headBottom, action : classes.headAction, avatar : classes.headAvatar}}
        avatar={<Icon color="secondary" fontSize="large" component={LocalOfferIcon} />}
        action={
        <React.Fragment>
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
            <IconButton
             size="small"
            className={clsx(classes.expand, {
            [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-label="show more"
            >
             <ExpandMore />
            </IconButton>
        </React.Fragment>
        }
        title={<Typography className={classes.title} variant="body2">{data.tag}</Typography>}
        subheader={<Typography variant="caption">{data.action_by}</Typography>}
      />
      <CardContent className={classes.cardContent}>

            <Typography className={classes.flex} variant="body2" color="textSecondary" component="h5">
                  <CategoryIcon className={classes.detailIcon} fontSize="small" /> {data.module}
            </Typography>
            <Typography className={classes.flex} variant="body2" color="textSecondary" component="h5">
                 {`Created By :  ${data.action_by} on ${this.formatDate(data.action_on)}`} 
            </Typography>
            {/* <Typography style={{float: "right", padding: "5px"}} variant="caption" >
                  {this.formatDate(data.action_on)}
            </Typography> */}

      </CardContent>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography className={classes.flex} variant="body2" color="textSecondary" component="h5">
          <fieldset className={classes.fieldset}>
            <legend><DescriptionIcon  fontSize="small" /></legend>
            {data.body} 
          </fieldset>
            </Typography>
        </CardContent>
      </Collapse>
      {Loader}
    </Card>
 
    );
  }
}

TemplateCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TemplateCard);
