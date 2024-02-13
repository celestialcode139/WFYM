import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import Button from "../../components/buttonSm";
import GeneralinfoComp from "../../components/profilegeneralinfo";
import { useNavigate } from "react-router-dom";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
// import $ from "jquery";
const useStyles = makeStyles(() => {
    return {
        appheader: {
            backgroundColor: "#ffffff",
            minHeight: "100vh",
            backgroundImage: `url(${AdminSignature})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
        },
        pageContainer: {
            width: "100%",
            maxWidth: "500px",
        },
        TextFieldParent: {
            marginBottom: "20px",
        },
    };
});
function Generalinfo() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [Token, setToken] = useState("");
    const [body, setbody] = useState({
        minAge: 25,
        maxAge: 35,
        description: "",
        religion: "",
        political_Party: "",
        beforeChildren: false,
        location: "",
    });
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            setToken(String(result.data));
        }
    };
    const GetProfile = (Token) => {
        APIHelper.CallApi(config.Endpoints.user.GetIdealPersonality, {}, null, Token).then((result) => {
            if (result.status == "success") {
                console.log("Ideal Person Details ", result.data);
                console.log("Ideal Person Details Min age", result?.data?.minAge);
                setbody({
                    ...body,
                    minAge: result?.data?.minAge != undefined ? result?.data?.minAge : 25,
                    maxAge: result?.data?.maxAge != undefined ? result?.data?.maxAge : 35,
                    description: result?.data?.description,
                    religion: result?.data?.religion,
                    political_Party: result?.data?.political_party,
                    beforeChildren: result?.data?.children_before,
                    location: result?.data?.location,
                });
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
            minAge: body.minAge,
            maxAge: body.maxAge,
            children_before: body.beforeChildren
        };
        if (body.description !== "") {
            data.description = body.description;
        }
        if (body.religion !== "") {
            data.religion = body.religion;
        }
        if (body.political_Party !== "") {
            data.political_party = body.political_Party;
        }
        if (body.location !== "") {
            data.location = body.location;
        }
        console.log("Sending ....", data);
        APIHelper.CallApi(config.Endpoints.user.UpdateIdealPersonality, data, null, Token).then((result) => {
            if (result.status == "success") {
                // Alert.notify("Questioner Updated Successfully!");
                navigate("/ideal-personality/looking-for");
                // setTimeout(() => {
                // }, 6000);
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const handleNext = () => {
        UpdateBio();
    };
    // Other functions
    useEffect(() => {
        if (Token != "") {
            GetProfile(Token);
        }
        else {
            featchToken();
        }
    }, [Token]);
    return (_jsx(Box, { className: `${classes.appheader}`, children: _jsxs(Container, { maxWidth: "xl", children: [_jsx(HeaderApp, { sx: { position: "relative", top: "15px" } }), _jsx(Box, { sx: { marginTop: "30px", padding: "20px", position: "relative" }, className: `blurBg min100vh h-center`, children: _jsxs(Box, { className: `${classes.pageContainer}`, sx: { marginTop: { md: "100px", sm: "60px", xs: "30px" } }, children: [body.description != "" && (_jsx(GeneralinfoComp, { body: body, onChange: (e) => {
                                    console.log(e);
                                    setbody(e);
                                } }, body)), _jsx(Button, { onClick: () => handleNext(), sx: {
                                    maxWidth: "200px",
                                    margin: "0 auto",
                                    marginTop: { md: "80", sm: "50px", xs: "30px" },
                                }, children: "Next" })] }) })] }) }));
}
export default Generalinfo;
