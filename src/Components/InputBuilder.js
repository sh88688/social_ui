import React from "react";

//Material UI
import {Grid, Select, ListItemText, FormHelperText, InputLabel, withStyles, Button, Typography, TextField, MenuItem,Radio,RadioGroup,FormControlLabel,FormControl,Checkbox,InputAdornment,Tooltip} from "../theme/muiComponents";
//Icons Material UI
import {HelpOutline} from "../theme/muiIcons";

const styles = theme => ({
  cursor: {
    cursor: "pointer",
    opacity: 1
  },
  selectDisplay: {
    fontSize: "1em",
    textAlign:"left"
  },
  selectMenu: {
    fontSize: "1.1em",
    textAlign:"left",
    paddingLeft: "2px",
  },
  helpIcon: {
    color: "#3d3f40",
    fontSize: 21
  },
  htmlTooltip: {
    backgroundColor: theme.palette.common.white,
    color: "black",
    maxWidth: 150,
    fontSize: "14px",
    boxShadow: theme.shadows[1],
    border: "1px solid #dadde9",
    borderRadius: "3px"
  },
  menu: {
    width: 200
  }
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 'auto',
    },
  },
};

const InputBuilder = props => {
  const { classes, changed, clicked } = props;
  const {elementType, grid, valid, touched, ...other} = props.config;
  let inputElement = null;
  let startAdornment = null;
  let endAdornment = null;
  
  if (props.inputAdornment) {
    startAdornment = props.inputAdornment.startAdornment ? (
      <InputAdornment position={props.inputAdornment.startAdornment.position}>
        {props.inputAdornment.startAdornment.value}
      </InputAdornment>
    ) : null;
    endAdornment = props.inputAdornment.endAdornment ? (
      props.inputAdornment.endAdornment.helptooltip ? (
        <Tooltip
          className={classes.cursor}
          classes={{
            tooltip: classes.htmlTooltip
          }}
          title={
            <Typography color="inherit">
              {props.inputAdornment.endAdornment.helptooltip}
            </Typography>
          }
        >
          <InputAdornment position={props.inputAdornment.endAdornment.position}>
            <HelpOutline className={classes.helpIcon} />
          </InputAdornment>
        </Tooltip>
      ) : (
        <InputAdornment position={props.inputAdornment.endAdornment.position}>
          {props.inputAdornment.endAdornment.value}
        </InputAdornment>
      )
    ) : null;
  }

  switch (elementType) {
    case "input":
      inputElement = (
        <Grid item xs={grid} md={grid} lg={grid}>
          <TextField
            fullWidth
            color="secondary"
            margin="dense"
            required={other.validation.required.value}
            {...other}  
            error={valid === false && touched !== 0}
            onChange={changed}
            value={other.value}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: startAdornment,
              endAdornment: endAdornment,
              readOnly: other.readOnly,
            }}
          />
        </Grid>
      );
      break;
    case "textarea":
      inputElement = (
        <Grid item xs={grid} md={grid} lg={grid}>
          <TextField
            fullWidth
            multiline={true}
            margin="dense"
            color="secondary"
            required={other.validation.required.value}
            error={valid === false && touched !== 0}
            onChange={changed}
            value={other.value}
            {...other}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: startAdornment,
              endAdornment: endAdornment
            }}
          />
        </Grid>
      );
      break;
    case "select":
      inputElement = (
        <Grid item xs={grid} md={grid} lg={grid}>
          <TextField
            select
            fullWidth
            color="secondary"
            required={other.validation.required.value}
            error={valid === false && touched !== 0}
            onChange={changed}
            value={other.value}
            {...other}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
            InputProps={{
              startAdornment: startAdornment,
              endAdornment: endAdornment
            }}
          >
            {props.config.options.map(option => (
              <MenuItem
                classes={{ root: classes.selectMenu }}
                key={option.value}
                value={option.value}
              >
                <span className={classes.selectDisplay}>
                  {option.displayValue}
                </span>
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      );
      break;

    case "native-select":
      inputElement = (
        <Grid item xs={grid} md={grid} lg={grid}>
          <TextField
            select
            fullWidth
            color="secondary"
            required={other.validation.required.value}
            error={valid === false && touched !== 0}
            value={other.value}
            margin="dense"
            {...other}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu
              }
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changed}
            InputProps={{
              startAdornment: startAdornment,
              endAdornment: endAdornment
            }}
          >
            <option value="" disabled>{props.config.placeholder}</option>
            {props.config.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </TextField>
        </Grid>
      );
      break;
    case "multi-select":
      inputElement = (
        <Grid item xs={grid} md={grid} lg={grid}>    
          <FormControl 
          margin="dense" 
          fullWidth 
          className={classes.formControl}
          required={other.validation.required.value}
          error={valid === false && touched !== 0}>
            <InputLabel shrink >{other.label}</InputLabel>
              <Select
                id="mutiple-checkbox"
                multiple
                value={other.value}
                displayEmpty
                onChange={changed}
                renderValue={selected => (selected.length === 0?`${other.placeholder}`:selected.join(', ')) }
                MenuProps={MenuProps}
                className={classes.selectMenu}
              >
                <MenuItem value="" disabled>
                  {other.placeholder}
                </MenuItem>
                {props.config.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                    <Checkbox checked={other.value.indexOf(option.value) > -1} />
                    <ListItemText primary={option.displayValue} />
                  </MenuItem>
                  ))}
              </Select>
            <FormHelperText>{props.config.helperText}</FormHelperText>
            </FormControl>  
        </Grid>
      );
      break;
    case "radio":
      inputElement = (
        <Grid item xs={grid} md={grid} lg={grid}>
          <FormControl component="fieldset">
            {/* <FormLabel
              component="legend"
              style={{ paddingTop: "8px", marginLeft: "2px" }}
            >
              <Typography component="h5" variant="subtitle1">
                {props.elementConfig.configs.label}
              </Typography>
            </FormLabel> */}
            
            <RadioGroup
              onChange={changed}
              value={other.value}          
              row
            >
              {props.config.options.map(option => (
                <FormControlLabel
                  key={option.value}
                  {...option}
                  control={<Radio color={props.config.color} />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      );
      break;
    case "checkbox":
      inputElement = (
        <Grid item xs={grid} md={grid} lg={grid}>
          <FormControlLabel
            control={
              <Checkbox
                checked={other.value}
                onChange={changed}
              />
            }
            label={other.label}
          />
        </Grid>
      );
      break;
      case "button":
      inputElement = (
        <Grid item xs={grid} md={grid} lg={grid}>
          <Button color="secondary" style={{float: `${other.float}`}} variant={other.variant} onClick={clicked} >
          {other.label}
          </Button>
        </Grid>
      );
      break;

    default:
      inputElement = (
        <Grid item xs={grid} md={grid} lg={grid}>
          <input
            margin="dense"
            required={other.validation.required.value}
            {...other}
            value={other.value}
            onChange={changed}
          />
        </Grid>
      );
  }

  return inputElement;
};

export default withStyles(styles)(InputBuilder);
