import React from 'react';
//Components
import FormRender from '../../Components/FormRender';
//Material UI
import { withStyles, Grid, CircularProgress} from "../../theme/muiComponents";

const styles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(1, 7, 7, 7),
      },
      fabProgress: {
        color: "#921aff",
        zIndex: 1,
        margin: theme.spacing(1, 7, 5.86, 7),
      }
  });
  
class SecondForm extends React.Component {

    handleFormState = (updatedFormState,index) =>{
        console.log(`onChangeform`);
    }

    render(){
        const {classes} = this.props;

        return (
            <span className={classes.root}>
           {this.props.loading ? <CircularProgress  size={30} thickness={4} className={classes.fabProgress} />
            :
            <Grid container justify="center" spacing={1}>
            {this.props.Form.map((element,index) =>(
            <FormRender 
            key={index}
            json={element}
            index={index}
            stateChanger={(updatedFormState, index) => this.props.handler(updatedFormState,index)}
            />
            ))} 
            </Grid>} 
            </span>
          );
    }
}

export default withStyles(styles)(SecondForm);