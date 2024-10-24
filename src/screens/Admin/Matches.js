import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import matchicon1 from "../../assets/icons/matchicon1.svg";
import matchicon2 from "../../assets/icons/matchicon2.png";
import matchicon3 from "../../assets/icons/matchicon3.png";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
// import $ from "jquery";
const useStyles = makeStyles(() => {
    return {
        paymentCard: {
            backgroundColor: "#ffffff",
            padding: "20px 30px",
            borderRadius: "13px",
            boxShadow: "0px 0px 10px 0px #00000030!important",
            cursor: "pointer",
        },
        paymentCardSelected: {
            backgroundColor: "#065BCE",
            padding: "20px 30px",
            borderRadius: "13px",
            boxShadow: "0px 0px 10px 0px #00000030!important",
            cursor: "pointer",
        },
        paymentIcon: {
            width: "40px",
        },
        matchNumber: {
            fontSize: "35px!important",
            display: "flex",
            color: "white",
            alignItems: "end",
            marginBottom: "35px!important",
        },
        subscriptionAmount: {
            fontSize: "60px!important",
            color: "#ffffff",
            lineHeight: "1!important",
        },
        saveAmount: {
            color: "#ffffff",
        },
        UpdateInput: {
            outline: "none",
            border: "none",
            fontSize: "35px!important",
            // marginBottom: "45px!important",
            color: "#065BCE",
            backgroundColor: "transparent"
        },
        UpdateInputSelected: {
            outline: "none",
            border: "none",
            fontSize: "35px!important",
            // marginBottom: "45px!important",
            color: "#ffffff",
            backgroundColor: "transparent"
        },
        AmountUpdateInput: {
            outline: "none",
            border: "none",
            fontSize: "50px!important",
            // marginBottom: "45px!important",
            color: "#065BCE",
            backgroundColor: "transparent"
        },
        AmountUpdateInputSelected: {
            outline: "none",
            border: "none",
            fontSize: "50px!important",
            // marginBottom: "45px!important",
            color: "#ffffff",
            backgroundColor: "transparent"
        },
    };
});
function Matches() {
    const classes = useStyles();
    const [subscriptions, setsubscriptions] = useState([]);
    const [Token, setToken] = useState("");
    const [ToUpdate, setToUpdate] = useState("");
    const [SubscriptionDetails, setSubscriptionDetails] = useState({
        "id": "",
        "amount": "",
        "matches_per_months": ""
    });
    const UpdateSubscription = (body) => {
        APIHelper.CallApi(config.Endpoints.Subscription.Update, body, null, Token).then((result) => {
            if (result.status == "success") {
                console.log("Success", result.data);
                setSubscriptionDetails(prevDetails => ({
                    ...prevDetails,
                    "id": "",
                    "amount": "",
                    "matches_per_months": ""
                }));
                GetSubscription();
            }
            else {
                alert(String(result.message));
                console.log(result.message);
            }
        });
    };
    const handleDoubleClick = (subscription, ToUpdate) => {
        setToUpdate(ToUpdate);
        setSubscriptionDetails(prevDetails => ({
            ...prevDetails,
            "id": subscription._id,
            "amount": subscription.amount,
            "matches_per_months": subscription.matches_per_months
        }));
    };
    const handleBlur = () => {
        UpdateSubscription(SubscriptionDetails);
    };
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            setToken(String(result.data));
        }
    };
    const GetSubscription = () => {
        APIHelper.CallApi(config.Endpoints.Subscription.GetAll, {}, null, Token).then((result) => {
            if (result.status == "success") {
                console.log(result.data);
                setsubscriptions(result?.data);
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    // Other functions
    useEffect(() => {
        if (Token != "") {
            GetSubscription();
        }
        else {
            featchToken();
        }
    }, [Token]);
    return (_jsx(Box, { sx: { padding: "100px" }, children: _jsx(Grid, { container: true, spacing: 1, children: subscriptions.map((subscription, i) => {
                const matchicon = [matchicon1, matchicon2, matchicon3];
                return (_jsx(Grid, { item: true, md: 4, xs: 12, children: _jsxs(Box, { className: `${i == 1 ? classes.paymentCardSelected : classes.paymentCard}`, children: [_jsx(Box, { className: `${classes.paymentIcon}`, component: "img", src: matchicon[i] }), SubscriptionDetails.id == subscription._id && ToUpdate == "Matches" ? (_jsxs("div", { style: { marginBottom: "20px" }, children: [_jsx("input", { type: "number", className: `${i == 1 ? classes.UpdateInputSelected : classes.UpdateInput}`, value: SubscriptionDetails.matches_per_months, onChange: (e) => {
                                            setSubscriptionDetails(prevDetails => ({
                                                ...prevDetails,
                                                "matches_per_months": e.target.value,
                                            }));
                                        }, name: "fname", onBlur: () => { handleBlur(); } }), _jsx(Typography, { style: { color: i == 1 ? "#ffffff" : "#065BCE" }, children: "matches" })] })) : (_jsxs(Typography, { className: `${classes.matchNumber}`, onClick: () => { handleDoubleClick(subscription, "Matches"); }, sx: { color: i == 1 ? "#ffffff" : "#9B9B9B" }, children: [subscription.matches_per_months, _jsx(Typography, { children: "matches" })] })), _jsx(Typography, { className: `${classes.saveAmount}`, sx: { color: i == 1 ? "#ffffff" : "#9B9B9B" } }), _jsx(Box, { children: SubscriptionDetails.id == subscription._id && ToUpdate == "Amount" ? (_jsxs("div", { style: { flexDirection: "row", display: "flex" }, children: [_jsx(Typography, { className: `${i == 1 ? classes.AmountUpdateInputSelected : classes.AmountUpdateInput}`, children: "$" }), _jsx("input", { type: "number", className: `${i == 1 ? classes.AmountUpdateInputSelected : classes.AmountUpdateInput}`, value: SubscriptionDetails.amount, onChange: (e) => {
                                                setSubscriptionDetails(prevDetails => ({
                                                    ...prevDetails,
                                                    "amount": e.target.value,
                                                }));
                                            }, name: "fname", onBlur: () => { handleBlur(); } })] })
                                // <TextField
                                //   value={SubscriptionDetails.amount}
                                //   onChange={(e) => {
                                //     setSubscriptionDetails(prevDetails => ({
                                //       ...prevDetails,
                                //       "amount": e.target.value,
                                //     }))
                                //   }}
                                //   onBlur={() => { handleBlur() }}
                                //   InputLabelProps={{ shrink: false }} // Remove the label
                                //   InputProps={{ style: { borderBottom: 'none' } }}
                                // />
                                ) : (_jsxs(Typography, { className: `${classes.subscriptionAmount}`, sx: { color: i == 1 ? "#ffffff" : "#9B9B9B" }, onClick: () => { handleDoubleClick(subscription, "Amount"); }, children: ["$", subscription.amount] })) })] }) }, i));
            }) }) }));
}
export default Matches;
