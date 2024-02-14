import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { config, useClient, useMicrophoneAndCameraTracks, channelName, } from "./settings.js";
// import { Grid } from "@material-ui/core";
import Video from "./Video.js";
import Controls from "./Controls.js";
export default function VideoCall(props) {
    const { setInCall } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();
    useEffect(() => {
        // console.log("Client ",client.get);
        try {
            console.log("Microphone ", tracks);
            let init = async (name) => {
                client.on("user-published", async (user, mediaType) => {
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
                    }
                    catch (error) {
                        console.log("Catch error ", error);
                    }
                });
                client.on("user-unpublished", (user, mediaType) => {
                    if (mediaType === "audio") {
                        if (user.audioTrack)
                            user.audioTrack.stop();
                    }
                    if (mediaType === "video") {
                        setUsers((prevUsers) => {
                            return prevUsers.filter((User) => User.uid !== user.uid);
                        });
                    }
                });
                client.on("user-left", (user) => {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                });
                try {
                    await client.join(config.appId, name, config.token, null);
                }
                catch (error) {
                    console.log("error", error);
                }
                if (tracks)
                    await client.publish([tracks[0], tracks[1]]);
                setStart(true);
            };
            if (ready && tracks) {
                try {
                    init(channelName);
                }
                catch (error) {
                    console.log("Error in try catch : ", error);
                }
            }
            else {
                console.log("Ready && Tracks ..... ");
                console.log(start);
                console.log(tracks);
                // console.log(tracks);
            }
        }
        catch (error) {
            console.log("Error is kjdfhkshfk ", error);
        }
    }, [start, client, ready, tracks]);
    useEffect(() => {
        setTimeout(() => {
            console.log("user is ", tracks);
        }, 2000);
    });
    return (_jsxs("div", { style: { height: "100%", width: "100%" }, children: [_jsx("div", { style: {}, children: ready && tracks && (_jsx(Controls, { tracks: tracks, setStart: setStart, setInCall: setInCall })) }), _jsx("div", { style: { height: "100%", backgroundColor: "#000000" }, children: start && tracks && _jsx(Video, { tracks: tracks, users: users }) })] }));
}
