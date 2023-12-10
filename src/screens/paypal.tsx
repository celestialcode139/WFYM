import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import HeaderApp from "../components/header/AppHeader";
import AdminSignature from "../assets/images/adminSignature.svg";
import Logo from "../assets/logo/logo-w.svg";

import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import $ from "jquery";

const useStyles = makeStyles(() => {
  const theme = useTheme();
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
  const navigate = useNavigate();
  const [Token, setToken] = useState("");
  const [totalAmount, settotalAmount] = useState<any>(0);
  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const CLIENT_ID =
    "AYoh8drAroRtRyeLuk8M8Wsp0rqFgdHehZsmpnWYPn19VifykjiZ8nt9Qs8rY3W5NdJ0AZqBcmELdzX9";
  const createOrder = (data: any, actions: any) => {
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
      .then((orderID: any) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data: any, actions: any) => {};
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
    let amount = params.get("amount");
    settotalAmount(amount);
    console.log("Amount:", amount);
    setTimeout(() => {
      //   handleParamChange("status", "completed");
    }, 5000);
  }, []);

  const handleParamChange = (key: string, newStatus: any) => {
    // Update the 'amount' parameter in the URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(key, newStatus);
    window.history.pushState({}, "", newUrl.href);

    // Update the state to reflect the new amount
  };

  return (
    <PayPalScriptProvider
      options={{ "client-id": CLIENT_ID, enableFunding: "venmo" }}
    >
      <Box className={`${classes.appheader}`}>
        <Container maxWidth="xl">
          <Box
            sx={{ margin: "0 auto", padding: "10px", height: "100vh" }}
            className={`blurBg`}
          >
            <Box className={`h-center`} sx={{marginTop:"50px",marginBottom:"30px"}}>
              <Box component="img" src={Logo}></Box>
            </Box>
            <PayPalButtons
              style={{ layout: "vertical", width: "100%" }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          </Box>
        </Container>
      </Box>
    </PayPalScriptProvider>
  );
}

export default Paypal;