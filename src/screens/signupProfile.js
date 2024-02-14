import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Container, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import backArrow from "../assets/icons/backArrow.svg";
import camera from "../assets/icons/camera.svg";
import avatar from "../assets/images/avatar.png";
import Button from "../components/button";
import DatepickerSticky from "../components/datepickerSticky";
import OnBoardingHeader from "../components/onBoardingHeader";
import { Link, useNavigate } from "react-router-dom";
// Helpers
import GeneralHelper from "../Helpers/GeneralHelper";
import moment from "moment";
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
        signupOthers: {
            fontSize: "14px!important",
            textAlign: "center",
            color: "#9B9B9B",
            marginTop: "40px!important",
        },
        backArrow: {
            width: "55px",
            height: "55px",
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
    };
});
function SignupProfile() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [DOB, setDOB] = useState("");
    const Validation = () => {
        if (FirstName != "" && LastName != "") {
            handleNext();
        }
        else {
            GeneralHelper.ShowToast("Please fill out all fields.");
        }
    };
    const handleDOBChange = (e) => {
        setDOB(String(e));
    };
    const handleNext = () => {
        const data = JSON.stringify({
            FirstName: FirstName,
            LastName: LastName,
            DOB: DOB,
        });
        GeneralHelper.storeData("UserDetails_Names", data);
        navigate("/gender");
    };
    const featchData = async () => {
        const result = await GeneralHelper.retrieveData("UserDetails_Names");
        if (result.status == 1) {
            const data = JSON.parse(result.data);
            setFirstName(data.FirstName);
            setLastName(data.LastName);
        }
    };
    useEffect(() => {
        featchData();
    }, []);
    return (_jsx(Box, { className: `${classes.SignupProfile}`, children: _jsxs(Container, { maxWidth: "lg", children: [_jsx(OnBoardingHeader, { heading: "Profile details" }), _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, xs: 12, sm: 1, className: "v-bottom h-center", sx: { display: { sm: "flex", xs: "none" } }, children: _jsx(Link, { to: { pathname: "/otp" }, children: _jsx(Box, { component: "img", src: backArrow, className: `${classes.backArrow} backButton` }) }) }), _jsx(Grid, { item: true, xs: 12, sm: 10, children: _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, md: 3, xs: 12, className: "h-center", sx: { marginBottom: { md: "0px", xs: "10px" } }, children: _jsxs(Box, { className: `${classes.profileImage}`, children: [_jsx("input", { accept: "image/*", style: { display: "none" }, id: "raised-button-file", type: "file", onChange: (e) => {
                                                        console.log("Image : ", e.target.value);
                                                    } }), _jsx("label", { htmlFor: "raised-button-file", children: _jsx(Box, { className: `${classes.imagePicker}`, component: "img", src: camera }) })] }) }), _jsx(Grid, { item: true, md: 7, xs: 12, children: _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, xs: 6, sx: { p: 1 }, children: _jsx(TextField, { sx: {
                                                            width: "100%",
                                                            "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                                                                borderRadius: "15px!important",
                                                                width: "100%",
                                                            },
                                                        }, type: "text", label: "First Name", value: FirstName, onChange: (e) => {
                                                            setFirstName(e.target.value);
                                                        } }) }), _jsx(Grid, { item: true, xs: 6, sx: { p: 1 }, children: _jsx(TextField, { sx: {
                                                            width: "100%",
                                                            "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                                                                borderRadius: "15px!important",
                                                                width: "100%",
                                                            },
                                                        }, type: "text", label: "Last Name", value: LastName, onChange: (e) => {
                                                            setLastName(e.target.value);
                                                        } }) }), _jsx(Grid, { item: true, xs: 6, sx: { p: 1 }, children: _jsx(DatepickerSticky, { Default: DOB, onChange: handleDOBChange, children: _jsx(Button, { sx: { backgroundColor: "#EFFBFC", color: "#323232" }, children: DOB == "" ?
                                                                "Choose birthday date"
                                                                :
                                                                    moment(DOB).format("D MMM YYYY") }) }) }), _jsx(Grid, { item: true, xs: 6, sx: { p: 1 }, children: _jsx(Button, { onClick: () => {
                                                            Validation();
                                                        }, children: "Confirm" }) })] }) }), _jsx(Grid, { item: true, md: 2, xs: 12 })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 1, sx: { display: { sm: "block", xs: "none" } } })] })] }) }));
}
export default SignupProfile;
