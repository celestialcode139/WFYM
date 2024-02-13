import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/buttonSm";
import { useState } from "react";
import { Link } from "react-router-dom";
// import $ from "jquery";
const useStyles = makeStyles(() => {
    return {
        sidebar: {
            width: "260px",
        },
        h100: {
            width: "100%",
        },
        plr20: {
            paddingLeft: "20px",
            paddingRight: "20px",
        },
        deactiveBtn: {
            backgroundColor: "#EAF6F7",
            color: "black",
            marginBottom: "10px",
        },
        activeBtn: {
            marginBottom: "10px",
        },
        // new end
    };
});
function Sidebar() {
    const classes = useStyles();
    const [activeBtn, setactiveBtn] = useState("settings");
    return (_jsxs(Box, { className: `${classes.plr20} ${classes.h100}`, sx: { marginTop: "50px" }, children: [_jsx(Link, { to: { pathname: "/profile/page-1" }, children: _jsx(Button, { onClick: () => setactiveBtn("settings"), className: `${activeBtn == "settings" ? classes.activeBtn : classes.deactiveBtn}`, children: "Profile" }) }), _jsx(Link, { to: { pathname: "/ideal-personality/general-info" }, children: _jsx(Button, { onClick: () => setactiveBtn("bio"), className: `${activeBtn == "bio" ? classes.activeBtn : classes.deactiveBtn}`, children: "Ideal Personality" }) }), _jsx(Link, { to: { pathname: "/profile/media" }, children: _jsx(Button, { onClick: () => setactiveBtn("media"), className: `${activeBtn == "media" ? classes.activeBtn : classes.deactiveBtn}`, children: "Media" }) })] }));
}
export default Sidebar;
