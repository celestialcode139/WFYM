import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import SendMessage from "../assets/icons/sendMessage.svg";
import Video from "../components/video";
import Lightbox from "../components/lightbox";
import { useEffect, useState } from "react";
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import VideoCallIcon from "../assets/icons/videoicon.png";
import moment from "moment";
import MediaHelper from "../Helpers/MediaHelper";
const useStyles = makeStyles(() => {
    return {
        profileImage: {
            width: "100%",
            borderRadius: "10px"
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
    const [User, setUser] = useState();
    const [Token, setToken] = useState("");
    const [userId, setuserId] = useState("");
    const [Age, setAge] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [Loading, setLoading] = useState(false);
    const [gallery, setgallery] = useState([""]);
    const [introVideo, setintroVideo] = useState("");
    const [bodyShort, setbodyShort] = useState("");
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            setToken(String(result.data));
        }
    };
    const featchUserId = async () => {
        const result = await GeneralHelper.retrieveData("UserId");
        if (result.status == 1) {
            setuserId(String(result.data));
        }
    };
    const GetProfileDetails = () => {
        APIHelper.CallApi(config.Endpoints.user.GetMyProfile, {}, String(params.id), Token).then(async (result) => {
            if (result.status == "success") {
                // console.log("Matches:", result.data.media_id);
                setgallery(result?.data?.media_id?.gallery ?? []);
                setbodyShort(result?.data?.media_id?.bodyShort ?? []);
                setintroVideo(result?.data?.media_id?.introVideo ?? []);
                setUser(result.data);
                calculateAge(result.data.dob);
                getImageURL(result.data?.user_details?.images);
                const galleryUrlsArray = await Promise.all(result.data.media_id.gallery.map((element) => MediaHelper.GetImage(element)));
                setgallery(galleryUrlsArray);
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const init = () => {
        featchUserId();
        GetProfileDetails();
    };
    const calculateAge = (DOB) => {
        const birthDate = moment(DOB);
        const currentDate = moment();
        const years = currentDate.diff(birthDate, "years");
        setAge(String(years));
    };
    const getImageURL = async (img) => {
        let imgurl = await MediaHelper.GetImage(img);
        setProfileImage(imgurl);
    };
    useEffect(() => {
        if (Token != "") {
            init();
        }
        else {
            featchToken();
        }
    }, [Token]);
    return (_jsx(_Fragment, { children: _jsxs(Grid, { container: true, spacing: 5, children: [_jsx(Grid, { item: true, md: 2, xs: 12, children: _jsx(Box, { component: "img", className: `${classes.profileImage}`, src: profileImage }) }), _jsx(Grid, { item: true, md: 7, xs: 12, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, md: 6, xs: 12, children: _jsxs(Box, { className: `${classes.quickProfileContainer}`, children: [_jsxs(Box, { sx: { display: "flex" }, children: [_jsxs(Box, { children: [_jsxs(Typography, { className: `f-22-bold mb-10 ${classes.name}`, children: [`${User?.first_name ? User?.first_name : ""}`, ", ", Age] }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.profession })] }), _jsxs(Box, { children: [_jsx(Link, { to: { pathname: `/chat/${userId}/${User === undefined ? null : User._id}` }, children: _jsx(Box, { component: "img", className: "hover", src: SendMessage, sx: { marginLeft: "15px", width: "50px" } }) }), _jsx(Link, { to: { pathname: `/video-call/${userId}/${User === undefined ? null : User._id}` }, children: _jsx(Box, { component: "img", className: "hover", src: VideoCallIcon, sx: { marginLeft: "10px", width: "50px" } }) })] })] }), _jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, sx: { color: "#000000" }, children: "About" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.description })] })] }) }), _jsxs(Grid, { item: true, md: 6, xs: 12, children: [_jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, sx: { color: "#000000" }, children: "Location" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.location })] }), _jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, sx: { marginBottom: "10px", color: "#000000" }, children: "Interests" }), _jsx(Box, { children: User?.user_details?.hobbies.map((hoby, i) => (_jsxs(Box, { className: `${classes.badge} v-center`, children: [_jsx(Box, { component: "img" }), " ", hoby] }, i))) })] })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Gender" }), _jsx(Typography, { className: `p-12`, children: "Men" })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Age" }), Age != "" && (_jsxs(Typography, { className: `p-12`, children: [Age, " year"] }))] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Religion" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.religion })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Look" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.personality })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Race" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.race })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Occupations" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.profession })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Political Party" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.political_party })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Children\u2019s" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.children_before })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Highest Degree" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.highest_degree })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Smoking Habits" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.smoking_habits == true ? "True" : "False" })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Drinking Habits" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.drink_habits == true ? "True" : "False" })] })] }) }), _jsxs(Grid, { item: true, md: 3, xs: 12, children: [_jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, sx: { color: "#000000" }, children: "Intro & Body Short" }), _jsxs(Grid, { container: true, spacing: 1, children: [_jsx(Grid, { item: true, xs: 6, children: _jsx(Video, { src: introVideo }, introVideo) }), _jsx(Grid, { item: true, xs: 6, children: _jsx(Video, { src: bodyShort }) })] })] }), _jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, sx: { color: "#000000" }, children: "Gallery" }), _jsx(Grid, { container: true, spacing: 1, children: gallery.map((img, i) => {
                                        return _jsx(Grid, { item: true, xs: 4, children: _jsx(Box, { onClick: () => setisOpen(true), component: "img", className: `${classes.galleryImage}`, src: img }) }, i);
                                    }) }), _jsx(Lightbox, { gallery: gallery, isOpen: isOpen, setisOpen: (e) => {
                                        setisOpen(e);
                                    } })] })] })] }) }));
}
export default Media;
