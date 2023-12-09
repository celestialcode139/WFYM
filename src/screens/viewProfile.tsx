import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import ProfileImage1 from "../assets/images/profileimages/1.png";
import SendMessage from "../assets/icons/sendMessage.svg";
import image from "../assets/icons/image.png";
import Video from "../components/video";
import IntroVideo from "../assets/videos/intro.mp4";
import BodyShort from "../assets/videos/bodyshort.mp4";
import Lightbox from "../components/lightbox";
import { useEffect, useState } from "react";
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import VideoCallIcon from "../assets/icons/videoicon.png";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    profileImage: {
      width: "100%",
    },
    quickProfileContainer: {
      padding: "15px",
    },
    name: {
      color: "black",
    },
    pt20: {
      marginTop: "20px",
    },
    badge: {
      padding: "3px 6px",
      display: "inline-flex",
      border: "1px solid #075bce",
      borderRadius: "6px",
      fontSize: "12px",
      color: "#075bce",
      marginRight: "6px",
      marginBottom: "6px",
    },
    galleryImage: {
      width: "100%",
      borderRadius: "10px",
    },
    detailHeading: {
      fontSize: "14px!important",
      color: "#065BCE!important",
      fontFamily: "Mori-bold!important",
    },
  };
});
function Media() {
  const classes = useStyles();
  const params = useParams();

  const [isOpen, setisOpen] = useState(false);
  const [User, setUser] = useState<any>({});
  const [Token, setToken] = useState("");
  const [userId, setuserId] = useState("");

  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(String(result.data));
    }
  };
  const featchUserId = async () => {
    const result: any = await GeneralHelper.retrieveData("UserId");
    if (result.status == 1) {
      setuserId(String(result.data));
    }
  };
  const GetLatestMatch = () => {
    APIHelper.CallApi(
      config.Endpoints.user.GetMyProfile,
      {},
      params.id,
      Token
    ).then((result: any) => {
      if (result.status == "success") {
        console.log("Matches:", result.data);
        setUser(result.data);
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  const init = () => {
    featchUserId();
    GetLatestMatch();
  };

  useEffect(() => {
    if (Token != "") {
      init();
    } else {
      featchToken();
    }
  }, [Token]);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={2} xs={12}>
          <Box
            component="img"
            className={`${classes.profileImage}`}
            src={User?.profile_images}
          ></Box>
        </Grid>
        <Grid item md={7} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Box className={`${classes.quickProfileContainer}`}>
                <Box sx={{ display: "flex" }}>
                  <Box>
                    <Typography className={`f-22-bold mb-10 ${classes.name}`}>
                      {`${User?.first_name}`}, 23
                    </Typography>
                    <Typography className={`p-12`}>
                      {User?.user_details?.profession}
                    </Typography>
                  </Box>
                  <Box>
                    <Link to={{ pathname: `/chat/${userId}/${User._id}` }}>
                      <Box
                        component="img"
                        className="hover"
                        src={SendMessage}
                        sx={{ marginLeft: "15px", width: "50px" }}
                      ></Box>
                    </Link>
                    <Link to={{ pathname: `/video-call/${userId}/${User._id}` }}>
                      <Box
                        component="img"
                        className="hover"
                        src={VideoCallIcon}
                        sx={{ marginLeft: "10px", width: "50px" }}
                      ></Box>
                    </Link>
                  </Box>
                </Box>

                <Box className={`${classes.pt20}`}>
                  <Typography className={`f-15-bold mb-10`}>About</Typography>
                  <Typography className={`p-12`}>
                    {User?.user_details?.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box className={`${classes.pt20}`}>
                <Typography className={`f-15-bold mb-10`}>Location</Typography>
                <Typography className={`p-12`}>
                  {User?.user_details?.location}
                </Typography>
              </Box>
              <Box className={`${classes.pt20}`}>
                <Typography
                  className={`f-15-bold mb-10`}
                  sx={{ marginBottom: "10px" }}
                >
                  Interests
                </Typography>
                <Box>
                  {User?.user_details?.hobbies.map((hoby: any, i: number) => (
                    <Box className={`${classes.badge} v-center`} key={i}>
                      <Box component="img"></Box> {hoby.Title}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Gender
              </Typography>
              <Typography className={`p-12`}>Men</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Age
              </Typography>
              <Typography className={`p-12`}>26 year</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Religion
              </Typography>
              <Typography className={`p-12`}>
                {User?.user_details?.religion}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Look
              </Typography>
              <Typography className={`p-12`}>
                {User?.user_details?.personality}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Race
              </Typography>
              <Typography className={`p-12`}>
                {User?.user_details?.race}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Occupations
              </Typography>
              <Typography className={`p-12`}>
                {User?.user_details?.profession}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Political Party
              </Typography>
              <Typography className={`p-12`}>
                {User?.user_details?.political_party}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Children’s
              </Typography>
              <Typography className={`p-12`}>
                {User?.user_details?.children_before}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Highest Degree
              </Typography>
              <Typography className={`p-12`}>
                {User?.user_details?.highest_degree}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Smoking Habits
              </Typography>
              <Typography className={`p-12`}>
                {User?.user_details?.smoking_habits == true ? "True" : "False"}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Drinking Habits
              </Typography>
              <Typography className={`p-12`}>
                {User?.user_details?.drink_habits == true ? "True" : "False"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          <Box className={`${classes.pt20}`}>
            <Typography className={`f-15-bold mb-10`}>
              Intro & Body Short
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Video onClick={() => alert("Clicked")} src={IntroVideo} />
              </Grid>
              <Grid item xs={6}>
                <Video onClick={() => alert("Clicked")} src={BodyShort} />
              </Grid>
            </Grid>
          </Box>
          <Box className={`${classes.pt20}`}>
            <Typography className={`f-15-bold mb-10`}>Gallery</Typography>
            <Grid container spacing={1}>
              {User?.user_details?.images.map((img: string, i: number) => (
                <Grid item xs={4} key={i}>
                  <Box
                    onClick={() => setisOpen(true)}
                    component="img"
                    className={`${classes.galleryImage}`}
                    src={img}
                  ></Box>
                </Grid>
              ))}
            </Grid>
            <Lightbox
              isOpen={isOpen}
              setisOpen={(e: any) => {
                setisOpen(e);
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Media;
