import * as React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";



export default function WizerdPagination(props:any) {
  const CustomMobileStepper = styled(MobileStepper)(() => ({
    background: "transparent!important",
    width: "100%",
    position:"absolute",top:"calc(80vh - 600px)",right:"0px",transform:"rotate(90deg)",
    "& .css-1be5mm1-MuiLinearProgress-root-MuiMobileStepper-progress":{
      width:"85%"
     } 
  }));

  const [activeStep] = React.useState(3);

  return (
    <Box sx={{ display: "flex" }}>
      <CustomMobileStepper
        variant="progress"
        steps={props.steps}
        position="static" 
        activeStep={activeStep}
        sx={{ maxWidth: 300, flexGrow: 1 }}
        nextButton={<Typography sx={{transform:"rotate(270deg)"}}>{props.steps}</Typography>}
        backButton={<Typography sx={{transform:"rotate(270deg)"}}>{activeStep}</Typography>}
      />
    </Box>
  );
}
