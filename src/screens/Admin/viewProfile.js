import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import Video from "../../components/video";
import IntroVideo from "../../assets/videos/intro.mp4";
import BodyShort from "../../assets/videos/bodyshort.mp4";
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
            borderRadius: "20px"
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
            cursor: "pointer"
        }
    };
});
function ViewProfile(props) {
    const classes = useStyles();
    const [isOpen, setisOpen] = useState(false);
    const [User, setUser] = useState({});
    const [Token, setToken] = useState("");
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            setToken(String(result.data));
        }
    };
    useEffect(() => {
        console.log("User:", User);
    }, [User]);
    const GetLatestMatch = () => {
        console.log("Getting Latest Match With Token ", Token);
        APIHelper.CallApi(config.Endpoints.user.GetMyProfile, {}, props.Id, Token).then((result) => {
            if (result.status == "success") {
                console.log("Matches:", result.data);
                setUser(result.data);
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const getImageURL = (img) => {
        console.log("asdfasdfasdfasdfaEasdfasdfasdfasdfaE");
        MediaHelper.GetImage(img).then((e) => {
            console.log("asdfasdfasdfasdfaE:", e);
        });
    };
    const init = () => {
        GetLatestMatch();
        getImageURL("xyz.png");
    };
    useEffect(() => {
        if (Token != "") {
            init();
        }
        else {
            featchToken();
        }
    }, [Token, props]);
    return (_jsx(_Fragment, { children: _jsxs(Grid, { container: true, spacing: 5, children: [_jsx(Grid, { item: true, md: 2, xs: 12, children: _jsx(Box, { component: "img", className: `${classes.profileImage}`, src: User?.profile_images }) }), _jsx(Grid, { item: true, md: 7, xs: 12, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, md: 6, xs: 12, children: _jsxs(Box, { className: `${classes.quickProfileContainer}`, children: [_jsx(Box, { sx: { display: "flex" }, children: _jsxs(Box, { children: [_jsxs(Typography, { className: `f-22-bold mb-10 ${classes.name}`, children: [User?.first_name ?? "", ", 23"] }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.profession })] }) }), _jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, children: "About" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.description })] })] }) }), _jsxs(Grid, { item: true, md: 6, xs: 12, children: [_jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, children: "Location" }), _jsx(Typography, { className: `p-12`, children: `${User?.user_details?.location ?? ""}, ${User?.user_details?.city ?? ""}, ${User?.user_details?.country ?? ""}` })] }), _jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, sx: { marginBottom: "10px" }, children: "Interests" }), _jsx(Box, { children: User?.user_details?.hobbies.map((hoby, i) => (_jsxs(Box, { className: `${classes.badge} v-center`, children: [_jsx(Box, { component: "img" }), " ", hoby] }, i))) })] })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Gender" }), _jsx(Typography, { className: `p-12`, children: User?.gender })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Age" }), _jsx(Typography, { className: `p-12`, children: "26 year" })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Religion" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.religion })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Look" }), _jsx(Typography, { className: `p-12`, children: String(User?.user_details?.personality ?? "").replace("_", " ") })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Race" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.race })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Occupations" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.profession })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Political Party" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.political_party })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Children\u2019s" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.children_before })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Highest Degree" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.highest_degree })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Smoking Habits" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.smoking_habits == true ? "True" : "False" })] }), _jsxs(Grid, { item: true, md: 4, xs: 12, children: [_jsx(Typography, { className: `p-12 ${classes.detailHeading}`, children: "Drinking Habits" }), _jsx(Typography, { className: `p-12`, children: User?.user_details?.drink_habits == true ? "True" : "False" })] })] }) }), _jsxs(Grid, { item: true, md: 3, xs: 12, children: [_jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, children: "Intro & Body Short" }), _jsxs(Grid, { container: true, spacing: 1, children: [_jsx(Grid, { item: true, xs: 6, children: _jsx(Video, { onClick: () => alert("Clicked"), src: IntroVideo }) }), _jsx(Grid, { item: true, xs: 6, children: _jsx(Video, { onClick: () => alert("Clicked"), src: BodyShort }) })] })] }), _jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, children: "Gallery" }), _jsx(Grid, { container: true, spacing: 1, children: _jsx(Grid, { item: true, xs: 4, children: _jsx(Box, { onClick: () => setisOpen(true), component: "img", className: `${classes.galleryImage}`, src: User?.user_details?.images }) }) }), _jsx(Lightbox, { isOpen: isOpen, setisOpen: (e) => {
                                        setisOpen(e);
                                    } })] })] })] }) }));
}
export default ViewProfile;
