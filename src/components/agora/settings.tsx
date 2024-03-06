import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "ea1a1cbd736c40c98710284e2cffe1aa";
const token =
  "007eJxTYFA6URSwxHID36aFLGk27Ue11nodMSyvTND8Z+q41vzr/C0KDCaJqSnG5oaWRkmWFiYmlslJpsZmScZGaQamSRaWFslGdUaPUhsCGRlOvmpkYIRCEJ+FIdwt0peBAQD2nB6D";

export const config:any = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
console.log("Microphone", useMicrophoneAndCameraTracks);
export const channelName = "WFYM";
