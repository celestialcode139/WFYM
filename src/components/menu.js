import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";
import GeneralHelper from "../Helpers/GeneralHelper";
export default function BasicMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const Logout = () => {
        GeneralHelper.ClearData("Token");
        GeneralHelper.ClearData("UserId");
        navigate("/");
    };
    return (_jsxs(Box, { children: [_jsx(Box, { onClick: handleClick, className: "v-center hover", children: props.children }), _jsx(Menu, { id: "basic-menu", anchorEl: anchorEl, open: open, onClose: handleClose, children: _jsxs(MenuList, { sx: { width: "200px" }, children: [_jsx(Link, { style: { color: "black" }, to: { pathname: "/buy-matches" }, children: _jsx(MenuItem, { children: _jsx(ListItemText, { children: "Buy Matches" }) }) }), _jsx(Link, { style: { color: "black" }, to: { pathname: "/profile/page-1" }, children: _jsx(MenuItem, { children: _jsx(ListItemText, { children: "Profile" }) }) }), _jsx(Link, { style: { color: "black" }, to: { pathname: "/ideal-personality/general-info" }, children: _jsx(MenuItem, { children: _jsx(ListItemText, { children: "Ideal Personality" }) }) }), _jsx(Link, { style: { color: "black" }, to: { pathname: "/profile/change-password" }, children: _jsx(MenuItem, { children: _jsx(ListItemText, { children: "Change password" }) }) }), _jsx(MenuItem, { onClick: () => { Logout(); }, children: _jsx(ListItemText, { children: "Logout" }) })] }) })] }));
}
