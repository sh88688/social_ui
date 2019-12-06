import React from "react";

//Material UI
import {makeStyles, Divider, Icon, Grid, Typography, CardContent, Card, CardHeader, IconButton} from "../theme/muiComponents";
//Icons Material UI
import {MoreVertIcon} from "../theme/muiIcons";

//CSS Styles
const styles = makeStyles(theme => ({
      card: {
        width: "100%"
      },
      cardHeader:{
        padding: "12px",
      }
}));


const SnippetCard = (props) => {
  const  classes = styles();
  return (
            <Grid item xs={12}>
                <Card className={classes.card}>
                <CardHeader
                className={classes.cardHeader}
                style={{color: `${props.titleColor}`}}
                avatar={<Icon component={props.icon} />}
                action={
                <IconButton aria-label="settings">
                <MoreVertIcon />
                </IconButton>
                }
                title={<Typography variant="body2">{props.title}</Typography>}
                subheader={<Typography color="textSecondary" variant="caption">{props.subtitle}</Typography>}
                />
                <Divider />
                <CardContent>
                {props.form}
                </CardContent>     
                </Card>
            </Grid>
  );

};

export default SnippetCard;
