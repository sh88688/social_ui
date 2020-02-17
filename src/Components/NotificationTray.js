import React from 'react';
//Material UI
import {withStyles,Typography,Paper,List,ListItem,ListItemText,ListSubheader,IconButton,Popover,Icon,ListItemAvatar,Avatar} from "../theme/muiComponents";
//Icons Material UI
import {CloseIcon, ShopIcon, FacebookIcon, PeopleIcon, DescriptionIcon} from "../theme/muiIcons";


const style = theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  popover:{
   
  },
  paper: {
    minWidth: "320px",
    maxHeight: "300px",
    minHeight:"140px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
        width: "5px",
        backgroundColor: "#F5F5F5"
      },
      "&::-webkit-scrollbar-track": {
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
        borderRadius: "5px",
        backgroundColor: "#F5F5F5"
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "5px",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
        backgroundColor: "#7d7d7d"
      },
  },
  list: {
    marginBottom: theme.spacing(0),
  },
  listItem:{
    textAlign:"center",
    color: "#a1a1a1"
  },
  avatar:{
    background:"linear-gradient( 136deg, #f997b8 0%, #d86fce 50%, rgb(151, 32, 252) 100%)"
  },
  icon:{
    color:"#fff",
  },
  subheader: {
    backgroundColor: "#f2feff",   
  },
  closeBtn:{
    position:"absolute",
    right: "10px",
    top: "15px"
  },

});


 class NotificationTray extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      wrapperRef : null
    }

  }
  setWrapperRef = (node) => {
    //console.log('node',node);
    this.setState({wrapperRef : node});
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }


  handleClickOutside = (event) => {

    if(this.node && this.node.contains(event.target))
    {
      return;
    }
    else if(this.node && !this.node.contains(event.target)){
      //console.log('clickout');
      this.props.close();
    }
  }
  render(){
    const {classes} = this.props;
  const MODULE_ICON = {"google_play": ShopIcon, "facebook" : FacebookIcon, "/users" : PeopleIcon, "/templates" : DescriptionIcon};
  //console.log("%c ==> NOTIFICATION-TRAY !!","color: seagreen;font-weight: 800;");
  //console.table(this.props.data);
  let listData = null; 
    if(this.props.data.length !== 0)
    {
        listData = this.props.data.map((data,index) => (
            <React.Fragment key={index}>
              {index === 0 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
              {index === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
              <ListItem button>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                <Icon className={classes.icon}  component={(data.moduleInfo.subModule ? MODULE_ICON[data.moduleInfo.subModule] : MODULE_ICON[data.moduleInfo.module])} />
                </Avatar>
              </ListItemAvatar>
                <ListItemText primary={data.statusMsg} secondary={`by ${data.dataInfo.action_by} at ${new Date(data.dataInfo.action_on * 1000).toLocaleTimeString()}`} />
              </ListItem>
            </React.Fragment>
          ));
    }
    else
    {
        listData = <ListItem className={classes.listItem} button>
        <ListItemText primary="No Notification Yet!" />
      </ListItem>
    }
    return (
      <Popover
        id={1}
        
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        
        className={classes.popover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper 
        ref={node => this.node = node}
        square className={classes.paper}>
        <Typography className={classes.text} variant="h6" gutterBottom>
          Notifications
        </Typography>
        <IconButton size="small" className={classes.closeBtn} onClick={this.props.close}>
            <CloseIcon />
        </IconButton>
        <List className={classes.list}>
         {listData}
        </List>
      </Paper>  
      </Popover>
  );
  }
  
}

export default withStyles(style)(NotificationTray);