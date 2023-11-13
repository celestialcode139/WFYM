import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Logo from "../../assets/logo/logo-w.svg";
import Avatar from "../../assets/images/avatar.png";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import ProfileDropdown from "../../assets/images/ProfileDropdown.svg";
import HeaderApp from "../components/header/AppHeader";
import BorderedBG from "../assets/images/borderedBG.png";
import matchBlue from "../assets/icons/matchBlue.svg";
import matchWhite from "../assets/icons/matchWhite.svg";
import msgBlue from "../assets/icons/msgBlue.svg";
import msgWhite from "../assets/icons/msgWhite.svg";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    appheader: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      backgroundImage: `url(${AdminSignature})`,
      backgroundSize: "cover",
    },
    logo: {
      width: "130px",
    },
    header: {
      //   paddingTop: "15px",
    },
    headerContainer: {
      backgroundColor: "#f9f9f9ed",
      padding: "10px 20px",
      backdropFilter: "blur(5px)",
      borderRadius: "10px",
    },
    profileImage: {
      height: "50px",
      width: "50px",
      borderRadius: "50%",
      border: "2px solid #01A0E6",
    },
    profileName: {
      fontSize: "16px!important",
      fontWeight: "bold!important",
    },
    profileLocation: {
      fontSize: "10px!important",
      lineHeight: "10px!important",
    },
    ProfileDropdown: {
      marginLeft: "5px",
      width: "20px",
    },
    BorderedBG: {
      backgroundImage: `url(${BorderedBG})`,
      borderRadius: "15px",
      backgroundSize: "100% 100%",
    },
    toggleBtn: {
      border: "1px solid #E8E6EA",
      display:"flex",
      padding:"8px",
      backgroundColor:"white",
      borderRadius:"10px",
      justifyContent:"space-between"
    },
    circleBadge:{
        height:"20px",
        width:"20px",
        display:"flex",
        borderRadius:"50%",
        justifyContent:"center",
        alignItems:"center",
        fontSize: "12px",
        border: "1px solid #E8E6EA",
    }
  };
});
function Dashboard() {
  const classes = useStyles();

  return (
    <Box className={`${classes.appheader}`}>
      <Container maxWidth="xl">
        <HeaderApp sx={{ position: "relative", top: "15px" }} />
        <Grid container sx={{ marginTop: "20px" }} spacing={2}>
          <Grid item xs={12} md={3.5}>
            <Box
              className={`blurBg ${classes.BorderedBG}`}
              sx={{ minHeight: "400px", padding: "15px" }}
            >
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box className={`${classes.toggleBtn}`}>
                    <Box className={`d-flex`}>
                        <Box component="img" src={matchBlue} sx={{width:"20px"}}></Box>
                        <Box className={`v-center`} sx={{fontSize:"12px",marginLeft:'3px'}}>Matches</Box>
                    </Box>
                    <Box className={`${classes.circleBadge}`}>30</Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className={`${classes.toggleBtn}`}>1</Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              className={`blurBg ${classes.BorderedBG} `}
              sx={{ minHeight: "400px" }}
            ></Box>
          </Grid>
          <Grid item xs={12} md={3.5}>
            <Box
              className={`blurBg ${classes.BorderedBG}`}
              sx={{ minHeight: "400px" }}
            ></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
