import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/buttonSm";
import AgeRace from "../components/race";
import avatar from "../assets/images/avatar.png";
import ProfileImage1 from "../assets/images/profileimages/1.png";
import ProfileImage2 from "../assets/images/profileimages/2.png";
import ProfileImage3 from "../assets/images/profileimages/3.png";
import Video1 from "../assets/images/profileimages/video1.png";
import UploadImage from "../assets/images/uploadImage.png";
import Uploadvideo from "../assets/images/uploadvideo.png";
import uploadVideoWhite from "../assets/images/uploadVideoWhite.png";
import Video from "../components/video";
import { useState } from "react";

// import $ from "jquery";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    imagePicker: {
      backgroundColor: "#075bce",
      padding: "8px",
      borderRadius: "50%",
      border: "2px solid white",
      position: "absolute",
      bottom: "-11px",
      right: "-11px",
      width: "20px",
      cursor: "pointer",
    },
    profileImage: {
      height: "120px",
      width: "120px",
      backgroundImage: `url(${avatar})`,
      backgroundSize: "contain",
      marginTop: "8px",
      borderRadius: "15px",
      position: "relative",
    },
    h1: {
      fontSize: "18px!important",
      fontFamily: "Mori-bold!important",
      // marginTop: "35px!important",
      lineHeight: "1.3!important",
      marginBottom: "20px!important",
    },
    badge: {
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
      border: "1px solid #E8E6EA",
      padding: "10px 16px",
      fontSize: "12px!important",
      width: "100px",
      cursor: "pointer",
    },
    activeBadge: {
      backgroundColor: "black",
      color: "white",
      boxShadow: "6px 8px 10px 0px rgba(103, 103, 103, 0.19)",
    },
    cancelBtn: {
      backgroundColor: "#ffffff",
      color: "#000000",
      border: "1px solid black",
    },
    delBtn: {
      backgroundColor: "#FF1414",
    },
    marginTop100: {
      marginTop: "80px",
    },
    pageContainer: {
      maxWidth: "900px",
      margin: "0 auto",
    },
    galleryImage: {
      width: "100%",
      borderRadius: "7px",
      height: "100%",
      objectFit: "cover",
    },
    galleryImageUpload: {
      //   backgroundImage: `url('${UploadImage}')`,
      height: "100%",
      width: "100%",
      borderRadius: "7px",
      backgroundSize: "100% 100%",
    },
  };
});
function Media() {
  const classes = useStyles();

  return (
    <>
      <Box>
        <Box className={`${classes.pageContainer}`}>
          <Grid container spacing={2} className={"h-center"}>
            <Grid item md={4} xs={12}>
              <Typography className={`${classes.h1}`}>Gallery</Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Box
                    className={`${classes.galleryImage}`}
                    component="img"
                    src={ProfileImage1}
                  ></Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    className={`${classes.galleryImage}`}
                    component="img"
                    src={ProfileImage2}
                  ></Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    className={`${classes.galleryImage}`}
                    component="img"
                    src={ProfileImage3}
                  ></Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    className={`${classes.galleryImage}`}
                    component="img"
                    src={ProfileImage1}
                  ></Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    className={`${classes.galleryImage}`}
                    component="img"
                    src={ProfileImage2}
                  ></Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    onClick={() => alert("Clicked")}
                    sx={{ objectFit: "fill" }}
                    className={`${classes.galleryImage}`}
                    component="img"
                    src={UploadImage}
                  ></Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{ display: { md: "flex", xs: "none" } }}
            ></Grid>
            <Grid item md={5} xs={12}>
              <Typography className={`${classes.h1}`}>
                Intro & Full Body Shorts
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={8} className="h-center v-center prelative">
                  <Box
                    className={`${classes.galleryImage} pabsolute`}
                    component="img"
                    src={uploadVideoWhite}
                  ></Box>
                  <Video
                    onClick={() => alert("Clicked")}
                    src="https://assets.codepen.io/6093409/river.mp4"
                  />
                </Grid>

                <Grid item xs={4} className="prelative">
                  <Box
                    className={`${classes.galleryImage} pabsolute`}
                    component="img"
                    src={uploadVideoWhite}
                  ></Box>
                  <Video
                    onClick={() => alert("Clicked")}
                    src="https://assets.codepen.io/6093409/river.mp4"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid container className="h-center" sx={{ marginTop: "40px" }}>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button>Save Changes</Button>
        </Grid>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button className={`${classes.cancelBtn}`}>Cancel</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Media;
