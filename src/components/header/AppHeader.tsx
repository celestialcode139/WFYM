import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Logo from "../../assets/logo/logo-w.svg";
import Avatar from "../../assets/images/avatar.png";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import ProfileDropdown from "../../assets/images/ProfileDropdown.svg";
import Menu from "../../components/menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    logo: {
      width: "130px",
    },
    header: {
      // paddingTop: "15px",
    },
    headerContainer: {
      backgroundColor: "#fbfbfbed",
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
  };
});
function AppHeader(props: any) {
  const classes = useStyles();

  return (
    <Box className={`${classes.header}`} sx={{ ...props.sx }}>
      <Grid container className={`${classes.headerContainer}`}>
        <Grid item xs={6} className="d-flex">
          <Link to="/dashboard">
            <Box component="img" src={Logo} className={`${classes.logo}`}></Box>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box className="v-center">
              <Menu>
                <Box
                  component="img"
                  src={Avatar}
                  className={`${classes.profileImage}`}
                ></Box>
                <Box sx={{ height: "40px", marginLeft: "10px" }}>
                  <Typography className={`${classes.profileName}`}>
                    Rahul
                  </Typography>
                  <Typography className={`${classes.profileLocation}`}>
                    Delhi NCR
                  </Typography>
                </Box>
                <Box component="img" src={ProfileDropdown}></Box>
              </Menu>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AppHeader;
