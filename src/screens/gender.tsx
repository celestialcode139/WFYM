import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Link,
  TextField,
  Grid,
} from "@mui/material";
import Logo from "../assets/logo/logo-w.svg";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import OtpInput from "react-otp-input";
import backArrow from "../assets/icons/backArrow.svg";
import camera from "../assets/icons/camera.svg";
import avatar from "../assets/images/avatar.png";
import Button from "../components/button";
import DatepickerSticky from "../components/datepickerSticky";
import maleBlack from "../assets/icons/maleBlack.svg";
import maleWhite from "../assets/icons/maleWhite.svg";
import femaleBlack from "../assets/icons/femaleBlack.svg";
import femaleWhite from "../assets/icons/femaleWhite.svg";
import OnBoardingHeader from "../components/onBoardingHeader";

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
      marginBottom: "20px!important",
    },
    h1P: {
      fontSize: "12px!important",
      textAlign: "center",
      color: "#000000",
      fontFamily: "Mori-light!important",
      marginTop: "15px!important",
    },
    signupOthers: {
      fontSize: "14px!important",
      textAlign: "center",
      color: "#9B9B9B",
      marginTop: "40px!important",
    },
    backArrow: {
      width: "55px",
      height: "55px",
    },
    profileImage: {
      height: "120px",
      width: "120px",
      backgroundImage: `url(${avatar})`,
      backgroundSize: "contain",
      marginTop: "8px",
      borderRadius: "15px",
      position: "relative",
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
    },
  };
});
function SignupProfile() {
  const [active, setactive] = useState(1);
  const classes = useStyles();

  return (
    <Box className={`${classes.SignupProfile}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader heading="I am a" />

        <Box className="h-center">
          <Box>
            <Button
              onClick={() => setactive(0)}
              sx={{
                backgroundColor: active == 0 ? "#22172A" : "#EFFBFC",
                color: active == 0 ? "#ffffff" : "#323232",
                width: "264px",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer!important",
              }}
            >
              <Box className="v-center">
                <Box
                  sx={{ width: "22px" }}
                  component="img"
                  src={active == 0 ? maleWhite : maleBlack}
                ></Box>
                <Typography>Man</Typography>
              </Box>
            </Button>
            <Button
              onClick={() => setactive(1)}
              sx={{
                backgroundColor: active == 1 ? "#22172A" : "#EFFBFC",
                color: active == 1 ? "#ffffff" : "#323232",
                width: "264px",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                cursor: "pointer!important",
              }}
            >
              <Box className="v-center">
                <Box
                  sx={{ width: "22px" }}
                  component="img"
                  src={active == 1 ? femaleWhite : femaleBlack}
                ></Box>
                <Typography>Woman</Typography>
              </Box>
            </Button>
            <Button
              onClick={() => setactive(2)}
              sx={{
                backgroundColor: active == 2 ? "#22172A" : "#EFFBFC",
                color: active == 2 ? "#ffffff" : "#323232",
                width: "264px",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                cursor: "pointer!important",
              }}
            >
              <Box className="v-center">
                <Typography>Other</Typography>
              </Box>
            </Button>
            <Button
              onClick={() => setactive(2)}
              sx={{
                backgroundColor: "#065BCE",
                color: "#ffffff",
                width: "264px",
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
                cursor: "pointer!important",
              }}
            >
              <Box className="v-center">
                <Typography>Continue</Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </Container>
      <Box
        component="img"
        src={backArrow}
        className={`${classes.backArrow} backButton hover`}
      ></Box>
    </Box>
  );
}

export default SignupProfile;
