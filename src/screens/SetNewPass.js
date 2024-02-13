import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Box, Container, TextField, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/button";
import signinForm from "../assets/images/signupForm.svg";
import OnBoardingHeader from "../components/onBoardingHeader";
import { useNavigate } from "react-router-dom";
// Helpers
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
const useStyles = makeStyles(() => {
    const theme = useTheme();
    return {
        signinFrom: {
            backgroundColor: "#ffffff",
            minHeight: "100vh",
            backgroundImage: `url(${signinForm})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "bottom left",
            [theme.breakpoints.down("sm")]: {
                backgroundImage: "unset!important",
            },
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
            fontSize: "30px!important",
            fontFamily: "Mori-bold!important",
            textAlign: "center",
            marginTop: "35px!important",
        },
        p1: {
            fontSize: "17px!important",
            textAlign: "center",
            color: "#22172aad",
            fontFamily: "Mori-normal!important",
            marginTop: "8px!important",
        },
        signinOthers: {
            fontSize: "14px!important",
            textAlign: "center",
            color: "#22172aad",
            marginTop: "35px!important",
        },
    };
});
function SetNewPass() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [Password, setPassword] = React.useState("");
    const [CPassword, setCPassword] = React.useState("");
    const Validation = () => {
        if (Password != "") {
            if (Password == CPassword) {
                retrieveData();
            }
            else {
                GeneralHelper.ShowToast("Confirm Password does not match.");
            }
        }
        else {
            GeneralHelper.ShowToast("Password Can't be empty");
        }
    };
    const retrieveData = async () => {
        const Email = await GeneralHelper.retrieveData("Email");
        const OTP_ID = await GeneralHelper.retrieveData("OTP_ID");
        if (Email.status == 1 && OTP_ID.status == 1) {
            handleUpdatePass(Email.data, OTP_ID.data, Password);
        }
    };
    const handleUpdatePass = (Email, OTP_Id, Password) => {
        APIHelper.CallApi(config.Endpoints.auth.setPass, { email: Email, otp_id: OTP_Id, password: Password }, null, '').then((result) => {
            if (result?.status == "success") {
                GeneralHelper.ClearData("Email").then(() => {
                    GeneralHelper.ClearData("OTP_ID").then(() => {
                        GeneralHelper.ShowToast("Password Updated Successfully.");
                        navigate("/signin");
                    });
                });
            }
            else {
                GeneralHelper.ShowToast("Something wen't wrong.");
            }
        });
    };
    return (_jsx(Box, { className: `${classes.signinFrom}`, children: _jsxs(Container, { maxWidth: "lg", children: [_jsx(OnBoardingHeader, { heading: "Forget Password" }), _jsx(Box, { component: "form", className: `h-center`, sx: {
                        "& .MuiTextField-root": { maxWidth: "300px", width: "100%" },
                    }, noValidate: true, autoComplete: "off", children: _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, xs: 12, className: "h-center", sx: { marginTop: "25px" }, children: _jsx(TextField, { sx: {
                                        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                                            borderRadius: "15px!important",
                                        },
                                    }, type: "password", label: "Password", value: Password, onChange: (e) => { setPassword(e.target.value); } }) }), _jsx(Grid, { item: true, xs: 12, className: "h-center", sx: { marginTop: "25px" }, children: _jsx(TextField, { sx: {
                                        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                                            borderRadius: "15px!important",
                                        },
                                    }, type: "password", label: "Confirm Password", value: CPassword, onChange: (e) => { setCPassword(e.target.value); } }) })] }) }), _jsx(Box, { sx: { marginTop: "20px" }, children: _jsx(Button, { sx: { maxWidth: "280px", margin: "0 auto!important" }, onClick: () => { Validation(); }, children: "Continue" }) })] }) }));
}
export default SetNewPass;
