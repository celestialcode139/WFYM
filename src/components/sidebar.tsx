import { Box, Container, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import Button from "../components/buttonSm";
import avatar from "../assets/images/avatar.png";
import { useState } from "react";

// import $ from "jquery";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    sidebar: {
      width: "260px",
    },
  
    h100: {
      width: "100%",
    },
    plr20: {
      paddingLeft: "20px",
      paddingRight: "20px",
    },  
    deactiveBtn: {
      backgroundColor: "#EAF6F7",
      color: "black",
      marginBottom: "10px",
    },
    activeBtn: {
      marginBottom: "10px",
    },

    // new end
  };
});
function Sidebar() {
  const classes = useStyles();   
  const [activeBtn, setactiveBtn] = useState("settings");

  return (
    <Box
      className={`${classes.plr20} ${classes.h100}`}
      sx={{ marginTop: "50px" }}
    >
      <Button
        onClick={() => setactiveBtn("settings")}
        className={`${
          activeBtn == "settings" ? classes.activeBtn : classes.deactiveBtn
        }`}
      >
        Settings
      </Button>
      <Button
        onClick={() => setactiveBtn("media")}
        className={`${
          activeBtn == "media" ? classes.activeBtn : classes.deactiveBtn
        }`}
      >
        Media
      </Button>
      <Button
        onClick={() => setactiveBtn("bio")}
        className={`${
          activeBtn == "bio" ? classes.activeBtn : classes.deactiveBtn
        }`}
      >
        Bio
      </Button>
      <Button
        onClick={() => setactiveBtn("changepass")}
        className={`${
          activeBtn == "changepass" ? classes.activeBtn : classes.deactiveBtn
        }`}
      >
        Change Password
      </Button>
    </Box>
  );
}

export default Sidebar;
