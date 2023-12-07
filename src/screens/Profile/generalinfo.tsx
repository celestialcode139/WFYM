import { useState, useEffect } from "react";
import { Box, Container, TextField, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import Button from "../../components/buttonSm";
import GeneralinfoComp from "../../components/profilegeneralinfo";
import { useNavigate } from "react-router-dom";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
// import $ from "jquery";

const useStyles = makeStyles(() => {
  const theme = useTheme();
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
      maxWidth: "500px",
    },
    TextFieldParent: {
      marginBottom: "20px",
    },
  };
});
function Generalinfo() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [Token, setToken] = useState("");
  const [body, setbody] = useState({
    description: "",
    religion: "principled",
    political_Party: "",
    beforeChildren: false,
  });

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
        console.log(result.data);

        setbody({
          ...body,
          description: result?.data?.description,
          religion: result?.data?.religion,
          political_Party: result?.data?.political_party,
          beforeChildren: result?.data?.children_before,
        });
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  // Updating Profile Details

  const UpdateBio = () => {
    const data = {
      description: body.description,
      religion: body.religion,
      political_party: body.political_Party,
      children_before: body.beforeChildren,
    };
    APIHelper.CallApi(
      config.Endpoints.user.UpdateIdealPersonality,
      data,
      null,
      Token
    ).then((result) => {
      if (result.status == "success") {
        GeneralHelper.ShowToast(String("Profile Updated"));
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
            {body.description != "" && (
              <GeneralinfoComp
                key={body}
                body={body}
                onChange={(e: any) => {
                  console.log(e);

                  setbody(e);
                }}
              />
            )}

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
        </Box>
      </Container>
    </Box>
  );
}

export default Generalinfo;
