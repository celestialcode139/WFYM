import React from "react";
import { Box, Container, TextField, Grid,CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/button";
import signinForm from "../assets/images/signupForm.svg";
import OnBoardingHeader from "../components/onBoardingHeader";
import { useNavigate } from "react-router-dom";
// Helpers
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
//import { useAlert } from "react-alert";
import { ToastContainer } from "react-toastify";
import Alert from "../Helpers/Alert";



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
  //const alert = useAlert();
  const navigate = useNavigate();
  const classes = useStyles();
  const [Email, setEmail] = React.useState("");
  const [IsDisabled, setIsDisabled] = React.useState(true);
  const [Loading, setLoading] = React.useState(false);


  React.useEffect(() => {
    if (Email != "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [Email]);

  const Validation = () => {
    if (Email != "") {
      CallApi()
    } else {
      Alert.notify("Email can't be empty.", 4000);
      setIsDisabled(true);
    }
  }
  const CallApi = async () => {
    setLoading(true);
    APIHelper.CallApi(config.Endpoints.auth.forgetPass, { email: Email },null,'').then((result:any) => {
      if (result?.status == "success") {
        StoreData()
        setLoading(false);
      } else {
        setIsDisabled(true);
        Alert.notify(String(result.message), 4000);
        setLoading(false);
      }
    })
  }
  const StoreData = () => {
    setLoading(true);
    GeneralHelper.storeData("Email", Email).then((result: any) => {
      if (result.status == 1) {
        setLoading(false);
        navigate("/otpresetpassword")
      } else {
        console.log(result);
        setLoading(false);
        Alert.notify("Something went wrong.", 4000);

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
                onChange={(e) => { setEmail(e.target.value.toLowerCase().replace(/\s+/g, '')) }}
              />
            </Grid>

          </Grid>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Button  Disabled={IsDisabled} Loading={Loading} sx={{ maxWidth: "280px", margin: "0 auto!important" }} onClick={() => { Validation() }}>
          {/* {Loading == true ? (
              <CircularProgress color="inherit" size={20} />
            ) : ( */}
              Continue
            {/* )} */}
          </Button>
        </Box>
      </Container>
      <ToastContainer/>
    </Box>
  );
}

export default ForgetPassForm;
