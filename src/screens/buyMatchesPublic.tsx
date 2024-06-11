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
import ButtonSm from "../components/buttonSm";
import { useAuth } from "../context/AuthContextProvider";
import { ISubscription, IUserSubscription } from "../types";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
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
			padding: "20px 13px",
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
function buyMatchesPublic() {
	// const { sessionUser,loadSession } = useAuth();
	// const subscriptionData: IUserSubscription =
	// 	typeof sessionUser.user_subscriptions !== "string"
	// 		? sessionUser.user_subscriptions
	// 		: null;
	// console.log("sessionUsersessionUser", subscriptionData);
	// const isSubscriptionActive =
	// 	moment(subscriptionData.expire_at).isAfter(moment()) &&
	// 	!!subscriptionData.remaining_matches;
	const classes = useStyles();
	const [params, setParams] = useSearchParams()
	console.log("paramsparams", params.get('name'));
	const body = {
		name: params.get('name'),
		id: params.get('id'),
		amount: params.get('amount')
	}
	const [subscriptions, setsubscriptions] = useState<ISubscription[]>([]);
	const [Token, setToken] = useState("");
	const [paymentButton, setpaymentButton] = useState(false);
	const [success, setSuccess] = useState(false);
	const [orderID, setOrderID] = useState(false);
	const [amount, setamount] = useState(0);
	const [subscription_id, setsubscription_id] = useState(
		""
	);
	console.log("subscription_idsubscription_id", subscription_id);
	const [userId, setuserId] = useState("0");

	// const featchToken = async () => {
	// 	const result: any = await GeneralHelper.retrieveData("Token");
	// 	if (result.status == 1) {
	// 		setToken(String(result.data));
	// 	}
	// };

	const BuySubscription = (user_id: any, subscription_id: any) => {

		// APIHelper.CallApi(
		// 	config.Endpoints.Subscription.AssignSubsecription,
		// 	{
		// 		user_id: user_id,
		// 		subscription_id: subscription_id,
		// 	},
		// 	null,
		// 	Token
		// ).then((result: any) => {
		// 	if (result.status == "success") {
		// 		console.log(result.data);
		// 	} else {
		// 		console.log(result.message);
		// 		GeneralHelper.ShowToast(String(result.message));
		// 	}
		// });
	};


	// creates a paypal order
	const CLIENT_ID =
		"AYoh8drAroRtRyeLuk8M8Wsp0rqFgdHehZsmpnWYPn19VifykjiZ8nt9Qs8rY3W5NdJ0AZqBcmELdzX9";
	const createOrder = (data: any, actions: any) => {
		console.log(data);

		return actions.order
			.create({
				purchase_units: [
					{
						description: `Buy Matches  ${body.name} ,id: ${body.id}`,
						amount: {
							currency_code: "USD",
							value: body.amount,
						},
					},
				],
			})
			.then((orderID: any) => {
				console.log("orderID", orderID);

				// setOrderID(orderID);
				return orderID;
			});
	};

	// check Approval
	const onApprove = (data: any, actions: any) => {
		return actions.order.capture().then(async function (details: any) {
			const { payer } = details;
			console.log("detailsdetailsdetails", details);
			(window as any).ReactNativeWebView &&
			(window as any).ReactNativeWebView.postMessage(JSON.stringify(details));
			// await loadSession();
			setSuccess(true);
		});
	};
	// const fetchUserId = async () => {
	// 	const result: any = await GeneralHelper.retrieveData("UserId");
	// 	if (result.status == 1) {
	// 		setuserId(String(result.data));
	// 	}
	// };

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

	return (
		<PayPalScriptProvider
			options={{ clientId: CLIENT_ID, enableFunding: "venmo" }}
		>
			<Box className={`${classes.appheader}`}>
				<Container maxWidth="xl">
					{/* <HeaderApp sx={{ position: "relative", top: "15px" }} /> */}

					<Box
						sx={{
							padding: "20px",
							position: "relative",
						}}
						className={`blurBg min100vh h-center`}
					>
						<Box>
							{paymentButton == true ? (
								<ButtonSm
									onClick={() => {
										setpaymentButton(false);
									}}
									sx={{
										width: "150px!important",
										height: "50px!important",
										margin: "0 auto!important",
										fontSize: "20px!important",
									}}
								>
									Back
								</ButtonSm>
							) : null}
						</Box>
						<Box
							className={`${classes.pageContainer}`}
							sx={{
								marginTop: {
									md: "30px",
									sm: "30px",
									xs: "20px",
								},
							}}
						>
							<Box>
								<Box className="h-center">
									<Box
										sx={{ width: "80px", margin: "0 auto" }}
										component="img"
										src={MatchIcon}
									></Box>
								</Box>
								<Box sx={{ marginBottom: "20px" }}>
									<Typography
										className={`f-35-bold mb-10 pText text-center`}
									>
										Connect with people{" "}
									</Typography>
									<Typography
										className={`p-12 text-center`}
									></Typography>
								</Box>


								<PayPalButtons
									style={{ layout: "vertical" }}
									createOrder={createOrder}
									onApprove={onApprove}
								/>

							</Box>
						</Box>
					</Box>
				</Container>
			</Box>
		</PayPalScriptProvider>
	);
}

export default buyMatchesPublic;
