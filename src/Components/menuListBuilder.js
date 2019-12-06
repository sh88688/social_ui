/*
Component Name : menuListBuilder
Created By : Shivam @ 26-08-2019
RequiredProps : 
    1. type : (String) 
        e.g "|" 
    2. selected : (Boolean) 
        e.g true (for conditional rendering Save or Create new buttons)
    3. Expand : (func)  
        e.g true (for disable or enable Save Button)
*/
import React from 'react';
import { NavLink} from 'react-router-dom';
import clsx from 'clsx';

//Material UI
import {makeStyles, List, ListItem,ListItemIcon,ListItemText,Collapse,Icon,Divider} from "../theme/muiComponents";
//Icons Material UI
import {AddIcon,ExpandLess,ExpandMore} from "../theme/muiIcons";


//Material Icons


const styles = makeStyles(theme => ({
    button:{
        marginRight:"5px",
      },
      buttonIcon:{
        paddingRight:"5px",
      },  
      listItemBase:{
        "&:focus": {
          backgroundColor: "#018ece1a",
          borderLeft: `2px solid ${theme.palette.secondary.main}`,
          marginLeft: "1px",
          "& .MuiListItemText-primary": {
            color: "#0202ea"
          },
          "& .MuiListItemIcon-root":{
            color: "#04d8f3"
          }
        },
      },
      listItemActive: {
    
            backgroundColor: "#fddce4ad",
            borderLeft: `2px solid ${theme.palette.secondary.main}`,
            marginLeft: "1px",
            "& .MuiListItemText-primary": {
              color: theme.palette.secondary.main
            },
            "& .MuiListItemIcon-root":{
              color: theme.palette.common.main
            }
      },
      listIconStyle:{
        minWidth: "10px",
      },
      navlink:{
        textDecoration:"none",
        color:"inherit"
      },
      nested: {
        paddingLeft: theme.spacing(4)
      },  
}));

const MenuListBuilder = (props) =>{

    const classes = styles();
     //Getting props
    let  menuItem = null;

      switch(props.type) {
       case "single":
          if(props.status[props.path])
          {
              menuItem = (
                  <NavLink key={props.name} className={classes.navlink} to={props.path}>
                <ListItem onClick={() => props.onActive(props.path)} className={clsx(
                  {[classes.listItemActive]: (props.selected === props.path)}
                  )} button key={props.name}>
                  <ListItemIcon>
                  <Icon component={props.icon} />
                  </ListItemIcon>
                  <ListItemText primary={props.name} />
                  {props.isAddIcon && <ListItemIcon className={classes.listIconStyle}>
                  <AddIcon />
                  </ListItemIcon>}
                </ListItem>
              </NavLink>
              );
          }
       break;
       case "contained":
         
              menuItem = (
                  <React.Fragment>
                  <ListItem onClick={props.Expand} button key="Aount">
                  <ListItemIcon>
                  <Icon component={props.icon} />
                  </ListItemIcon>
                  <ListItemText primary={props.name} />
                  <ListItemIcon className={classes.listIconStyle} >
                  {props.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemIcon>
              </ListItem>
              <Collapse in={props.open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                      {props.subModule.map((module, index) => {
                        let subModule = null;
                        if(props.status[module.path]) {
                          subModule = <NavLink key={index} className={classes.navlink}  to={module.path}>
                            <ListItem onClick={() => props.onActive(module.path)} className={clsx(
                             classes.nested,{[classes.listItemActive]: (props.selected === module.path)}
                             )} button key={props.name}>
                            <ListItemIcon>
                            <Icon component={module.icon} />
                            </ListItemIcon>
                            <ListItemText primary={module.name} />
                            </ListItem></NavLink>;
                        }
                        return subModule;
                      })}
                      </List>
              </Collapse>
              </React.Fragment>
              ); 
       break;
       case "divider":
           menuItem = <Divider />;
       break;
       default:
           menuItem = <Divider />;
       break;
  
      }
 

    return menuItem;

    }

export default MenuListBuilder;