import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Dialog from "@mui/material/Dialog";
import crossIcon from "../assets/icons/crossIcon.png";
import { Box } from "@mui/material";
export default function ViewVideoDiloag(props) {
    return (_jsx(_Fragment, { children: _jsxs(Dialog, { onClose: props.handleClose, open: props.open, maxWidth: false, children: [_jsx(Box, { sx: {
                        height: "30px!important",
                        width: "30px!important",
                        borderRadius: "15px",
                        backgroundColor: "#ffffff",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        position: "absolute",
                        right: "5px",
                        top: "5px",
                        cursor: "pointer",
                        zIndex: 99999999999,
                    }, onClick: () => {
                        props.handleClose();
                    }, children: _jsx(Box, { component: "img", className: "hover", src: crossIcon, sx: { width: "10px", objectFit: "contain" } }) }), _jsx("video", { className: "video220", autoPlay: true, loop: true, controls: true, style: { height: window.innerHeight * 0.7 }, children: _jsx("source", { src: props.src, type: "video/mp4" }) })] }) }));
}
