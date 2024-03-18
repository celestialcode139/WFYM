import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "ea1a1cbd736c40c98710284e2cffe1aa";
const token =
  "007eJxTYAh+u2PH9ovfDVcuvbB72n6X+1fXLYv9EOS69qKCJ9esddM5FRhSEw0TDZOTUsyNzZJNDJItLcwNDYwsTFKNktPSUg0TE+1nfUhtCGRkMO2azcrIAIEgPgtDuFukLwMDAHpSIpU=";

export const config:any = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
console.log("Microphone", useMicrophoneAndCameraTracks);
export const channelName = "WFYM";
