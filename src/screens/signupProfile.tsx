import { useState, useEffect } from "react";
import { Box, Container, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import backArrow from "../assets/icons/backArrow.svg";
import camera from "../assets/icons/camera.svg";
import avatar from "../assets/images/avatar.png";
// import avatar from "../assets/images/UserAvatar.svg";
import Button from "../components/button";
import DatepickerSticky from "../components/datepickerSticky";
import OnBoardingHeader from "../components/onBoardingHeader";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "../components/CircularProgress";
import MediaHelper from "../Helpers/MediaHelper";
import { useAlert } from "react-alert";

// Helpers
import GeneralHelper from "../Helpers/GeneralHelper";
import moment from "moment";

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
      backgroundSize: "cover",
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
      width: "50px",
      cursor: "pointer",
    },
    imageCircularProgress: {
      background: "#055cce00",
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});
function SignupProfile() {
  const alert = useAlert();
  const navigate = useNavigate();
  const classes = useStyles();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [DOB, setDOB] = useState("Sat, 01 Jan 2000 19:00:00 GMT");
  const [Loading, setLoading] = useState(false);
  const [progress, setprogress] = useState(0);
  const [IsDisabled, setIsDisabled] = useState(true);
  const [profileImage, setProfileImage] = useState({
    image_url: avatar,
    file_name: "",
  });

  useEffect(() => {
    if (FirstName != "" && LastName != "" && DOB != "") {
      setIsDisabled(false);
    }else{
      setIsDisabled(true);
    }
  }, [FirstName, LastName, DOB]);

  const handleShowToast = (msg) => {
    alert.error(msg);
  }

  const Validation = () => {
    if (FirstName != "" && LastName != "" && DOB != "") {
      handleNext();
    } else {
      handleShowToast("Please fill out all fields.");
      setIsDisabled(true);
    }
  };
  console.log("DOB is", DOB);
  
  const handleDOBChange = (e: string) => {
    const SelectedDate = moment(String(e),"ddd, DD MMM YYYY HH:mm:ss [GMT]").add(1,"days")
    console.log("On Change ",SelectedDate);
    
    setDOB(String(SelectedDate));
  };
  const handleNext = () => {
    setLoading(true);
    const data = JSON.stringify({
      FirstName,
      LastName,
      DOB,
      ProfileImage: profileImage.file_name ?? profileImage.image_url,
    });
    GeneralHelper.storeData("UserDetails_Names", data);
    setLoading(false);
    navigate("/gender");
  };
  const featchData = async () => {
    const result: any = await GeneralHelper.retrieveData("UserDetails_Names");
    if (result.status == 1) {
      const data = JSON.parse(result.data as string);
      setFirstName(data.FirstName);
      setLastName(data.LastName);
    }
  };
  useEffect(() => {
    featchData();
  }, []);
  useEffect(() => {
    console.log("DOB",DOB);
  }, [DOB]);

  return (
    <Box className={`${classes.SignupProfile}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader heading="Profile details" />

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
                <Box
                  className={`${classes.profileImage}`}
                  style={{ backgroundImage: `url(${profileImage.image_url})` }}
                >
                  <Box className={`${classes.imageCircularProgress}`}>
                    <CircularProgress progress={progress} />
                  </Box>
                  <input
                    accept=".jpg,.jpeg,.png,.PNG"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    onChange={async (e: any) => {
                      MediaHelper.UploadImage(e.target.files, onprogress).then(
                        (resp) => {
                          console.log("image upload resp:", resp);
                          setProfileImage({
                            ...profileImage,
                            image_url: resp[0].url,
                            file_name: resp[0].file_name,
                          });
                        }
                      );
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
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ p: 1 }}>
                    <DatepickerSticky
                      Default={DOB}
                      onChange={handleDOBChange}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ p: 1 }}>
                    {/* <Link to={{ pathname: "/gender" }}> */}
                    <Button
                     Disabled={IsDisabled}
                      onClick={() => {
                        Validation();
                      }}
                    >
                      {Loading == true ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : (
                        "Confirm"
                      )}
                    </Button>
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
