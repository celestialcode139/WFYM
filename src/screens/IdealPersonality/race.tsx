import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import BorderedBG from "../../assets/images/borderedBG.png";
import RangeSlider from "../../components/RangeSlider";

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
    BorderedBG: {
      backgroundImage: `url(${BorderedBG})`,
      borderRadius: "15px",
      backgroundSize: "100% 100%",
    },
    innerContainer: {
      //   minWidth: "400px",
    },
    badge: {
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
      border: "1px solid #E8E6EA",
      padding: "10px 16px",
      fontSize: "12px!important",
      marginBottom: "20px!important",
      width: "100px",
      cursor: "pointer",
    },
    activeBadge: {
      backgroundColor: "black",
      color: "white",
      boxShadow: "6px 8px 10px 0px rgba(103, 103, 103, 0.19)",
    },
    pageContainer: {
      maxWidth: "500px",
    },
  };
});
function Race() {
  const classes = useStyles();
  const [matchMessage, setmatchMessage] = useState("match");
  const [matches, setmatches] = useState<any[]>([]);
  const [activeInterest, setActiveInterest] = useState([0, 5, 7]);
  const interest = [
    {
      text: "Photography",
    },
    {
      text: "Shopping",
    },
    {
      text: "Karaoke",
    },
    {
      text: "Yoga",
    },
    {
      text: "Cooking",
    },
    {
      text: "Tennis",
    },
    {
      text: "Run",
    },
    {
      text: "Swimming",
    },
    {
      text: "Art",
    },
    {
      text: "Traveling",
    },
    {
      text: "Extreme",
    },
    {
      text: "Drink",
    },
    {
      text: "Music",
    },
    {
      text: "Video games",
    },
  ];

  const GetInterest = (id: any): number[] => {
    return activeInterest.filter((val) => {
      return val == id;
    });
  };
  const toggleFun = (i: number) => {
    let data = activeInterest.filter((val) => val == i);
    if (data.length <= 0) {
      setActiveInterest([...activeInterest, i]);
    } else {
      let updateData = activeInterest.filter((val) => val !== i);
      setActiveInterest(updateData);
    }
  };

  return (
    <Box className={`${classes.appheader}`}>
      <Container maxWidth="xl">
        <HeaderApp sx={{ position: "relative", top: "15px" }} />
        <Box
          sx={{ marginTop: "30px", padding: "20px" }}
          className={`blurBg min100vh h-center v-center ${classes.BorderedBG}`}
        >
          <Box className={`${classes.pageContainer}`}>
            <Box
              className={`${classes.innerContainer}`}
              sx={{ marginBottom: "30px" }}
            >
              <RangeSlider
                title="Age"
                handleChange={(e: []) => console.log(e)}
              />
            </Box>
            <Box>
              <Typography
                className={`f-bold v-center`}
                sx={{ marginBottom: "30px" }}
              >
                Race
              </Typography>
              <Grid container>
                {interest.map((val, i) => (
                  <Grid item sx={{ marginRight: "10px" }}>
                    <Typography
                      onClick={() => {
                        toggleFun(i);
                      }}
                      className={`${classes.badge} ${
                        GetInterest(i)[0] == i ? classes.activeBadge : null
                      }`}
                    >
                      {val.text}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Race;
