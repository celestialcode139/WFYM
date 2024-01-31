import { useState, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/buttonSm";
import avatar from "../assets/images/avatar.png";
import uploadVideoWhite from "../assets/images/uploadVideo_new.png";
import Video from "../components/video";
import MediaGallery from "../components/MediaGallery";
import MediaHelper from "../Helpers/MediaHelper";


// import $ from "jquery";

const useStyles = makeStyles(() => {
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
      width: "100px",
      borderRadius: "7px",
      objectFit: "cover",
      top: "36%",
      cursor: "pointer",
      zIndex: "999999"
    },
    galleryImageUpload: {
      //   backgroundImage: `url('${UploadImage}')`,
      height: "100%",
      width: "100%",
      borderRadius: "7px",
      backgroundSize: "100% 100%",
    },
    imageCircularProgress: {
      background: "#055cce00",
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "0px"
    },
    label: {
      height: "100%",
      display: "block",
      zIndex: "999999",
      position: "relative",
      cursor: "pointer"
    }
  };
});
function Media() {
  const classes = useStyles();
  const [gallery, setgallery] = useState<String[]>(['']);
  const [introVideo, setintroVideo] = useState<String[]>(['']);
  const [bodyShort, setbodyShort] = useState<String[]>(['']);
  const introVideoRef = useRef<HTMLInputElement>(null);
  const bodyShortRef = useRef<HTMLInputElement>(null);
  const [progress, setprogress] = useState(0);


  const handleMedia = (name: string) => {
    setgallery([...gallery, name])
  }
  const onprogress = (progressEvent: any) => {
    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
    setprogress(progress)
  };

  return (
    <>
      <Box>
        <Box className={`${classes.pageContainer}`}>
          <Grid container spacing={2} className={"h-center"}>
            <Grid item md={4} xs={12}>
              <Typography className={`${classes.h1}`}>Gallery</Typography>
              <Grid container spacing={1}>

                {
                  gallery.map((val, i) => (
                    <Grid item xs={4} key={i}>
                      <Box sx={{ position: "relative", display: "flex", justifyContent: "center" }}>
                        <MediaGallery handleMedia={handleMedia} />
                      </Box>
                    </Grid>
                  ))
                }


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
                    onClick={() => {
                      if (introVideoRef.current) {
                        introVideoRef.current.click();
                      }
                    }}
                  ></Box>
                  <input
                    // accept="image/*"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    ref={introVideoRef}
                    onChange={async (e: any) => {
                      setprogress(1);
                      MediaHelper.UploadImage(e.target.files, onprogress).then(async (resp) => {
                        console.log("image upload resp:", resp[0].url);

                      })
                    }}
                  />
                  <Video
                    src={introVideo}
                  />
                </Grid>

                <Grid item xs={4} className="prelative" sx={{ display: "flex", justifyContent: 'center' }}>
                  <Box
                    className={`${classes.galleryImage} pabsolute`}
                    component="img"
                    src={uploadVideoWhite}
                    onClick={() => alert("Clicked")}
                  ></Box>
                  <Video

                    src={bodyShort}
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


