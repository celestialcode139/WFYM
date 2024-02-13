import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
function valuetext(value) {
    return `${value}°C`;
}
const CustomRangeSlider = styled(Slider)(() => ({
    color: "#065BCE",
    width: "100%",
    "& .css-eg0mwd-MuiSlider-thumb": {
        width: "30px",
        height: "30px",
        border: "3px solid #ffffff",
    },
}));
export default function RangeSlider(props) {
    const [value, setValue] = React.useState([25, 35]);
    const handleChange = (event, newValue) => {
        console.log(event);
        setValue(newValue);
        props.handleChange(newValue);
    };
    React.useEffect(() => {
        setValue(props.DefaultValue);
    }, []);
    return (_jsxs(Box, { children: [_jsxs(Box, { className: "space-between", sx: { marginBottom: "15px" }, children: [_jsx(Typography, { className: `f-bold v-center`, sx: { color: "#000000" }, children: props.title }), _jsxs(Typography, { className: `f-14 v-center`, sx: { color: "#000000" }, children: [value[0], "-", value[1]] })] }), _jsx(CustomRangeSlider, { getAriaLabel: () => "Temperature range", value: value, onChange: handleChange, valueLabelDisplay: "auto", getAriaValueText: valuetext, min: 18, max: 60 })] }));
}
