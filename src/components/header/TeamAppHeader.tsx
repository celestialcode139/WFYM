import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Logo from "../../assets/logo/logo-w.svg";
import Avatar from "../../assets/images/avatar.png";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import ProfileDropdown from "../../assets/images/ProfileDropdown.svg";
import Menu from "../../components/menu";
import { Link } from "react-router-dom";
import TeamMenu from "../TeamMenu";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    logo: {
      width: "130px",
    },
    header: {
      // paddingTop: "15px",
    },
    headerContainer: {
      backgroundColor: "#fbfbfbed",
      padding: "10px 20px",
      backdropFilter: "blur(5px)",
      borderRadius: "10px",
    },
    profileImage: {
      height: "50px",
      width: "50px",
      borderRadius: "50%",
      border: "2px solid #01A0E6",
      objectFit:"cover"
    },
    profileName: {
      fontSize: "16px!important",
      fontWeight: "bold!important",
      color:"#000000!important"
    },
    profileLocation: {
      fontSize: "10px!important",
      lineHeight: "10px!important",
      color:"#000000"

    },
    ProfileDropdown: {
      marginLeft: "5px",
      width: "20px",
    },
  };
});
function TeamAppHeader(props: any) {
  const classes = useStyles();
  const [Data, setData] = useState({});
  const [Token, setToken] = useState("");
  const [UserId, setUserId] = useState("");


  const featchToken = async () => {
    const Token: any = await GeneralHelper.retrieveData("Token");
    const UserId: any = await GeneralHelper.retrieveData("UserId");
    if (Token.status == 1 && UserId.status == 1) {
      setToken(String(Token.data));
      setUserId(String(UserId.data))
    }
  };
  const GetProfile = () => {
    console.log("Getting Profile.....");
    APIHelper.CallApi(
      config.Endpoints.Team.GetById,
      {},
      UserId,
      Token
    ).then((result: any) => {
      if (result.status == "success") {
        console.log(result.data);
        setData(result?.data);
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };

  useEffect(() => {
    if (Token != "" && UserId != "") {
      GetProfile();
    } else {
      featchToken();
    }
  }, [Token]);

  return (
    <Box className={`${classes.header}`} sx={{ ...props.sx }}>
      <Grid container className={`${classes.headerContainer}`}>
        <Grid item xs={6} className="d-flex">
          <Link to="/dashboard">
            <Box component="img" src={Logo} className={`${classes.logo}`}></Box>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box className="v-center">
              <TeamMenu>
                <Box
                  component="img"
                  src={Data?.profile_images}
                  className={`${classes.profileImage}`}
                ></Box>
                <Box sx={{ height: "40px", marginLeft: "10px",marginRight:"10px" }}>
                  <Typography className={`${classes.profileName}`}>
                    {Data?.first_name}
                  </Typography>
                  <Typography className={`${classes.profileLocation}`}>
                    {Data?.last_name}
                  </Typography>
                </Box>
                <Box component="img" src={ProfileDropdown}></Box>
              </TeamMenu>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TeamAppHeader;
