import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import BorderedBG from "../../assets/images/borderedBG.png";
import Button from "../../components/buttonSm";

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

    // new end
  };
});
function Race() {
  const classes = useStyles();

  return (
    <Box className={`${classes.appheader}`}>
      <Container maxWidth="xl">
        <HeaderApp sx={{ position: "relative", top: "15px" }} />
        <Box
          sx={{ marginTop: "30px", padding: "20px" }}
          className={`blurBg min100vh`}
        >
          <Box className={`${classes.pageContainer}`}>
            <Grid container>
              <Grid
                className={`blurBg br1`}
                item
                lg={2}
                md={3}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <Box className={`${classes.plr20} ${classes.h100}`} sx={{marginTop:"50px"}}>
                  <Button
                    sx={{
                      marginBottom: "10px",
                    }}
                  >
                    Settings
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#EAF6F7",
                      color: "black",
                      marginBottom: "10px",
                    }}
                  >
                    Media
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#EAF6F7",
                      color: "black",
                      marginBottom: "10px",
                    }}
                  >
                    Bio
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#EAF6F7",
                      color: "black",
                      marginBottom: "10px",
                    }}
                  >
                    Change Password
                  </Button>
                </Box>
              </Grid>
              <Grid item lg={10} md={9} sm={12}>
                body
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Race;
