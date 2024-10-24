import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import Button from "../components/buttonSm";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// import $ from "jquery";

const useStyles = makeStyles(() => {
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
  const { pathname } = useLocation();
  const [activeBtn, setactiveBtn] = useState(pathname);
  console.log("location ------>>>", location);

  return (
    <Box
      className={`${classes.plr20} ${classes.h100}`}
      sx={{ marginTop: "50px" }}
    >
      <Link to={{ pathname: "/profile/page-1" }}>
        <Button
          onClick={() => setactiveBtn("/profile/page-1")}
          className={`${
            activeBtn.includes("profile/page")
              ? classes.activeBtn
              : classes.deactiveBtn
          }`}
        >
          Profile
        </Button>
      </Link>
      <Link to={{ pathname: "/ideal-personality/general-info" }}>
        <Button
          onClick={() => setactiveBtn("/ideal-personality/general-info")}
          className={`${
            activeBtn.includes("ideal-personality")
              ? classes.activeBtn
              : classes.deactiveBtn
          }`}
        >
          Ideal Match
        </Button>
      </Link>
      <Link to={{ pathname: "/profile/media" }}>
        <Button
          onClick={() => setactiveBtn("/profile/media")}
          className={`${
            activeBtn == "/profile/media"
              ? classes.activeBtn
              : classes.deactiveBtn
          }`}
        >
          Media
        </Button>
      </Link>
    </Box>
  );
}

export default Sidebar;
