import { Box, Grid, TextField, colors } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {useNavigate} from "react-router-dom";

import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import Button from "../../components/buttonSm";
import DatepickerSticky from "../../components/datepickerSticky";
import avatar from "../../assets/images/avatar.png";
import camera from "../../assets/icons/camera.svg";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import { useEffect, useState } from "react";
import GeneralHelper from "../../Helpers/GeneralHelper";
import moment from "moment";

// import $ from "jquery";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    imagePicker: {
      backgroundColor: "#075bce",
      padding: "8px",
      borderRadius: "50%",
      border: "2px solid white",
      position: "absolute",
      bottom: "-11px",
      right: "-11px",
      width: "20px",
      cursor: "pointer",
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
    cancelBtn: {
      backgroundColor: "#ffffff",
      color: "#000000",
      border: "1px solid black",
    },
    delBtn: {
      backgroundColor: "#FF1414",
    },
    marginTop100: {
      marginTop: "80px",
    },
  };
});
function ProfileP1() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [Token, setToken] = useState("");
  const [ProfileImage, setProfileImage] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");
  const [Gender, setGender] = useState("");
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [Address, setAddress] = useState("");
  const [Description, setDescription] = useState("");
  // Getting Profile Details
  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(String(result.data));
    }
  };
  const GetProfile = (Token: string) => {
    APIHelper.CallApi(config.Endpoints.user.GetMyProfile, {}, null, Token).then(
      (result: any) => {
        if (result.status == "success") {
          setFirstName(result?.data?.first_name ? result.data.first_name : "");
          setLastName(result?.data?.last_name ? result.data.last_name : "");
          setEmail(result?.data?.email ? result.data.email : "");
          setGender(result?.data?.gender ? result.data.gender : "");
          setCountry(
            result?.data?.user_details?.country
              ? String(result?.data?.user_details?.country)
              : ""
          );
          setAddress(
            result?.data?.user_details?.location
              ? String(result?.data?.user_details?.location)
              : ""
          );
          setDescription(result?.data?.user_details?.description ? result.data.user_details.description : "");
          setCity(result?.data?.user_details?.city ? result.data.user_details.city : "");
          if (result.data.dob) {
            const DateOfBirth = moment.utc(result?.data?.dob);
            setDOB(DateOfBirth.format("DD MMMM YYYY"));
          }
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
        }
      }
    );
  };
  // Updating Profile Details
  const UpdateProfile = () => {
    const data = {
      first_name: FirstName,
      last_name: LastName,
      user_name: `${FirstName} ${LastName}`,
      gender: Gender,
      dob: DOB,
    };
    APIHelper.CallApi(
      config.Endpoints.user.UpdateUserProfile,
      data,
      null,
      Token
    ).then((result) => {
      if (result.status == "success") {
        UpdateBio();
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  const UpdateBio = () => {
    const data = {
      country: Country,
      location: Address,
      description: Description,
      city: City
    };
    APIHelper.CallApi(config.Endpoints.user.UpdateBio, data, null, Token).then(
      (result) => {
        if (result.status == "success") {
          navigate("/profile/page-2");
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
        }
      }
    );
  };
  const handleNext = () => {
    UpdateProfile();
  };
  // Other functions
  useEffect(() => {
    if (Token != "") {
      GetProfile(Token);
    } else {
      featchToken();
    }
  }, [Token]);

  return (
    <Grid container>
      <Grid
        md={2}
        xs={12}
        item
        className="h-center"
        sx={{ marginBottom: { md: "0px", xs: "10px" } }}
      >
        <Box className={`${classes.profileImage}`}>
          <input
            accept="image/*"
            style={{ display: "none" }}
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
      <Grid item md={5} xs={12}>
        <Grid container>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="First Name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="Last Name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <DatepickerSticky
              onChange={(e: any) =>
                setDOB(moment(e["$d"]).format("DD MM YYYY"))
              }
            >
              <Button
                onClick={() => {}}
                sx={{
                  backgroundColor: "#EFFBFC",
                  color: "#323232",
                }}
              >
                Choose birthday date
              </Button>
            </DatepickerSticky>
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="Country"
              value={Country}
              onChange={(e: any) => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="City"
              value={City}
              onChange={(e: any) => setCity(e.target.value)}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{ p: 1, display: { md: "block", xs: "none" } }}
          >
            <Button
              onClick={() => handleNext()}
              className={`${classes.marginTop100}`}
            >
              Save Changes
            </Button>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{ p: 1, display: { md: "block", xs: "none" } }}
          >
            <Button className={`${classes.cancelBtn} ${classes.marginTop100}`}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3} xs={12}>
        <Grid container>
          <Grid item xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="Description"
              multiline
              rows={4}
              value={Description}
              onChange={(e: any) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="Address"
              value={Address}
              onChange={(e: any) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ p: 1, display: { md: "block", xs: "none" } }}
          ></Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{ p: 1, display: { md: "none", xs: "block" } }}
          >
            <Button onClick={() => handleNext()}>Save Changes</Button>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{ p: 1, display: { md: "none", xs: "block" } }}
          >
            <Button className={`${classes.cancelBtn}`}>Cancel</Button>
          </Grid>
          <Grid item md={8} xs={12} sx={{ p: 1 }}>
            <Button
              className={`${classes.delBtn}`}
              sx={{ marginTop: { md: "80px" } }}
            >
              Delete Account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileP1;
