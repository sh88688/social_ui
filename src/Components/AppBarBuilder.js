import React from 'react';
//Material UI
import {makeStyles, clsx, IconButton, AppBar, Toolbar, LinearProgress,Typography,drawerWidthLeft} from "../theme/muiComponents";
import {MenuIcon, MenuOpenIcon} from "../theme/muiIcons";

const styles = makeStyles(theme => ({
    
    headerTitle:{
        color:"#fff",
      },
    menuIcon : {
      color : theme.palette.common.white
    },
    headerIcon:{
        color : "#fff"
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'linear-gradient(150deg, #921aff, #ff9eb4)',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidthLeft,
        background: 'linear-gradient(150deg, #921aff, #ff9eb4)',
        width: `calc(100% - ${drawerWidthLeft}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        textAlign:"center"
      },
      moreButton:{
        color:"#Faffff",
      },

}));

const AppBarBuilder = (props) => {
  const classes = styles();

  //Getting props
  const HeaderIcon = props.headerIcon;
  //Loader 
    let Loader = props.IS_LOADING ? (
      <LinearProgress color="secondary" />
    ) : null;
  return (
    <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: props.PARENT.state.drawerOpen,
    })} >
      <Toolbar style={{paddingLeft: "10px",}}>
      <IconButton className={classes.menuIcon} onClick={() => props.PARENT.handleDrawerToggle()}>
        {props.PARENT.state.drawerOpen ? <MenuOpenIcon fontSize="default"/> : <MenuIcon fontSize="default" /> }
        </IconButton>
          <span style={{ flexGrow: 0.01 }} />
          <Typography className={classes.headerTitle} variant="h6" noWrap>
            {props.headerTitle}
          </Typography>
          <HeaderIcon fontSize="small"  style={{ flexGrow: 0.02 }} className={classes.headerIcon} />
         <span style={{ flexGrow: 1 }} />
           {props.headerButton}
         <span style={{ flexGrow: 0.04 }} />
        {/* <IconButton
          aria-label="More"
          className={classes.margin}
          >
            <HeaderIcon className={classes.moreButton} />
        </IconButton> */}
     </Toolbar>
    {Loader}
  </AppBar>
  );
}

export default AppBarBuilder;