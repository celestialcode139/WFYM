import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import ProfileImage1 from "../assets/images/profileimages/1.png";
import image from "../assets/icons/image.png";
import Video from "../components/video";
import IntroVideo from "../assets/videos/intro.mp4";
import BodyShort from "../assets/videos/bodyshort.mp4";
import Lightbox from "../components/lightbox";
import { useState } from "react";

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
  const [isOpen, setisOpen] = useState(false);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={2} xs={12}>
          <Box
            component="img"
            className={`${classes.profileImage}`}
            src={ProfileImage1}
          ></Box>
        </Grid>
        <Grid item md={7} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Box className={`${classes.quickProfileContainer}`}>
                <Box>
                  <Typography className={`f-22-bold mb-10 ${classes.name}`}>
                    Jessica Parker, 23
                  </Typography>
                  <Typography className={`p-12`}>Proffesional model</Typography>
                </Box>

                <Box className={`${classes.pt20}`}>
                  <Typography className={`f-15-bold mb-10`}>About</Typography>
                  <Typography className={`p-12`}>
                    My name is Jessica Parker and I enjoy meeting new people and
                    finding ways to help them have an uplifting experience. I
                    enjoy reading..
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box className={`${classes.pt20}`}>
                <Typography className={`f-15-bold mb-10`}>Location</Typography>
                <Typography className={`p-12`}>
                  Chicago, IL United States
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
                  <Box className={`${classes.badge} v-center`}>
                    <Box component="img"></Box> Travelling
                  </Box>
                  <Box className={`${classes.badge} v-center`}>
                    <Box component="img"></Box> Books
                  </Box>
                  <Box className={`${classes.badge} v-center`}>
                    <Box component="img"></Box> Music
                  </Box>
                  <Box className={`${classes.badge} v-center`}>
                    <Box component="img"></Box> Dancing
                  </Box>
                  <Box className={`${classes.badge} v-center`}>
                    <Box component="img"></Box> Modeling
                  </Box>
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
              <Typography className={`p-12`}>Judaism</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Look
              </Typography>
              <Typography className={`p-12`}>Hourglass figure</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Race
              </Typography>
              <Typography className={`p-12`}>White Caucasian</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Occupations
              </Typography>
              <Typography className={`p-12`}>Product Designer</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Political Party
              </Typography>
              <Typography className={`p-12`}>RNC</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Children’s
              </Typography>
              <Typography className={`p-12`}>No</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={`p-12 ${classes.detailHeading}`}>
                Want to have Children’s
              </Typography>
              <Typography className={`p-12`}>Yes</Typography>
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
              <Grid item xs={4}>
                <Box
                  onClick={() => setisOpen(true)}
                  component="img"
                  className={`${classes.galleryImage}`}
                  src={image}
                ></Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  onClick={() => setisOpen(true)}
                  component="img"
                  className={`${classes.galleryImage}`}
                  src={image}
                ></Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  onClick={() => setisOpen(true)}
                  component="img"
                  className={`${classes.galleryImage}`}
                  src={image}
                ></Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  onClick={() => setisOpen(true)}
                  component="img"
                  className={`${classes.galleryImage}`}
                  src={image}
                ></Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  onClick={() => setisOpen(true)}
                  component="img"
                  className={`${classes.galleryImage}`}
                  src={image}
                ></Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  onClick={() => setisOpen(true)}
                  component="img"
                  className={`${classes.galleryImage}`}
                  src={image}
                ></Box>
              </Grid>
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
