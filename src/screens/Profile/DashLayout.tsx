import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import avatar from "../../assets/images/avatar.png";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";

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
			//   maxWidth: "500px",
		},
		// new start
		sidebar: {
			width: "260px",
		},
		body: {
			width: "calc(100% - 260px)",
		},
		h100: {
			width: "100%",
		},
		plr20: {
			paddingLeft: "20px",
			paddingRight: "20px",
		},
		imagePicker: {
			backgroundColor: "#075bce",
			padding: "8px",
			borderRadius: "50%",
			border: "2px solid white",
			position: "absolute",
			bottom: "-11px",
			right: "-11px",
			width: "20px",
			cursor: "pointer",
		},
		profileImage: {
			height: "120px",
			width: "120px",
			backgroundImage: `url(${avatar})`,
			// backgroundImage: `url(${avatar})`,
			backgroundSize: "contain",
			marginTop: "8px",
			borderRadius: "15px",
			position: "relative",
		},

		// new end
	};
});
function Race() {
	const { sessionUser } = useAuth();
	const classes = useStyles();

	return (
		<Box className={`${classes.appheader}`}>
			<Container maxWidth="xl">
				{sessionUser && (
					<HeaderApp sx={{ position: "relative", top: "15px" }} />
				)}

				<Box
					sx={{ marginTop: "30px", padding: "20px" }}
					className={`blurBg min100vh_h100vh`}
				>
					<Box className={`${classes.pageContainer} h100`}>
						<Outlet />
					</Box>
				</Box>
			</Container>
		</Box>
	);
}

export default Race;
