import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "../App.css";
import Button from "../components/buttonSm";
import maleBlack from "../assets/icons/maleBlack.svg";
import maleWhite from "../assets/icons/maleWhite.svg";
import femaleBlack from "../assets/icons/femaleBlack.svg";
import femaleWhite from "../assets/icons/femaleWhite.svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SignupProfile(props: any) {
  const [SelectedGender, setSelectedGender] = useState("male");

  useEffect(() => {
    console.log(props.gender);
    props.gender ? setSelectedGender(props.gender) : null;
  }, [props.gender]);

  return (
    <Box className="h-center">
      <Box sx={{ width: "100%" }}>
        <Button
          onClick={() => {
            props.onChange("male");
            setSelectedGender("male");
          }}
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
          onClick={() => {
            props.onChange("female");
            setSelectedGender("female");
          }}
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
          onClick={() => {
            props.onChange("other");
            setSelectedGender("other");
          }}
          sx={{
            backgroundColor: SelectedGender == "other" ? "#22172A" : "#EFFBFC",
            color: SelectedGender == "other" ? "#ffffff" : "#323232",
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
