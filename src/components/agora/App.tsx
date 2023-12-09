import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import VideoCall from "./VideoCall";

function App() {
  const [inCall, setInCall] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<any>(null);

  useEffect(() => {
    async function checkCameraPermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraPermission(true);
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        setCameraPermission(false);
      }
    }

    checkCameraPermission();
  }, []);

  return (
    <div className="App">
      {cameraPermission === null && <h1>Checking camera permission...</h1>}
      {cameraPermission === false && <h1>Camera permission denied.</h1>}

      {cameraPermission === true ? <VideoCall setInCall={setInCall} /> : null}
    </div>
  );
}

export default App;
