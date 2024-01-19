import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/button";
import SignupBg from "../assets/images/signupBg.svg";
import OnBoardingHeader from "../components/onBoardingHeader";
import { Link } from "react-router-dom";

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
      fontSize: "17px!important",
      textAlign: "center",
      color: "#22172aad",
      fontFamily: "Mori-normal!important",
      marginTop: "8px!important",
    },
    signupOthers: {
      fontSize: "14px!important",
      textAlign: "center",
      color: "#22172aad",
      marginTop: "40px!important",
    },
  };
});
function Signup() {
  const classes = useStyles();
  return (
    <Box className={`${classes.signup}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader
          heading="Make friends with the people like you"
          subheading="Interact with people with the same interest like you"
        />

        <Box>
          <Link to={{ pathname: "/signup-form" }}>
            <Button sx={{ maxWidth: "280px", margin: "0 auto!important" }}>
              Continue with email
            </Button>
          </Link>
        </Box>
        <Box className={`h-center`}>
          <Typography className={`signupOthers ${classes.signupOthers}`}>
            or already have an account
          </Typography>
        </Box>
        <Typography
          className={`${classes.signupOthers}`}
          sx={{ marginTop: "10px!important", marginBottom: "30px" }}
        >
          <Link to={{ pathname: "/signin" }}>
            <Box sx={{ color: "#075bce!important", textDecoration: "none" }}>
              Sign in here
            </Box>
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Signup;
