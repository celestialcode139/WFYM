import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import Button from "../../components/buttonSm";
import AgeRace from "../../components/race";
import avatar from "../../assets/images/avatar.png";
import camera from "../../assets/icons/camera.svg";
import { useState } from "react";

// import $ from "jquery";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    imagePicker: {
      backgroundColor: "#075bce",
      padding: "8px",
      borderRadius: "50%",
      border: "2px solid white",
      position: "absolute",
      bottom: "-11px",
      right: "-11px",
      width: "20px",
      cursor: "pointer",
    },
    profileImage: {
      height: "120px",
      width: "120px",
      backgroundImage: `url(${avatar})`,
      backgroundSize: "contain",
      marginTop: "8px",
      borderRadius: "15px",
      position: "relative",
    },
    h1: {
      fontSize: "20px!important",
      fontFamily: "Mori-bold!important",
      // marginTop: "35px!important",
      lineHeight: "1.3!important",
      marginBottom: "20px!important",
    },
    badge: {
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
      border: "1px solid #E8E6EA",
      padding: "10px 16px",
      fontSize: "12px!important",
      width: "100px",
      cursor: "pointer",
    },
    activeBadge: {
      backgroundColor: "black",
      color: "white",
      boxShadow: "6px 8px 10px 0px rgba(103, 103, 103, 0.19)",
    },
    cancelBtn: {
      backgroundColor: "#ffffff",
      color: "#000000",
      border: "1px solid black",
    },
    delBtn: {
      backgroundColor: "#FF1414",
    },
    marginTop100: {
      marginTop: "80px",
    },
    pageContainer: {
      maxWidth: "500px",
    },
  };
});
function profileScreen2() {
  const [activeInterest, setActiveInterest] = useState([0, 5, 7]);
  const classes = useStyles();
  const interest = [
    {
      text: "Photography",
      img: camera,
    },
    {
      text: "Shopping",
      img: camera,
    },
    {
      text: "Karaoke",
      img: camera,
    },
    {
      text: "Yoga",
      img: camera,
    },
    {
      text: "Cooking",
      img: camera,
    },
    {
      text: "Tennis",
      img: camera,
    },
    {
      text: "Run",
      img: camera,
    },
    {
      text: "Swimming",
      img: camera,
    },
    {
      text: "Art",
      img: camera,
    },
    {
      text: "Traveling",
      img: camera,
    },
    {
      text: "Extreme",
      img: camera,
    },
    {
      text: "Drink",
      img: camera,
    },
    {
      text: "Music",
      img: camera,
    },
    {
      text: "Video games",
      img: camera,
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
    <>
    <Box className={`h-center`}>
      <Box className={`${classes.pageContainer}`}>
        <AgeRace />
      </Box>
    </Box>
    <Grid container className="h-center" sx={{ marginTop: "40px" }}>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button>Save Changes</Button>
        </Grid>
        <Grid item md={3} xs={12} sx={{ p: 1 }}>
          <Button className={`${classes.cancelBtn}`}>Cancel</Button>
        </Grid>
      </Grid>
      </>
  );
}

export default profileScreen2;
