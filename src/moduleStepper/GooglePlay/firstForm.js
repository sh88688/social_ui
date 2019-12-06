import React from 'react';
//Components
import FormRender from '../../Components/FormRender';
import FormBlockBuilder from '../../Components/FormBlockBuilder';
//Material UI
import {makeStyles, withStyles, Grid, Button} from "../../theme/muiComponents";

const styles = theme => ({
    root: {
      width: '100%',
      padding: theme.spacing(1, 7, 7, 7),
    },
  });

class FirstForm extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const {classes} = this.props;

        return (
            <span className={classes.root}>
            <Grid container spacing={4}>
            {this.props.Form.map((element,index) =>(
            <FormRender 
            key={index}
            json={element}
            index={index}
            stateChanger={(updatedFormState, index) => this.props.handler(updatedFormState,index)}
            />
            ))} 
            </Grid>
          </span>
          );
    }
}

export default withStyles(styles)(FirstForm);