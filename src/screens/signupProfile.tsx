import { useState, useEffect } from "react";
import { Box, Container, TextField, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import backArrow from "../assets/icons/backArrow.svg";
import camera from "../assets/icons/camera.svg";
import avatar from "../assets/images/avatar.png";
import Button from "../components/button";
import DatepickerSticky from "../components/datepickerSticky";
import OnBoardingHeader from "../components/onBoardingHeader";
import { Link,useNavigate } from "react-router-dom";
// Helpers
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";


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
      // backgroundImage: `url(${avatar})`,
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
      cursor: "pointer"
    },
  };
});
function SignupProfile() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [ProfileImage, setProfileImage] = useState("");
  const [DOB, setDOB] = useState("10-11-2003");

  const Validation = () => {
    if (FirstName != "" && LastName != "") {
      handleNext()
    }
    else {
      GeneralHelper.ShowToast("Please fill out all fields.")
    }
  }

  const handleNext = () => {
    const data = JSON.stringify({
      FirstName: FirstName,
      LastName: LastName,
      DOB: DOB,
    })
    GeneralHelper.storeData("UserDetails_Names", data)
    navigate("/gender")

  };
  const featchData = async () => {
    const result = await GeneralHelper.retrieveData("UserDetails_Names")
    if (result.status == 1) {
      const data = JSON.parse(result.data as string)
      setFirstName(data.FirstName)
      setLastName(data.LastName)
    }
  }
  useEffect(() => {
    featchData()
}, [])

  return (
    <Box className={`${classes.SignupProfile}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader
          heading="Profile details"

        />

        <Grid container>
          <Grid
            item
            xs={12}
            sm={1}
            className="v-bottom h-center"
            sx={{ display: { sm: "flex", xs: "none" } }}
          >
            <Link to={{ pathname: "/otp" }}>
              <Box
                component="img"
                src={backArrow}
                className={`${classes.backArrow} backButton`}
              ></Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid container>
              <Grid
                item
                md={3}
                xs={12}
                className="h-center"
                sx={{ marginBottom: { md: "0px", xs: "10px" } }}
              >
                <Box className={`${classes.profileImage}`}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={(e) => {
                      console.log("Image : ", e.target.value);
                    }}
                  />
                  <label htmlFor="raised-button-file">
                    <Box
                      className={`${classes.imagePicker}`}
                      component="img"
                      src={camera}
                    ></Box>
                  </label>
                </Box>
              </Grid>
              <Grid item md={7} xs={12}>
                <Grid container>
                  <Grid item xs={6} sx={{ p: 1 }}>
                    <TextField
                      sx={{
                        width: "100%",
                        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":
                        {
                          borderRadius: "15px!important",
                          width: "100%",
                        },
                      }}
                      type="text"
                      label="First Name"
                      value={FirstName}
                      onChange={(e) => { setFirstName(e.target.value) }}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ p: 1 }}>
                    <TextField
                      sx={{
                        width: "100%",
                        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":
                        {
                          borderRadius: "15px!important",
                          width: "100%",
                        },
                      }}
                      type="text"
                      label="Last Name"
                      value={LastName}
                      onChange={(e) => { setLastName(e.target.value) }}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ p: 1 }}>
                    <DatepickerSticky>
                      <Button
                        sx={{ backgroundColor: "#EFFBFC", color: "#323232" }}
                      >
                        Choose birthday date
                      </Button>
                    </DatepickerSticky>
                  </Grid>
                  <Grid item xs={6} sx={{ p: 1 }}>
                    {/* <Link to={{ pathname: "/gender" }}> */}
                      <Button onClick={()=>{Validation()}}>Confirm</Button>
                    {/* </Link> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={2} xs={12}></Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={1}
            sx={{ display: { sm: "block", xs: "none" } }}
          ></Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SignupProfile;
