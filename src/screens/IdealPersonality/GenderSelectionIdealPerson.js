import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import maleBlack from "../../assets/icons/maleBlack.svg";
import maleWhite from "../../assets/icons/maleWhite.svg";
import femaleBlack from "../../assets/icons/femaleBlack.svg";
import femaleWhite from "../../assets/icons/femaleWhite.svg";
import HeaderApp from "../../components/header/AppHeader";
import Button from "../../components/buttonSm";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import { useNavigate } from "react-router-dom";
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
function Race() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [Token, setToken] = useState("");
    const [SelectedGender, setSelectedGender] = useState("male");
    // Getting Profile
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            setToken(String(result.data));
        }
    };
    const GetProfile = (Token) => {
        APIHelper.CallApi(config.Endpoints.user.GetIdealPersonality, {}, null, Token).then((result) => {
            if (result.status == "success") {
                setSelectedGender(result.data.looking_for);
            }
            else {
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    // Updating Profile
    const UpdateBio = () => {
        const data = {
            looking_for: SelectedGender,
        };
        console.log("Sending Data ", data);
        APIHelper.CallApi(config.Endpoints.user.UpdateIdealPersonality, data, null, Token).then((result) => {
            if (result.status == "success") {
                navigate("/ideal-personality/looks");
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const handleNext = () => {
        UpdateBio();
    };
    // Other functions
    useEffect(() => {
        if (Token != "") {
            GetProfile(Token);
        }
        else {
            featchToken();
        }
    }, [Token]);
    return (_jsx(Box, { className: `${classes.appheader}`, children: _jsxs(Container, { maxWidth: "xl", children: [_jsx(HeaderApp, { sx: { position: "relative", top: "15px" } }), _jsx(Box, { sx: { marginTop: "30px", padding: "20px", position: "relative" }, className: `blurBg min100vh h-center`, children: _jsxs(Box, { className: `${classes.pageContainer}`, sx: { marginTop: { md: "100px", sm: "60px", xs: "30px" } }, children: [_jsx(Typography, { className: `f-bold v-center`, sx: { marginBottom: "30px", color: "#000000" }, children: "Looking For" }), _jsx(Box, { sx: { justifyContent: "center", display: "flex" }, children: _jsxs(Box, { children: [_jsx(Button, { onClick: () => setSelectedGender("male"), sx: {
                                                backgroundColor: SelectedGender == "male" ? "#22172A" : "#EFFBFC",
                                                color: SelectedGender == "male" ? "#ffffff" : "#323232",
                                                width: "264px",
                                                display: "flex",
                                                justifyContent: "center",
                                                cursor: "pointer!important",
                                            }, children: _jsxs(Box, { className: "v-center", children: [_jsx(Box, { sx: { width: "22px" }, component: "img", src: SelectedGender == "male" ? maleWhite : maleBlack }), _jsx(Typography, { children: "Man" })] }) }), _jsx(Button, { onClick: () => setSelectedGender("female"), sx: {
                                                backgroundColor: SelectedGender == "female" ? "#22172A" : "#EFFBFC",
                                                color: SelectedGender == "female" ? "#ffffff" : "#323232",
                                                width: "264px",
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "20px",
                                                cursor: "pointer!important",
                                            }, children: _jsxs(Box, { className: "v-center", children: [_jsx(Box, { sx: { width: "22px" }, component: "img", src: SelectedGender == "female" ? femaleWhite : femaleBlack }), _jsx(Typography, { children: "Woman" })] }) }), _jsx(Button, { onClick: () => setSelectedGender("Other"), sx: {
                                                backgroundColor: SelectedGender == "Other" ? "#22172A" : "#EFFBFC",
                                                color: SelectedGender == "Other" ? "#ffffff" : "#323232",
                                                width: "264px",
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "20px",
                                                cursor: "pointer!important",
                                            }, children: _jsx(Box, { className: "v-center", children: _jsx(Typography, { children: "Other" }) }) })] }) }), _jsx(Button, { onClick: () => handleNext(), sx: {
                                    maxWidth: "200px",
                                    margin: "0 auto",
                                    marginTop: { md: "80", sm: "50px", xs: "30px" },
                                }, children: "Next" })] }) })] }) }));
}
export default Race;
