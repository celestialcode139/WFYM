import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import Button from "../../components/buttonSm";
import avatar from "../../assets/images/avatar.png";
import Generalinfo from "../../components/generalinfo";
import { useNavigate } from "react-router-dom";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import { ToastContainer } from "react-toastify";
import Alert from "../../Helpers/Alert";
import Skeleton from '@mui/material/Skeleton';


const useStyles = makeStyles(() => {
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
      borderRadius: "10px",
      border: "1px solid #E8E6EA",
      padding: "10px 16px",
      fontSize: "12px!important",
      width: "100px",
      cursor: "pointer",
    },
    activeBadge: {
      backgroundColor: "black",
      color: "white",
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
    pageContainer: {
      maxWidth: "900px",
      margin: "0 auto",
    },
  };
});
function ProfileScreen5() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [Token, setToken] = useState("");
  const [body, setbody] = useState<any>({});
  const [Loading, setLoading] = useState(false);

  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(String(result.data));
    }
  };
  const GetProfile = (Token: string) => {
    APIHelper.CallApi(config.Endpoints.user.GetMyProfile, {}, null, Token).then(
      (result: any) => {
        setLoading(false)
        if (result.status == "success") {
          // console.log("Response:", result?.data?.user_details?.religion);

          setbody({
            occupation: result?.data?.user_details?.profession,
            religion: result?.data?.user_details?.religion,
            political_Party: result?.data?.user_details?.political_party,
            childrens: result?.data?.user_details?.children_before,
            smookingHabit: result?.data?.user_details?.smoking_habits,
            drinkingHabit: result?.data?.user_details?.drink_habits,
            dealBracker: result?.data?.user_details?.deal_breaker,
            height: result?.data?.user_details?.height,
            weight: result?.data?.user_details?.weight,
            highestDegree: result?.data?.user_details?.highest_degree,
          });
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
        }
      }
    );
  };

  // Updating Profile Details

  const UpdateBio = () => {
    const data = {
      profession: body.occupation,
      religion: body.religion,
      political_party: body.political_Party,
      children_before: body.childrens == "" || body.childrens == undefined ? 0 : body.childrens,
      smoking_habits: body.smookingHabit != true ? false : true,
      drink_habits: body.drinkingHabit != true ? false : true,
      deal_breaker: body.dealBracker,
      height: body.height,
      weight: body.weight,
      highest_degree: body.highestDegree,
    };
    console.log("data", data);

    APIHelper.CallApi(config.Endpoints.user.UpdateBio, data, null, Token).then(
      (result) => {
        setLoading(false)
        if (result.status == "success") {
          Alert.notify("Profile Updated Successfully", 4000);
          setTimeout(() => {
            navigate("/dashboard")
          }, 6000);
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
        }
      }
    );
  };
  const handleNext = () => {
    setLoading(true)
    UpdateBio();
  };
  // Other functions


  useEffect(() => {
    setLoading(true)
    if (Token != "") {
      GetProfile(Token);
    } else {
      featchToken();
    }
  }, [Token]);

  useEffect(() => {
    console.log("Body:", Object.keys(body).length);
  }, [body]);

  return (
    <>
      <Box>
        <Box className={`${classes.pageContainer}`}>
          {!Loading ? Object.keys(body).length > 0 ? (
            <Generalinfo
              body={body}
              key={body}
              Token={Token}
              onChange={(e: any) => {
                console.log("qwerqwer", e);
                setbody(e);
              }}
            />
          ) : null :
            <Grid container spacing={2}>
              <Grid item md={4}><Skeleton animation="wave" variant="rounded" width={"100%"} height={50} /></Grid>
              <Grid item md={4}><Skeleton animation="wave" variant="rounded" width={"100%"} height={50} /></Grid>
              <Grid item md={4}><Skeleton animation="wave" variant="rounded" width={"100%"} height={50} /></Grid>
              <Grid item md={4}><Skeleton animation="wave" variant="rounded" width={"100%"} height={50} /></Grid>
              <Grid item md={4}><Skeleton animation="wave" variant="rounded" width={"100%"} height={50} /></Grid>
              <Grid item md={4}><Skeleton animation="wave" variant="rounded" width={"100%"} height={50} /></Grid>
              <Grid item md={4}><Skeleton animation="wave" variant="rounded" width={"100%"} height={50} /></Grid>
              <Grid item md={4}><Skeleton animation="wave" variant="rounded" width={"100%"} height={50} /></Grid>
              <Grid item md={4}><Skeleton animation="wave" variant="rounded" width={"100%"} height={50} /></Grid>
              <Grid item md={4}><Skeleton animation="wave" variant="rounded" width={"100%"} height={50} /></Grid>
            </Grid>
          }
        </Box>
      </Box>
      <Grid container className="h-center" sx={{ marginTop: "40px" }}>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button onClick={() => handleNext()}>Save Changes</Button>
        </Grid>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button onClick={() => {
            navigate(-1);
          }} className={`${classes.cancelBtn}`}>Cancel</Button>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
}

export default ProfileScreen5;
