import { useState, useEffect } from "react";
import { Box, Typography, Container, TextField, Grid } from "@mui/material";
import Logo from "../assets/logo/logo-w.svg";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import OtpInput from "react-otp-input";
import backArrow from "../assets/icons/backArrow.svg";
import avatar from "../assets/images/avatar.png";
import camera from "../assets/icons/cam.svg";
import Button from "../components/button";
import DatepickerSticky from "../components/datepickerSticky";
import OnBoardingHeader from "../components/onBoardingHeader";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    SignupProfile: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
    },
    input: {
      borderRadius: "50px", // Adjust the value to your desired border radius
    },
    logo: {
      padding: "40px",
      display: "flex",
      justifyContent: "center",
      marginBottom: "40px!important",
    },
    h1: {
      fontSize: "27px!important",
      fontFamily: "Mori-bold!important",
      textAlign: "center",
      marginTop: "35px!important",
      lineHeight: "1.3!important",
    },
    h1P: {
      fontSize: "12px!important",
      textAlign: "center",
      color: "#000000",
      fontFamily: "Mori-light!important",
      marginTop: "15px!important",
    },
    backArrow: {
      width: "55px",
      height: "55px",
    },
    badge: {
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
      border: "1px solid #E8E6EA",
      padding: "10px 16px",
      fontSize: "12px!important",
      marginBottom: "20px!important",
      width: "100px",
      cursor: "pointer",
    },
    activeBadge: {
      backgroundColor: "black",
      color: "white",
      boxShadow: "6px 8px 10px 0px rgba(103, 103, 103, 0.19)",
    },
  };
});
function Interests() {
  const [activeInterest, setActiveInterest] = useState([0, 5, 7]);
  const classes = useStyles();
  const interest = [
    {
      text: "Photography",
      img: camera,
    },
    {
      text: "Shopping",
      img: camera,
    },
    {
      text: "Karaoke",
      img: camera,
    },
    {
      text: "Yoga",
      img: camera,
    },
    {
      text: "Cooking",
      img: camera,
    },
    {
      text: "Tennis",
      img: camera,
    },
    {
      text: "Run",
      img: camera,
    },
    {
      text: "Swimming",
      img: camera,
    },
    {
      text: "Art",
      img: camera,
    },
    {
      text: "Traveling",
      img: camera,
    },
    {
      text: "Extreme",
      img: camera,
    },
    {
      text: "Drink",
      img: camera,
    },
    {
      text: "Music",
      img: camera,
    },
    {
      text: "Video games",
      img: camera,
    },
  ];
  const GetInterest = (id: any): number[] => {
    return activeInterest.filter((val) => {
      return val == id;
    });
  };
  const toggleFun = (i: number) => {
    const data = activeInterest.filter((val) => val == i);
    if (data.length <= 0) {
      setActiveInterest([...activeInterest, i]);
    } else {
      const updateData = activeInterest.filter((val) => val !== i);
      setActiveInterest(updateData);
    }
  };

  return (
    <Box className={`${classes.SignupProfile}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader
          heading="Your interests"
          subheading="Select a few of your interests and let everyone know what you’re
          passionate about."
        />
        <Grid container className="h-center">
          <Grid
            item
            xs={12}
            sm={2.5}
            className="v-bottom h-center"
            sx={{ display: { sm: "flex", xs: "none" } }}
          ></Grid>
          <Grid item xs={12} sm={7}>
            <Grid container className="h-center">
              {interest.map((val, i) => (
                <Grid item sx={{ marginRight: "20px" }}>
                  <Typography
                    onClick={() => {
                      toggleFun(i);
                    }}
                    className={`${classes.badge} ${
                      GetInterest(i)[0] == i ? classes.activeBadge : null
                    }`}
                  >
                    <Box
                      component="img"
                      src={camera}
                      sx={{ width: "18px", paddingRight: "5px" }}
                    ></Box>{" "}
                    {val.text}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2.5}
            sx={{ display: { sm: "block", xs: "none" } }}
          ></Grid>
        </Grid>
        <Box className="h-center">
          <Link to={{ pathname: "/dashboard" }}>
            <Button sx={{ width: "280px", marginTop: "30px" }}>Continue</Button>
          </Link>
        </Box>
      </Container>
      <Link to={{ pathname: "/gender" }}>
        <Box
          component="img"
          src={backArrow}
          className={`${classes.backArrow} backButton`}
        ></Box>
      </Link>
    </Box>
  );
}

export default Interests;
