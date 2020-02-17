import React from 'react';


import { blue } from '@material-ui/core/colors';
import { withStyles,DialogActions, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, DialogTitle, Dialog  } from "../theme/muiComponents";
import { DescriptionIcon } from "../theme/muiIcons";
import { GET_RESPONSE } from '../ModularFunctions/Functions';

const style = theme =>({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  title: {
    color: "#f32958",
    borderBottom: "1px solid lightgray",
    padding: theme.spacing(1,3)
  },
  btnClose: {
    fontWeight: 600
  }
});

const Intial_NODATA = {};
Intial_NODATA.title = "No Chats Yet !";
Intial_NODATA.description = "Chats are facebook page's conversations.";
Intial_NODATA.type = "intial";

 class TemplateDialog extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        DATA_ARRAY:[],
        NO_DATA_CONTENT: Intial_NODATA,
      }
  }
  componentDidMount(){
    GET_RESPONSE("templates", 0, 10, this).then( DATA => {
      if(DATA.dataInfo){
        // console.log('loaded ',DATA.dataInfo);
        DATA = DATA.dataInfo.filter(item => (item.module === this.props.module || item.module === "all"));
          this.setState({DATA_ARRAY : DATA},this.props.loadedHandler());
        }
    }); 
  }
  render(){
    const { classes, userVariables } = this.props;
    const handleClose = () => {
      this.props.toggle('');
    };
    const replacer = (textString, data) => {
      let regex = /\{\{(.*?)\}\}/g, match;
      while(!!(match = regex.exec(textString))) {
        textString = textString.replace(match[0], data[match[1]])
        regex.lastIndex = 0;
      }
      return textString;
    }
    const handleListItemClick = value => {
      this.props.toggle(value);
    };
      return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
          <DialogTitle classes={{root : classes.title}} id="simple-dialog-title">
            Select Template
          </DialogTitle>
          <List style={{maxHeight: "250px", overflow: "auto"}}>
            {this.state.DATA_ARRAY.map((template,index) => (
              <ListItem button onClick={() => handleListItemClick(replacer(template.body, userVariables))} key={index}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={template.tag} secondary={replacer(template.body, userVariables)} />
              </ListItem>))}
          </List>
          <DialogActions>
          <Button className={classes.btnClose} onClick={handleClose} color="secondary" autoFocus>
            Close
          </Button>
        </DialogActions>
        </Dialog>
      );
    }


}
export default withStyles(style)(TemplateDialog);