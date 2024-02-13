import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "../App.css";
import Button from "../components/buttonSm";
import maleBlack from "../assets/icons/maleBlack.svg";
import maleWhite from "../assets/icons/maleWhite.svg";
import femaleBlack from "../assets/icons/femaleBlack.svg";
import femaleWhite from "../assets/icons/femaleWhite.svg";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SignupProfile(props) {
    const [SelectedGender, setSelectedGender] = useState("male");
    useEffect(() => {
        console.log(props.gender);
        props.gender ? setSelectedGender(props.gender) : null;
    }, [props.gender]);
    return (_jsx(Box, { className: "h-center", children: _jsxs(Box, { sx: { width: "100%" }, children: [_jsx(Button, { onClick: () => {
                        props.onChange("male");
                        setSelectedGender("male");
                    }, sx: {
                        backgroundColor: SelectedGender == "male" ? "#22172A" : "#EFFBFC",
                        color: SelectedGender == "male" ? "#ffffff" : "#323232",
                        maxWidth: "264px",
                        display: "flex",
                        justifyContent: "center",
                        cursor: "pointer!important",
                    }, children: _jsxs(Box, { className: "v-center", children: [_jsx(Box, { sx: { width: "22px" }, component: "img", src: SelectedGender == "male" ? maleWhite : maleBlack }), _jsx(Typography, { children: "Man" })] }) }), _jsx(Button, { onClick: () => {
                        props.onChange("female");
                        setSelectedGender("female");
                    }, sx: {
                        backgroundColor: SelectedGender == "female" ? "#22172A" : "#EFFBFC",
                        color: SelectedGender == "female" ? "#ffffff" : "#323232",
                        maxWidth: "264px",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                        cursor: "pointer!important",
                    }, children: _jsxs(Box, { className: "v-center", children: [_jsx(Box, { sx: { width: "22px" }, component: "img", src: SelectedGender == "female" ? femaleWhite : femaleBlack }), _jsx(Typography, { children: "Woman" })] }) }), _jsx(Button, { onClick: () => {
                        props.onChange("other");
                        setSelectedGender("other");
                    }, sx: {
                        backgroundColor: SelectedGender == "other" ? "#22172A" : "#EFFBFC",
                        color: SelectedGender == "other" ? "#ffffff" : "#323232",
                        maxWidth: "264px",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                        cursor: "pointer!important",
                    }, children: _jsx(Box, { className: "v-center", children: _jsx(Typography, { children: "Other" }) }) })] }) }));
}
export default SignupProfile;
