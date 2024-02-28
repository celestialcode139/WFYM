import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import Button from "../../components/buttonSm";
import Looks from "../../components/looks";
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
    pageContainer: {
      width: "100%",
      maxWidth: "900px",
    },
  };
});
function MaleLooks() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [Token, setToken] = useState("");
  const [lookingFor, setlookingFor] = useState("Female");
  const [ActiveLook, setActiveLook] = useState("");
  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(String(result.data));
    }
  };
  const GetProfile = (Token: string) => {
    APIHelper.CallApi(config.Endpoints.user.GetIdealPersonality, {}, null, Token).then(
      (result: any) => {
        if (result.status == "success") {
          console.log(result.data.looking_for);
          setlookingFor(result.data.looking_for)
          setActiveLook(result?.data?.personality);
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
      personality: ActiveLook,
    };
    APIHelper.CallApi(config.Endpoints.user.UpdateIdealPersonality, data, null, Token).then(
      (result) => {
        if (result.status == "success") {
          navigate("/ideal-personality/race");
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
        }
      }
    );
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
        {/* <HeaderApp sx={{ position: "relative", top: "15px" }} /> */}
        <Box
          // sx={{ marginTop: "30px", padding: "20px", position: "relative" }}
          className={`blurBg min100vh h-center`}
        >
          <Box
            className={`${classes.pageContainer}`}
            sx={{ marginTop: { md: "100px", sm: "60px", xs: "30px" } }}
          >
            <Looks
              gender={lookingFor}
              key={ActiveLook}
              look={ActiveLook}
              onChange={(e: any) => {
                setActiveLook(e);

              }}
            />
            <Button
              onClick={()=>handleNext()}
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

export default MaleLooks;
