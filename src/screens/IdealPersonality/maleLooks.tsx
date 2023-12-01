import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import Button from "../../components/buttonSm";
import Looks from "../../components/looks";

// import $ from "jquery";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    appheader: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      backgroundImage: `url(${AdminSignature})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
    },
    pageContainer: {
      width:"100%",
      maxWidth: "900px",
    },
  };
});
function MaleLooks() {
  const classes = useStyles();


  return (
    <Box className={`${classes.appheader}`}>
      <Container maxWidth="xl">
        <HeaderApp sx={{ position: "relative", top: "15px" }} />
        <Box
          sx={{ marginTop: "30px", padding: "20px",position:"relative" }}
          className={`blurBg min100vh h-center`}
        >
          <Box className={`${classes.pageContainer}`} sx={{marginTop:{md:"100px",sm:"60px",xs:"30px"}}}>
            <Looks gender="female"/>
            <Button sx={{maxWidth:"200px",margin:"0 auto",marginTop:{md:"80",sm:"50px",xs:"30px"}}}>Next</Button>
          </Box>
          {/* <Box>
            <WizerdPagination steps={8}/>
          </Box> */}
        </Box>
      </Container>
        
    </Box>
  );
}

export default MaleLooks;
