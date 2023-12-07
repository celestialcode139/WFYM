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
function Race(props:any) {
  const classes = useStyles();
  const [matchMessage, setmatchMessage] = useState("match");
  const [matches, setmatches] = useState<any[]>([]);
  const [activeInterest, setActiveInterest] = useState(props.race);
  const interest = [
    {
      value:"south_asian",
      text: "South Asian",
    },
    {
      value:"black_african",
      text: "Black African",
    },
    {
      value:"white_caucasion",
      text: "White/Caucasian",
    },
    {
      value:"east_asian",
      text: "East Asian",
    },
    {
      value:"black_american",
      text: "Black American",
    },
    {
      value:"middle_eastern",
      text: "Middle Eastern",
    },
    {
      value:"hispanic_latino",
      text: "Hispanic/Latino",
    },
    {
      value:"other",
      text: "Other",
    },
  ];  


useEffect(() => {
console.log(props.race);

}, [props.race])


  return (
    <Box>
      {/* <Box sx={{ marginBottom: "30px" }}>
        <RangeSlider title="Age" handleChange={(e: []) => console.log(e)} />
      </Box> */}
      <Box>
        <Typography className={`f-bold v-center`} sx={{ marginBottom: "30px" }}>
          Race
        </Typography>
        <Grid container spacing={2}>
          {interest.map((val:any, i) => (
            <Grid item key={i}>
              <Typography
                onClick={() => {
                  setActiveInterest(val.value);
                  props.onChange(val.value)
                }}
                className={`${classes.badge} ${
                  activeInterest == val.value ? classes.activeBadge : null
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
