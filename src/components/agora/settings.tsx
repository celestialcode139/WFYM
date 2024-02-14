import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "ea1a1cbd736c40c98710284e2cffe1aa";
const token =
  "006ea1a1cbd736c40c98710284e2cffe1aaIABWbwhJS1AX0RN17yoluVO5D/WZZ8ZkrsMYbn3d9EX+jkXCnWBXoFHlIgBiyLwEcTp7ZQQAAQAB93llAgAB93llAwAB93llBAAB93ll";

export const config:any = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
console.log("Microphone", useMicrophoneAndCameraTracks);
export const channelName = "WFYM";
