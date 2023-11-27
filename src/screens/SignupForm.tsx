import {
  Box,
  Typography,
  Container,
  TextField,
  Grid,
} from "@mui/material";
import Logo from "../assets/logo/logo-w.svg";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/button";
import signupForm from "../assets/images/signupForm.svg";
import OnBoardingHeader from "../components/onBoardingHeader";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    signupFrom: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      backgroundImage: `url(${signupForm})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "bottom left",
      [theme.breakpoints.down("sm")]: {
        backgroundImage: "unset!important",
      },
    },
    input: {
      borderRadius: "50px", // Adjust the value to your desired border radius
    },
    logo: {
      padding: "40px",
      display: "flex",
      justifyContent: "center",
      marginBottom: "40px!important",
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
      marginTop: "35px!important",
    },
  };
});
function Signup() {
  const classes = useStyles();
  return (
    <Box className={`${classes.signupFrom}`}>
      <Container maxWidth="lg">
        <OnBoardingHeader heading="Sign up"/>
        <Box
          component="form"
          className={`h-center`}
          sx={{
            "& .MuiTextField-root": { maxWidth: "300px", width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container>
            <Grid item xs={12} className="h-center">
              <TextField
                sx={{
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "15px!important",
                  },
                }}
                label="Email"
                defaultValue="johndoe@gmail.com"
              />
            </Grid>
            <Grid item xs={12} className="h-center" sx={{ marginTop: "25px" }}>
              <TextField
                sx={{
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "15px!important",
                  },
                }}
                type="password"
                label="Password"
              />
            </Grid>
            <Grid item xs={12} className="h-center" sx={{ marginTop: "25px" }}>
              <TextField
                sx={{
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "15px!important",
                  },
                }}
                type="password"
                label="Retry Password"
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Link to={{ pathname: "/otp" }}>
            <Button sx={{ maxWidth: "280px", margin: "0 auto!important" }}>
              Continue
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Signup;
