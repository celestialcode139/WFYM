import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Button from "../../components/buttonSm";
import AgeRace from "../../components/race";
import avatar from "../../assets/images/avatar.png";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
// import $ from "jquery";

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
      maxWidth: "500px",
      width: "100%"
    },
  };
});
function ProfileScreen3() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [races, setraces] = useState<Array<object>>([]);
  const [SelectedRace, setSelectedRace] = useState("");
  const [Token, setToken] = useState("");
  const [Loading, setLoading] = useState(false);
  interface SortingObjectInterface {
    value: number
  }




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
          // console.log(result.data);
          setSelectedRace(
            result?.data?.user_details?.race
              ? result.data.user_details.race
              : ""
          );
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
        }
      }
    );
  };
  const GetRace = () => {
    APIHelper.CallApi(
      config.Endpoints.Init.GetMetaData,
      {},
      "race",
      Token
    ).then((result: any) => {
      setLoading(false);
      if (result.status == "success") {
        // console.log(result.data);
        handleSort(result.data)

      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  // Updating Profile Details
  const UpdateBio = () => {
    const data = {
      race: SelectedRace,
    };
    APIHelper.CallApi(config.Endpoints.user.UpdateBio, data, null, Token).then(
      (result) => {
        setLoading(false);
        if (result.status == "success") {
          navigate("/profile/page-4");
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
        }
      }
    );
  };
  const handleNext = () => {
    setLoading(true);
    UpdateBio();
  };
  // Other functions
  const handleSort = (ArrayToSort: Array<{value:string}>) => {
    const sortedArray = [...ArrayToSort].sort((a,b) => a.value.localeCompare(b.value));
    console.log("sortedArray ", sortedArray);
    setraces(sortedArray);

  };

  useEffect(() => {
    setLoading(true);
    if (Token != "") {
      GetProfile(Token);
      GetRace();
    } else {
      featchToken();
    }
  }, [Token]);
  useEffect(() => {
    console.log("Selected Race ", SelectedRace);
  }, [SelectedRace]);



  return (
    <>
      <Box className={`h-center`}>
        <Box className={`${classes.pageContainer}`}>
          {
            !Loading ?
              <AgeRace
                data={races}
                key={races}
                race={SelectedRace}
                onChange={(data: string) => setSelectedRace(data)}
              /> :
              <Grid container spacing={2}>
                <Grid item md={3}><Skeleton animation="wave" variant="rounded" width={"100%"} height={30} /></Grid>
                <Grid item md={3}><Skeleton animation="wave" variant="rounded" width={"100%"} height={30} /></Grid>
                <Grid item md={3}><Skeleton animation="wave" variant="rounded" width={"100%"} height={30} /></Grid>
                <Grid item md={3}><Skeleton animation="wave" variant="rounded" width={"100%"} height={30} /></Grid>
                <Grid item md={3}><Skeleton animation="wave" variant="rounded" width={"100%"} height={30} /></Grid>
                <Grid item md={3}><Skeleton animation="wave" variant="rounded" width={"100%"} height={30} /></Grid>
                <Grid item md={3}><Skeleton animation="wave" variant="rounded" width={"100%"} height={30} /></Grid>
                <Grid item md={3}><Skeleton animation="wave" variant="rounded" width={"100%"} height={30} /></Grid>
              </Grid>
          }

        </Box>
      </Box>
      <Grid container className="h-center" sx={{ marginTop: "40px" }}>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button Loading={Loading} onClick={() => handleNext()}>Next</Button>
        </Grid>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button onClick={() => {
            navigate(-1);
          }} className={`${classes.cancelBtn}`}>Cancel</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileScreen3;
