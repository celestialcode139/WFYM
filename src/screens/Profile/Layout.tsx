import { Box, Container, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import Button from "../../components/buttonSm";
import DatepickerSticky from "../../components/datepickerSticky";
import Sidebar from "../../components/sidebar";
import avatar from "../../assets/images/avatar.png";
import camera from "../../assets/icons/camera.svg";
import { useState } from "react";
import { Outlet } from "react-router-dom";

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
      //   maxWidth: "500px",
    },
    // new start
    sidebar: {
      width: "260px",
    },
    body: {
      width: "calc(100% - 260px)",
    },
    h100: {
      width: "100%",
    },
    plr20: {
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    imagePicker: {
      backgroundColor: "#075bce",
      padding: "8px",
      borderRadius: "50%",
      border: "2px solid white",
      position: "absolute",
      bottom: "-11px",
      right: "-11px",
      width: "20px",
      cursor: "pointer",
    },
    profileImage: {
      height: "120px",
      width: "120px",
      backgroundImage: `url(${avatar})`,
      // backgroundImage: `url(${avatar})`,
      backgroundSize: "contain",
      marginTop: "8px",
      borderRadius: "15px",
      position: "relative",
    },

    // new end
  };
});
function Race() {
  const classes = useStyles();
  const [activeBtn, setactiveBtn] = useState("settings");

  return (
    <Box className={`${classes.appheader}`}>
      <Container maxWidth="xl">
        <HeaderApp sx={{ position: "relative", top: "15px" }} />
        <Box
          sx={{ marginTop: "30px", padding: "20px" }}
          className={`blurBg min100vh_h100vh`}
        >
          <Box className={`${classes.pageContainer} h100`}>
            <Grid
              container
              spacing={2}
              sx={{ paddingTop: "50px" }}
              className={`h100`}
            >
              {/* SIDEBAR */}
              <Grid
                className={`brgradient h100`}
                item
                lg={2}
                md={3}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <Sidebar />
              </Grid>
              <Grid item lg={10} md={9} sx={{margin:"0 auto"}}>
                <Outlet />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Race;
