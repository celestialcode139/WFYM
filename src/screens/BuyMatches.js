import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import MatchIcon from "../assets/icons/matchicon.png";
import matchicon1 from "../assets/icons/matchicon1.svg";
import matchicon2 from "../assets/icons/matchicon2.png";
import matchicon3 from "../assets/icons/matchicon3.png";
import HeaderApp from "../components/header/AppHeader";
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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
        paymentCard: {
            backgroundColor: "#ffffff",
            padding: "20px 30px",
            borderRadius: "13px",
            boxShadow: "0px 0px 10px 0px #00000030!important",
            cursor: "pointer",
        },
        paymentIcon: {
            width: "40px",
        },
        pageContainer: {
            maxWidth: "700px",
            width: "100%",
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
    };
});
function Race() {
    const classes = useStyles();
    const [subscriptions, setsubscriptions] = useState([]);
    const [Token, setToken] = useState("");
    const [paymentButton, setpaymentButton] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderID, setOrderID] = useState(false);
    const [amount, setamount] = useState(0);
    const [subscription_id, setsubscription_id] = useState(0);
    const [userId, setuserId] = useState("0");
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
    const BuySubscription = (user_id, subscription_id) => {
        APIHelper.CallApi(config.Endpoints.Subscription.AssignSubsecription, {
            user_id: user_id,
            subscription_id: subscription_id,
        }, null, Token).then((result) => {
            if (result.status == "success") {
                console.log(result.data);
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
        fetchUserId();
    }, [Token]);
    // creates a paypal order
    const CLIENT_ID = "AYoh8drAroRtRyeLuk8M8Wsp0rqFgdHehZsmpnWYPn19VifykjiZ8nt9Qs8rY3W5NdJ0AZqBcmELdzX9";
    const createOrder = (data, actions) => {
        console.log(data);
        return actions.order
            .create({
            purchase_units: [
                {
                    description: "Buy Matches",
                    amount: {
                        currency_code: "USD",
                        value: amount,
                    },
                },
            ],
        })
            .then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };
    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            console.log(data, payer);
            setSuccess(true);
        });
    };
    const fetchUserId = async () => {
        const result = await GeneralHelper.retrieveData("UserId");
        if (result.status == 1) {
            setuserId(String(result.data));
        }
    };
    //capture likely error
    useEffect(() => {
        if (success) {
            BuySubscription(userId, subscription_id);
            console.log("Order successful . Your order id is--", {
                orderID,
                userId,
                subscription_id,
            });
        }
    }, [success]);
    return (_jsx(PayPalScriptProvider, { options: { "client-id": CLIENT_ID, enableFunding: "venmo" }, children: _jsx(Box, { className: `${classes.appheader}`, children: _jsxs(Container, { maxWidth: "xl", children: [_jsx(HeaderApp, { sx: { position: "relative", top: "15px" } }), _jsx(Box, { sx: { marginTop: "30px", padding: "20px", position: "relative" }, className: `blurBg min100vh h-center`, children: _jsx(Box, { className: `${classes.pageContainer}`, sx: { marginTop: { md: "30px", sm: "30px", xs: "20px" } }, children: _jsxs(Box, { children: [_jsx(Box, { className: "h-center", children: _jsx(Box, { sx: { width: "80px", margin: "0 auto" }, component: "img", src: MatchIcon }) }), _jsxs(Box, { sx: { marginBottom: "20px" }, children: [_jsx(Typography, { className: `f-35-bold mb-10 pText text-center`, children: "Unlimited Match" }), _jsx(Typography, { className: `p-12 text-center`, children: "Connect with people" })] }), paymentButton == false ? (_jsx(Grid, { container: true, spacing: 1, children: subscriptions.map((subscription, i) => {
                                            let matchicon = [matchicon1, matchicon2, matchicon3];
                                            return (_jsx(Grid, { item: true, md: 4, xs: 12, children: _jsxs(Box, { onClick: () => {
                                                        setpaymentButton(true);
                                                        setamount(subscription.amount);
                                                        setsubscription_id(subscription._id);
                                                    }, className: `${classes.paymentCard}`, sx: {
                                                        backgroundColor: i == 1 ? "#065BCE" : "#ffffff",
                                                    }, children: [_jsx(Box, { className: `${classes.paymentIcon}`, component: "img", src: matchicon[i] }), _jsxs(Typography, { className: `${classes.matchNumber}`, sx: { color: i == 1 ? "#ffffff" : "#9B9B9B" }, children: [subscription.matches_per_months, _jsx(Typography, { children: "matches" })] }), _jsx(Typography, { className: `${classes.saveAmount}`, sx: { color: i == 1 ? "#ffffff" : "#9B9B9B" } }), _jsxs(Typography, { className: `${classes.subscriptionAmount}`, sx: { color: i == 1 ? "#ffffff" : "#9B9B9B" }, children: ["$", subscription.amount] })] }) }, i));
                                        }) })) : (_jsx(PayPalButtons, { style: { layout: "vertical" }, createOrder: createOrder, onApprove: onApprove }))] }) }) })] }) }) }));
}
export default Race;
