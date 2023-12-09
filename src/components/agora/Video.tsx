import { AgoraVideoPlayer } from "agora-rtc-react";
// import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useMicrophoneAndCameraTracks } from "./settings.js";

export default function Video(props: any) {
  // const [gridSpacing, setGridSpacing] = useState(12);
  const [HEIGHT, setHEIGHT] = useState(window.innerHeight);
  const [WIDTH, setWIDTH] = useState(window.innerWidth);
  const { users, tracks } = props;

  // useEffect(() => {
  //   setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  // }, [users, tracks]);

  useEffect(() => {
    function handleResize() {
      setHEIGHT(window.innerHeight);
      setWIDTH(window.innerWidth);
    }

    // Attach a listener to the window's resize event
    window.addEventListener("resize", handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    
    
  }, []);

  return (
    <div style={{ height: HEIGHT, margin: 0, padding: 0 }}>
      <div
        style={
          users.length > 0
            ? {
                position: "fixed",
                bottom: 30,
                right: 30,
                zIndex: 99,
                padding: 0,
                margin: 0,
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "3px 2px 9px 0px #00000038",
              }
            : {
                height: HEIGHT,
                width: WIDTH,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }
        }
      >
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={
            users.length > 0
              ? { height: 150, width: 250, zIndex: 99 }
              : {
                  height: HEIGHT - 50,
                  width: WIDTH - 50,
                  borderRadius: 10,
                  overflow: "hidden",
                }
          }
        />
      </div>
      <div
        style={
          users.length > 0
            ? {
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                height: HEIGHT,
                width: WIDTH,
              }
            : {}
        }
      >
        {users.length > 0 && (
          <AgoraVideoPlayer
            videoTrack={users[0].videoTrack}
            key={users[0].uid}
            style={{
              height: HEIGHT - 50,
              width: WIDTH - 50,
              borderRadius: 10,
              overflow: "hidden",
            }}
          />
        )}
      </div>
    </div>
  );
}
