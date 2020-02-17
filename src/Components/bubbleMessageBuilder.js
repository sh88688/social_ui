import React from "react";
//Material UI
import {withStyles, Typography} from "../theme/muiComponents";
import Emojify from 'react-emojione';
const styles = theme => ({
    root: {
        display: "flex"
      },
});
const mediaHandler = (type, url) => {
  let mediaComponent = null;
  switch (type) {
    case 'image':
      mediaComponent = <img alt="not found" style={{maxwidth: "320px", maxHeight: "320px"}} src={url} />
      return mediaComponent;
    case 'video':
      mediaComponent = (<video preload="metadata" style={{maxwidth: "320px", maxHeight: "320px"}} playsInline controlsList="nofullscreen nodownload" src={url} controls>Video Not Supported</video>)
      return mediaComponent;
  
    default:
      return mediaComponent;
  }
}
const BubbleMessage = props => {
  const { timestamp, messageData } = props;

  let message = null;
  if(messageData.flow === "IN"){
    message = <div id="msgrow" style={{"position":"relative","display":"flex", width: "57%", "flexDirection":"column","alignItems":"flex-start","padding":"0 16px 4px"}}>

    {!messageData.attachments ? <div id="bubble1" style={{"backgroundColor":"#f1f0f0",color: "#27273f", "padding":"10px 25px","borderRadius":"5px 20px 20px 20px"}}>
    <Emojify style={{height: 25, width: 25}}><Typography variant="body2">
       {messageData.text}
      </Typography>
    </Emojify>
    </div> : (messageData.attachments ? mediaHandler(messageData.attachments[0].type,messageData.attachments[0].payload.url): null) }
    <Typography variant="caption" style={{marginTop: "8px",color: "#a1a1a1", marginLeft: "12px"}}>
        {timestamp}
    </Typography>
  </div>
  }
  else if (messageData.flow === "OUT"){
    message =   <div id="msgrow" style={{"position":"relative",float: "right", width: "57%",marginRight:"0px", "display":"flex","flexDirection":"column","alignItems":"flex-end","padding":"0 16px 4px"}}>
    <div id="bubble2" style={{"backgroundColor":"#0099ff",color: "#fff", "padding":"10px 25px","borderRadius":"20px 20px 5px 20px"}}>
    <Emojify style={{height: 25, width: 25}}>
       <Typography variant="body2">
      {messageData.text}
      </Typography>
    </Emojify>
    </div> 
    <Typography variant="caption" style={{marginTop: "8px",color: "#a1a1a1", marginRight: "12px"}}>
      {timestamp}
    </Typography>
  </div>
  }
  return message;
};

export default withStyles(styles)(BubbleMessage);
