import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import GeneralHelper from "../Helpers/GeneralHelper";
export default function TeamMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
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
        window.location.reload();
    };
    return (_jsxs(Box, { children: [_jsx(Box, { onClick: handleClick, className: "v-center hover", children: props.children }), _jsx(Menu, { id: "basic-menu", anchorEl: anchorEl, open: open, onClose: handleClose, children: _jsx(MenuList, { sx: { width: "200px" }, children: _jsx(MenuItem, { onClick: () => { Logout(); }, children: _jsx(ListItemText, { children: "Logout" }) }) }) })] }));
}
