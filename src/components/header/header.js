import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import LogoWhite from "../../assets/logo/logo-w.png";
import Hamburger from "../../assets/icons/hamburger.svg";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const pages = [
    { label: "Home", url: "/home" },
    { label: "About", url: "/about" },
    { label: "Log in", url: "/login" },
];
const useStyles = makeStyles(() => {
    return {
        button: {
            "&:focus": {
                outline: "unset",
            },
            padding: "0px!important",
            minWidth: "unset!important",
            borderRadius: "50%!important",
            marginLeft: "10px!important",
        },
        hamburger: {
            width: 50,
        },
        loginBtn: {
            borderRadius: "54.07px !important",
            border: "0.82px solid black!important",
            padding: "12px 24px!important",
            color: "#000000!important",
            "&:focus": {
                outline: "unset",
            },
        },
    };
});
function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const classes = useStyles();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (_jsx(AppBar, { position: "static", sx: {
            boxShadow: "unset",
            paddingTop: "20px",
            paddingBottom: { xs: "20px", sm: "10px" },
            backgroundColor: "unset",
        }, children: _jsx(Container, { maxWidth: "lg", children: _jsxs(Toolbar, { disableGutters: true, children: [_jsx(Box, { component: "img", src: LogoWhite, sx: { width: { xs: "100px", sm: "200px" } } }), _jsx(Box, { sx: { flexGrow: 1, display: { xs: "flex" } } }), _jsx(Box, { sx: { flexGrow: 0, display: { xs: "none", md: "flex" } }, children: _jsx(Link, { to: { pathname: "/signup" }, className: `${classes.loginBtn}`, children: "Log in" }) }), _jsxs(Box, { sx: { flexGrow: 0, display: { xs: "flex" } }, children: [_jsx(Button, { className: `${classes.button}`, size: "large", "aria-label": "account of current user", "aria-controls": "menu-appbar", "aria-haspopup": "true", onClick: handleOpenNavMenu, color: "inherit", children: _jsx(Box, { component: "img", className: `${classes.hamburger}`, src: Hamburger }) }), _jsx(Menu, { id: "menu-appbar", anchorEl: anchorElNav, anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                }, keepMounted: true, transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left",
                                }, open: Boolean(anchorElNav), onClose: handleCloseNavMenu, sx: {
                                    display: "block",
                                    borderRadius: 50,
                                }, children: pages.map((page) => (_jsx(MenuItem, { onClick: handleCloseNavMenu, children: _jsx(Typography, { textAlign: "center", children: page.label }) }, page.label))) })] })] }) }) }));
}
export default ResponsiveAppBar;
