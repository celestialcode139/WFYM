import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "./settings.js";
// import { Grid } from "@material-ui/core";
import Video from "./Video.js";
import Controls from "./Controls.js";

export default function VideoCall(props: any) {
  const { setInCall } = props;
  const [users, setUsers] = useState<any>([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    // console.log("Client ",client.get);
    try {
      console.log("Microphone ", tracks);
      let init = async (name: any) => {
        client.on("user-published", async (user: any, mediaType: any) => {
          await client.subscribe(user, mediaType);
          try {
            if (mediaType === "video") {
              setUsers((prevUsers: any) => {
                return [...prevUsers, user];
              });
            }
            if (mediaType === "audio") {
              user.audioTrack.play();
            }
          } catch (error) {
            console.log("Catch error ", error);
          }
        });

        client.on("user-unpublished", (user: any, mediaType: any) => {
          if (mediaType === "audio") {
            if (user.audioTrack) user.audioTrack.stop();
          }
          if (mediaType === "video") {
            setUsers((prevUsers: any) => {
              return prevUsers.filter((User: any) => User.uid !== user.uid);
            });
          }
        });

        client.on("user-left", (user: any) => {
          setUsers((prevUsers: any) => {
            return prevUsers.filter((User: any) => User.uid !== user.uid);
          });
        });

        try {
          await client.join(config.appId, name, config.token, null);
        } catch (error) {
          console.log("error",error);
        }

        if (tracks) await client.publish([tracks[0], tracks[1]]);
        setStart(true);
      };
      if (ready && tracks) {
        try {
          init(channelName);
        } catch (error) {
          console.log("Error in try catch : ", error);
        }
      } else {
        console.log("Ready && Tracks ..... ");
        console.log(start);
        console.log(tracks);
        // console.log(tracks);
      }
    } catch (error) {
      console.log("Error is kjdfhkshfk ", error);
    }
  }, [start, client, ready, tracks]);

  useEffect(() => {
    setTimeout(() => {
      console.log("user is ", tracks);
    }, 2000);
  });

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{}}>
        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        )}
      </div>
      <div style={{ height: "100%",backgroundColor:"#000000" }}>
        {start && tracks && <Video tracks={tracks} users={users} />}
      </div>
    </div>
  );
}
