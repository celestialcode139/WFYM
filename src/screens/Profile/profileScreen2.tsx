import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import Button from "../../components/buttonSm";
import GenderComp from "../../components/gender";
import avatar from "../../assets/images/avatar.png";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";

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
    h1: {
      fontSize: "20px!important",
      fontFamily: "Mori-bold!important",
      // marginTop: "35px!important",
      lineHeight: "1.3!important",
      marginBottom: "20px!important",
    },
    badge: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      border: "1px solid #E8E6EA",
      padding: "10px 16px",
      fontSize: "12px!important",
      width: "100px",
      cursor: "pointer",
      color: "#000000",
    },
    activeBadge: {
      backgroundColor: "black",
      color: "#ffffff!important",
      boxShadow: "6px 8px 10px 0px rgba(103, 103, 103, 0.19)",
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
function ProfileScreen2() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [SelectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [Gender, setGender] = useState("male");
  const [Token, setToken] = useState("");
  const [AllHobbies, setAllHobbies] = useState([]);

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
          console.log(result.data);
          setGender(result?.data?.gender ? result.data.gender : "");
          setSelectedHobbies(
            result?.data?.user_details?.hobbies
              ? result.data.user_details.hobbies
              : ""
          );
          console.log("Selected Hobbies ", result?.data?.user_details?.hobbies);
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
        }
      }
    );
  };
  const GetHobbies = (Token: string) => {
    APIHelper.CallApi(
      config.Endpoints.Init.GetMetaData,
      {},
      "hobbies",
      Token
    ).then((result: any) => {
      if (result.status == "success") {
        handleSort(result.data)
        console.log("Hobbies ", result.data);
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  // Updating Profile Details
  const UpdateProfile = () => {
    const data = {
      gender: Gender,
    };
    APIHelper.CallApi(
      config.Endpoints.user.UpdateUserProfile,
      data,
      null,
      Token
    )
      .then((result) => {
        if (result.status == "success") {
          UpdateBio();
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const UpdateBio = () => {
    const data = {
      hobbies: SelectedHobbies,
    };
    APIHelper.CallApi(config.Endpoints.user.UpdateBio, data, null, Token).then(
      (result) => {
        if (result.status == "success") {
          navigate("/profile/page-3");
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
  const handleSort = (ArrayToSort: any) => {
    const sortedArray = [...ArrayToSort].sort((a, b) =>
      a.value.localeCompare(b.value)
    );
    console.log("sortedArray ", sortedArray);
    setAllHobbies(sortedArray);

  };
  const CheckIfSelected = (Id: string) => {
    if (SelectedHobbies.includes(Id)) {
      return true;
    } else {
      return false;
    }
  };
  const HandleSelectHobbie = (Id: string) => {
    const data = SelectedHobbies.filter((val) => val == Id);
    if (data.length <= 0) {
      setSelectedHobbies([...SelectedHobbies, Id]);
    } else {
      const updateData = SelectedHobbies.filter((val) => val !== Id);
      setSelectedHobbies(updateData);
    }
  };
  useEffect(() => {
    if (Token != "") {
      GetHobbies(Token);
      GetProfile(Token);
    } else {
      featchToken();
    }
  }, [Token]);
  useEffect(() => {
    console.log("Selected Hobbies ", SelectedHobbies);
  }, [SelectedHobbies]);
  return (
    <>
      <Grid container spacing={2} className="h-center">
        <Grid item sm={3} xs={12}>
          <Typography className={`${classes.h1}`} sx={{ color: "#000000" }}>
            I am
          </Typography>
          <GenderComp gender={Gender} onChange={(e: any) => setGender(e)} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Typography className={`${classes.h1}`} sx={{ color: "#000000" }}>
            Your interests
          </Typography>
          <Grid container spacing={2}>
            {AllHobbies.map((val, i) => (
              <Grid item key={i}>
                <Typography
                  onClick={() => {
                    HandleSelectHobbie(val.value);
                  }}
                  className={`${classes.badge} ${
                    CheckIfSelected(val.value) == true
                      ? classes.activeBadge
                      : null
                  }`}
                >
                  {/* <Box
                    component="img"
                    src={camera}
                    sx={{ width: "18px", paddingRight: "5px" }}
                  ></Box>{" "} */}
                  {val.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container className="h-center" sx={{ marginTop: "40px" }}>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button onClick={() => handleNext()}>Save Changes</Button>
        </Grid>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button className={`${classes.cancelBtn}`}>Cancel</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileScreen2;
