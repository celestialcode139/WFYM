import { useState, useEffect } from "react";
import { Box, Container, TextField, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import Button from "../../components/buttonSm";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import GeneralinfoComp from "../../components/generalinfo";
// import $ from "jquery";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    appheader: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      backgroundImage: `url(${AdminSignature})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
    },
    pageContainer: {
      width: "100%",
      maxWidth: "500px",
    },
    TextFieldParent: {
      marginBottom: "20px",
    },
  };
});
function Generalinfo() {
  const classes = useStyles();
  const [body, setbody] = useState({
    desc: "",
    personality: [],
    occupation: "",
    religion: "",
    political_Party: "",
    childrens: "",
  });

  const personalityHandler = (e: any) => {
    console.log(e.target.value);
    setbody({ ...body, personality: e.target.value });
  };
  const religionHandler = (e: any) => {
    console.log(e.target.value);
    setbody({ ...body, religion: e.target.value });
  };
  return (
    <Box className={`${classes.appheader}`}>
      <Container maxWidth="xl">
        <HeaderApp sx={{ position: "relative", top: "15px" }} />
        <Box
          sx={{ marginTop: "30px", padding: "20px", position: "relative" }}
          className={`blurBg min100vh h-center`}
        >
          <Box
            className={`${classes.pageContainer}`}
            sx={{ marginTop: { md: "100px", sm: "60px", xs: "30px" } }}
          >
            <GeneralinfoComp />
            <Button
              sx={{
                maxWidth: "200px",
                margin: "0 auto",
                marginTop: { md: "80", sm: "50px", xs: "30px" },
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Generalinfo;
