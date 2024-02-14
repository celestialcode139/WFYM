import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
// import $ from "jquery";

const useStyles = makeStyles(() => {
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
      color:"#000000"
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
function Race(props: any) {
  const classes = useStyles();
  const [activeInterest, setActiveInterest] = useState("");

  useEffect(() => {
    setActiveInterest(props.race);
  }, [props.race]);

  useEffect(() => {
    console.log(props.data);
  }, [props.data]);
  useEffect(() => {
    console.log("activeInterest ",activeInterest);
  }, [activeInterest]);

  return (
    <Box>
      {/* <Box sx={{ marginBottom: "30px" }}>
        <RangeSlider title="Age" handleChange={(e: []) => console.log(e)} />
      </Box> */}
      <Box>
        <Typography className={`f-bold v-center`} sx={{ marginBottom: "30px",color:"#000000" }}>
          Race
        </Typography>
        <Grid container spacing={2}>
          {props.data?.map((val: any, i: number) => (
            <Grid item key={i}>
              <Typography
                onClick={() => {
                  setActiveInterest(val.value);
                  props.onChange(val.value);
                }}
                className={`${classes.badge} ${
                  activeInterest == val.value ? classes.activeBadge : null
                }`}
              >
                {val.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Race;
