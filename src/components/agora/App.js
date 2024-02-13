import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import VideoCall from "./VideoCall";
function App() {
    const [cameraPermission, setCameraPermission] = useState(null);
    useEffect(() => {
        async function checkCameraPermission() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                setCameraPermission(true);
                stream.getTracks().forEach((track) => track.stop());
            }
            catch (error) {
                setCameraPermission(false);
            }
        }
        checkCameraPermission();
    }, []);
    return (_jsxs("div", { className: "App", children: [cameraPermission === null && _jsx("h1", { children: "Checking camera permission..." }), cameraPermission === false && _jsx("h1", { children: "Camera permission denied." }), cameraPermission === true ? _jsx(VideoCall, { setInCall: null }) : null] }));
}
export default App;
