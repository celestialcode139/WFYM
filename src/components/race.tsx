import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import RangeSlider from "./RangeSlider";
import WizerdPagination from "./wizerdPagination";

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
    badge: {
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
      border: "1px solid #E8E6EA",
      padding: "10px 16px",
      fontSize: "12px!important",
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
  const [activeInterest, setActiveInterest] = useState<any[]>([]);
  const interest = [
    {
      text: "South Asian",
    },
    {
      text: "Black African",
    },
    {
      text: "White/Caucasian",
    },
    {
      text: "East Asian",
    },
    {
      text: "Black American",
    },
    {
      text: "Middle Eastern",
    },
    {
      text: "Hispanic/Latino",
    },
    {
      text: "Other",
    },
  ];

  const GetInterest = (id: any): any => {
    return activeInterest.filter((val) => {
      return val == id;
    });
  };
  const toggleFun = (i: any) => {
    const data = activeInterest.filter((val) => val == i);
    if (data.length <= 0) {
      setActiveInterest([...activeInterest, i]);
    } else {
      const updateData = activeInterest.filter((val) => val !== i);
      setActiveInterest(updateData);
    }
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "30px" }}>
        <RangeSlider title="Age" handleChange={(e: []) => console.log(e)} />
      </Box>
      <Box>
        <Typography className={`f-bold v-center`} sx={{ marginBottom: "30px" }}>
          Race
        </Typography>
        <Grid container spacing={2}>
          {interest.map((val, i) => (
            <Grid item>
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
  );
}

export default Race;
