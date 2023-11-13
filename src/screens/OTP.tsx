import { useState,useEffect } from "react";
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
import Button from "../components/button";
import OtpInput from "react-otp-input";
import backArrow from "../assets/icons/backArrow.svg";
import OnBoardingHeader from "../components/onBoardingHeader";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    OTP: {
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
      fontSize: "45px!important",
      fontFamily: "Mori-bold!important",
      textAlign: "center",
      marginTop: "35px!important",
      lineHeight: "1.3!important",
    },
    otpMsg: {
      fontSize: "12px!important",
      textAlign: "center",
      color: "#000000",
      fontFamily: "Mori-light!important",
    },
    signupOthers: {
      fontSize: "14px!important",
      textAlign: "center",
      color: "#9B9B9B",
      marginTop: "40px!important",
    },
    backArrow:{
        width:"55px",
        height:"55px"
    }
  };
});
function OTP() {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);
  const classes = useStyles();

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  });
  return (
    <Box className={`${classes.OTP}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader/>
        <Typography className={`${classes.h1}`}>00:{seconds}</Typography>
        <Typography className={`${classes.otpMsg}`}>
          Type the verification code we’ve sent you
        </Typography>

        <Grid container>
            <Grid item xs={12} sm={4} className="v-bottom h-center" sx={{display:{sm:'flex',xs:"none"}}}>
                <Box component="img" src={backArrow} className={`${classes.backArrow}`}></Box>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Box className="h-center" sx={{ marginTop: "40px" }}>
                    <OtpInput
                        shouldAutoFocus={true}
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<Box sx={{ marginRight: "10px" }}></Box>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "10px",
                        border: "2px solid #065BCE",
                        fontSize: "30px",
                        backgroundColor: "#065BCE",
                        color: "#ffffff",
                        }}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={4} sx={{display:{sm:'block',xs:"none"}}}></Grid>
        </Grid>
        
        <Typography
          className={`${classes.signupOthers}`}
          sx={{ marginBottom: "25px" }}
        >
          <Link
            sx={{ color: "#9B9B9B!important", textDecoration: "none" }}
            href="#"
          >
            Send again
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default OTP;
