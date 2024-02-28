import { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import backArrow from "../assets/icons/backArrow.svg";
import avatar from "../assets/images/avatar.png";
import Button from "../components/button";
import maleBlack from "../assets/icons/maleBlack.svg";
import maleWhite from "../assets/icons/maleWhite.svg";
import femaleBlack from "../assets/icons/femaleBlack.svg";
import femaleWhite from "../assets/icons/femaleWhite.svg";
import OnBoardingHeader from "../components/onBoardingHeader";
import { Link, useNavigate } from "react-router-dom";

// Helpers
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";

const useStyles = makeStyles(() => {
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
  const classes = useStyles();
  const navigate = useNavigate();

  const [SelectedGender, setSelectedGender] = useState("male");

  const featchData = async () => {
    const Signup_Details: any = await GeneralHelper.retrieveData(
      "Signup_Details"
    );
    const UserDetails_Names: any = await GeneralHelper.retrieveData(
      "UserDetails_Names"
    );
    if (Signup_Details.status == 1 && UserDetails_Names.status == 1) {
      const SignupDetails = JSON.parse(Signup_Details.data as string);
      const UserDetailsNames = JSON.parse(UserDetails_Names.data as string);
      const data = {
        first_name: UserDetailsNames.FirstName,
        last_name: UserDetailsNames.LastName,
        user_name: `${UserDetailsNames.FirstName} ${UserDetailsNames.LastName}`,
        email: SignupDetails.Email,
        password: SignupDetails.Password,
        gender: SelectedGender,
        dob: UserDetailsNames.DOB,
        images: UserDetailsNames.ProfileImage,
      };
      SignUp(data);
    }
  };
  const SignUp = (data: object) => {
    APIHelper.CallApi(config.Endpoints.auth.SignUp, data, null, "").then(
      (result: any) => {
        if (result.status == "success") {
          GeneralHelper.ClearData("Signup_Details").then(() => {
            GeneralHelper.ClearData("UserDetails_Names").then(() => {
              navigate("/signin");
            });
          });
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
        }
      }
    );
  };

  return (
    <Box className={`${classes.SignupProfile}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader heading="I am a" />

        <Box className="h-center">
          <Box>
            <Button
              onClick={() => setSelectedGender("male")}
              sx={{
                backgroundColor:
                  SelectedGender == "male" ? "#22172A" : "#EFFBFC",
                color: SelectedGender == "male" ? "#ffffff" : "#323232",
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
                  src={SelectedGender == "male" ? maleWhite : maleBlack}
                ></Box>
                <Typography>Man</Typography>
              </Box>
            </Button>
            <Button
              onClick={() => setSelectedGender("female")}
              sx={{
                backgroundColor:
                  SelectedGender == "female" ? "#22172A" : "#EFFBFC",
                color: SelectedGender == "female" ? "#ffffff" : "#323232",
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
                  src={SelectedGender == "female" ? femaleWhite : femaleBlack}
                ></Box>
                <Typography>Woman</Typography>
              </Box>
            </Button>
            <Button
              onClick={() => setSelectedGender("Other")}
              sx={{
                backgroundColor:
                  SelectedGender == "Other" ? "#22172A" : "#EFFBFC",
                color: SelectedGender == "Other" ? "#ffffff" : "#323232",
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
            {/* <Link to={{ pathname: "/interests" }}> */}
            <Button
              onClick={() => {
                featchData();
              }}
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
            {/* </Link> */}
          </Box>
        </Box>
      </Container>
      <Link to={{ pathname: "/signup-profile" }}>
        <Box
          component="img"
          src={backArrow}
          className={`${classes.backArrow} backButton hover`}
        ></Box>
      </Link>
    </Box>
  );
}

export default SignupProfile;
