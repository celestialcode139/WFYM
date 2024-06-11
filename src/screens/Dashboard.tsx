import { useState, useEffect } from "react";
import {
	Box,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import HeaderApp from "../components/header/AppHeader";
import BorderedBG from "../assets/images/borderedBG.png";
import matchBlue from "../assets/icons/matchBlue.svg";
import matchWhite from "../assets/icons/matchWhite.svg";
import msgBlue from "../assets/icons/msgBlue.svg";
import msgWhite from "../assets/icons/msgWhite.svg";
import MatchCards from "../components/matchCards";
import ProfileSummery from "../components/ProfileSummery";
import { useNavigate } from "react-router-dom";
import Alert from "../Helpers/Alert";
import Carousel from "../components/Carousel";
import ButtonSm from "../components/buttonSm";
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import NoMatches from "../assets/images/no_matches.svg";
import { ToastContainer } from "react-toastify";

// import $ from "jquery";

const useStyles = makeStyles(() => {
	return {
		appheader: {
			backgroundColor: "#ffffff",
			minHeight: "100vh",
			backgroundImage: `url(${AdminSignature})`,
			backgroundSize: "100%",
			backgroundRepeat: "no-repeat",
			overflow: "hidden",
		},
		logo: {
			width: "130px",
		},
		header: {
			//   paddingTop: "15px",
		},
		headerContainer: {
			backgroundColor: "#f9f9f9ed",
			padding: "10px 20px",
			backdropFilter: "blur(5px)",
			borderRadius: "10px",
		},
		profileImage: {
			height: "50px",
			width: "50px",
			borderRadius: "50%",
			border: "2px solid #01A0E6",
		},
		profileName: {
			fontSize: "16px!important",
			fontWeight: "bold!important",
		},
		profileLocation: {
			fontSize: "10px!important",
			lineHeight: "10px!important",
		},
		ProfileDropdown: {
			marginLeft: "5px",
			width: "20px",
		},
		BorderedBG: {
			backgroundImage: `url(${BorderedBG})`,
			borderRadius: "15px",
			backgroundSize: "100% 100%",
		},
		toggleBtn: {
			border: "1px solid #E8E6EA",
			display: "flex",
			padding: "8px",
			backgroundColor: "white",
			borderRadius: "10px",
			justifyContent: "space-between",
			cursor: "pointer",
		},
		activeToggleBtn: {
			backgroundColor: "#000000!important",
			boxShadow: "6px 7px 11px #00000057",
			border: "unset!important",
		},
		circleBadge: {
			height: "20px",
			width: "20px",
			display: "flex",
			borderRadius: "50%",
			justifyContent: "center",
			alignItems: "center",
			fontSize: "12px",
			border: "1px solid #E8E6EA",
		},
		stickyContainer: {
			position: "sticky",
			top: "0px",
			zIndex: "999999",
			background: "#f9f9f9",
			borderRadius: "10px",
			// boxShadow: "6px 7px 17px #00000017",
			padding: "10px",
		},
		prt200: {
			position: "relative",
			top: "150px",
		},
		leftPanel: {
			overflowY: "scroll",
			height: "100vh",
		},
	};
});
function Dashboard() {
	// const {data} = useCallApi()
	const classes = useStyles();
	const navigate = useNavigate();
	const [Loading, setLoading] = useState(false);
	const [RequestMatchLoading, setRequestMatchLoading] = useState(false);
	const [matchMessage, setmatchMessage] = useState("match");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [matchHistory, setmatchHistory] = useState([]);
	const [currentMatches, setCurrentMatch] = useState([]);
	const [matchFavourite, setmatchFavourite] = useState([]);
	const [matches, setmatches] = useState<any[]>([]);
	const [matchStatus, setmatchStatus] = useState<string>("");
	const [Token, setToken] = useState("");

	const featchToken = async () => {
		const result: any = await GeneralHelper.retrieveData("Token");
		console.log("🚀 ~ featchToken ~ result:", result);

		if (result.status == 1) {
			setToken(String(result.data));
		}
	};
	const GetLatestMatch = () => {
		setLoading(true);
		APIHelper.CallApi(
			config.Endpoints.Match.GetLatestMatch,
			{},
			null,
			Token
		).then((result: any) => {
			if (result.status == "success") {
				console.log("Setting Matches:", result.data);
				setmatches(result.data[0]?.match_result ?? []);
				setmatchStatus(result.data[0]?.status ?? "");
				// alert(result.data[0]?.status ?? "")
				setLoading(false);
			} else {
				setLoading(false);
				console.log(result.message);
				GeneralHelper.ShowToast(String(result.message));
			}
		});
	};

	const VerifyAccountCompletion = () => {
		setRequestMatchLoading(true);
		APIHelper.CallApi(
			config.Endpoints.user.GetProfileVerification,
			{},
			null,
			Token
		).then((result: any) => {
			if (result.status == "success") {
				console.log("result ", result.data);
				if (result.data.isProfileVerified.status == false) {
					Alert.notify(
						`Compleate Your Profile First. ${
							result.data.isProfileVerified.msg ?? ""
						}`,
						3000
					);
					setRequestMatchLoading(false);
					NavigateTo("/profile/page-1");
				} else if (result.data.isIdealPersonVerified.status == false) {
					Alert.notify(
						`Compleate Your Ideal Personality Profile. ${
							result.data.isIdealPersonVerified.msg ?? ""
						}`,
						3000
					);
					setRequestMatchLoading(false);
					NavigateTo("/ideal-personality/general-info");
				} else if (result.data.isProfileMediaVerified.status == false) {
					Alert.notify(
						`Compleat Your Profile media. ${
							result.data.isProfileMediaVerified.msg ?? ""
						}`,
						3000
					);
					setRequestMatchLoading(false);
					NavigateTo("/profile/media");
				} else if (result.data.isSubscriptionActive == false) {
					Alert.notify("Please Buy A Subscription First.", 3000);
					setRequestMatchLoading(false);
					NavigateTo("/buy-matches");
				}  else {
					RequestMatch();
				}
			} else {
				console.log(result.message);
				GeneralHelper.ShowToast(String(result.message));
			}
		});
	};
	const NavigateTo = (Route: string) => {
		setTimeout(() => {
			navigate(Route);
		}, 4000);
	};
	const RequestMatch = () => {
		console.log("Click On Request Match");

		setLoading(true);
		APIHelper.CallApi(
			config.Endpoints.Match.RequestMatch,
			{},
			null,
			Token
		).then((result: any) => {
			if (result.status == "success") {
				Alert.notify("Match Requested", 3000);
				console.log("Request Matches:", result.data);
				// setmatches(result.data[0]?.match_result ?? []);
				setLoading(false);
				setRequestMatchLoading(false);
				GetLatestMatch();
			} else {
				setLoading(false);
				setRequestMatchLoading(false);
				console.log(result.message);
				GeneralHelper.ShowToast(String(result.message));
			}
		});
	};
	const GetMatchHistory = () => {
		setLoading(true);

		APIHelper.CallApi(
			config.Endpoints.Match.GetMatches,
			{},
			"?use_auth_user_id=true&is_discard=false",
			Token
		).then((result: any) => {
			if (result.status == "success") {
				console.log(result);
				setmatchHistory(
					result?.data
						.map((request) => {
							return request?.match_result;
						})
						.flat() ?? []
				);
				setCurrentMatch(
					result?.data[result?.data.length - 1]?.match_result ?? []
				);
				setLoading(false);
				// setGender(result?.data?.gender ? result.data.gender : "");
			} else {
				setLoading(false);
				console.log(result.message);
				GeneralHelper.ShowToast(String(result.message));
			}
		});
	};
	const GetFavourites = () => {
		setLoading(true);
		APIHelper.CallApi(
			config.Endpoints.Match.GetMatches,
			{},
			"?use_auth_user_id=true&is_fav=true",
			Token
		).then((result: any) => {
			if (result.status == "success") {
				console.log(result.data);
				setmatchFavourite(
					result?.data
						.map((request) => {
							return request?.match_result;
						})
						.flat() ?? []
				);
				setLoading(false);
				// setmatchHistory(result.data[0].match_result);
				// setGender(result?.data?.gender ? result.data.gender : "");
			} else {
				setLoading(false);
				console.log(result.message);
				GeneralHelper.ShowToast(String(result.message));
			}
		});
	};
	const FavDecline = (body: any) => {
		const data = { ...body };
		APIHelper.CallApi(
			config.Endpoints.Match.FavDecline,
			data,
			null,
			Token
		).then((result: any) => {
			if (result.status == "success") {
				console.log(result.data);
				// init();
				// setmatchHistory(result.data[0].match_result);
				// setGender(result?.data?.gender ? result.data.gender : "");
			} else {
				console.log(result.message);
				GeneralHelper.ShowToast(String(result.message));
			}
		});
	};

	const init = () => {
		GetMatchHistory();
		GetFavourites();
		GetLatestMatch();
	};

	useEffect(() => {
		if (Token != "") {
			init();
		} else {
			featchToken();
		}
	}, [Token]);

	const calculateAge = (birthDate: any) => {
		const birthDateObject: any = new Date(birthDate);
		const currentDate: any = new Date();
		const timeDifference = currentDate - birthDateObject;
		const age = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));

		return age;
	};

	return (
		<Box className={`${classes.appheader}`}>
			<Container maxWidth="xl">
				<HeaderApp sx={{ position: "relative", top: "15px" }} />
				<Grid container sx={{ marginTop: "20px" }} spacing={2}>
					<Grid item xs={12} md={3.5}>
						<Box
							className={`blurBg h100 ${classes.BorderedBG}`}
							sx={{ minHeight: "400px", padding: "15px" }}
						>
							<Box className={`${classes.stickyContainer}`}>
								<Grid container spacing={1}>
									<Grid
										item
										xs={6}
										onClick={() => setmatchMessage("match")}
									>
										<Box
											className={`${classes.toggleBtn} ${
												matchMessage == "match"
													? classes.activeToggleBtn
													: null
											}`}
										>
											<Box className={`d-flex`}>
												<Box
													component="img"
													src={
														matchMessage == "match"
															? msgWhite
															: msgBlue
													}
													sx={{ width: "20px" }}
												></Box>
												<Box
													className={`v-center`}
													sx={{
														fontSize: "12px",
														marginLeft: "3px",
														color:
															matchMessage ==
															"match"
																? "white"
																: "black",
													}}
												>
													Matches
												</Box>
											</Box>
											<Box
												sx={{
													color:
														matchMessage == "match"
															? "white"
															: "black",
												}}
												className={`${classes.circleBadge}`}
											>
												{matchHistory?.length}
											</Box>
										</Box>
									</Grid>
									<Grid
										item
										xs={6}
										onClick={() => {
											setmatchMessage("message");
											GetFavourites();
										}}
									>
										<Box
											className={`${classes.toggleBtn} ${
												matchMessage != "match"
													? classes.activeToggleBtn
													: null
											}`}
										>
											<Box className={`d-flex`}>
												<Box
													component="img"
													src={
														matchMessage != "match"
															? matchWhite
															: matchBlue
													}
													sx={{ width: "20px" }}
												></Box>
												<Box
													className={`v-center`}
													sx={{
														fontSize: "12px",
														marginLeft: "3px",
														color:
															matchMessage !=
															"match"
																? "white"
																: "black",
													}}
												>
													Favorite
												</Box>
											</Box>
											<Box
												sx={{
													color:
														matchMessage != "match"
															? "white"
															: "black",
												}}
												className={`${classes.circleBadge}`}
											>
												{matchFavourite?.length}
											</Box>
										</Box>
									</Grid>
								</Grid>
							</Box>
							{matchHistory?.length <= 0 ? (
								<Box className="h-center">
									<Box
										sx={{ width: "80%" }}
										component="img"
										src={NoMatches}
									></Box>
								</Box>
							) : (
								<Grid
									container
									spacing={1}
									className={classes.leftPanel}
									sx={{
										marginTop: "1px",
									}}
								>
									{Loading ? (
										<CircularProgress
											color="inherit"
											size={20}
										/>
									) : matchMessage == "match" ? (
										matchHistory?.map(
											(history: any, i: number) => (
												<Grid item xs={6} key={i}>
													<MatchCards
														FavDecline={(e: any) =>
															FavDecline(e)
														}
														name={`${history.result_user_id.first_name} ${history.result_user_id.last_name}`}
														age={calculateAge(
															history
																.result_user_id
																.dob
														)}
														img={
															history
																.result_user_id
																?.user_details
																?.images
														}
														_id={
															history
																.result_user_id
																._id
														}
														request_id={history._id}
														is_fav={history?.is_fav}
														is_discard={
															history?.is_discard
														}
													/>
												</Grid>
											)
										)
									) : (
										matchFavourite.map(
											(favourite: any, i: number) => (
												<Grid item xs={6} key={i}>
													<MatchCards
														FavDecline={(e: any) =>
															FavDecline(e)
														}
														name={`${favourite.result_user_id.first_name} ${favourite.result_user_id.last_name}`}
														age={calculateAge(
															favourite
																.result_user_id
																.dob
														)}
														img={
															favourite
																.result_user_id
																?.user_details
																?.images
														}
														_id={
															favourite
																.result_user_id
																._id
														}
														request_id={
															favourite._id
														}
														is_fav={
															favourite?.is_fav
														}
														is_discard={
															favourite?.is_discard
														}
													/>
												</Grid>
											)
										)
									)}
								</Grid>
							)}
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={currentMatches?.length > 0 ? 5 : 8.5}
					>
						<Box
							className={`blurBg h100  ${classes.BorderedBG} `}
							sx={{ minHeight: "400px", padding: "15px" }}
						>
							<Box
								className="sticky"
								sx={{
									display:
										currentMatches?.length > 0
											? "block"
											: "none",
								}}
							>
								<Box className="space-between v-center">
									<Box>
										<Typography
											className={`f-22-bold mb-10`}
											sx={{
												marginTop: "10px",
												color: "#000000",
											}}
										>
											Discover
										</Typography>
										<Typography className={`p-12`}>
											{currentMatches?.length} matches
											found
										</Typography>
									</Box>
									<Box>
										{/* {matchStatus == "completed" || matchStatus == "" ? ( */}
										<ButtonSm
											onClick={() =>
												matchStatus == "completed" ||
												matchStatus == ""
													? VerifyAccountCompletion()
													: null
											}
											sx={{
												maxWidth: "150px",
												margin: "0 auto!important",
											}}
										>
											{matchStatus == "completed" ||
											matchStatus == ""
												? // "Request Matches"
												  `Request Matches`
												: `Request Is ${String(
														matchStatus
												  )}`}
										</ButtonSm>
										{/* ) : null} */}
									</Box>
								</Box>

								<Carousel
									data={currentMatches}
									currentIndex={(e: any) =>
										setCurrentIndex(e)
									}
								/>
							</Box>
							{currentMatches.length == 0 && (
								<Box
									className={`${classes.prt200}`}
									sx={{
										display:
											matches?.length > 0
												? "none"
												: "block",
									}}
								>
									<Box>
										<Typography
											className={`f-35-bold mb-10 pText text-center`}
										>
											{matchStatus == ""
												? "Start matching"
												: matchStatus == "pending"
												? "Waiting for admin response!"
												: ""}
										</Typography>

										<Typography
											className={`p-12 text-center`}
										>
											Start a conversation now with each
											other
										</Typography>
										<Box sx={{ marginTop: "35px" }}>
											{matchStatus == "" ? (
												<ButtonSm
													onClick={() =>
														VerifyAccountCompletion()
													}
													Loading={
														RequestMatchLoading
													}
													sx={{
														maxWidth: "150px",
														margin: "0 auto!important",
													}}
												>
													Request Matches
												</ButtonSm>
											) : null}
										</Box>
									</Box>
								</Box>
							)}
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={3.5}
						sx={{
							display:
								currentMatches?.length <= 0 ? "none" : null,
						}}
					>
						<Box
							className={`blurBg h100 ${classes.BorderedBG}`}
							sx={{ minHeight: "400px" }}
						>
							<ProfileSummery
								data={currentMatches[currentIndex]}
								key={currentIndex}
							/>
						</Box>
					</Grid>
				</Grid>
			</Container>
			<ToastContainer />
		</Box>
	);
}

export default Dashboard;
