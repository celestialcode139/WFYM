import { useState, useRef, useEffect, useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
//import Button from "../components/buttonsm";
import Button2 from "../components/button";
import avatar from "../assets/images/avatar.png";
import uploadVideoWhite from "../assets/images/uploadVideo_new.png";
import Video from "../components/video";
import MediaGallery from "../components/MediaGallery";
import MediaHelper from "../Helpers/MediaHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import GeneralHelper from "../Helpers/GeneralHelper";
import CircularProgress from "../components/CircularProgress";
import { useNavigate } from "react-router-dom";
import Alert from "../Helpers/Alert";

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
      width: "120px",
      borderRadius: "7px",
      objectFit: "cover",
      top: "15px",
      cursor: "pointer",
      zIndex: "999999",
      border: "1px solid black",
      padding:'45px 25px',
      backgroundColor:'#00000024'
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
      top: "0px",
    },
    label: {
      height: "100%",
      display: "block",
      zIndex: "999999",
      position: "relative",
      cursor: "pointer",
    },
  };
});
function Media() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [gallery, setgallery] = useState<string[]>([]);
  const [introVideo, setintroVideo] = useState<string>("");
  const [bodyShort, setbodyShort] = useState<string>("");
  const introVideoRef = useRef<HTMLInputElement>(null);
  const bodyShortRef = useRef<HTMLInputElement>(null);
  const [progress, setprogress] = useState(0);
  const [progress1, setprogress1] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [Token, setToken] = useState("");
  const [IsDisabled, setIsDisabled] = useState(true);

  interface IUpdateMedia {
    gallery: string[];
    introVideo: string;
    bodyShort?: string;
  }

  useEffect(() => {
    if (gallery.length !== 0 && introVideo != "" && bodyShort != "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [gallery, introVideo, bodyShort]);

  const handleMedia = (name: string, type: string, indx: number) => {
    if (type == "new") {
      setgallery([...gallery.filter((x) => x), name]);
    } else {
      const updatedGallery = [...gallery];
      updatedGallery[indx] = name;
      setgallery(updatedGallery);
      // debugger
    }
  };
  const onprogress = (progressEvent: any) => {
    const progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    );
    console.log("progress:", progress);

    setprogress(progress);
  };
  const onprogress1 = (progressEvent: any) => {
    const progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    );
    console.log("progress:", progress);

    setprogress1(progress);
  };

  const UpdateMediaHandler = () => {
    setLoading(true);
    const data: IUpdateMedia = {
      gallery: gallery.filter((gallery) => gallery),
      introVideo,
      bodyShort,
    };

    APIHelper.CallApi(
      config.Endpoints.Media.UploadMedia,
      data,
      null,
      Token
    ).then((result: any) => {
      if (result.status == "success") {
        Alert.notify(String("Media uploaded successfully"), 3000);
        setTimeout(() => {
          navigate("/dashboard");
          setLoading(false);
        }, 3000);
      } else {
        console.log(result.message);
        Alert.notify(String(result.message), 3000);
        setIsDisabled(true);
        // GeneralHelper.ShowToast(String(result.message));
      }
    });
  };

  const GetMediaHandler = (tkn: string) => {
    setLoading(true);
    APIHelper.CallApi(config.Endpoints.Media.GetMedia, {}, null, tkn).then(
      (result: any) => {
        setLoading(false);
        if (result.status == "success") {
          console.log("GetMediaHandler:", result.data);
          if (result.data) {
            setbodyShort(result.data.bodyShort);
            setintroVideo(result.data.introVideo);
            setgallery(result?.data?.gallery);
          }
        } else {
          console.log(result.message);
          GeneralHelper.ShowToast(String(result.message));
          setIsDisabled(true);
        }
      }
    );
  };

  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(String(result.data));
      GetMediaHandler(result.data);
    }
  };

  useEffect(() => {
    console.log("gallery:", gallery);
  }, [gallery]);

  useEffect(() => {
    featchToken();
  }, []);

  return (
    <>
      <Box>
        <Box className={`${classes.pageContainer}`}>
          <Grid container spacing={2} className={"h-center"}>
            <Grid item md={4} xs={12}>
              <Typography className={`${classes.h1}`}>Gallery</Typography>
              <Grid container spacing={1}>
                {gallery.map((val, i) => {
                  return (
                    <Grid item xs={4} key={i}>
                      <Box
                        sx={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "center",
                          height: 100,
                        }}
                      >
                        <MediaGallery
                          indx={i}
                          img={val}
                          handleMedia={handleMedia}
                        />
                      </Box>
                    </Grid>
                  );
                })}
                {gallery.length < 6 && (
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <MediaGallery
                        indx={1}
                        img={""}
                        handleMedia={handleMedia}
                      />
                    </Box>
                  </Grid>
                )}
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
                <Grid
                  item
                  xs={6}
                  className="h-center v-center prelative "
                  sx={{ padding:"0!important"}}
                  onClick={() => {
                    if (introVideoRef.current) {
                      introVideoRef.current.click();
                    }
                  }}
                >
                  {progress < 100 && progress > 0 ? (
                    <Box
                      className={`${classes.galleryImage} pabsolute`}
                      sx={{display:'flex',justifyContent:'center',alignItems:'center'}}
                    >
                      <CircularProgress progress={progress} />
                    </Box>
                  ) : 
                  (                    
                    <Box
                      className={`${classes.galleryImage} pabsolute`}
                      component="img"
                      src={uploadVideoWhite}
                    ></Box>
                  )}

                  <input
                    accept="video/*"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    ref={introVideoRef}
                    onChange={async (e: any) => {
                      setprogress(1);
                      MediaHelper.UploadImage(e.target.files, onprogress).then(
                        async (resp) => {
                          console.log("image upload resp:", resp[0]?.file_name);
                          setintroVideo(resp[0]?.file_name);
                        }
                      );
                    }}
                  />
                   <Video key={introVideo} src={introVideo} />
                </Grid>

                <Grid
                  item
                  xs={4}
                  className="prelative"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {progress1 < 100 && progress1 > 0 ? (
                    <Box
                      className={`${classes.galleryImage} pabsolute`}
                      sx={{display:'flex',justifyContent:'center',alignItems:'center'}}
                    >
                      <CircularProgress progress={progress1} />
                    </Box>
                  ) : (
                    <Box
                      className={`${classes.galleryImage} pabsolute`}
                      component="img"
                      src={uploadVideoWhite}
                      onClick={() => {
                        if (bodyShortRef.current) {
                          bodyShortRef.current.click();
                        }
                      }}
                    ></Box>
                  )}

                  <input
                    // accept="image/*"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    ref={bodyShortRef}
                    onChange={async (e: any) => {
                      // setprogress(1);
                      MediaHelper.UploadImage(e.target.files, onprogress1).then(
                        async (resp) => {
                          console.log("image upload resp:", resp[0].file_name);
                          setbodyShort(resp[0].file_name);
                        }
                      );
                    }}
                  />
                   <Video key={bodyShort} src={bodyShort} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid container className="h-center" sx={{ marginTop: "40px" }}>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button2
            onClick={() => {
              UpdateMediaHandler();
            }}
            Loading={Loading}
            Disabled={IsDisabled}
          >
            Save Changes
          </Button2>
        </Grid>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button2
            className={`${classes.cancelBtn}`}
            sx={{
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "1px solid black",
            }}
          >
            Cancel
          </Button2>
        </Grid>
      </Grid>
    </>
  );
}

export default Media;
