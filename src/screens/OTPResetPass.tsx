import { useState, useEffect } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import OtpInput from "react-otp-input";
import backArrow from "../assets/icons/backArrow.svg";
import OnBoardingHeader from "../components/onBoardingHeader";
import { Link, useNavigate } from "react-router-dom";
// Helpers
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import { useAlert } from "react-alert";


const useStyles = makeStyles(() => {
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
    backArrow: {
      width: "55px",
      height: "55px",
    },
  };
});
function OTPResetPass() {
  const navigate = useNavigate();
  const alert = useAlert();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [Resend, setResend] = useState(false);
  const classes = useStyles();
  
  const handleShowToast = (msg) => {
    alert.error(msg);
  }
  const handleOTPVerification = (OTP: string) => {
    retrieveData(OTP, "Varify");
  };
  const StoreData = (id: string) => {
    GeneralHelper.storeData("OTP_ID", id).then((result: any) => {
      if (result.status == 1) {
        navigate("/SetNewPassword");
      } else {
        console.log(result);
        // alert("Something went wrong")
      }
    });
  };

  const retrieveData = async (OTP: string, For: string) => {
    const result = (await GeneralHelper.retrieveData("Email")) as any;
    if (result.status == 1) {
      console.log(result);

      const data = result.data;
      if (For == "Varify") {
        CallApi(String(data), OTP);
      } else {
        ResenOTP(String(data));
      }
    }
  };
  const CallApi = async (Email: string, OTP: string) => {
    if (Resend == false) {
      APIHelper.CallApi(
        config.Endpoints.auth.OTP.VarifyOtp,
        { email: Email, otp: OTP },
        null,
        ""
      ).then((result: any) => {
        console.log(result);
        if (result?.data?.varify_otp != null) {
          StoreData(String(result.data?.varify_otp?._id));
        } else {
          handleShowToast("Please enter a valid OTP.")
        }
      });
    } else {
      handleShowToast("OTP has expired.")
    }
  };

  const ResenOTP = async (Email: string) => {
    APIHelper.CallApi(
      config.Endpoints.auth.OTP.SendOtp,
      { email: Email },
      null,
      ""
    ).then((result) => {
      if (result?.status == "success") {
        handleResend();
      } else {
        handleShowToast(String(result.message));
      }
      console.log("Result : ", result);
    });
  };
  const handleResend = () => {
    setSeconds(60);
    setResend(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        setResend(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect((): any => {
    if (otp.length >= 4) {
      handleOTPVerification(otp);
    }
  }, [otp]);

  return (
    <Box className={`${classes.OTP}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader />
        <Typography
          sx={{ color: "#000000" }}
          className={`${classes.h1}`}
        >{`00:${seconds < 10 ? `0` + seconds : seconds}`}</Typography>
        <Typography className={`${classes.otpMsg}`}>
          Type the verification code we’ve sent you
        </Typography>

        <Grid container>
          <Grid
            item
            xs={12}
            sm={4}
            className="v-bottom h-center"
            sx={{ display: { sm: "flex", xs: "none" } }}
          >
            <Link to={{ pathname: "/forgetpass" }}>
              <Box
                component="img"
                src={backArrow}
                className={`${classes.backArrow}`}
              ></Box>
            </Link>
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
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: { sm: "block", xs: "none" } }}
          ></Grid>
        </Grid>
        {Resend == true && (
          <Typography
            className={`${classes.signupOthers}`}
            sx={{ marginBottom: "25px" }}
          >
            <Box
              sx={{
                color: "#9B9B9B!important",
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                retrieveData("0000", "Resend");
              }}
            >
              Send again
            </Box>
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default OTPResetPass;
