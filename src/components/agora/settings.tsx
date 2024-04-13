import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "ea1a1cbd736c40c98710284e2cffe1aa";
const token =
	"0066bb4e5cc2ba04652b76ba36a4b7b5ce6IAClgPxh0ZNzudMgFqOVJNwqX/ci8edOPLytLviN8hwKhEXCnWAAAAAAEAB8x6ife2YSZgEAAQALIxFm";

export const config: any = {
	mode: "rtc",
	codec: "vp8",
	appId: appId,
	token: token,
};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
console.log("Microphone", useMicrophoneAndCameraTracks);
export const channelName = "WFYM";
