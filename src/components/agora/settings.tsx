import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "ea1a1cbd736c40c98710284e2cffe1aa";
const token =
  "007eJxTYHhr9XemmtXHVTP98vccFX3XvS/q4LsoRtOa++Fn3jW//VSowJCaaJhomJyUYm5slmxikGxpYW5oYGRhkmqUnJaWapiYePFVSerDHyWpglo3mBgZGBlYgBgEmMAkM5hkgZLhbpG+DAwA+ccj5w==";

export const config:any = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
console.log("Microphone", useMicrophoneAndCameraTracks);
export const channelName = "WFYM";
