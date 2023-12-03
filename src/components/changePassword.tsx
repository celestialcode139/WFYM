import { useState, useEffect } from "react";
import { Box, Container, TextField, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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
    TextFieldParent: {
      marginBottom: "20px",
    },
  };
});
function ChangePassword() {
  const classes = useStyles();
  const [body, setbody] = useState({
    current_password: "",
    password: "",
    repassword: "",
  });

  const personalityHandler = (e: any) => {
    console.log(e.target.value);
    setbody({ ...body, current_password: e.target.value });
  };

  return (
    <Box>
      <Box className={`${classes.TextFieldParent}`}>
        <TextField
          fullWidth
          sx={{
            "& div": {
              borderRadius: "15px!important",
            },
          }}
          label="Current Password"
          value={body.current_password}
          onChange={(e) => {
            setbody({ ...body, current_password: e.target.value });
          }}
        />
      </Box>
      <Box className={`${classes.TextFieldParent}`}>
        <TextField
          fullWidth
          sx={{
            "& div": {
              borderRadius: "15px!important",
            },
          }}
          label="Password"
          value={body.password}
          onChange={(e) => {
            setbody({ ...body, password: e.target.value });
          }}
        />
      </Box>
      <Box className={`${classes.TextFieldParent}`}>
        <TextField
          fullWidth
          sx={{
            "& div": {
              borderRadius: "15px!important",
            },
          }}
          label="repassword"
          value={body.repassword}
          onChange={(e) => {
            setbody({ ...body, repassword: e.target.value });
          }}
        />
      </Box>
    </Box>
  );
}

export default ChangePassword;
