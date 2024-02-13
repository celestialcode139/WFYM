import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useClient } from "./settings";
import { Grid, IconButton } from "@mui/material";
import CallEndIcon from "@mui/icons-material/CallEnd";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from '@mui/icons-material/MicOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
export default function Controls(props) {
    const client = useClient();
    const { tracks, setStart, setInCall } = props;
    const [trackState, setTrackState] = useState({ video: true, audio: true });
    const mute = async (type) => {
        if (type === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((ps) => {
                return { ...ps, audio: !ps.audio };
            });
        }
        else if (type === "video") {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((ps) => {
                return { ...ps, video: !ps.video };
            });
        }
    };
    const leaveChannel = async () => {
        await client.leave();
        window.location.href = "/dashboard";
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        setInCall(false);
    };
    return (_jsxs(Grid, { container: true, spacing: 2, alignItems: "center", style: {
            position: "fixed",
            bottom: 30,
            justifyContent: "center",
            display: "flex",
            zIndex: 999,
        }, children: [_jsx(Grid, { item: true, children: _jsx(IconButton, { style: trackState.audio
                        ? { background: "gray" }
                        : { background: "#2996f3" }, onClick: () => mute("audio"), children: trackState.audio ? _jsx(KeyboardVoiceIcon, { style: { color: "#ffffff" } }) : _jsx(MicOffIcon, { style: { color: "#ffffff" } }) }) }), _jsx(Grid, { item: true, children: _jsx(IconButton, { style: trackState.video
                        ? { background: "gray" }
                        : { background: "#2996f3" }, 
                    // variant="contained"
                    // color={trackState.video ? "primary" : "secondary"}
                    // style={{backgroundColor:"transparent"}}
                    onClick: () => mute("video"), children: trackState.video ? (_jsx(VideocamIcon, { style: { color: "#ffffff" } })) : (_jsx(VideocamOffIcon, { style: { color: "#ffffff" } })) }) }), _jsx(Grid, { item: true, children: _jsx(IconButton, { style: { backgroundColor: "#f00000" }, onClick: () => leaveChannel(), children: _jsx(CallEndIcon, { sx: { color: "#ffffff" } }) }) })] }));
}
