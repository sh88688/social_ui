import React from "react";
import PropTypes from "prop-types";
//Material UI
import {withStyles,IconButton, Icon, Grid} from "../theme/muiComponents";
import {ReplyIcon, ConfirmationNumberIcon} from "../theme/muiIcons";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Icons Material UI
import InstaTable from './InstaTable';
const styles = theme => ({
  cmtAction:{
    padding: "8px",
    marginLeft: "5px"
  },
  ticketIcn :{
    color: "#ffb200",
    padding: "5px",
    transform: 'rotate(135deg)'
  },
  cardBlock : {
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 0,
    display: 'flex',
    position: 'relative',
    fontSize: '.875rem',
    minWidth: 0,
    wordWrap: 'break-word',
    background: '#FFF',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    marginTop: '20px',
    marginBottom: '20px',
    minHeight: '90px',
    borderRadius: '6px',
    flexDirection: 'column',
  },
  cardIcon:{
    float: 'left',
    padding: '15px 20px',
    color: "#fff",
    marginTop: '-20px',
    marginRight: '15px',
    borderRadius: '3px',
    backgroundColor: '#999',
    background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
    boxShadow: '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(255, 152, 0,.4)'
  },
  cardP:{
    color: '#999',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    paddingTop: '10px',
    marginBottom: '0',
  },
  cardH3:{
    color: '#3C4858',
    fontSize: '1.55em',
    fontWeight: 300,
    margin: '0 !important'
  },
  cardBottom:{
    margin: '0 15px 10px',
    display: 'flex',
    paddingTop: '10px',
    borderTop: '1px solid#eee',
    marginTop: '20px'
  },
  bottomInfo:{
    color: '#999',
    display: 'inline-flex',
    fontSize: '12px',
    lineHeight: '22px',
  }
});
function createData(id, field, text) {
  return { id, field, text };
}

class InstaTickets extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
          expanded : false
        }
    }
  render() {
    const { classes } = this.props;
    const data = this.props.data.map((item) => {
      return createData(item.value.id, item.field, item.value.text);
    });

    return (
        <Grid 
        container 
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}>
           <Grid item xs={12}>
                  <div className={classes.cardBlock}>
                      <div style={{textAlign : "left",margin : '0 15px',}}>
                          <div className={classes.cardIcon} >
                             <Icon component={ConfirmationNumberIcon} style={{ fontSize: 30 }} />
                          </div>
                           <p className={classes.cardP}>{"Instagram Tickets"}</p>
                        </div>
                          <InstaTable rows={data} />
                  </div>
            </Grid>
        </Grid>
    );
  }
}

InstaTickets.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(InstaTickets);
