import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import Logo from "../assets/logo/logo-w.svg";
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
    };
});
function Paypal() {
    const classes = useStyles();
    const [totalAmount, settotalAmount] = useState(0);
    const [success, setSuccess] = useState(false);
    const [orderID, setOrderID] = useState(false);
    // creates a paypal order
    const CLIENT_ID = "AYoh8drAroRtRyeLuk8M8Wsp0rqFgdHehZsmpnWYPn19VifykjiZ8nt9Qs8rY3W5NdJ0AZqBcmELdzX9";
    const createOrder = (data, actions) => {
        return actions.order
            .create({
            purchase_units: [
                {
                    description: "Buy Match | WFYM",
                    amount: {
                        currency_code: "USD",
                        value: totalAmount,
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
            setSuccess(true);
        });
    };
    //capture likely error
    // const onError = (data: any, actions: any) => {};
    useEffect(() => {
        if (success) {
            handleParamChange("status", "completed");
            handleParamChange("order-id", orderID);
            console.log("Order successful . Your order id is--", orderID);
        }
    }, [success]);
    useEffect(() => {
        const currentUrl = window.location.search;
        const params = new URLSearchParams(currentUrl);
        const amount = params.get("amount");
        settotalAmount(amount);
        console.log("Amount:", amount);
        setTimeout(() => {
            //   handleParamChange("status", "completed");
        }, 5000);
    }, []);
    const handleParamChange = (key, newStatus) => {
        // Update the 'amount' parameter in the URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set(key, newStatus);
        window.history.pushState({}, "", newUrl.href);
        // Update the state to reflect the new amount
    };
    return (_jsx(PayPalScriptProvider, { options: { "client-id": CLIENT_ID, enableFunding: "venmo" }, children: _jsx(Box, { className: `${classes.appheader}`, children: _jsx(Container, { maxWidth: "xl", children: _jsxs(Box, { sx: { margin: "0 auto", padding: "10px", height: "100vh" }, className: `blurBg`, children: [_jsx(Box, { className: `h-center`, sx: { marginTop: "50px", marginBottom: "30px" }, children: _jsx(Box, { component: "img", src: Logo }) }), _jsx(PayPalButtons, { style: { layout: "vertical", width: "100%" }, createOrder: createOrder, onApprove: onApprove })] }) }) }) }));
}
export default Paypal;
