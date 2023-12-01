import { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import backArrow from "../assets/icons/backArrow.svg";
import avatar from "../assets/images/avatar.png";
import Button from "../components/buttonSm";
import maleBlack from "../assets/icons/maleBlack.svg";
import maleWhite from "../assets/icons/maleWhite.svg";
import femaleBlack from "../assets/icons/femaleBlack.svg";
import femaleWhite from "../assets/icons/femaleWhite.svg";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    SignupProfile: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
    },
    h1: {
      fontSize: "27px!important",
      fontFamily: "Mori-bold!important",
      textAlign: "center",
      marginTop: "35px!important",
      lineHeight: "1.3!important",
      marginBottom: "20px!important",
    },
    backArrow: {
      width: "55px",
      height: "55px",
    },
  };
});
function SignupProfile() {
  const classes = useStyles();
  const [SelectedGender, setSelectedGender] = useState("male");

  return (
    <Box className="h-center">
      <Box sx={{width:"100%"}}>
        <Button
          onClick={() => setSelectedGender("male")}
          sx={{
            backgroundColor: SelectedGender == "male" ? "#22172A" : "#EFFBFC",
            color: SelectedGender == "male" ? "#ffffff" : "#323232",
            maxWidth: "264px",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer!important",
          }}
        >
          <Box className="v-center">
            <Box
              sx={{ width: "22px" }}
              component="img"
              src={SelectedGender == "male" ? maleWhite : maleBlack}
            ></Box>
            <Typography>Man</Typography>
          </Box>
        </Button>
        <Button
          onClick={() => setSelectedGender("female")}
          sx={{
            backgroundColor: SelectedGender == "female" ? "#22172A" : "#EFFBFC",
            color: SelectedGender == "female" ? "#ffffff" : "#323232",
            maxWidth: "264px",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            cursor: "pointer!important",
          }}
        >
          <Box className="v-center">
            <Box
              sx={{ width: "22px" }}
              component="img"
              src={SelectedGender == "female" ? femaleWhite : femaleBlack}
            ></Box>
            <Typography>Woman</Typography>
          </Box>
        </Button>
        <Button
          onClick={() => setSelectedGender("Other")}
          sx={{
            backgroundColor: SelectedGender == "Other" ? "#22172A" : "#EFFBFC",
            color: SelectedGender == "Other" ? "#ffffff" : "#323232",
            maxWidth: "264px",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            cursor: "pointer!important",
          }}
        >
          <Box className="v-center">
            <Typography>Other</Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );
}

export default SignupProfile;
