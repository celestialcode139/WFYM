import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import Button from "../../components/buttonSm";
import avatar from "../../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import Looks from "../../components/looks";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import Skeleton from '@mui/material/Skeleton';
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
            maxWidth: "80%",
            width: "100%"
        },
    };
});
function ProfileScreen4() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [activeLook, setactiveLook] = useState("");
    const [Token, setToken] = useState("");
    const [Gender, setGender] = useState("male");
    const [Loading, setLoading] = useState(false);
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            setToken(String(result.data));
        }
    };
    const GetProfile = (Token) => {
        APIHelper.CallApi(config.Endpoints.user.GetMyProfile, {}, null, Token).then((result) => {
            setLoading(false);
            if (result.status == "success") {
                console.log("Profile Details ", result.data);
                setGender(result.data.gender);
                setactiveLook(result?.data?.user_details?.personality
                    ? result.data.user_details.personality
                    : "");
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
            personality: activeLook,
        };
        APIHelper.CallApi(config.Endpoints.user.UpdateBio, data, null, Token).then((result) => {
            setLoading(false);
            if (result.status == "success") {
                navigate("/profile/page-5");
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
    useEffect(() => {
        setLoading(true);
        if (Token != "") {
            GetProfile(Token);
        }
        else {
            featchToken();
        }
    }, [Token]);
    return (_jsxs(_Fragment, { children: [_jsx(Box, { className: `h-center`, children: _jsx(Box, { className: `${classes.pageContainer}`, children: !Loading ? _jsx(Looks, { gender: Gender, look: activeLook, onChange: (look) => {
                            setactiveLook(look);
                        } }, activeLook)
                        :
                            _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 250 }) }), _jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 250 }) }), _jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 250 }) }), _jsx(Grid, { item: true, md: 3, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 250 }) })] }) }) }), _jsxs(Grid, { container: true, className: "h-center", sx: { marginTop: "40px" }, children: [_jsx(Grid, { item: true, md: 3, xs: 12, sx: { p: 1 }, children: _jsx(Button, { Loading: Loading, onClick: () => handleNext(), children: "Save Changes" }) }), _jsx(Grid, { item: true, md: 3, xs: 12, sx: { p: 1 }, children: _jsx(Button, { onClick: () => {
                                navigate(-1);
                            }, className: `${classes.cancelBtn}`, children: "Cancel" }) })] })] }));
}
export default ProfileScreen4;
