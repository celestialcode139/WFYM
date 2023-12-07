import { Box, Typography, Container, Link, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import dislike from "../assets/images/dislike.svg";
import like from "../assets/images/like.svg";
import DoubleTic from "../assets/icons/doubleTic.svg";
import image from "../assets/icons/image.png";
import { useEffect } from "react";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    quickProfileContainer: {
      padding: "15px",
    },
    name: {
      color: "black",
    },
    pt20: {
      marginTop: "20px",
    },
    badge: {
      padding: "3px 6px",
      display: "inline-flex",
      border: "1px solid #075bce",
      borderRadius: "6px",
      fontSize: "12px",
      color: "#075bce",
      marginRight: "6px",
      marginBottom: "6px",
    },
    galleryImage: {
      width: "100%",
      borderRadius: "10px",
    },
  };
});
function ProfileSummery(props: any) {
  const classes = useStyles();

  useEffect(() => {
    console.log(props.data);
  }, []);

  return (
    <Box className={`${classes.quickProfileContainer}`}>
      <Box>
        <Typography className={`f-22-bold mb-10 ${classes.name}`}>
          {props.data.name}, {props.data.age}
        </Typography>
        <Typography className={`p-12`}>{props.data?.profession}</Typography>
      </Box>
      <Box className={`${classes.pt20}`}>
        <Typography className={`f-15-bold mb-10`}>Location</Typography>
        <Typography className={`p-12`}>{props.data?.location}</Typography>
      </Box>
      <Box className={`${classes.pt20}`}>
        <Typography className={`f-15-bold mb-10`}>About</Typography>
        <Typography className={`p-12`}>{props.data?.description}</Typography>
      </Box>
      <Box className={`${classes.pt20}`}>
        <Typography className={`f-15-bold mb-10`} sx={{ marginBottom: "10px" }}>
          Interests
        </Typography>
        <Box>
          {props.data?.hobbies?.map((hoby: any) => {
            <Box className={`${classes.badge} v-center`}>
              <Box component="img" src={DoubleTic}></Box> {hoby}
            </Box>;
          })}
        </Box>
      </Box>
      <Box className={`${classes.pt20}`}>
        <Typography className={`f-15-bold mb-10`}>Gallery</Typography>
        <Grid container spacing={1}>
          {props.data?.images?.map((image: any) => {
            <Grid item xs={6}>
              <Box
                component="img"
                className={`${classes.galleryImage}`}
                src={image}
              ></Box>
            </Grid>;
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default ProfileSummery;
