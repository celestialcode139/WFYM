/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Logo from "../../assets/logo/logo-w.png";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import ProfileDropdown from "../../assets/images/ProfileDropdown.svg";
import Menu from "../../components/menu";
import { Link } from "react-router-dom";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import GeneralHelper from "../../Helpers/GeneralHelper";
import MediaHelper from "../../Helpers/MediaHelper";

const useStyles = makeStyles(() => {
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
      objectFit: "cover"
    },
    profileName: {
      fontSize: "16px!important",
      fontWeight: "bold!important",
      color: "#000000!important",
    },
    profileLocation: {
      fontSize: "10px!important",
      lineHeight: "10px!important",
      color: "#000000",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: '100px',
      whiteSpace: "nowrap"
    },
    ProfileDropdown: {
      marginLeft: "5px",
      width: "20px",
    },
  };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AppHeader(props: any) {
  const classes = useStyles();
  const [Token, setToken] = useState("");
  const [UserDetails, setUserDetails] = useState<any>({});
  const [profileImage, setProfileImage] = useState("");

  const GetProfileDetails = async () => {
    APIHelper.CallApi(config.Endpoints.user.GetMyProfile, {}, null, Token).then(
      (result: any) => {
        console.log("Profile Details ", result);
        setUserDetails(result.data);
        getImageURL(result.data.user_details.images);
      }
    );
  };

  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(String(result.data));
    }
  };

  const getImageURL = async (img: string) => {
    let imgurl = await MediaHelper.GetImage(img);
    setProfileImage(imgurl);
  }

  useEffect(() => {
    if (Token != "") {
      GetProfileDetails();

    } else {
      featchToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <Menu>
                <Box
                  component="img"
                  loading="lazy"
                  src={profileImage}
                  className={`${classes.profileImage}`}
                ></Box>
                <Box
                  sx={{
                    height: "40px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <Typography className={`${classes.profileName}`}>
                    {UserDetails?.first_name && UserDetails?.first_name}
                  </Typography>
                  <Typography className={`${classes.profileLocation}`}>
                    {UserDetails?.user_details &&
                      `${UserDetails?.user_details?.country} ${UserDetails?.user_details?.city} ${UserDetails?.user_details?.location}`}
                  </Typography>
                </Box>
                <Box component="img" src={ProfileDropdown}></Box>
              </Menu>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AppHeader;
