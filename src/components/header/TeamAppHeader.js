import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Logo from "../../assets/logo/logo-w.png";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import ProfileDropdown from "../../assets/images/ProfileDropdown.svg";
import { Link } from "react-router-dom";
import TeamMenu from "../TeamMenu";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
const useStyles = makeStyles(() => {
    return {
        logo: {
            width: "130px",
        },
        header: {
        // paddingTop: "15px",
        },
        headerContainer: {
            backgroundColor: "#fbfbfbed",
            padding: "10px 20px",
            backdropFilter: "blur(5px)",
            borderRadius: "10px",
        },
        profileImage: {
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            border: "2px solid #01A0E6",
            objectFit: "cover",
        },
        profileName: {
            fontSize: "16px!important",
            fontWeight: "bold!important",
            color: "#000000!important",
        },
        profileLocation: {
            fontSize: "10px!important",
            lineHeight: "10px!important",
            color: "#000000",
        },
        ProfileDropdown: {
            marginLeft: "5px",
            width: "20px",
        },
    };
});
function TeamAppHeader(props) {
    const classes = useStyles();
    const [Data, setData] = useState({});
    const [Token, setToken] = useState("");
    const [UserId, setUserId] = useState("");
    const featchToken = async () => {
        const Token = await GeneralHelper.retrieveData("Token");
        const UserId = await GeneralHelper.retrieveData("UserId");
        if (Token.status == 1 && UserId.status == 1) {
            setToken(String(Token.data));
            setUserId(String(UserId.data));
        }
    };
    const GetProfile = () => {
        console.log("Getting Profile.....");
        APIHelper.CallApi(config.Endpoints.Team.GetById, {}, UserId, Token).then((result) => {
            if (result.status == "success") {
                console.log(result.data);
                setData(result?.data);
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    useEffect(() => {
        if (Token != "" && UserId != "") {
            GetProfile();
        }
        else {
            featchToken();
        }
    }, [Token]);
    return (_jsx(Box, { className: `${classes.header}`, sx: { ...props.sx }, children: _jsxs(Grid, { container: true, className: `${classes.headerContainer}`, children: [_jsx(Grid, { item: true, xs: 6, className: "d-flex", children: _jsx(Link, { to: "/dashboard", children: _jsx(Box, { component: "img", src: Logo, className: `${classes.logo}` }) }) }), _jsx(Grid, { item: true, xs: 6, children: _jsx(Box, { sx: { display: "flex", justifyContent: "flex-end" }, children: _jsx(Box, { className: "v-center", children: _jsxs(TeamMenu, { children: [_jsx(Box, { component: "img", src: Data?.profile_images, className: `${classes.profileImage}` }), _jsxs(Box, { sx: {
                                            height: "40px",
                                            marginLeft: "10px",
                                            marginRight: "10px",
                                        }, children: [_jsx(Typography, { className: `${classes.profileName}`, children: Data?.first_name }), _jsx(Typography, { className: `${classes.profileLocation}`, children: Data?.last_name })] }), _jsx(Box, { component: "img", src: ProfileDropdown })] }) }) }) })] }) }));
}
export default TeamAppHeader;
