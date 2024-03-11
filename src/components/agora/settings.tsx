import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "ea1a1cbd736c40c98710284e2cffe1aa";
const token =
  "007eJxTYKizm7n+Tv2CNruAK4KdS9jnR7/s0393Tytyy405nDf+z2hUYEhNNEw0TE5KMTc2SzYxSLa0MDc0MLIwSTVKTktLNUxMZNV9l9oQyMhgbnOWkZEBAkF8FoZwt0hfBgYAx2Agcw==";

export const config:any = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
console.log("Microphone", useMicrophoneAndCameraTracks);
export const channelName = "WFYM";
