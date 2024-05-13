import { useState, useEffect } from "react";

import {
	useMicrophoneAndCameraTracks,
	channelName,
} from "./settings.js";
// import { Grid } from "@material-ui/core";
import Video from "./Video.js";
import Controls from "./Controls.js";
import {
	useCallCreatorData,
	useCallReceiverData,
} from "../../context/SignalsContextProvider.js";
import { useParams } from "react-router-dom";
import { IAgoraRTCRemoteUser } from "agora-rtc-react";

export default function VideoCall({client,config}) {
	const {  createCallData, cancelCall } = useCallCreatorData();
	const { incomingCall } = useCallReceiverData();
	const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
	const [start, setStart] = useState(false);
	const { ready, tracks } = useMicrophoneAndCameraTracks();
	const { myId, matchId } = useParams();
	const room_id = [myId,matchId].sort().join("")
	

	useEffect(() => {
		// console.log("Client ",client.get);
		try {
			console.log("Microphone ", tracks);
			const init = async (name: string) => {

				console.log("🚀 ~ init ~ :callse ...............");

				client.on(
					"user-published",
					async (
						user: IAgoraRTCRemoteUser,
						mediaType: "video" | "audio"
					) => {
						console.log(
							"🚀 ~ init ~ :user-published .................."
						);

						await client.subscribe(user, mediaType);
						try {
							if (mediaType === "video") {
								setUsers((prevUsers) => {
									return [...prevUsers, user];
								});
							}
							if (mediaType === "audio") {
								user.audioTrack.play();
							}
						} catch (error) {
							console.log("Catch error ", error);
						}
					}
				);

				client.on(
					"user-unpublished",
					(user: IAgoraRTCRemoteUser, mediaType: string) => {
						console.log(
							"🚀 ~ init ~ :user-unpublished .................."
						);

						if (mediaType === "audio") {
							if (user.audioTrack) user.audioTrack.stop();
						}
						if (mediaType === "video") {
							setUsers((prevUsers: any) => {
								return prevUsers.filter(
									(User: any) => User.uid !== user.uid
								);
							});
						}
					}
				);

				client.on("user-left", (user: IAgoraRTCRemoteUser) => {
					console.log("🚀 ~ init ~ :user-left ..................");

					setUsers((prevUsers: any) => {
						return prevUsers.filter(
							(User: any) => User.uid !== user.uid
						);
					});
				});

				try {
					await client.join(config.appId, name, config.token, null);
				} catch (error) {
					console.log("error", error);
				}

				if (tracks) await client.publish([tracks[0], tracks[1]]);
				setStart(true);
			};
			if (ready && tracks) {
				try {
					init(room_id);
				} catch (error) {
					console.log("Error in try catch : ", error);
				}
			} else {
				console.log("Ready && Tracks ..... ");
				console.log(start);
				console.log(tracks);
				// console.log(tracks);
			}
		} catch (error) {
			console.log("Error is kjdfhkshfk ", error);
		}
	}, [start, client, ready, tracks]);

	useEffect(() => {
		// Cleanup function
		if (
			createCallData?.callStatus === "missed" ||
			createCallData?.callStatus === "cancel" ||
			createCallData?.callStatus === "rejected"
		) {
			leaveChannel();
		}
	}, [createCallData?.callStatus]);
	useEffect(() => {
		// Cleanup function
		if (
			incomingCall?.callStatus === "missed" ||
			incomingCall?.callStatus === "cancel" ||
			incomingCall?.callStatus === "rejected"
		) {
			leaveChannel();
		}
	}, [incomingCall?.callStatus]);
	const leaveChannel = async () => {
    console.log("this is auto cancel");
    
		cancelCall();
		await client.leave();
		// window.location.href = "/dashboard1";
		client.removeAllListeners();
		tracks[0].close();
		tracks[1].close();
		setStart(false);
	};
	return (
		<div style={{ height: "100%", width: "100%" }}>
			<div style={{}}>
				{ready && tracks && (
					<Controls
						tracks={tracks}
						setStart={setStart}
						client={client}
						// setInCall={setInCall}
					/>
				)}
			</div>
			<div style={{ height: "100%", backgroundColor: "#000000" }}>
				{start && tracks && <Video tracks={tracks} users={users} />}
			</div>
		</div>
	);
}
