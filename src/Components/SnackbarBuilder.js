import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
//Material UI
import {makeStyles,IconButton,Snackbar,SnackbarContent} from "../theme/muiComponents";
//Icons Material UI
import {CheckCircleIcon,ErrorIcon,InfoIcon,CloseIcon,WarningIcon} from "../theme/muiIcons";

import { amber, green } from '@material-ui/core/colors';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const SnackbarBuilder = (props) => {
  const classes = styles();
  //Getting props
  const { className, propHorizontal, propVertical, propOpen, propTitle, propClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <Snackbar
    anchorOrigin={{
      vertical: propVertical,
      horizontal: propHorizontal,
    }}
    open={propOpen}
    autoHideDuration={6000}
    onClose={propClose}
  >
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {propTitle}
        </span>
      }
      action={[
        <IconButton key={propTitle} aria-label="Close" color="inherit" onClick={propClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
    </Snackbar>
  );
}

SnackbarBuilder.propTypes = {
  className: PropTypes.string,
  propTitle: PropTypes.node,
  propClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default SnackbarBuilder;