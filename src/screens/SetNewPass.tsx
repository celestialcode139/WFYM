import React from "react";
import { Box, Container, TextField, Grid ,CircularProgress} from "@mui/material";
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
function SetNewPass() {
  const navigate = useNavigate();
  const classes = useStyles();
  //const alert = useAlert();
  const [Password, setPassword] = React.useState("");
  const [CPassword, setCPassword] = React.useState("");
  const [IsDisabled, setIsDisabled] = React.useState(true);
  const [Loading, setLoading] = React.useState(false);

  interface AsyncResponseInterface {
    data: string;
    status: number
  }

  React.useEffect(() => {
    if (Password != "" && CPassword != "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [Password, CPassword]);

  // const handleShowToast = (msg) => {
  //   alert.error(msg);
  // };

  const Validation = () => {
    if (Password != "") {
      if (Password == CPassword) {
        retrieveData()
      } else {
        Alert.notify("Confirm Password does not match.", 4000);
        setIsDisabled(true);
      }
    } else {
      Alert.notify("Password Can't be empty.", 4000);
    }
  }
  const retrieveData = async () => {
    setLoading(true);
    const Email: any = await GeneralHelper.retrieveData("Email")
    const OTP_ID: any = await GeneralHelper.retrieveData("OTP_ID")
    if (Email.status == 1 && OTP_ID.status == 1) {
      handleUpdatePass(Email.data, OTP_ID.data, Password)
    }else{
      setLoading(false);
      Alert.notify("Something went wrong", 4000);
    }
  }
  const handleUpdatePass = (Email: string, OTP_Id: string, Password: string) => {
    APIHelper.CallApi(config.Endpoints.auth.setPass, { email: Email, otp_id: OTP_Id, password: Password }, null, '').then((result) => {
      if (result?.status == "success") {
        GeneralHelper.ClearData("Email").then(() => {
          GeneralHelper.ClearData("OTP_ID").then(() => {
            GeneralHelper.ShowToast("Password Updated Successfully.")
            setLoading(false);
            navigate("/signin")
          })
        })
      } else {
        Alert.notify("Something went wrong.", 4000);
        setLoading(false);
      }
    })
  };
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
                label="Confirm Password"
                value={CPassword}
                onChange={(e) => { setCPassword(e.target.value) }}
              />
            </Grid>

          </Grid>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Button Disabled={IsDisabled} Loading={Loading} sx={{ maxWidth: "280px", margin: "0 auto!important" }} onClick={() => { Validation() }}>
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

export default SetNewPass;
