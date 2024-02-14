import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
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
        badge: {
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            border: "1px solid #E8E6EA",
            padding: "10px 16px",
            fontSize: "12px!important",
            cursor: "pointer",
            color: "#000000"
        },
        activeBadge: {
            backgroundColor: "black",
            color: "white",
            boxShadow: "6px 8px 10px 0px rgba(103, 103, 103, 0.19)",
        },
        pageContainer: {
            maxWidth: "500px",
        },
    };
});
function Race(props) {
    const classes = useStyles();
    const [activeInterest, setActiveInterest] = useState("");
    useEffect(() => {
        setActiveInterest(props.race);
    }, [props.race]);
    useEffect(() => {
        console.log(props.data);
    }, [props.data]);
    useEffect(() => {
        console.log("activeInterest ", activeInterest);
    }, [activeInterest]);
    return (_jsx(Box, { children: _jsxs(Box, { children: [_jsx(Typography, { className: `f-bold v-center`, sx: { marginBottom: "30px", color: "#000000" }, children: "Race" }), _jsx(Grid, { container: true, spacing: 2, children: props.data?.map((val, i) => (_jsx(Grid, { item: true, children: _jsx(Typography, { onClick: () => {
                                setActiveInterest(val.value);
                                props.onChange(val.value);
                            }, className: `${classes.badge} ${activeInterest == val.value ? classes.activeBadge : null}`, children: val.value }) }, i))) })] }) }));
}
export default Race;
