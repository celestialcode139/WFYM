import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Button from "../../components/buttonSm";
import AgeRace from "../../components/race";
import avatar from "../../assets/images/avatar.png";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import Skeleton from '@mui/material/Skeleton';
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
            fontSize: "20px!important",
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
            maxWidth: "500px",
            width: "100%"
        },
    };
});
function ProfileScreen3() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [races, setraces] = useState([]);
    const [SelectedRace, setSelectedRace] = useState("");
    const [Token, setToken] = useState("");
    const [Loading, setLoading] = useState(false);
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            setToken(String(result.data));
        }
    };
    const GetProfile = (Token) => {
        APIHelper.CallApi(config.Endpoints.user.GetMyProfile, {}, null, Token).then((result) => {
            if (result.status == "success") {
                // console.log(result.data);
                setSelectedRace(result?.data?.user_details?.race
                    ? result.data.user_details.race
                    : "");
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const GetRace = () => {
        APIHelper.CallApi(config.Endpoints.Init.GetMetaData, {}, "race", Token).then((result) => {
            setLoading(false);
            if (result.status == "success") {
                // console.log(result.data);
                handleSort(result.data);
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    // Updating Profile Details
    const UpdateBio = () => {
        const data = {
            race: SelectedRace,
        };
        APIHelper.CallApi(config.Endpoints.user.UpdateBio, data, null, Token).then((result) => {
            setLoading(false);
            if (result.status == "success") {
                navigate("/profile/page-4");
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const handleNext = () => {
        setLoading(true);
        UpdateBio();
    };
    // Other functions
    const handleSort = (ArrayToSort) => {
        const sortedArray = [...ArrayToSort].sort((a, b) => a.value.localeCompare(b.value));
        console.log("sortedArray ", sortedArray);
        setraces(sortedArray);
    };
    useEffect(() => {
        setLoading(true);
        if (Token != "") {
            GetProfile(Token);
            GetRace();
        }
        else {
            featchToken();
        }
    }, [Token]);
    useEffect(() => {
        console.log("Selected Race ", SelectedRace);
    }, [SelectedRace]);
    return (_jsxs(_Fragment, { children: [_jsx(Box, { className: `h-center`, children: _jsx(Box, { className: `${classes.pageContainer}`, children: !Loading ?
                        _jsx(AgeRace, { data: races, race: SelectedRace, onChange: (data) => setSelectedRace(data) }, races) :
                        _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 30 }) }), _jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 30 }) }), _jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 30 }) }), _jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 30 }) }), _jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 30 }) }), _jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 30 }) }), _jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 30 }) }), _jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 30 }) })] }) }) }), _jsxs(Grid, { container: true, className: "h-center", sx: { marginTop: "40px" }, children: [_jsx(Grid, { item: true, md: 3, xs: 12, sx: { p: 1 }, children: _jsx(Button, { Loading: Loading, onClick: () => handleNext(), children: "Save Changes" }) }), _jsx(Grid, { item: true, md: 3, xs: 12, sx: { p: 1 }, children: _jsx(Button, { onClick: () => {
                                navigate(-1);
                            }, className: `${classes.cancelBtn}`, children: "Cancel" }) })] })] }));
}
export default ProfileScreen3;
