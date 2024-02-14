import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
export default function WizerdPagination(props) {
    const CustomMobileStepper = styled(MobileStepper)(() => ({
        background: "transparent!important",
        width: "100%",
        position: "absolute", top: "calc(80vh - 600px)", right: "0px", transform: "rotate(90deg)",
        "& .css-1be5mm1-MuiLinearProgress-root-MuiMobileStepper-progress": {
            width: "85%"
        }
    }));
    const [activeStep] = React.useState(3);
    return (_jsx(Box, { sx: { display: "flex" }, children: _jsx(CustomMobileStepper, { variant: "progress", steps: props.steps, position: "static", activeStep: activeStep, sx: { maxWidth: 300, flexGrow: 1 }, nextButton: _jsx(Typography, { sx: { transform: "rotate(270deg)" }, children: props.steps }), backButton: _jsx(Typography, { sx: { transform: "rotate(270deg)" }, children: activeStep }) }) }));
}
