import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import Video from "../../components/video";
// import IntroVideo from "../../assets/videos/intro.mp4";
// import BodyShort from "../../assets/videos/bodyshort.mp4";
import Lightbox from "../../components/lightbox";
import { useEffect, useState } from "react";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import MediaHelper from "../../Helpers/MediaHelper";

const useStyles = makeStyles(() => {
  return {
    profileImage: {
      width: "100%",
      borderRadius: "20px",
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
    AssignMatchButton: {
      backgroundColor: "#065BCE",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      borderRadius: "30px",
      height: "50px",
      marginTop: "50px",
      cursor: "pointer",
    },
  };
});
function ViewProfile(props: any) {
  const classes = useStyles();

  const [isOpen, setisOpen] = useState(false);
  const [User, setUser] = useState<any>({});
  const [Token, setToken] = useState("");
  const [Image, setImage] = useState("");
  const [IntroVideo, setIntroVideo] = useState("");
  const [FullShort, setFullShort] = useState("");

  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(String(result.data));
    }
  };
  useEffect(() => {
    console.log("User:", User);
  }, [User]);

  const GetLatestMatch = () => {
    console.log("Getting Latest Match With Token ", Token);

    APIHelper.CallApi(
      config.Endpoints.user.GetMyProfile,
      {},
      props.Id,
      Token
    ).then(async (result: any) => {
      if (result.status == "success") {
        console.log("Matches:", result.data);
        setUser(result.data);
        getImageURL(result.data.user_details.images);
        setIntroVideo(result.data.media_id.introVideo);
        setFullShort(result.data.media_id.bodyShort);
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };

  const getImageURL = (img: string) => {
    console.log("asdfasdfasdfasdfaEasdfasdfasdfasdfaE");

    MediaHelper.GetImage(img).then((e: string) => {
      setImage(e);
      console.log("asdfasdfasdfasdfaE:", e);
    });
  };
  const init = () => {
    GetLatestMatch();
  };

  useEffect(() => {
    if (Token != "") {
      init();
    } else {
      featchToken();
    }
  }, [Token, props]);
  console.log("IntroVideoIntroVideo", IntroVideo);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={2} xs={12}>
          <Box
            component="img"
            className={`${classes.profileImage}`}
            src={Image}
          ></Box>
        </Grid>
        <Grid item md={7} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Box className={`${classes.quickProfileContainer}`}>
                <Box sx={{ display: "flex" }}>
                  <Box>
                    <Typography className={`f-22-bold mb-10 ${classes.name}`}>
                      {User?.first_name ?? ""}, 23
                    </Typography>
                    <Typography className={`p-12`}>
                      {User?.user_details?.profession}
                    </Typography>
                  </Box>
                  {/* <Box>
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
                  </Box> */}
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
                  {`${User?.user_details?.location ?? ""}, ${
                    User?.user_details?.city ?? ""
                  }, ${User?.user_details?.country ?? ""}`}
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
                      <Box component="img"></Box> {hoby}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Gender
              </Typography>
              <Typography className={`p-12`}>{User?.gender}</Typography>
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
                {String(User?.user_details?.personality ?? "").replace(
                  "_",
                  " "
                )}
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
                <Video onClick={() => alert("Clicked")} src={FullShort} />
              </Grid>
            </Grid>
          </Box>
          <Box className={`${classes.pt20}`}>
            <Typography className={`f-15-bold mb-10`}>Gallery</Typography>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Box
                  onClick={() => setisOpen(true)}
                  component="img"
                  className={`${classes.galleryImage}`}
                  src={User?.user_details?.images}
                ></Box>
              </Grid>
              {/* {User?.user_details?.images.map((img: string, i: number) => (
                <Grid item xs={4} key={i}>
                  <Box
                    onClick={() => setisOpen(true)}
                    component="img"
                    className={`${classes.galleryImage}`}
                    src={img}
                  ></Box>
                </Grid>
              ))} */}
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

export default ViewProfile;
