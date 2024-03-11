import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import SendMessage from "../assets/icons/sendMessage.svg";
import Video from "../components/video";
import IntroVideo from "../assets/videos/intro.mp4";
import BodyShort from "../assets/videos/bodyshort.mp4";
import Lightbox from "../components/lightbox";
import { useEffect, useMemo, useState } from "react";
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import VideoCallIcon from "../assets/icons/videoicon.png";
import moment from "moment";
import MediaHelper from "../Helpers/MediaHelper";
import { useCallCreatorData } from "../context/SignalsContextProvider";

const useStyles = makeStyles(() => {
	return {
		profileImage: {
			width: "100%",
			borderRadius: "10px",
		},
		quickProfileContainer: {
			padding: "15px",
		},
		name: {
			color: "black",
		},
		pt20: {
			marginTop: "20px",
		},
		badge: {
			padding: "3px 6px",
			display: "inline-flex",
			border: "1px solid #075bce",
			borderRadius: "6px",
			fontSize: "12px",
			color: "#075bce",
			marginRight: "6px",
			marginBottom: "6px",
		},
		galleryImage: {
			width: "100%",
			borderRadius: "10px",
		},
		detailHeading: {
			fontSize: "14px!important",
			color: "#065BCE!important",
			fontFamily: "Mori-bold!important",
		},
	};
});
function Media() {
	const classes = useStyles();
	const params = useParams();
	const navigate = useNavigate();
	const { createCall } = useCallCreatorData();

	const [isOpen, setisOpen] = useState(false);
	const [User, setUser] = useState<UserInterface>();
	const [Token, setToken] = useState("");
	const [userId, setuserId] = useState("");
	const [Age, setAge] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [Loading, setLoading] = useState(false);
	const [gallery, setgallery] = useState<string[]>([""]);
	const [introVideo, setintroVideo] = useState<string>("");
	const [bodyShort, setbodyShort] = useState<string>("");

	interface UserInterface {
		_id: string;
		first_name: string;
		last_name: string;
		email: string;
		gender: string;
		profile_images: string;
		status: string;
		user_details: UserDetailsInterface;
	}
	interface UserDetailsInterface {
		profession: string;
		description: string;
		location: string;
		hobbies: Array<string>;
		religion: string;
		personality: string;
		images: Array<string>;
		drink_habits: boolean;
		smoking_habits: boolean;
		political_party: string;
		race: string;
		children_before: string;
		highest_degree: string;
	}

	const featchToken = async () => {
		const result: any = await GeneralHelper.retrieveData("Token");
		if (result.status == 1) {
			setToken(String(result.data));
		}
	};
	const featchUserId = async () => {
		const result: any = await GeneralHelper.retrieveData("UserId");
		if (result.status == 1) {
			setuserId(String(result.data));
		}
	};
	const GetProfileDetails = () => {
		APIHelper.CallApi(
			config.Endpoints.user.GetMyProfile,
			{},
			String(params.id),
			Token
		).then(async (result: any) => {
			if (result.status == "success") {
				// console.log("Matches:", result.data.media_id);
				setgallery(result?.data?.media_id?.gallery ?? []);
				setbodyShort(result?.data?.media_id?.bodyShort ?? []);
				setintroVideo(result?.data?.media_id?.introVideo ?? []);
				setUser(result.data);
				calculateAge(result.data.dob);
				getImageURL(result.data?.user_details?.images);
				const galleryUrlsArray = await Promise.all(
					(result.data.media_id.gallery as string[]).map((element) =>
						MediaHelper.GetImage(element)
					)
				);
				setgallery(galleryUrlsArray);
			} else {
				console.log(result.message);
				GeneralHelper.ShowToast(String(result.message));
			}
		});
	};
	const init = () => {
		featchUserId();
		GetProfileDetails();
	};

	const calculateAge = (DOB: string) => {
		const birthDate = moment(DOB);
		const currentDate = moment();
		const years = currentDate.diff(birthDate, "years");
		setAge(String(years));
	};

	const getImageURL = async (img: string) => {
		let imgurl = await MediaHelper.GetImage(img);
		setProfileImage(imgurl);
	};

	useEffect(() => {
		if (Token != "") {
			init();
		} else {
			featchToken();
		}
	}, [Token]);

	return (
		<>
			<Grid container spacing={5}>
				<Grid item md={2} xs={12}>
					<Box
						component="img"
						className={`${classes.profileImage}`}
						src={profileImage}
					></Box>
				</Grid>
				<Grid item md={7} xs={12}>
					<Grid container spacing={2}>
						<Grid item md={6} xs={12}>
							<Box className={`${classes.quickProfileContainer}`}>
								<Box sx={{ display: "flex" }}>
									<Box>
										<Typography
											className={`f-22-bold mb-10 ${classes.name}`}
										>
											{`${
												User?.first_name
													? User?.first_name
													: ""
											}`}
											, {Age}
										</Typography>
										<Typography className={`p-12`}>
											{User?.user_details?.profession}
										</Typography>
									</Box>
									<Box>
										<Link
											to={{
												pathname: `/chat/${userId}/${
													User === undefined
														? null
														: User._id
												}`,
											}}
										>
											<Box
												component="img"
												className="hover"
												src={SendMessage}
												sx={{
													marginLeft: "15px",
													width: "50px",
												}}
											></Box>
										</Link>
										<div
											onClick={() => {
												createCall(User._id);
												navigate(
													`/video-call/${userId}/${
														User === undefined
															? null
															: User._id
													}`
												);
											}}
										>
											<Box
												component="img"
												className="hover"
												src={VideoCallIcon}
												sx={{
													marginLeft: "10px",
													width: "50px",
												}}
											></Box>
										</div>
									</Box>
								</Box>

								<Box className={`${classes.pt20}`}>
									<Typography
										className={`f-15-bold mb-10`}
										sx={{ color: "#000000" }}
									>
										About
									</Typography>
									<Typography className={`p-12`}>
										{User?.user_details?.description}
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid item md={6} xs={12}>
							<Box className={`${classes.pt20}`}>
								<Typography
									className={`f-15-bold mb-10`}
									sx={{ color: "#000000" }}
								>
									Location
								</Typography>
								<Typography className={`p-12`}>
									{User?.user_details?.location}
								</Typography>
							</Box>
							<Box className={`${classes.pt20}`}>
								<Typography
									className={`f-15-bold mb-10`}
									sx={{
										marginBottom: "10px",
										color: "#000000",
									}}
								>
									Interests
								</Typography>
								<Box>
									{User?.user_details?.hobbies.map(
										(hoby: any, i: number) => (
											<Box
												className={`${classes.badge} v-center`}
												key={i}
											>
												<Box component="img"></Box>{" "}
												{hoby}
											</Box>
										)
									)}
								</Box>
							</Box>
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography
								className={`p-12 ${classes.detailHeading}`}
							>
								Gender
							</Typography>
							<Typography className={`p-12`}>Men</Typography>
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography
								className={`p-12 ${classes.detailHeading}`}
							>
								Age
							</Typography>
							{Age != "" && (
								<Typography className={`p-12`}>
									{Age} year
								</Typography>
							)}
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography
								className={`p-12 ${classes.detailHeading}`}
							>
								Religion
							</Typography>
							<Typography className={`p-12`}>
								{User?.user_details?.religion}
							</Typography>
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography
								className={`p-12 ${classes.detailHeading}`}
							>
								Look
							</Typography>
							<Typography className={`p-12`}>
								{User?.user_details?.personality}
							</Typography>
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography
								className={`p-12 ${classes.detailHeading}`}
							>
								Race
							</Typography>
							<Typography className={`p-12`}>
								{User?.user_details?.race}
							</Typography>
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography
								className={`p-12 ${classes.detailHeading}`}
							>
								Occupations
							</Typography>
							<Typography className={`p-12`}>
								{User?.user_details?.profession}
							</Typography>
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography
								className={`p-12 ${classes.detailHeading}`}
							>
								Political Party
							</Typography>
							<Typography className={`p-12`}>
								{User?.user_details?.political_party}
							</Typography>
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography
								className={`p-12 ${classes.detailHeading}`}
							>
								Children’s
							</Typography>
							<Typography className={`p-12`}>
								{User?.user_details?.children_before}
							</Typography>
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography
								className={`p-12 ${classes.detailHeading}`}
							>
								Highest Degree
							</Typography>
							<Typography className={`p-12`}>
								{User?.user_details?.highest_degree}
							</Typography>
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography
								className={`p-12 ${classes.detailHeading}`}
							>
								Smoking Habits
							</Typography>
							<Typography className={`p-12`}>
								{User?.user_details?.smoking_habits == true
									? "True"
									: "False"}
							</Typography>
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography
								className={`p-12 ${classes.detailHeading}`}
							>
								Drinking Habits
							</Typography>
							<Typography className={`p-12`}>
								{User?.user_details?.drink_habits == true
									? "True"
									: "False"}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={3} xs={12}>
					<Box className={`${classes.pt20}`}>
						<Typography
							className={`f-15-bold mb-10`}
							sx={{ color: "#000000" }}
						>
							Intro & Body Short
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Video src={introVideo} key={introVideo} />
							</Grid>
							<Grid item xs={6}>
								<Video src={bodyShort} />
							</Grid>
						</Grid>
					</Box>
					<Box className={`${classes.pt20}`}>
						<Typography
							className={`f-15-bold mb-10`}
							sx={{ color: "#000000" }}
						>
							Gallery
						</Typography>
						<Grid container spacing={1}>
							{gallery.map((img: string, i: number) => {
								return (
									<Grid item xs={4} key={i}>
										<Box
											onClick={() => setisOpen(true)}
											component="img"
											className={`${classes.galleryImage}`}
											src={img}
										></Box>
									</Grid>
								);
							})}
						</Grid>
						<Lightbox
							gallery={gallery}
							isOpen={isOpen}
							setisOpen={(e: boolean) => {
								setisOpen(e);
							}}
						/>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}

export default Media;
