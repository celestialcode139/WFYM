import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import avatar from "../assets/images/avatar.png";
import UploadImage from "../assets/images/uploadImage_new.png";
import MediaHelper from "../Helpers/MediaHelper";
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
            width: "100%",
            borderRadius: "7px",
            height: "100%",
            objectFit: "cover",
            minHeight: "100px"
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
            border: "1px solid #9b9b9b",
            borderStyle: "dashed",
            borderRadius: "9px",
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
function Media({ handleMedia, img, indx }) {
    const classes = useStyles();
    const [profileImage, setProfileImage] = useState({ image_url: UploadImage, type: "new" });
    const [progress, setprogress] = useState(0);
    const fileUploader = useRef(null);
    const onprogress = (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setprogress(progress);
    };
    useEffect(() => {
        init();
    }, [img]);
    const init = () => {
        if (img != "") {
            MediaHelper.GetImage(img).then((e) => {
                console.log("E:", e);
                setProfileImage({ ...profileImage, image_url: e, type: "update" });
            });
        }
        else {
            setProfileImage({ ...profileImage, image_url: UploadImage, type: "new", indx });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Box, { className: `${classes.imageCircularProgress}`, onClick: () => {
                    if (fileUploader.current) {
                        fileUploader.current.click();
                        console.log(fileUploader);
                    }
                }, children: _jsx(CircularProgress, { progress: progress }) }), _jsx("input", { 
                // accept="image/*"
                style: { display: "none" }, id: "raised-button-file", type: "file", ref: fileUploader, onChange: async (e) => {
                    setprogress(1);
                    MediaHelper.UploadImage(e.target.files, onprogress).then(async (resp) => {
                        console.log("image upload resp:", resp);
                        handleMedia(resp[0].file_name, profileImage.type, indx);
                    });
                } }), _jsx(Box, { sx: { objectFit: `contain` }, className: `${classes.galleryImage}`, component: "img", src: profileImage.image_url != "" ? profileImage.image_url : UploadImage }, profileImage.image_url)] }));
}
export default Media;
