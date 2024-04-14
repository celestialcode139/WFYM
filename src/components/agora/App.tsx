import { useState, useEffect } from "react";
import VideoCall from "./VideoCall";
import { createClient } from "agora-rtc-react";
// import { config } from "./settings";

function App({ token }: { token: string }) {
	const [cameraPermission, setCameraPermission] = useState<unknown>(null);
	const appId = "ea1a1cbd736c40c98710284e2cffe1aa";
	const config = {
		mode: "rtc",
		appId: appId,
		codec:"vp8",
    token
	};
  
	const client = createClient({ ...config,codec:"vp8",mode:"rtc" })();
	console.log("clientclient11212121,", client);

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
			{cameraPermission === null && (
				<h1>Checking camera permission...</h1>
			)}
			{cameraPermission === false && <h1>Camera permission denied.</h1>}

			{cameraPermission === true ? <VideoCall client={client} config={config}/> : null}
		</div>
	);
}

export default App;
