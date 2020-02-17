import React from 'react';
import clsx from 'clsx';
//Material UI
import {withStyles,Card,CardHeader,CardContent,CardActions,Typography,Grid,Collapse,Divider,Paper,InputBase,IconButton,Button} from "../theme/muiComponents";
//Icons Material UI
import {ExpandMore,ClearIcon,SearchIcon,SortIcon} from "../theme/muiIcons";
//Components
import FormRender from './FormRender';
import isFormValid from './FormValidSetter';
import formJsonResetter from './JsonResetter';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    
  },
  datacount: {
    margin:"auto"
  },
  card :{
    marginTop: "5px",
    textAlign:"left",
  },
  collapse:{
    width: 'calc(100% - 588px)',
    position:"absolute",
    zIndex: "1",
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
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
});



class SearchBuilder extends React.Component {
 
  constructor(props)
  {
    super(props);
    this.state = {
      searchForm: [...this.props.json],
      searchString:"",
      expanded: false,
    };      
  }

    handleChange = (event) =>{
    this.setState({searchString : event.target.value});
      if(event.target.value === "")
      {
        this.props.search(event.target.value);
      }
    };
    handleClear = () =>{
      this.setState({searchString : ""});
      this.props.clear();
    }
    handleSearch = (event) =>{
      event.preventDefault();
      const SearchOBj = {};
      SearchOBj[this.props.defaultSearchKey] = this.state.searchString;
      if(this.state.searchString)
      {
        this.props.search(SearchOBj);
      }  
    }
    handleExpandClick = () => {
      this.setState({expanded : !this.state.expanded});
    }
    handleSearchClick = (event) =>{
      event.preventDefault();
      //Checking validity
      let didFormValid = isFormValid(this.state.searchForm);
      //console.log(didFormValid)
      this.setState({
        searchForm: didFormValid.validatedForm,
      });

      if(didFormValid.formValidity)
      {
        let searchFormCopy = [...this.state.searchForm];
        const filter = {};
        searchFormCopy.forEach((elem,index) => {
          filter[elem.id] = elem.config.value;
        }) 
        this.props.search(filter);
        this.setState({
          expanded: false,
        });
      }

    }
    handleClearClick = () =>{
     let ResetForm =  formJsonResetter(this.props.json);
     this.setState({searchForm : ResetForm});
     this.props.search({});
    }
    handleFormState = (updatedFormState,index) =>{
      //console.log("search form");
      };

  render(){
  const { classes } = this.props;

  let Search = null;
  if(this.props.isVisible)
  {
    Search = (
      <React.Fragment>
        <Grid item xs={10} md={9} lg={10}>
      <form onSubmit={(event) => this.handleSearch(event)}>
      <Paper className={classes.root}>
      <IconButton onClick={(event) => this.handleSearch(event)}
       className={classes.iconButton} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={this.props.placeholder}
        value={this.state.searchString}
        onChange={this.handleChange}
        inputProps={{ 'aria-label': `${this.props.placeholder}` }}
      />
      {this.state.searchString && <IconButton onClick={this.handleClear} className={classes.iconButton} aria-label="search">
        <ClearIcon size="small" />
      </IconButton>}
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
       className={clsx(classes.expand,classes.iconButton, {
            [classes.expandOpen]: this.state.expanded,
          })}
        aria-expanded={this.state.expanded}
        onClick={this.handleExpandClick}
        aria-label="expandclick">
        <ExpandMore />
      </IconButton>
    </Paper>
    </form>
    <Collapse className={classes.collapse} in={this.state.expanded} timeout="auto" unmountOnExit>
    <Card className={classes.card}>
      <CardHeader
        title={<Typography variant="h6">Advanced Search</Typography>}
      />
      <CardContent>
      <Grid container spacing={1}>
      {this.state.searchForm.map((element,index) =>(
        <FormRender 
        key={index}
        json={element}
        index={index}
        isClear={this.state.isClear}
        stateChanger={(updatedFormState, index) => this.handleFormState(updatedFormState,index)}
        />
        ))}
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
          
          <Button onClick={this.handleSearchClick} size="small" color="secondary">
            Search
          </Button>
          <Button onClick={this.handleClearClick} size="small" >Clear</Button>
      </CardActions>
    </Card>
    </Collapse>
    </Grid>
    <Grid item xs={2} md={3} lg={2}>
           {this.props.dataCount && <span className={classes.root}>
            <Typography color="textSecondary" variant="body2" className={classes.datacount}>{this.props.dataCount}</Typography>
            <IconButton aria-label="sort" className={classes.margin}>
            <SortIcon  />
            </IconButton>
            </span>}
    </Grid>
    </React.Fragment>
    );
  }
    return (Search);
  }

}

export default withStyles(styles)(SearchBuilder);