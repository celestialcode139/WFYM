import React from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

// MUI
import {
  Box,
  Container,
  TextField,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
// CSS
import "../App.css";
// Components
import Button from "../components/button";
import OnBoardingHeader from "../components/onBoardingHeader";
// Images
import signupForm from "../assets/images/signupForm.svg";
// Helpers
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import { useAlert } from 'react-alert'


const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    signupFrom: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      backgroundImage: `url(${signupForm})`,
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
    signupOthers: {
      fontSize: "14px!important",
      textAlign: "center",
      color: "#22172aad",
      marginTop: "35px!important",
    },
  };
});
function Signup() {
  const classes = useStyles();
  const navigate = useNavigate();
  const alert = useAlert();
  const [Loading, setLoading] = React.useState(false);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [CPassword, setCPassword] = React.useState("");

  const Validation = () => {
    if (Email != "" && Password != "" && CPassword != "") {
      if (Password == CPassword) {
        StoreData()
      } else {
        GeneralHelper.ShowToast("Confirm Password does not match.")
      }
    }
    else {
      GeneralHelper.ShowToast("Please fill out all fields.")
    }
  }
  const StoreData = () => {
    const data = JSON.stringify({
      Email: Email,
      Password: Password,
      CPassword: CPassword
    })
    GeneralHelper.storeData("Signup_Details", data).then((result: any) => {
      if (result.status == 1) {
        CallApi()
      } else {
        console.log(result);

      }

    })
  }

  const RetrieveData = () => {
    GeneralHelper.retrieveData("Signup_Details").then((result: any) => {
      if (result.status == 1) {
        if (result.status == 1) {
          const data = JSON.parse(result.data as string)
          setEmail(data.Email)
          setPassword(data.Password)
          setCPassword(data.CPassword)
        }
      } else {
        console.log(result);
      }
    })
  }

  const CallApi = async () => {
    setLoading(true)
    APIHelper.CallApi(config.Endpoints.auth.OTP.SendOtp, { email: Email },null,'').then((result: any) => {
      if (result.status == "success") {
        console.log("Response is ", result);
        setLoading(false)
        if (result.data.msg == "user exist") {
          alert.error(`User already exist.`)
          // GeneralHelper.ShowToast(`User already exist. Try to loginin with ${Email}`,"success")
        } else {
          navigate("/otp")
        }
      } else {
        setLoading(false)
        alert.error(String(result.message))
      }

    })

  }

  React.useEffect(() => {
    RetrieveData()
  }, [])


  return (
    <Box className={`${classes.signupFrom}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader heading="Sign up" />
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
            <Grid item xs={12} className="h-center" sx={{ marginTop: "25px" }}>
              <TextField
                sx={{
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "15px!important",
                  },
                }}
                type="password"
                label="Retry Password"
                value={CPassword}
                onChange={(e) => { setCPassword(e.target.value) }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          {/* <Link to={{ pathname: "/otp" }}> */}
          <Button sx={{ maxWidth: "280px", margin: "0 auto!important" }} onClick={() => { Validation() }} >
            {Loading ?
              <CircularProgress color="inherit" size={20} />
              :
              "Continue"
            }
          </Button>
          {/* </Link> */}
        </Box>
      </Container>
    </Box>
  );
}

export default Signup;
