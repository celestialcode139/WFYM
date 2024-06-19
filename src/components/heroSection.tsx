import { makeStyles } from "@mui/styles";
import { Box, Container, Grid, Typography } from "@mui/material";
import HeroSectionSignature from "../assets/images/heroSectionSignature.svg";
import { useTheme } from "@mui/material/styles";
import ChocolateIcon from "../assets/gifs/chocolate-bar.gif";
import GreatPyrenees from "../assets/gifs/great-pyrenees.gif";
import LoveYou from "../assets/gifs/i-love-you.gif";

const useStyles = makeStyles(() => {
	const theme = useTheme();

	return {
		heroSection: {
			minHeight: "80vh",
			backgroundImage: `url('${HeroSectionSignature}')`,
			backgroundSize: "100%",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "bottom",
			[theme.breakpoints.down("sm")]: {
				backgroundPosition: "top",
			},
		},
		h1: {
			backgroundImage:
				"linear-gradient(270deg, #01DBCD -16.3%, #0065FF 148.77%)",
			WebkitBackgroundClip: "text",
			color: "transparent",
			fontSize: "100px!important",
			textAlign: "center",
			// marginRight: "80px!important",
			[theme.breakpoints.down("md")]: {
				fontSize: "60px!important",
				marginRight: "30px!important",
			},
			[theme.breakpoints.down("sm")]: {
				fontSize: "35px!important",
				marginRight: "0px!important",
			},
		},
		h2: {
			color: "black",
			fontSize: "100px!important",
			textAlign: "center",
			lineHeight: "70px!important",
			// marginLeft: "80px!important",
			[theme.breakpoints.down("md")]: {
				fontSize: "60px!important",
				marginLeft: "30px!important",
				lineHeight: "20px!important",
			},
			[theme.breakpoints.down("sm")]: {
				fontSize: "35px!important",
				marginLeft: "0px!important",
				lineHeight: "20px!important",
			},
		},
		p1: {
			marginRight: "80px!important",
			// marginTop: "80px!important",
			marginBottom: "30px!important",
			color: "#000000",
			[theme.breakpoints.down("md")]: {
				marginRight: "0px!important",
				marginTop: "60px!important",
			},
		},
	};
});

const HeroSection = () => {
	const classes = useStyles();

	return (
		<Box className={`${classes.heroSection}`}>
			<Container maxWidth="lg">
				<Typography className={`${classes.h1}`}>
					Connecting hearts
				</Typography>
				<Typography className={`${classes.h2}`}>
					with us <img className="mgif" src={ChocolateIcon} />
				</Typography>
				<Grid container>
					<Grid item sm={6.5} xs={12}>
						<img className="mgif" src={GreatPyrenees} />
					</Grid>

					<Grid item sm={5.5} xs={12}>
						<img className="mgif" src={LoveYou} />
						<Typography className={`${classes.p1}`}>
							Discover meaningful connections with We Find Your
							Match where our mission is to match you with someone
							who truly complements your personality and values.
							Join a community of like-minded individuals looking
							for meaningful relationships. Our platform fosters
							respect, kindness, and genuine interactions.Join We
							Find Your Match today and take the first step
							towards finding a relationship that truly fits you.
							Let us help you meet someone special and build a
							meaningful connection that lasts.
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default HeroSection;
