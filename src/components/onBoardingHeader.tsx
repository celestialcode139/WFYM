import { Box, Typography, Container, Link } from "@mui/material";
import Logo from "../assets/logo/logo-w.svg";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/button";
import SignupBg from "../assets/images/signupBg.svg";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    signup: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      backgroundImage: `url(${SignupBg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      [theme.breakpoints.down("sm")]: {
        backgroundImage: "unset!important",
      },
    },
    logo: {
      padding: "40px",
      display: "flex",
      justifyContent: "center",
    },
    h1: {
      fontSize: "30px!important",
      fontFamily: "Mori-bold!important",
      textAlign: "center",
      marginTop: "35px!important",
    },
    p1: {
      fontSize: "12px!important",
      textAlign: "center",
      color: "#22172aad",
      fontFamily: "Mori-normal!important",
      marginTop: "6px!important",
    },
    signupOthers: {
      fontSize: "14px!important",
      textAlign: "center",
      color: "#22172aad",
      marginTop: "40px!important",
    },
  };
});
function OnBoardingHeading(props: any) {
  const classes = useStyles();
  return (
    <Box sx={{marginBottom:"40px"}}>
      <Box className={`${classes.logo}`}>
        <Box component="img" src={Logo}></Box>
      </Box>
      <Typography className={`${classes.h1}`}>{props.heading}</Typography>
      <Typography className={`${classes.p1}`}>{props.subheading}</Typography>
    </Box>
  );
}

export default OnBoardingHeading;
