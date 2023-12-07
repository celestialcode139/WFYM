import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Logo from "../../assets/logo/logo-w.svg";
import Avatar from "../../assets/images/avatar.png";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import ProfileDropdown from "../../assets/images/ProfileDropdown.svg";
import HeaderApp from "../components/header/AppHeader";
import BorderedBG from "../assets/images/borderedBG.png";
import matchBlue from "../assets/icons/matchBlue.svg";
import matchWhite from "../assets/icons/matchWhite.svg";
import Fav from "../assets/icons/fav.svg";
import msgBlue from "../assets/icons/msgBlue.svg";
import msgWhite from "../assets/icons/msgWhite.svg";
import MatchCards from "../components/matchCards";
import MatchImg from "../assets/images/matchImg.png";
import ProfileSummery from "../components/ProfileSummery";
import Carousel from "../components/Carousel";
import Button from "../components/button";
import ButtonSm from "../components/buttonSm";
import image from "../assets/icons/image.png";
import image1 from "../assets/icons/image1.png";
import image2 from "../assets/icons/image2.png";
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import NoMatches from "../assets/images/no_matches.svg";
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
    logo: {
      width: "130px",
    },
    header: {
      //   paddingTop: "15px",
    },
    headerContainer: {
      backgroundColor: "#f9f9f9ed",
      padding: "10px 20px",
      backdropFilter: "blur(5px)",
      borderRadius: "10px",
    },
    profileImage: {
      height: "50px",
      width: "50px",
      borderRadius: "50%",
      border: "2px solid #01A0E6",
    },
    profileName: {
      fontSize: "16px!important",
      fontWeight: "bold!important",
    },
    profileLocation: {
      fontSize: "10px!important",
      lineHeight: "10px!important",
    },
    ProfileDropdown: {
      marginLeft: "5px",
      width: "20px",
    },
    BorderedBG: {
      backgroundImage: `url(${BorderedBG})`,
      borderRadius: "15px",
      backgroundSize: "100% 100%",
    },
    toggleBtn: {
      border: "1px solid #E8E6EA",
      display: "flex",
      padding: "8px",
      backgroundColor: "white",
      borderRadius: "10px",
      justifyContent: "space-between",
      cursor: "pointer",
    },
    activeToggleBtn: {
      backgroundColor: "#000000!important",
      boxShadow: "6px 7px 11px #00000057",
      border: "unset!important",
    },
    circleBadge: {
      height: "20px",
      width: "20px",
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "12px",
      border: "1px solid #E8E6EA",
    },
    stickyContainer: {
      position: "sticky",
      top: "0px",
      zIndex: "999999",
      background: "#f9f9f9",
      borderRadius: "10px",
      // boxShadow: "6px 7px 17px #00000017",
      padding: "10px",
    },
    prt200: {
      position: "relative",
      top: "150px",
    },
  };
});
function Dashboard() {
  const classes = useStyles();
  const [matchMessage, setmatchMessage] = useState("match");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchHistory, setmatchHistory] = useState([])
  const [matchFavourite, setmatchFavourite] = useState([])
  const [matches, setmatches] = useState<any[]>([
    {
      _id:"q3452346263",
      image: image,
      name: "Jessica Parker",
      age: 23,
      desg: "Proffesional model",
    },
    {
      _id:"5637456",
      image: image1,
      name: "Jacqueline",
      age: 26,
      desg: "Artist",
    },
    {
      _id:"756857354",
      image: image2,
      name: "Sophia",
      age: 31,
      desg: "CEO",
    },
  ]);
  const [Token, setToken] = useState("");

  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(String(result.data));
    }
  };
  const GetMatchHistory = (Token: string) => {
    let data={
      use_auth_user_id:true
    };
    APIHelper.CallApi(config.Endpoints.Match.GetMatches, {}, "?use_auth_user_id=true", Token).then(
      (result: any) => {
        if (result.status == "success") {
          
          debugger

          console.log(result.data);
          // setGender(result?.data?.gender ? result.data.gender : "");
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
        }
      }
    );
  };

  useEffect(() => {
    if (Token != "") {
      GetMatchHistory(Token);
    } else {
      featchToken();
    }
  }, [Token]);

  return (
    <Box className={`${classes.appheader}`}>
      <Container maxWidth="xl">
        <HeaderApp sx={{ position: "relative", top: "15px" }} />
        <Grid container sx={{ marginTop: "20px" }} spacing={2}>
          <Grid item xs={12} md={3.5}>
            <Box
              className={`blurBg h100 ${classes.BorderedBG}`}
              sx={{ minHeight: "400px", padding: "15px" }}
            >
              <Box className={`${classes.stickyContainer}`}>
                <Grid container spacing={1}>
                  <Grid item xs={6} onClick={() => setmatchMessage("match")}>
                    <Box
                      className={`${classes.toggleBtn} ${
                        matchMessage == "match" ? classes.activeToggleBtn : null
                      }`}
                    >
                      <Box className={`d-flex`}>
                        <Box
                          component="img"
                          src={matchMessage == "match" ? msgWhite : msgBlue}
                          sx={{ width: "20px" }}
                        ></Box>
                        <Box
                          className={`v-center`}
                          sx={{
                            fontSize: "12px",
                            marginLeft: "3px",
                            color: matchMessage == "match" ? "white" : "black",
                          }}
                        >
                          Matches
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          color: matchMessage == "match" ? "white" : "black",
                        }}
                        className={`${classes.circleBadge}`}
                      >
                        {matchHistory.length}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} onClick={() => setmatchMessage("message")}>
                    <Box
                      className={`${classes.toggleBtn} ${
                        matchMessage != "match" ? classes.activeToggleBtn : null
                      }`}
                    >
                      <Box className={`d-flex`}>
                        <Box
                          component="img"
                          src={matchMessage != "match" ? matchWhite : matchBlue}
                          sx={{ width: "20px" }}
                        ></Box>
                        <Box
                          className={`v-center`}
                          sx={{
                            fontSize: "12px",
                            marginLeft: "3px",
                            color: matchMessage != "match" ? "white" : "black",
                          }}
                        >
                          Favourite
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          color: matchMessage != "match" ? "white" : "black",
                        }}
                        className={`${classes.circleBadge}`}
                      >
                        {matchFavourite.length}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                {/* <Typography sx={{ marginTop: "20px" }} className={`f-26-bold`}>
                  {matchMessage == "match" ? "Matches History" : "Favourite"}
                </Typography>
                <Typography className="p-12">
                  This is a list of people who have liked you and your matches.
                </Typography>
                <Typography className={`p12BA`} sx={{ marginTop: "15px" }}>
                  Today
                </Typography> */}
              </Box>
              {matches.length <= 0 ? (
                <Box className="h-center">
                  <Box
                    sx={{ width: "80%" }}
                    component="img"
                    src={NoMatches}
                  ></Box>
                </Box>
              ) : (
                <Grid container spacing={1} sx={{ marginTop: "1px" }}>
                  <Grid item xs={6}>
                    <MatchCards name="Leilani" age={19} img={MatchImg} />
                  </Grid>
                </Grid>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={matches.length > 0 ? 5 : 8.5}>
            <Box
              className={`blurBg h100  ${classes.BorderedBG} `}
              sx={{ minHeight: "400px", padding: "15px" }}
            >
              <Box
                className="sticky"
                sx={{ display: matches.length > 0 ? "block" : "none" }}
              >
                <Box>
                  <Typography
                    className={`f-22-bold mb-10`}
                    sx={{ marginTop: "10px" }}
                  >
                    Discover
                  </Typography>
                  <Typography className={`p-12`}>
                    {matches.length} matches found
                  </Typography>
                </Box>
                <Carousel
                  data={matches}
                  currentIndex={(e: any) => setCurrentIndex(e)}
                />
              </Box>
              <Box
                className={`${classes.prt200}`}
                sx={{ display: matches.length > 0 ? "none" : "block" }}
              >
                <Box>
                  <Typography className={`f-35-bold mb-10 pText text-center`}>
                    Start matching
                  </Typography>
                  <Typography className={`p-12 text-center`}>
                    Start a conversation now with each other
                  </Typography>
                  <Box sx={{ marginTop: "35px" }}>
                    <ButtonSm
                      onClick={() => {
                        setmatches([
                          {
                            image: image,
                            name: "Jessica Parker",
                            age: 23,
                            desg: "Proffesional model",
                          },
                          {
                            image: image1,
                            name: "Jacqueline",
                            age: 26,
                            desg: "Artist",
                          },
                          {
                            image: image2,
                            name: "Sophia",
                            age: 31,
                            desg: "CEO",
                          },
                        ]);
                      }}
                      sx={{ maxWidth: "150px", margin: "0 auto!important" }}
                    >
                      Request Matches
                    </ButtonSm>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3.5}
            sx={{ display: matches.length <= 0 ? "none" : null }}
          >
            <Box
              className={`blurBg h100 ${classes.BorderedBG}`}
              sx={{ minHeight: "400px" }}
            >
              <ProfileSummery data={matches[currentIndex]} key={currentIndex} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
