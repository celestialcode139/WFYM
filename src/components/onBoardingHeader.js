import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import Logo from "../assets/logo/logo-w.png";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import SignupBg from "../assets/images/signupBg.svg";
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
            color: "#000000"
        },
        p1: {
            fontSize: "12px!important",
            textAlign: "center",
            color: "#22172aad",
            fontFamily: "Mori-normal!important",
            marginTop: "6px!important",
        },
        signupOthers: {
            fontSize: "14px!important",
            textAlign: "center",
            color: "#22172aad",
            marginTop: "40px!important",
        },
    };
});
function OnBoardingHeading(props) {
    const classes = useStyles();
    return (_jsxs(Box, { sx: { marginBottom: "40px" }, children: [_jsx(Box, { className: `${classes.logo}`, children: _jsx(Box, { component: "img", sx: { width: { xs: "100px", sm: "200px" } }, src: Logo }) }), _jsx(Typography, { className: `${classes.h1}`, children: props.heading }), _jsx(Typography, { className: `${classes.p1}`, children: props.subheading })] }));
}
export default OnBoardingHeading;
