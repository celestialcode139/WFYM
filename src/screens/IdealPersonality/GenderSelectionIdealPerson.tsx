import { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import maleBlack from "../../assets/icons/maleBlack.svg";
import maleWhite from "../../assets/icons/maleWhite.svg";
import femaleBlack from "../../assets/icons/femaleBlack.svg";
import femaleWhite from "../../assets/icons/femaleWhite.svg";
import HeaderApp from "../../components/header/AppHeader";
import Button from "../../components/buttonSm";
import AgeRace from "../../components/race";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import { useNavigate } from "react-router-dom";
// import $ from "jquery";

const useStyles = makeStyles(() => {
  return {
    appheader: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      backgroundImage: `url(${AdminSignature})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
    },
    badge: {
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
      border: "1px solid #E8E6EA",
      padding: "10px 16px",
      fontSize: "12px!important",
      cursor: "pointer",
    },
    activeBadge: {
      backgroundColor: "black",
      color: "white",
      boxShadow: "6px 8px 10px 0px rgba(103, 103, 103, 0.19)",
    },
    pageContainer: {
      maxWidth: "500px",
    },
  };
});
function Race() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [Race, setRace] = useState<string>("");
  const [Token, setToken] = useState("");
  const [SelectedGender, setSelectedGender] = useState("male");

  const [races, setraces] = useState([]);
// Getting Profile
  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(String(result.data));
    }
  };
  const GetProfile = (Token: string) => {
    APIHelper.CallApi(
      config.Endpoints.user.GetIdealPersonality,
      {},
      null,
      Token
    ).then((result: any) => {
      if (result.status == "success") {
        setSelectedGender(result.data.looking_for)
      } else {
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  // Updating Profile
  const UpdateBio = () => {
    const data = {
      looking_for: SelectedGender,
    };
    console.log("Sending Data ", data);

    APIHelper.CallApi(
      config.Endpoints.user.UpdateIdealPersonality,
      data,
      null,
      Token
    ).then((result) => {
      if (result.status == "success") {
        navigate("/ideal-personality/looks");
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  const handleNext = () => {
    UpdateBio();
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
    <Box className={`${classes.appheader}`}>
      <Container maxWidth="xl">
        <HeaderApp sx={{ position: "relative", top: "15px" }} />
        <Box
          sx={{ marginTop: "30px", padding: "20px", position: "relative" }}
          className={`blurBg min100vh h-center`}
        >
          <Box
            className={`${classes.pageContainer}`}
            sx={{ marginTop: { md: "100px", sm: "60px", xs: "30px" } }}
          >
            {/* ///////////// Gender ///////////////// */}
            <Typography
              className={`f-bold v-center`}
              sx={{ marginBottom: "30px", color: "#000000" }}
            >
              Looking For
            </Typography>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
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
                      src={
                        SelectedGender == "female" ? femaleWhite : femaleBlack
                      }
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
              </Box>
            </Box>
            {/* ////////////////////////////////////// */}
            <Button
              onClick={() => handleNext()}
              sx={{
                maxWidth: "200px",
                margin: "0 auto",
                marginTop: { md: "80", sm: "50px", xs: "30px" },
              }}
            >
              Next
            </Button>
          </Box>
          {/* <Box>
            <WizerdPagination steps={8}/>
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
}

export default Race;
