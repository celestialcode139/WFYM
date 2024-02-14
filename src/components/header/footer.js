import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles } from "@mui/styles";
import { Box, Container, Grid, Typography } from "@mui/material";
import appstore from "../../assets/logo/appstore.svg";
import playstore from "../../assets/logo/playstore.svg";
import { useTheme } from "@mui/material/styles";
const useStyles = makeStyles(() => {
    const theme = useTheme();
    return {
        footer: {
            backgroundColor: "#ffffff!important",
            paddingTop: "100px!important",
            paddingBottom: "80px!important",
            [theme.breakpoints.down("md")]: {
                paddingTop: "50px!important",
                paddingBottom: "30px!important", // Adjust the styles for screens with a width of 600px or larger
            },
        },
        footerItems: {
            lineHeight: "26px",
            color: "black",
        },
        downloadText: {
            fontSize: "45px!important",
            lineHeight: "50px!important",
        },
        downloadIcons: {
            width: "46%",
            maxWidth: "160px",
            marginTop: 20,
        },
    };
});
const Footer = () => {
    const classes = useStyles();
    return (_jsx(Box, { className: `${classes.footer}`, children: _jsxs(Container, { maxWidth: "lg", children: [_jsxs(Grid, { container: true, children: [_jsxs(Grid, { item: true, xs: 12, sm: 6, md: 3.5, children: [_jsx(Box, { children: _jsx(Typography, { className: `${classes.footerItems}`, children: "Home" }) }), _jsx(Box, { children: _jsx(Typography, { className: `${classes.footerItems}`, children: "About" }) }), _jsx(Box, { children: _jsx(Typography, { className: `${classes.footerItems}`, children: "Services" }) }), _jsx(Box, { children: _jsx(Typography, { className: `${classes.footerItems}`, children: "Contact" }) })] }), _jsxs(Grid, { item: true, xs: 12, sm: 6, md: 3.5, sx: { marginTop: { xs: "20px", sm: "0px" } }, children: [_jsx(Box, { children: _jsx(Typography, { className: `${classes.footerItems}`, children: "Facebook" }) }), _jsx(Box, { children: _jsx(Typography, { className: `${classes.footerItems}`, children: "Instagram" }) }), _jsx(Box, { children: _jsx(Typography, { className: `${classes.footerItems}`, children: "Snapchat" }) })] }), _jsxs(Grid, { item: true, xs: 12, sm: 12, md: 5, sx: { marginTop: { xs: "20px", md: "0px" } }, children: [_jsxs(Typography, { className: `${classes.footerItems} ${classes.downloadText}`, children: ["Download", " "] }), _jsxs(Typography, { className: `${classes.footerItems} ${classes.downloadText}`, children: ["for mobile", " "] }), _jsxs(Box, { sx: { display: "flex" }, children: [_jsx(Box, { component: "img", src: appstore, className: `${classes.downloadIcons}`, sx: { mr: 1 } }), _jsx(Box, { component: "img", src: playstore, className: `${classes.downloadIcons}`, sx: { ml: 1 } })] })] })] }), _jsxs(Grid, { container: true, sx: { marginTop: { xs: "30px", md: 0 } }, children: [_jsxs(Grid, { item: true, xs: 12, sm: 6, md: 7, children: [_jsx(Box, { sx: { display: { xs: "none", md: "block" } }, children: _jsx(Typography, { className: `${classes.footerItems}`, children: "Email" }) }), _jsx(Box, { children: _jsx(Typography, { className: `${classes.footerItems}`, children: "info@WeFindYourMatch.com" }) })] }), _jsx(Grid, { item: true, xs: 12, sm: 12, md: 5, sx: { marginTop: { xs: "0px", md: "0px" } }, children: _jsx(Box, { children: _jsx(Typography, { className: `${classes.footerItems}`, sx: { marginTop: { xs: "10px", md: "24px" } }, children: "\u00A9 2023 We Find Your Match" }) }) })] })] }) }));
};
export default Footer;
