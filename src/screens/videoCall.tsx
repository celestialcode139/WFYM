// App.js
import axios from "axios";
import VideoApp from "../components/agora/App";
import { useState } from "react";
import { useParams } from "react-router-dom";

const VideoCall = () => {

  const { myId, matchId } = useParams();
const room_id = [myId,matchId].sort().join("")
  const [token,setToken] = useState(null)
  axios.get("https://us-central1-agore-node-express.cloudfunctions.net/app/access_token?channelName=WFYM").then((data)=>{
    console.log("datadata",data.data.token);
    setToken(data.data.token)
  })


  return token? <VideoApp token={token} /> : <> waiting for token</>;
};

export default VideoCall;
