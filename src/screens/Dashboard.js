import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, CircularProgress, Container, Grid, Typography, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import HeaderApp from "../components/header/AppHeader";
import BorderedBG from "../assets/images/borderedBG.png";
import matchBlue from "../assets/icons/matchBlue.svg";
import matchWhite from "../assets/icons/matchWhite.svg";
import msgBlue from "../assets/icons/msgBlue.svg";
import msgWhite from "../assets/icons/msgWhite.svg";
import MatchCards from "../components/matchCards";
import ProfileSummery from "../components/ProfileSummery";
import { useNavigate } from "react-router-dom";
import Alert from "../Helpers/Alert";
import Carousel from "../components/Carousel";
import ButtonSm from "../components/buttonSm";
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import NoMatches from "../assets/images/no_matches.svg";
import { ToastContainer } from "react-toastify";
// import $ from "jquery";
const useStyles = makeStyles(() => {
    return {
        appheader: {
            backgroundColor: "#ffffff",
            minHeight: "100vh",
            backgroundImage: `url(${AdminSignature})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            overflow: "hidden"
        },
        logo: {
            width: "130px",
        },
        header: {
        //   paddingTop: "15px",
        },
        headerContainer: {
            backgroundColor: "#f9f9f9ed",
            padding: "10px 20px",
            backdropFilter: "blur(5px)",
            borderRadius: "10px",
        },
        profileImage: {
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            border: "2px solid #01A0E6",
        },
        profileName: {
            fontSize: "16px!important",
            fontWeight: "bold!important",
        },
        profileLocation: {
            fontSize: "10px!important",
            lineHeight: "10px!important",
        },
        ProfileDropdown: {
            marginLeft: "5px",
            width: "20px",
        },
        BorderedBG: {
            backgroundImage: `url(${BorderedBG})`,
            borderRadius: "15px",
            backgroundSize: "100% 100%",
        },
        toggleBtn: {
            border: "1px solid #E8E6EA",
            display: "flex",
            padding: "8px",
            backgroundColor: "white",
            borderRadius: "10px",
            justifyContent: "space-between",
            cursor: "pointer",
        },
        activeToggleBtn: {
            backgroundColor: "#000000!important",
            boxShadow: "6px 7px 11px #00000057",
            border: "unset!important",
        },
        circleBadge: {
            height: "20px",
            width: "20px",
            display: "flex",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
            border: "1px solid #E8E6EA",
        },
        stickyContainer: {
            position: "sticky",
            top: "0px",
            zIndex: "999999",
            background: "#f9f9f9",
            borderRadius: "10px",
            // boxShadow: "6px 7px 17px #00000017",
            padding: "10px",
        },
        prt200: {
            position: "relative",
            top: "150px",
        },
    };
});
function Dashboard() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(false);
    const [RequestMatchLoading, setRequestMatchLoading] = useState(false);
    const [matchMessage, setmatchMessage] = useState("match");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matchHistory, setmatchHistory] = useState([]);
    const [matchFavourite, setmatchFavourite] = useState([]);
    const [matches, setmatches] = useState([]);
    const [matchStatus, setmatchStatus] = useState("");
    const [Token, setToken] = useState("");
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            setToken(String(result.data));
        }
    };
    const GetLatestMatch = () => {
        setLoading(true);
        APIHelper.CallApi(config.Endpoints.Match.GetLatestMatch, {}, null, Token).then((result) => {
            if (result.status == "success") {
                console.log("Setting Matches:", result.data);
                setmatches(result.data[0]?.match_result ?? []);
                setmatchStatus(result.data[0]?.status ?? "");
                setLoading(false);
            }
            else {
                setLoading(false);
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const VerifyAccountCompletion = () => {
        setRequestMatchLoading(true);
        APIHelper.CallApi(config.Endpoints.user.GetProfileVerification, {}, null, Token).then((result) => {
            if (result.status == "success") {
                console.log("result ", result.data);
                if (result.data.isProfileVerified.status == false) {
                    Alert.notify(`Compleate Your Profile First. ${result.data.isProfileVerified.msg}`, 3000);
                    setRequestMatchLoading(false);
                    NavigateTo("/profile/page-1");
                }
                else if (result.data.isIdealPersonVerified.status == false) {
                    Alert.notify(`Compleate Your Ideal Personality Profile. ${result.data.isIdealPersonVerified.msg}`, 3000);
                    setRequestMatchLoading(false);
                    NavigateTo("/ideal-personality/general-info");
                }
                else if (result.data.isSubscriptionActive == false) {
                    Alert.notify("Please Buy A Subscription First.", 3000);
                    setRequestMatchLoading(false);
                    NavigateTo("/buy-matches");
                }
                else if (result.data.isProfileMediaVerified.status == false) {
                    Alert.notify("Please Complete your profile media first.", 3000);
                    setRequestMatchLoading(false);
                    NavigateTo("/profile/media");
                }
                else {
                    RequestMatch();
                }
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const NavigateTo = (Route) => {
        setTimeout(() => {
            navigate(Route);
        }, 4000);
    };
    const RequestMatch = () => {
        console.log("Click On Request Match");
        setLoading(true);
        APIHelper.CallApi(config.Endpoints.Match.RequestMatch, {}, null, Token).then((result) => {
            if (result.status == "success") {
                Alert.notify("Match Requested", 3000);
                console.log("Request Matches:", result.data);
                // setmatches(result.data[0]?.match_result ?? []);
                setLoading(false);
                setRequestMatchLoading(false);
                GetLatestMatch();
            }
            else {
                setLoading(false);
                setRequestMatchLoading(false);
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const GetMatchHistory = () => {
        setLoading(true);
        APIHelper.CallApi(config.Endpoints.Match.GetMatches, {}, "?use_auth_user_id=true&is_discard=false", Token).then((result) => {
            if (result.status == "success") {
                console.log(result);
                setmatchHistory(result?.data[0]?.match_result ?? []);
                setLoading(false);
                // setGender(result?.data?.gender ? result.data.gender : "");
            }
            else {
                setLoading(false);
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const GetFavourites = () => {
        setLoading(true);
        APIHelper.CallApi(config.Endpoints.Match.GetMatches, {}, "?use_auth_user_id=true&is_fav=true", Token).then((result) => {
            if (result.status == "success") {
                console.log(result.data);
                setmatchFavourite(result?.data[0]?.match_result ?? []);
                setLoading(false);
                // setmatchHistory(result.data[0].match_result);
                // setGender(result?.data?.gender ? result.data.gender : "");
            }
            else {
                setLoading(false);
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const FavDecline = (body) => {
        let data = { ...body };
        APIHelper.CallApi(config.Endpoints.Match.FavDecline, data, null, Token).then((result) => {
            if (result.status == "success") {
                console.log(result.data);
                init();
                // setmatchHistory(result.data[0].match_result);
                // setGender(result?.data?.gender ? result.data.gender : "");
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const init = () => {
        GetMatchHistory();
        GetFavourites();
        GetLatestMatch();
    };
    useEffect(() => {
        if (Token != "") {
            init();
        }
        else {
            featchToken();
        }
    }, [Token]);
    const calculateAge = (birthDate) => {
        var birthDateObject = new Date(birthDate);
        var currentDate = new Date();
        var timeDifference = currentDate - birthDateObject;
        var age = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
        return age;
    };
    useEffect(() => {
        console.log("matchHistory:", matchHistory);
    }, [matchHistory]);
    return (_jsxs(Box, { className: `${classes.appheader}`, children: [_jsxs(Container, { maxWidth: "xl", children: [_jsx(HeaderApp, { sx: { position: "relative", top: "15px" } }), _jsxs(Grid, { container: true, sx: { marginTop: "20px" }, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, md: 3.5, children: _jsxs(Box, { className: `blurBg h100 ${classes.BorderedBG}`, sx: { minHeight: "400px", padding: "15px" }, children: [_jsx(Box, { className: `${classes.stickyContainer}`, children: _jsxs(Grid, { container: true, spacing: 1, children: [_jsx(Grid, { item: true, xs: 6, onClick: () => setmatchMessage("match"), children: _jsxs(Box, { className: `${classes.toggleBtn} ${matchMessage == "match" ? classes.activeToggleBtn : null}`, children: [_jsxs(Box, { className: `d-flex`, children: [_jsx(Box, { component: "img", src: matchMessage == "match" ? msgWhite : msgBlue, sx: { width: "20px" } }), _jsx(Box, { className: `v-center`, sx: {
                                                                                fontSize: "12px",
                                                                                marginLeft: "3px",
                                                                                color: matchMessage == "match" ? "white" : "black",
                                                                            }, children: "Matches" })] }), _jsx(Box, { sx: {
                                                                        color: matchMessage == "match" ? "white" : "black",
                                                                    }, className: `${classes.circleBadge}`, children: matchHistory?.length })] }) }), _jsx(Grid, { item: true, xs: 6, onClick: () => setmatchMessage("message"), children: _jsxs(Box, { className: `${classes.toggleBtn} ${matchMessage != "match" ? classes.activeToggleBtn : null}`, children: [_jsxs(Box, { className: `d-flex`, children: [_jsx(Box, { component: "img", src: matchMessage != "match" ? matchWhite : matchBlue, sx: { width: "20px" } }), _jsx(Box, { className: `v-center`, sx: {
                                                                                fontSize: "12px",
                                                                                marginLeft: "3px",
                                                                                color: matchMessage != "match" ? "white" : "black",
                                                                            }, children: "Favourite" })] }), _jsx(Box, { sx: {
                                                                        color: matchMessage != "match" ? "white" : "black",
                                                                    }, className: `${classes.circleBadge}`, children: matchFavourite?.length })] }) })] }) }), matchHistory?.length <= 0 ? (_jsx(Box, { className: "h-center", children: _jsx(Box, { sx: { width: "80%" }, component: "img", src: NoMatches }) })) : (_jsx(Grid, { container: true, spacing: 1, sx: { marginTop: "1px" }, children: Loading ? (_jsx(CircularProgress, { color: "inherit", size: 20 })) : matchMessage == "match" ? (matchHistory?.map((history, i) => (_jsx(Grid, { item: true, xs: 6, children: _jsx(MatchCards, { FavDecline: (e) => FavDecline(e), name: `${history.result_user_id.first_name} ${history.result_user_id.last_name}`, age: calculateAge(history.result_user_id.dob), img: history.result_user_id?.user_details?.images, _id: history.result_user_id._id, request_id: history._id, is_fav: history?.is_fav, is_discard: history?.is_discard }) }, i)))) : (matchFavourite.map((favourite, i) => (_jsx(Grid, { item: true, xs: 6, children: _jsx(MatchCards, { FavDecline: (e) => FavDecline(e), name: `${favourite.result_user_id.first_name} ${favourite.result_user_id.last_name}`, age: calculateAge(favourite.result_user_id.dob), img: favourite.result_user_id?.profile_images
                                                        ? favourite.result_user_id.profile_images
                                                        : "https://i.pravatar.cc/150", _id: favourite.result_user_id._id, request_id: favourite._id, is_fav: favourite?.is_fav, is_discard: favourite?.is_discard }) }, i)))) }))] }) }), _jsx(Grid, { item: true, xs: 12, md: matchHistory?.length > 0 ? 5 : 8.5, children: _jsxs(Box, { className: `blurBg h100  ${classes.BorderedBG} `, sx: { minHeight: "400px", padding: "15px" }, children: [_jsxs(Box, { className: "sticky", sx: { display: matchHistory?.length > 0 ? "block" : "none" }, children: [_jsxs(Box, { className: "space-between v-center", children: [_jsxs(Box, { children: [_jsx(Typography, { className: `f-22-bold mb-10`, sx: { marginTop: "10px", color: "#000000" }, children: "Discover" }), _jsxs(Typography, { className: `p-12`, children: [matchHistory?.length, " matches found"] })] }), _jsx(Box, { children: _jsx(ButtonSm, { onClick: () => (matchStatus == "completed" || matchStatus == "") ? RequestMatch() : null, sx: { maxWidth: "150px", margin: "0 auto!important" }, children: matchStatus == "completed" || matchStatus == "" ?
                                                                    // "Request Matches"
                                                                    `Request Matches`
                                                                    :
                                                                        `Request Is ${String(matchStatus)}` }) })] }), _jsx(Carousel, { data: matchHistory, currentIndex: (e) => setCurrentIndex(e) })] }), matchHistory.length == 0 && (_jsx(Box, { className: `${classes.prt200}`, sx: { display: matches?.length > 0 ? "none" : "block" }, children: _jsxs(Box, { children: [_jsx(Typography, { className: `f-35-bold mb-10 pText text-center`, children: matchStatus == ""
                                                            ? "Start matching"
                                                            : matchStatus == "pending"
                                                                ? "Waiting for admin response!"
                                                                : "" }), _jsx(Typography, { className: `p-12 text-center`, children: "Start a conversation now with each other" }), _jsx(Box, { sx: { marginTop: "35px" }, children: matchStatus == "" ? (_jsx(ButtonSm, { onClick: () => VerifyAccountCompletion(), Loading: RequestMatchLoading, sx: { maxWidth: "150px", margin: "0 auto!important" }, children: "Request Matches" })) : null })] }) }))] }) }), _jsx(Grid, { item: true, xs: 12, md: 3.5, sx: { display: matchHistory?.length <= 0 ? "none" : null }, children: _jsx(Box, { className: `blurBg h100 ${classes.BorderedBG}`, sx: { minHeight: "400px" }, children: _jsx(ProfileSummery, { data: matchHistory[currentIndex] }, currentIndex) }) })] })] }), _jsx(ToastContainer, {})] }));
}
export default Dashboard;
