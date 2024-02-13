import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import backArrow from "../assets/icons/backArrow.svg";
import camera from "../assets/icons/cam.svg";
import Button from "../components/button";
import OnBoardingHeader from "../components/onBoardingHeader";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() => {
    return {
        SignupProfile: {
            backgroundColor: "#ffffff",
            minHeight: "100vh",
        },
        input: {
            borderRadius: "50px", // Adjust the value to your desired border radius
        },
        logo: {
            padding: "40px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px!important",
        },
        h1: {
            fontSize: "27px!important",
            fontFamily: "Mori-bold!important",
            textAlign: "center",
            marginTop: "35px!important",
            lineHeight: "1.3!important",
        },
        h1P: {
            fontSize: "12px!important",
            textAlign: "center",
            color: "#000000",
            fontFamily: "Mori-light!important",
            marginTop: "15px!important",
        },
        backArrow: {
            width: "55px",
            height: "55px",
        },
        badge: {
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            border: "1px solid #E8E6EA",
            padding: "10px 16px",
            fontSize: "12px!important",
            marginBottom: "20px!important",
            width: "100px",
            cursor: "pointer",
        },
        activeBadge: {
            backgroundColor: "black",
            color: "white",
            boxShadow: "6px 8px 10px 0px rgba(103, 103, 103, 0.19)",
        },
    };
});
function Interests() {
    const [activeInterest, setActiveInterest] = useState([0, 5, 7]);
    const classes = useStyles();
    const interest = [
        {
            text: "Photography",
            img: camera,
        },
        {
            text: "Shopping",
            img: camera,
        },
        {
            text: "Karaoke",
            img: camera,
        },
        {
            text: "Yoga",
            img: camera,
        },
        {
            text: "Cooking",
            img: camera,
        },
        {
            text: "Tennis",
            img: camera,
        },
        {
            text: "Run",
            img: camera,
        },
        {
            text: "Swimming",
            img: camera,
        },
        {
            text: "Art",
            img: camera,
        },
        {
            text: "Traveling",
            img: camera,
        },
        {
            text: "Extreme",
            img: camera,
        },
        {
            text: "Drink",
            img: camera,
        },
        {
            text: "Music",
            img: camera,
        },
        {
            text: "Video games",
            img: camera,
        },
    ];
    const GetInterest = (id) => {
        return activeInterest.filter((val) => {
            return val == id;
        });
    };
    const toggleFun = (i) => {
        let data = activeInterest.filter((val) => val == i);
        if (data.length <= 0) {
            setActiveInterest([...activeInterest, i]);
        }
        else {
            let updateData = activeInterest.filter((val) => val !== i);
            setActiveInterest(updateData);
        }
    };
    return (_jsxs(Box, { className: `${classes.SignupProfile}`, children: [_jsxs(Container, { maxWidth: "lg", children: [_jsx(OnBoardingHeader, { heading: "Your interests", subheading: "Select a few of your interests and let everyone know what you\u2019re\n          passionate about." }), _jsxs(Grid, { container: true, className: "h-center", children: [_jsx(Grid, { item: true, xs: 12, sm: 2.5, className: "v-bottom h-center", sx: { display: { sm: "flex", xs: "none" } } }), _jsx(Grid, { item: true, xs: 12, sm: 7, children: _jsx(Grid, { container: true, className: "h-center", children: interest.map((val, i) => (_jsx(Grid, { item: true, sx: { marginRight: "20px" }, children: _jsxs(Typography, { onClick: () => {
                                                toggleFun(i);
                                            }, className: `${classes.badge} ${GetInterest(i)[0] == i ? classes.activeBadge : null}`, children: [_jsx(Box, { component: "img", src: camera, sx: { width: "18px", paddingRight: "5px" } }), " ", val.text] }) }))) }) }), _jsx(Grid, { item: true, xs: 12, sm: 2.5, sx: { display: { sm: "block", xs: "none" } } })] }), _jsx(Box, { className: "h-center", children: _jsx(Link, { to: { pathname: "/dashboard" }, children: _jsx(Button, { sx: { width: "280px", marginTop: "30px" }, children: "Continue" }) }) })] }), _jsx(Link, { to: { pathname: "/gender" }, children: _jsx(Box, { component: "img", src: backArrow, className: `${classes.backArrow} backButton` }) })] }));
}
export default Interests;
