import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Box } from "@mui/material";
import ViewVideoDiloag from "./viewVideoDiloag";
import MediaHelper from "../Helpers/MediaHelper";
export default function MediaCover(props) {
    const [DiloagOpen, setDiloagOpen] = React.useState(false);
    const [videosrc, setvideosrc] = React.useState("");
    const handleCloseDiloag = () => {
        console.log("Closing....");
        setTimeout(() => {
            setDiloagOpen(false);
        });
    };
    const handleOpenDiloag = () => {
        setDiloagOpen(true);
    };
    React.useEffect(() => {
        init();
    }, [props.src]);
    const init = () => {
        MediaHelper.GetImage(props.src).then((e) => {
            setvideosrc(e);
        });
    };
    return (_jsxs(Box, { onClick: () => {
            handleOpenDiloag();
        }, children: [_jsx("video", { className: "video220", autoPlay: true, loop: true, muted: true, style: { borderRadius: "15px" }, children: _jsx("source", { src: videosrc, type: "video/mp4", style: { borderRadius: "15px" } }) }, videosrc), _jsx(ViewVideoDiloag, { src: videosrc, handleClose: handleCloseDiloag, open: DiloagOpen }, DiloagOpen)] }));
}
