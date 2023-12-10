import React from "react";
import { Box, Typography, Container, TextField, Grid, CircularProgress } from "@mui/material";
import Logo from "../assets/logo/logo-w.svg";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/button";
import signinForm from "../assets/images/signupForm.svg";
import OnBoardingHeader from "../components/onBoardingHeader";
import { Link, useNavigate } from "react-router-dom";
// Helpers
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
// Alert
import { useAlert } from 'react-alert'



const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    signinFrom: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      backgroundImage: `url(${signinForm})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "bottom left",
      [theme.breakpoints.down("sm")]: {
        backgroundImage: "unset!important",
      },
    },
    forgetPass: {
      color: "#000000",
      textDecoration: "underline",
      fontSize: 16,
      fontWeight: "500",
      margin: "0 auto!important",
      textAlign: "center",
      paddingTop: 20,
      cursor: "pointer",
      width: "fit-content"
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
      fontSize: "30px!important",
      fontFamily: "Mori-bold!important",
      textAlign: "center",
      marginTop: "35px!important",
    },
    p1: {
      fontSize: "17px!important",
      textAlign: "center",
      color: "#22172aad",
      fontFamily: "Mori-normal!important",
      marginTop: "8px!important",
    },
    signinOthers: {
      fontSize: "14px!important",
      textAlign: "center",
      color: "#22172aad",
      marginTop: "35px!important",
    },
  };
});
function Signin() {
  const navigate = useNavigate();
  const classes = useStyles();
  const alert = useAlert();


  const [Loading, setLoading] = React.useState(false);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");

  const Validation = () => {
    if (Email != "" && Password != "") {
      SignIn()
    } else {
      alert.error("Please fill out all fields.")
    }
  }
  const SignIn = () => {
    setLoading(true)
    APIHelper.CallApi(config.Endpoints.auth.SignIn, { email: Email, password: Password }).then((result: any) => {
      if (result.status == "success") {
        console.log("Success", result.data.token);
        GeneralHelper.storeData("Token", result.data.token)
        GeneralHelper.storeData("UserId", result.data.user_id)
        setLoading(false)
        navigate("/dashboard")
      } else {
        setLoading(false)
        alert.error(String(result.message))
        console.log(result.message);
      }

    })
  }
  return (
    <Box className={`${classes.signinFrom}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader heading="Sign in" />
        <Box
          component="form"
          className={`h-center`}
          sx={{
            "& .MuiTextField-root": { maxWidth: "300px", width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container>
            <Grid item xs={12} className="h-center">
              <TextField
                sx={{
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "15px!important",
                  },
                }}
                label="Email"
                value={Email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </Grid>
            <Grid item xs={12} className="h-center" sx={{ marginTop: "25px" }}>
              <TextField
                sx={{
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "15px!important",
                  },
                }}
                type="password"
                label="Password"
                value={Password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Button sx={{ maxWidth: "280px", margin: "0 auto!important" }} onClick={() => { Validation() }}>
            {Loading == true ?
              <CircularProgress color="inherit" size={20} />
              :
              "Continue"
            }
          </Button>
          <Typography className={`${classes.forgetPass}`} onClick={() => { navigate("/forgetpass") }}>Forgot password</Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Signin;
