import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import "../App.css";
import moment from "moment";
const StyledMenu = styled((props) => (_jsx(Menu, { elevation: 0, anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
    }, transformOrigin: {
        vertical: "top",
        horizontal: "right",
    }, ...props })))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === "light"
            ? "rgb(55, 65, 81)"
            : theme.palette.grey[300],
        boxShadow: "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
    },
}));
export default function CustomizedMenus(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (date) => {
        console.log(typeof date);
        if (date != "2003-01-01") {
            if (typeof date == "string") {
                props.onChange(date);
            }
            setAnchorEl(null);
        }
    };
    return (_jsxs("div", { children: [_jsx(Box, { onClick: handleClick, children: props.children }), _jsx(StyledMenu, { id: "demo-customized-menu", MenuListProps: {
                    "aria-labelledby": "demo-customized-button",
                }, anchorEl: anchorEl, open: open, onClose: handleClose, children: _jsx(LocalizationProvider, { dateAdapter: AdapterDayjs, children: _jsx(StaticDatePicker, { onChange: (e) => {
                            const inputDate = new Date(e);
                            const formattedDate = moment(inputDate).format("YYYY-MM-DD");
                            console.log("On Change event call ", formattedDate);
                            handleClose(String(formattedDate));
                        }, defaultValue: dayjs(props.Default == "" ? "01-01-2000" : props.Default) }) }) })] }));
}
