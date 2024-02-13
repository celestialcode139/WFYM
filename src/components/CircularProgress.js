import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function CircularProgressWithLabel(props) {
    return (_jsxs(Box, { sx: { position: 'relative', display: 'inline-flex', zIndex: "9999999999" }, children: [_jsx(CircularProgress, { variant: "determinate", ...props }), _jsx(Box, { sx: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: _jsx(Typography, { variant: "caption", component: "div", sx: { color: "#065BCE", background: "#ffffffd6", borderRadius: "50%", height: "35px", width: "35px", display: "flex", justifyContent: 'center', alignItems: 'center' }, children: `${Math.round(props.value)}%` }) })] }));
}
export default function CircularWithValueLabel(props) {
    return _jsx(_Fragment, { children: props.progress > 0 ? _jsx(CircularProgressWithLabel, { value: props.progress }) : null });
}
