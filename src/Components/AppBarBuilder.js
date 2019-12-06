import React from 'react';
//Material UI
import {makeStyles, AppBar, Toolbar, LinearProgress,Typography,drawerWidthRight,drawerWidthLeft} from "../theme/muiComponents";

const styles = makeStyles(theme => ({
    
    headerTitle:{
        color:"#fff",
      },
    headerIcon:{
        color : "#fff"
      },
    appBar: {
        width: `calc(100% - ${drawerWidthRight + drawerWidthLeft}px)`,
        marginLeft: drawerWidthLeft,
        marginRight: drawerWidthRight,
        background: 'linear-gradient(150deg, #921aff, #ff9eb4)',
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
    className={classes.appBar} >
      <Toolbar>
        <HeaderIcon fontSize="large" className={classes.headerIcon} />
          <span style={{ flexGrow: 0.02 }} />
          <Typography className={classes.headerTitle} variant="h6" noWrap>
            {props.headerTitle}
          </Typography>
         <span style={{ flexGrow: 1 }} />
           {props.headerButton}
         <span style={{ flexGrow: 0.04 }} />
        {/* <IconButton
          aria-label="More"
          className={classes.margin}
          >
            <MoreIcon className={classes.moreButton} />
        </IconButton> */}
     </Toolbar>
    {Loader}
  </AppBar>
  );
}

export default AppBarBuilder;