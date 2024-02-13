import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import Button from "../../components/buttonSm";
import GeneralinfoComp from "../../components/generalinfo";
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
            maxWidth: "800px",
        },
        TextFieldParent: {
            marginBottom: "20px",
        },
    };
});
function Generalinfo() {
    const classes = useStyles();
    const [Token, setToken] = useState("");
    const [body, setbody] = useState({
        occupation: "",
        religion: "principled",
        political_Party: "",
        childrens: "",
        planForChildren: false,
        smookingHabit: false,
        drinkingHabit: false,
        dealBracker: "",
        height: "",
        weight: "",
        highestDegree: "",
    });
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            setToken(String(result.data));
        }
    };
    const GetProfile = (Token) => {
        APIHelper.CallApi(config.Endpoints.user.GetMyProfile, {}, null, Token).then((result) => {
            if (result.status == "success") {
                console.log(result.data);
                setbody(result?.data?.user_details?.personality
                    ? result.data.user_details.personality
                    : "");
                setbody({
                    ...body,
                    occupation: result?.data?.user_details?.profession,
                    religion: result?.data?.user_details?.religion,
                    political_Party: result?.data?.user_details?.political_party,
                    childrens: result?.data?.user_details?.children_before,
                    smookingHabit: result?.data?.user_details?.smoking_habits,
                    drinkingHabit: result?.data?.user_details?.drink_habits,
                    dealBracker: result?.data?.user_details?.deal_breaker,
                    height: result?.data?.user_details?.height,
                    weight: result?.data?.user_details?.weight,
                    highestDegree: result?.data?.user_details?.highest_degree,
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
            profession: body.occupation,
            religion: body.religion,
            political_party: body.political_Party,
            children_before: body.childrens,
            smoking_habits: body.smookingHabit,
            drink_habits: body.drinkingHabit,
            deal_breaker: body.dealBracker,
            height: body.height,
            weight: body.weight,
            highest_degree: body.highestDegree,
        };
        APIHelper.CallApi(config.Endpoints.user.UpdateBio, data, null, Token).then((result) => {
            if (result.status == "success") {
                GeneralHelper.ShowToast(String("Profile Updated"));
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
    return (_jsx(Box, { className: `${classes.appheader}`, children: _jsxs(Container, { maxWidth: "xl", children: [_jsx(HeaderApp, { sx: { position: "relative", top: "15px" } }), _jsx(Box, { sx: { marginTop: "30px", padding: "20px", position: "relative" }, className: `blurBg min100vh h-center`, children: _jsxs(Box, { className: `${classes.pageContainer}`, sx: { marginTop: { md: "100px", sm: "60px", xs: "30px" } }, children: [_jsx(GeneralinfoComp, { body: body, onChange: (e) => {
                                    setbody(e);
                                } }, body), _jsx(Button, { onClick: () => handleNext(), sx: {
                                    maxWidth: "200px",
                                    margin: "0 auto",
                                    marginTop: { md: "80", sm: "50px", xs: "30px" },
                                }, children: "Next" })] }) })] }) }));
}
export default Generalinfo;
