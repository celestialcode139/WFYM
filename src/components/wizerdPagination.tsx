import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";



export default function WizerdPagination(props:any) {
  const theme = useTheme();
  const CustomMobileStepper = styled(MobileStepper)(({ theme }) => ({
    background: "transparent!important",
    width: "100%",
    position:"absolute",top:"calc(80vh - 600px)",right:"0px",transform:"rotate(90deg)",
    "& .css-1be5mm1-MuiLinearProgress-root-MuiMobileStepper-progress":{
      width:"85%"
     } 
  }));

  const [activeStep, setActiveStep] = React.useState(3);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
