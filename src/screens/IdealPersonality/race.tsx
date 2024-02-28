import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import Button from "../../components/buttonSm";
import AgeRace from "../../components/race";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import { useNavigate } from "react-router-dom";
import Alert from "../../Helpers/Alert";
import { ToastContainer } from "react-toastify";

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
  const [races, setraces] = useState([]);

  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(String(result.data));
    }
  };
  const GetProfile = (Token: string) => {
    alert('32323')
    APIHelper.CallApi(
      config.Endpoints.user.GetIdealPersonality,
      {},
      null,
      Token
    ).then((result: any) => {
      if (result.status == "success") {
        console.log(result.data);
        setRace(result?.data?.race);
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  const UpdateBio = () => {
    const data = {
      race: Race,
    };
    console.log(data);

    APIHelper.CallApi(
      config.Endpoints.user.UpdateIdealPersonality,
      data,
      null,
      Token
    ).then((result) => {
      if (result.status == "success") {
        Alert.notify("Questioner Updated Successfully!",4000);
        setTimeout(() => {
          navigate("/dashboard");
        }, 6000);
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  const handleNext = () => {
    UpdateBio();
  };
  const GetRace = () => {
    APIHelper.CallApi(
      config.Endpoints.Init.GetMetaData,
      {},
      "race",
      Token
    ).then((result: any) => {
      if (result.status == "success") {
        console.log("result.data =====> ",result.data);
        handleSort(result.data);
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  const handleSort = (ArrayToSort: any) => {
    const sortedArray = [...ArrayToSort].sort((a, b) =>
      a.value.localeCompare(b.value)
    );
    console.log("sortedArray ", sortedArray);
    setraces(sortedArray);
  };
  // Other functions
  useEffect(() => {
    // alert(222)
    if (Token != "") {
      GetProfile(Token);
      GetRace();
    } else {
      featchToken();
    }
  }, [Token]);

  return (
    <Box className={`${classes.appheader}`}>
      <Container maxWidth="xl">
        {/* <HeaderApp sx={{ position: "relative", top: "15px" }} /> */}
        <Box
          // sx={{ marginTop: "30px", padding: "20px", position: "relative" }}
          className={`blurBg min100vh h-center`}
        >
          <Box
            className={`${classes.pageContainer}`}
            sx={{ marginTop: { md: "100px", sm: "60px", xs: "30px" } }}
          >
            <AgeRace
              data={races}
              key={races}
              race={Race}
              onChange={(e: any) => setRace(e)}
            />
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
      <ToastContainer />
    </Box>
  );
}

export default Race;
