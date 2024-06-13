/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Typography } from "@mui/material";
import Logo from "../../assets/logo/logo-w.png";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import ProfileDropdown from "../../assets/images/ProfileDropdown.svg";
import Menu from "../../components/menu";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";
import Image from "../Image";
import { IUsersDetails } from "../../types";
import Incommingcall from "../Incommingcall";
import { useCallReceiverData } from "../../context/SignalsContextProvider";
import avatar from "../../assets/images/UserAvatar.svg";
import { useEffect } from "react";

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
      objectFit: "cover",
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
      width: "100px",
      whiteSpace: "nowrap",
    },
    ProfileDropdown: {
      marginLeft: "5px",
      width: "20px",
    },
  };
});

function AppHeader(props: any) {
  const { sessionUser } = useAuth();
  const { incomingCall } = useCallReceiverData();
  const classes = useStyles();

  useEffect(() => {
    console.log("sessionUser?.user_details ", sessionUser?.user_details);
  }, []);

  return (
    <Box
      className={`${classes.header}`}
      sx={{ ...props.sx, position: "relative" }}
    >
      {incomingCall && (
        <Incommingcall
          name={
            incomingCall.sender.first_name + " " + incomingCall.sender.last_name
          }
        />
      )}

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
                <Image
                  component="img"
                  loading="lazy"
                  src={
                    typeof sessionUser?.user_details !== "string"
                      ? sessionUser?.user_details?.images
                      : null
                  }
                  fallbackSrc={avatar}
                  className={`${classes.profileImage}`}
                />
                <Box
                  sx={{
                    height: "40px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <Typography className={`${classes.profileName}`}>
                    {sessionUser?.first_name && sessionUser?.first_name}
                  </Typography>
                  <Typography className={`${classes.profileLocation}`}>
                    {sessionUser?.user_details &&
                      `${
                        (sessionUser?.user_details as IUsersDetails)?.country ??
                        ""
                      } ${
                        (sessionUser?.user_details as IUsersDetails)?.city ?? ""
                      } ${
                        (sessionUser?.user_details as IUsersDetails)
                          ?.location ?? ""
                      }`}
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
