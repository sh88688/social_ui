import React from "react";
import PropTypes from "prop-types";
//Material UI
import {withStyles, Icon, Grid} from "../theme/muiComponents";
//Icons Material UI
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
const styles = theme => ({
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

class InsightCard extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
          expanded : false
        }
    }
    componentDidMount(){
    //    Object.entries(this.state.data).forEach( entry => {
        //     let state = entry[0].split(",")[1].trim();
        //     let city  = entry[0].split(",")[0].trim();
        //     if(states[state] === undefined){
        //         states[state] = {};
        //         states[state]['count'] = entry[1];
        //         states[state]['city'] = [];
        //         states[state]['city'].push({[city] : entry[1]});
        //     }
        //     else{
        //         states[state]['count'] = states[state].count + entry[1];
        //         states[state]['city'].push({[city] : entry[1]});
        //     }
        // });
    
    }
    calculateTotal = (Arr) =>{
        let count = 0;
        Arr.forEach( item => {
            count += item.value;
        });
           return count;
    }
  render() {
    const { classes } = this.props;
    const MODULE = {
        impressions:{icon : VisibilityIcon, color: "linear-gradient(60deg, #ffa726, #fb8c00)", shadow : "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(255, 152, 0,.4)"},
        reach:{icon : VisibilityIcon, color: "linear-gradient(60deg, #66bb6a, #43a047)", shadow : "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)"},
        follower_count:{icon : PersonAddIcon, color: "linear-gradient(60deg, #26c6da, #00acc1)", shadow : "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4)"},
        profile_views:{icon : PersonOutlineIcon, color: "linear-gradient(60deg, #f75371, #e5356e)", shadow : "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(244, 54, 98, 0.4)"},
    }

    return (
        <Grid 
        container 
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}>
            {this.props.data.map((item, index) =>(
                  <Grid key={index}  item xs={3}>
                  <div className={classes.cardBlock}>
                      <div style={{textAlign : "right",margin : '0 15px',}}>
                          <div className={classes.cardIcon} style={{boxShadow: MODULE[item.name].shadow, background: MODULE[item.name].color}}>
                             <Icon component={MODULE[item.name].icon} style={{ fontSize: 30 }} />
                          </div>
                                  <p className={classes.cardP}>{item.title}</p>
                                  <h3 className={classes.cardH3}>{this.calculateTotal(item.values)}</h3>
                        </div>
                        <div className={classes.cardBottom}>
                            <div className={classes.bottomInfo}>
                                <svg className="MuiSvgIcon-root" style={{marginRight: "5px"}} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                                    </svg>
                                    {` Last 24 Hours`}
                            </div>
                        </div>

                  </div>
                </Grid>
            ))}
        </Grid>
    );
  }
}

InsightCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(InsightCard);
