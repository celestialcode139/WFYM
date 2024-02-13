import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/button";
import SignupBg from "../assets/images/signupBg.svg";
import OnBoardingHeader from "../components/onBoardingHeader";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() => {
    const theme = useTheme();
    return {
        signup: {
            backgroundColor: "#ffffff",
            minHeight: "100vh",
            backgroundImage: `url(${SignupBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            [theme.breakpoints.down("sm")]: {
                backgroundImage: "unset!important",
            },
        },
        logo: {
            padding: "40px",
            display: "flex",
            justifyContent: "center",
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
        signupOthers: {
            fontSize: "14px!important",
            textAlign: "center",
            color: "#22172aad",
            marginTop: "40px!important",
        },
    };
});
function Signup() {
    const classes = useStyles();
    return (_jsx(Box, { className: `${classes.signup}`, children: _jsxs(Container, { maxWidth: "lg", children: [_jsx(OnBoardingHeader, { heading: "Make friends with the people like you", subheading: "Interact with people with the same interest like you" }), _jsx(Box, { children: _jsx(Link, { to: { pathname: "/signup-form" }, children: _jsx(Button, { sx: { maxWidth: "280px", margin: "0 auto!important" }, children: "Continue with email" }) }) }), _jsx(Box, { className: `h-center`, children: _jsx(Typography, { className: `signupOthers ${classes.signupOthers}`, children: "or already have an account" }) }), _jsx(Typography, { className: `${classes.signupOthers}`, sx: { marginTop: "10px!important", marginBottom: "30px" }, children: _jsx(Link, { to: { pathname: "/signin" }, children: _jsx(Box, { sx: { color: "#075bce!important", textDecoration: "none" }, children: "Sign in here" }) }) })] }) }));
}
export default Signup;
