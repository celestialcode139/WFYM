import React from "react";
import { Box, Typography, Container, TextField, Grid } from "@mui/material";
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
function ForgetPassForm() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [Email, setEmail] = React.useState("");

  const Validation = () => {
    if (Email != "") {
      CallApi()
    } else {
      GeneralHelper.ShowToast("Email can't be empty.")
    }
  }
  const CallApi = async () => {
    APIHelper.CallApi(config.Endpoints.auth.forgetPass, { email: Email }).then((result:any) => {
      if (result?.status == "success") {
        StoreData()
      } else {
        GeneralHelper.ShowToast(String(result.message))
      }
    })
  }
  const StoreData = () => {
    GeneralHelper.storeData("Email", Email).then((result: any) => {
      if (result.status == 1) {
        navigate("/otpresetpassword")
      } else {
        console.log(result);
        alert("Something went wrong")

      }

    })
  }
  const retrieveData = async () => {
    const Email = await GeneralHelper.retrieveData("Email") as any
    if (Email.status == 1) {
      setEmail(Email.data)
    }
  }
  React.useEffect(() => {
    retrieveData()
  }, [])
  
  return (
    <Box className={`${classes.signinFrom}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader heading="Forget Password" />
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

          </Grid>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Button sx={{ maxWidth: "280px", margin: "0 auto!important" }} onClick={() => { Validation() }}>
            Continue
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ForgetPassForm;
