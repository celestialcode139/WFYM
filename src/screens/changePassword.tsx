import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/buttonSm";
import avatar from "../assets/images/avatar.png";
import ChangePasswordComp from "../components/changePassword";
import { useState } from "react";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import GeneralHelper from "../Helpers/GeneralHelper";
import Alert from "../Helpers/Alert";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { ToastContainer } from "react-toastify";

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
      maxWidth: "400px",
      margin: "0 auto",
    },
  };
});
function ChangePassword() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [Body, setBody] = useState({
    password: "",
    repassword: "",
  });
  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      Validation(String(result.data));
    }
  };

  const Validation = (Token: string) => {
    if (Body.password.length < 4) {
      Alert.notify("Too Short!", 3000);
    } else if (Body.password != Body.repassword) {
      Alert.notify("Confirm Password does not match", 3000);
    } else {
      UpdatePassword(Token);
    }
  };

  const UpdatePassword = (Token: string) => {
    setLoading(true);

    APIHelper.CallApi(
      config.Endpoints.user.UpdateUserProfile,
      { password: Body.password },
      null,
      Token
    ).then((result: any) => {
      if (result.status == "success") {
        // alert("Success.")
        Alert.notify("Password Updated Successfully!", 3000);
        setLoading(false);
        navigate('/dashboard')
      } else {
        Alert.notify("Something went wrong", 3000);

        setLoading(false);
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };

  const GetDataFromChild = debounce((Data: object) => {
    console.log("Setting Main Body ", Data);

    setBody({
      password: Data.password,
      repassword: Data.repassword,
    });
  }, 800);

  const classes = useStyles();

  return (
    <>
      <Box>
        <Box className={`${classes.pageContainer}`}>
          <ChangePasswordComp OnChange={GetDataFromChild} />
        </Box>
      </Box>
      <Grid container className="h-center" sx={{ marginTop: "40px" }}>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button onClick={featchToken} Loading={Loading}>
            Save Changes
          </Button>
        </Grid>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button className={`${classes.cancelBtn}`}>Cancel</Button>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
}

export default ChangePassword;
