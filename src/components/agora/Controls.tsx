import { useState } from "react";
import { useClient } from "./settings";
import { Grid, IconButton } from "@mui/material";
import CallEndIcon from "@mui/icons-material/CallEnd";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { useCallCreatorData } from "../../context/SignalsContextProvider";

export default function Controls(props: any) {
	const client = useClient();
	const { cancelCall } = useCallCreatorData();
	const { tracks, setStart, setInCall } = props;
	const [trackState, setTrackState] = useState({ video: true, audio: true });

	const mute = async (type: any) => {
		if (type === "audio") {
			await tracks[0].setEnabled(!trackState.audio);
			setTrackState((ps) => {
				return { ...ps, audio: !ps.audio };
			});
		} else if (type === "video") {
			await tracks[1].setEnabled(!trackState.video);
			setTrackState((ps) => {
				return { ...ps, video: !ps.video };
			});
		}
	};

	const leaveChannel = async () => {
    cancelCall()
		await client.leave();
		window.location.href = "/dashboard";
		client.removeAllListeners();
		tracks[0].close();
		tracks[1].close();
		setStart(false);
		setInCall(false);
	};

	return (
		<Grid
			container
			spacing={2}
			alignItems="center"
			style={{
				position: "fixed",
				bottom: 30,
				justifyContent: "center",
				display: "flex",
				zIndex: 999,
			}}
		>
			<Grid item>
				<IconButton
					style={
						trackState.audio
							? { background: "gray" }
							: { background: "#2996f3" }
					}
					onClick={() => mute("audio")}
				>
					{trackState.audio ? (
						<KeyboardVoiceIcon style={{ color: "#ffffff" }} />
					) : (
						<MicOffIcon style={{ color: "#ffffff" }} />
					)}
				</IconButton>
			</Grid>
			<Grid item>
				<IconButton
					style={
						trackState.video
							? { background: "gray" }
							: { background: "#2996f3" }
					}
					// variant="contained"
					// color={trackState.video ? "primary" : "secondary"}
					// style={{backgroundColor:"transparent"}}
					onClick={() => mute("video")}
				>
					{trackState.video ? (
						<VideocamIcon style={{ color: "#ffffff" }} />
					) : (
						<VideocamOffIcon style={{ color: "#ffffff" }} />
					)}
				</IconButton>
			</Grid>
			<Grid item>
				<IconButton
					style={{ backgroundColor: "#f00000" }}
					onClick={() => leaveChannel()}
				>
					<CallEndIcon sx={{ color: "#ffffff" }} />
				</IconButton>
			</Grid>
		</Grid>
	);
}
