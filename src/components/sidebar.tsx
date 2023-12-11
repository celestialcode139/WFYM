import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/buttonSm";
import { useState } from "react";
import { Link } from "react-router-dom";

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
      <Link to={{ pathname: "/profile/page-1" }}>
        <Button
          onClick={() => setactiveBtn("settings")}
          className={`${
            activeBtn == "settings" ? classes.activeBtn : classes.deactiveBtn
          }`}
        >
          Profile
        </Button>
      </Link>
      <Link to={{ pathname: "/ideal-personality/race" }}>
        <Button
          onClick={() => setactiveBtn("bio")}
          className={`${
            activeBtn == "bio" ? classes.activeBtn : classes.deactiveBtn
          }`}
        >
          Ideal Personality
        </Button>
      </Link>
      <Link to={{ pathname: "/profile/media" }}>
        <Button
          onClick={() => setactiveBtn("media")}
          className={`${
            activeBtn == "media" ? classes.activeBtn : classes.deactiveBtn
          }`}
        >
          Media
        </Button>
      </Link>
    </Box>
  );
}

export default Sidebar;
