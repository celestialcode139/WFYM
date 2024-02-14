import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Box, Typography, Container, TextField, Grid, CircularProgress } from "@mui/material";
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
// Alert
import { useAlert } from 'react-alert';
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
        forgetPass: {
            color: "#000000",
            textDecoration: "underline",
            fontSize: 16,
            fontWeight: "500",
            margin: "0 auto!important",
            textAlign: "center",
            paddingTop: 20,
            cursor: "pointer",
            width: "fit-content"
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
function Signin() {
    const navigate = useNavigate();
    const classes = useStyles();
    const alert = useAlert();
    const [Loading, setLoading] = React.useState(false);
    const [Email, setEmail] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const Validation = () => {
        if (Email != "" && Password != "") {
            SignIn();
        }
        else {
            alert.error("Please fill out all fields.");
        }
    };
    const SignIn = () => {
        setLoading(true);
        APIHelper.CallApi(config.Endpoints.auth.SignIn, { email: Email, password: Password }, null, '').then((result) => {
            if (result.status == "success") {
                console.log("Success", result.data.token);
                GeneralHelper.storeData("Token", result.data.token);
                GeneralHelper.storeData("UserId", result.data.user_id);
                setLoading(false);
                navigate("/dashboard");
            }
            else {
                setLoading(false);
                alert.error(String(result.message));
                console.log(result.message);
            }
        });
    };
    return (_jsx(Box, { className: `${classes.signinFrom}`, children: _jsxs(Container, { maxWidth: "lg", children: [_jsx(OnBoardingHeader, { heading: "Sign in" }), _jsx(Box, { component: "form", className: `h-center`, sx: {
                        "& .MuiTextField-root": { maxWidth: "300px", width: "100%" },
                    }, noValidate: true, autoComplete: "off", children: _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, xs: 12, className: "h-center", children: _jsx(TextField, { sx: {
                                        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                                            borderRadius: "15px!important",
                                        },
                                    }, label: "Email", value: Email, onChange: (e) => { setEmail(e.target.value); } }) }), _jsx(Grid, { item: true, xs: 12, className: "h-center", sx: { marginTop: "25px" }, children: _jsx(TextField, { sx: {
                                        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                                            borderRadius: "15px!important",
                                        },
                                    }, type: "password", label: "Password", value: Password, onChange: (e) => { setPassword(e.target.value); } }) })] }) }), _jsxs(Box, { sx: { marginTop: "20px" }, children: [_jsx(Button, { sx: { maxWidth: "280px", margin: "0 auto!important" }, onClick: () => { Validation(); }, children: Loading == true ?
                                _jsx(CircularProgress, { color: "inherit", size: 20 })
                                :
                                    "Continue" }), _jsx(Typography, { className: `${classes.forgetPass}`, onClick: () => { navigate("/forgetpass"); }, children: "Forgot password" })] })] }) }));
}
export default Signin;
