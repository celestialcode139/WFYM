import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "ea1a1cbd736c40c98710284e2cffe1aa";
const token =
  "007eJxTYPiS3T/5zu7c829q5l+49tf/5pHZLGIHt35ukttcc2rVJ+FjCgypiYaJhslJKebGZskmBsmWFuaGBkYWJqlGyWlpqYaJiW8UGNIaAhkZNOdlszIyQCCIz8IQ7hbpy8AAAMniIzA=";

export const config:any = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
console.log("Microphone", useMicrophoneAndCameraTracks);
export const channelName = "WFYM";
