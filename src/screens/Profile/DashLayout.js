import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import avatar from "../../assets/images/avatar.png";
import { Outlet } from "react-router-dom";
// import $ from "jquery";
const useStyles = makeStyles(() => {
    return {
        appheader: {
            backgroundColor: "#ffffff",
            minHeight: "100vh",
            backgroundImage: `url(${AdminSignature})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
        },
        pageContainer: {
        //   maxWidth: "500px",
        },
        // new start
        sidebar: {
            width: "260px",
        },
        body: {
            width: "calc(100% - 260px)",
        },
        h100: {
            width: "100%",
        },
        plr20: {
            paddingLeft: "20px",
            paddingRight: "20px",
        },
        imagePicker: {
            backgroundColor: "#075bce",
            padding: "8px",
            borderRadius: "50%",
            border: "2px solid white",
            position: "absolute",
            bottom: "-11px",
            right: "-11px",
            width: "20px",
            cursor: "pointer",
        },
        profileImage: {
            height: "120px",
            width: "120px",
            backgroundImage: `url(${avatar})`,
            // backgroundImage: `url(${avatar})`,
            backgroundSize: "contain",
            marginTop: "8px",
            borderRadius: "15px",
            position: "relative",
        },
        // new end
    };
});
function Race() {
    const classes = useStyles();
    return (_jsx(Box, { className: `${classes.appheader}`, children: _jsxs(Container, { maxWidth: "xl", children: [_jsx(HeaderApp, { sx: { position: "relative", top: "15px" } }), _jsx(Box, { sx: { marginTop: "30px", padding: "20px" }, className: `blurBg min100vh_h100vh`, children: _jsx(Box, { className: `${classes.pageContainer} h100`, children: _jsx(Outlet, {}) }) })] }) }));
}
export default Race;
