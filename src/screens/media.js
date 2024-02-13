import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/buttonSm";
import avatar from "../assets/images/avatar.png";
import uploadVideoWhite from "../assets/images/uploadVideo_new.png";
import Video from "../components/video";
import MediaGallery from "../components/MediaGallery";
import MediaHelper from "../Helpers/MediaHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import GeneralHelper from "../Helpers/GeneralHelper";
import CircularProgress from "../components/CircularProgress";
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
            top: "calc(50% - 20px)",
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
    const [gallery, setgallery] = useState([""]);
    const [introVideo, setintroVideo] = useState("");
    const [bodyShort, setbodyShort] = useState("");
    const introVideoRef = useRef(null);
    const bodyShortRef = useRef(null);
    const [progress, setprogress] = useState(0);
    const [progress1, setprogress1] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [Token, setToken] = useState("");
    const handleMedia = (name, type, indx) => {
        if (type == "new") {
            setgallery([...(gallery.filter((x) => x)), name, ""]);
        }
        else {
            let updatedGallery = [...gallery];
            updatedGallery[indx] = name;
            setgallery(updatedGallery);
            // debugger
        }
    };
    const onprogress = (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        console.log("progress:", progress);
        setprogress(progress);
    };
    const onprogress1 = (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        console.log("progress:", progress);
        setprogress1(progress);
    };
    const UpdateMediaHandler = () => {
        setLoading(true);
        const data = {
            gallery,
            introVideo,
            bodyShort
        };
        APIHelper.CallApi(config.Endpoints.Media.UploadMedia, data, null, Token).then((result) => {
            setLoading(false);
            if (result.status == "success") {
                console.log("Response:", result);
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const GetMediaHandler = (tkn) => {
        setLoading(true);
        APIHelper.CallApi(config.Endpoints.Media.GetMedia, {}, null, tkn).then((result) => {
            setLoading(false);
            if (result.status == "success") {
                console.log("GetMediaHandler:", result.data);
                if (result.data) {
                    setbodyShort(result.data.bodyShort);
                    setintroVideo(result.data.introVideo);
                    setgallery(result?.data?.gallery);
                }
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
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
    return (_jsxs(_Fragment, { children: [_jsx(Box, { children: _jsx(Box, { className: `${classes.pageContainer}`, children: _jsxs(Grid, { container: true, spacing: 2, className: "h-center", children: [_jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `${classes.h1}`, children: "Gallery" }), _jsx(Grid, { container: true, spacing: 1, children: gallery.map((val, i) => {
                                            return _jsx(Grid, { item: true, xs: 4, children: _jsx(Box, { sx: { position: "relative", display: "flex", justifyContent: "center" }, children: _jsx(MediaGallery, { indx: i, img: val, handleMedia: handleMedia }) }) }, i);
                                        }) })] }), _jsx(Grid, { item: true, xs: 1, sx: { display: { md: "flex", xs: "none" } } }), _jsxs(Grid, { item: true, md: 5, xs: 12, children: [_jsx(Typography, { className: `${classes.h1}`, children: "Intro & Full Body Shorts" }), _jsxs(Grid, { container: true, spacing: 1, children: [_jsxs(Grid, { item: true, xs: 8, className: "h-center v-center prelative", children: [progress < 100 && progress > 0 ?
                                                        _jsx(Box, { className: `${classes.galleryImage} pabsolute`, sx: { width: 23 }, children: _jsx(CircularProgress, { progress: progress }) })
                                                        :
                                                            _jsx(Box, { className: `${classes.galleryImage} pabsolute`, component: "img", src: uploadVideoWhite, onClick: () => {
                                                                    if (introVideoRef.current) {
                                                                        introVideoRef.current.click();
                                                                    }
                                                                } }), _jsx("input", { 
                                                        // accept="image/*"
                                                        style: { display: "none" }, id: "raised-button-file", type: "file", ref: introVideoRef, onChange: async (e) => {
                                                            setprogress(1);
                                                            MediaHelper.UploadImage(e.target.files, onprogress).then(async (resp) => {
                                                                console.log("image upload resp:", resp[0]?.file_name);
                                                                setintroVideo(resp[0]?.file_name);
                                                            });
                                                        } }), _jsx(Video, { src: introVideo }, introVideo)] }), _jsxs(Grid, { item: true, xs: 4, className: "prelative", sx: { display: "flex", justifyContent: 'center' }, children: [progress1 < 100 && progress1 > 0 ?
                                                        _jsx(Box, { className: `${classes.galleryImage} pabsolute`, sx: { width: 23 }, children: _jsx(CircularProgress, { progress: progress1 }) })
                                                        :
                                                            _jsx(Box, { className: `${classes.galleryImage} pabsolute`, component: "img", src: uploadVideoWhite, onClick: () => {
                                                                    if (bodyShortRef.current) {
                                                                        bodyShortRef.current.click();
                                                                    }
                                                                } }), _jsx("input", { 
                                                        // accept="image/*"
                                                        style: { display: "none" }, id: "raised-button-file", type: "file", ref: bodyShortRef, onChange: async (e) => {
                                                            setprogress(1);
                                                            MediaHelper.UploadImage(e.target.files, onprogress1).then(async (resp) => {
                                                                console.log("image upload resp:", resp[0].file_name);
                                                                setbodyShort(resp[0].file_name);
                                                            });
                                                        } }), _jsx(Video, { src: bodyShort }, bodyShort)] })] })] })] }) }) }), _jsxs(Grid, { container: true, className: "h-center", sx: { marginTop: "40px" }, children: [_jsx(Grid, { item: true, md: 3, xs: 12, sx: { p: 1 }, children: _jsx(Button, { onClick: () => {
                                UpdateMediaHandler();
                            }, children: "Save Changes" }) }), _jsx(Grid, { item: true, md: 3, xs: 12, sx: { p: 1 }, children: _jsx(Button, { className: `${classes.cancelBtn}`, children: "Cancel" }) })] })] }));
}
export default Media;
